import { vol } from "memfs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tags } from "../../types/posts-types";
import { getPosts } from "../get-posts.server";

vi.mock("node:fs");
vi.mock("node:fs/promises");

const TEMP_DIR = "/tmp";

describe("getPosts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vol.reset();
  });

  it("should correctly parse posts from markdown files", () => {
    vol.fromJSON(
      {
        "./valid-post.md": `---
title: First Post
description: this is the first post
pubDatetime: 2025-10-16T15:28:11Z
tags:
  - ${tags[0]}
  - ${tags[1]}
---


Hello First
`,
      },
      TEMP_DIR,
    );

    const posts = getPosts(TEMP_DIR);

    expect(posts).toHaveLength(1);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        title: "First Post",
        pubDatetime: new Date("2025-10-16T15:28:11Z"),
        tags: ["coding", "philosophy"],
        content: "\n\nHello First\n",
      }),
    );
  });

  it("should throw an error for invalid tags", () => {
    vol.fromJSON(
      {
        "./invalid-post.md": `---
title: Second Post
pubDatetime: 2025-10-16T15:28:11Z
description: this is the first post
tags:
  - bad
  - tags
---
Hello Second
`,
      },
      TEMP_DIR,
    );

    expect(() => getPosts(TEMP_DIR)).toThrow();
  });

  it("should throw an error for missing title", () => {
    vol.fromJSON(
      {
        "./invalid-post.md": `---
pubDatetime: 2025-10-16T15:28:11Z
description: this is the first post
tags:
  - coding
---
Hello Second
`,
      },
      TEMP_DIR,
    );

    expect(() => getPosts(TEMP_DIR)).toThrow();
  });

  it("should throw an error for missing date", () => {
    vol.fromJSON(
      {
        "./invalid-post.md": `---
title: Second Post
description: this is the first post
tags:
  - coding
---
Hello Second
`,
      },
      TEMP_DIR,
    );

    expect(() => getPosts(TEMP_DIR)).toThrow();
  });

  it("should throw an error for missing tags", () => {
    vol.fromJSON(
      {
        "./invalid-post.md": `---
title: Second Post
description: this is the first post
pubDatetime: 2025-10-16T15:28:11Z
---
Hello Second
`,
      },
      TEMP_DIR,
    );

    expect(() => getPosts(TEMP_DIR)).toThrow();
  });
});
