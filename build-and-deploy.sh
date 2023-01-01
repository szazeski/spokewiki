#!/usr/bin/env bash
set -e # fail on errors

if [ -z "$S3PATH" ]; then
  echo "Env var S3PATH is not set (export S3PATH=s3://bucketname)"
  exit 1
fi

echo "- - - - - - - - - - - - - - - "
echo "building..."

npm run build

cd build

echo "deploying..."

aws s3 sync . "$S3PATH"

# check if $AWS_CLOUDFRONT_DISTRIBUTION_ID is set
if [ -z "$AWS_CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "Env var AWS_CLOUDFRONT_DISTRIBUTION_ID is not set (export AWS_CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id)"
else
  aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --path "/*" > /dev/null
fi


echo ""
echo "uploaded finished, check out https://www.spokewiki.com/"