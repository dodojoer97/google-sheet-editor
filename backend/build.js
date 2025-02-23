const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/server.ts"], // 👈 Adjust to your entry file
  outfile: "dist/server.js",
  bundle: true,
  platform: "node",
  target: "esnext",
  sourcemap: true,
  format: "cjs",
  external: ["@google-sheet-editor/shared"], // 👈 Ensures shared modules aren't bundled
  logLevel: "info",
}).catch(() => process.exit(1));
