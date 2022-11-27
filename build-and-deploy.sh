#!/usr/bin/env bash
set -e # fail on errors

echo "- - - - - - - - - - - - - - - "
echo "building..."

npm run build

cd build

echo "deploying..."

aws s3 sync . s3://spokewiki.com/
aws cloudfront create-invalidation --distribution-id E3HIBICDGM1H56 --path "/*" > /dev/null

echo ""
echo "uploaded finished, check out https://www.spokewiki.com/"