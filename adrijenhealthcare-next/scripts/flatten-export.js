// Next.js static export writes both `about.html` and an `about/` folder
// (internal RSC prefetch payloads) for every route. On Apache/LiteSpeed
// hosting, that same-named folder makes the server treat /about as a
// directory, redirect to /about/, and 403 (nothing servable inside).
// DirectorySlash Off should prevent this but Hostinger's LiteSpeed does not
// honor it from .htaccess, so instead we just remove the conflicting
// folders after build. Losing them only disables Next's client-side RSC
// prefetch fetch; normal <Link> navigation falls back to a full page load.
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const htmlSibling = path.join(outDir, `${entry.name}.html`);
  if (fs.existsSync(htmlSibling)) {
    fs.rmSync(path.join(outDir, entry.name), { recursive: true, force: true });
    console.log(`Removed conflicting folder: out/${entry.name}/`);
  }
}
