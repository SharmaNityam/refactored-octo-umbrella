import { cp, readFile, writeFile, rm } from "node:fs/promises";

// GITHUB_SHA in Actions, COMMIT_REF on Netlify
const buildId = (process.env.GITHUB_SHA ?? process.env.COMMIT_REF)?.slice(0, 7) ?? "local";

await rm("dist", { recursive: true, force: true });
await cp("src", "dist", { recursive: true });

const app = await readFile("dist/app.js", "utf8");
await writeFile("dist/app.js", app.replaceAll("__BUILD_ID__", buildId));

console.log(`built dist/ (build id: ${buildId})`);
