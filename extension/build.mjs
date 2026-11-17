import * as esbuild from "esbuild";
import { cp, rm } from "node:fs/promises";

const watch = process.argv.includes("--watch");

await rm("dist", { recursive: true, force: true });
await cp("static", "dist", { recursive: true });
await cp("icons", "dist/icons", { recursive: true });

const ctx = await esbuild.context({
  entryPoints: { background: "src/background.ts", newtab: "src/newtab.ts" },
  outdir: "dist",
  bundle: true,
  format: "esm",
  target: "firefox128",
  logLevel: "info",
});

if (watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
