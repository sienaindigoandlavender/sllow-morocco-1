#!/usr/bin/env bash
# Retire the /data/*.html layer from Google's index (keeps pages crawlable for AI citation).
# Run from the repo root.
set -euo pipefail
sed -i 's/content="index, follow, max-image-preview:large"/content="noindex, follow"/' public/data/*.html
echo "index,follow remaining: $(grep -ilE 'content="index, follow' public/data/*.html | wc -l)"
echo "noindex now:            $(grep -ilE 'content="noindex' public/data/*.html | wc -l)"
