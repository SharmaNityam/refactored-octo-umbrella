import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("build output exists and is complete", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<title>Refactored Octo Umbrella<\/title>/);

  const js = await readFile("dist/app.js", "utf8");
  assert.doesNotMatch(js, /__BUILD_ID__/, "build id placeholder was not substituted");

  await readFile("dist/style.css", "utf8");
});
