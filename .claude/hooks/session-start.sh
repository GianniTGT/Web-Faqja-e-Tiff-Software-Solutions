#!/usr/bin/env bash
# Runs at the start of every web session, so a session knows the state of the project
# before anybody describes it. Same idea as the DAS-Manager hook: derive it, never store
# it — a summary written into a file goes stale and then lies at the top of every session.
set -uo pipefail
cd "$(dirname "$0")/../.." || exit 0

echo "Tiff Software Solutions — the website"
echo
echo "Repo      $(git rev-parse --abbrev-ref HEAD 2>/dev/null) @ $(git log --oneline -1 2>/dev/null)"
[ -z "$(git status --porcelain 2>/dev/null)" ] && echo "          working tree clean" || echo "          working tree DIRTY"
echo

if [ ! -d node_modules ]; then
  echo "Deps      installing…"
  npm install --no-audit --no-fund >/dev/null 2>&1 && echo "Deps      installed" || echo "Deps      install FAILED"
else
  echo "Deps      installed"
fi

echo
echo "Pages"
for f in src/pages/*.astro; do [ -e "$f" ] && echo "  $(basename "$f")"; done

echo
if npm run build >/tmp/tiff-build.log 2>&1; then
  echo "Build     ok — $(find dist -type f 2>/dev/null | wc -l) files in dist/"
else
  echo "Build     FAILED — see /tmp/tiff-build.log"
  tail -12 /tmp/tiff-build.log
fi

echo
grep -q "^Disallow: /" public/robots.txt 2>/dev/null \
  && echo "Note      robots.txt still disallows everything (correct until go-live)"

echo
echo "CLAUDE.md is the handover — read it before starting."
