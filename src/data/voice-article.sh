#!/bin/bash

filename=$(find ./articles/${1}*.md)
if [ -z "$filename" ]; then
  echo "no file found for $1"
  exit 1
fi
outputFilename=${filename//.md/.aiff}

if [ -f "$outputFilename" ]; then
  echo "audio file $outputFilename already exists"
  exit 1
fi

echo "voicing $filename to audio file $outputFilename..."

cat "$filename" | say -o "${outputFilename}" --progress

echo "converting aiff to mp3..."
mp3Filename=${outputFilename//.aiff/.mp3}
mp3Filename=${mp3Filename//.mp3/-$(uuid).mp3}
lame -V 2 "${outputFilename}" "${mp3Filename}" --nohist

echo "adding metadata..."

title=$(basename "$filename")
title=${title/-*/}
title=${title/_/ }
title=${title/.md//}
mp3edit -title="${title}" -artist="spokewiki" "${mp3Filename}"

echo "removing aiff file..."
rm "${outputFilename}"


if [ -z "$S3_BUCKET" ]; then
  echo "ENV S3_BUCKET is not set, skipping upload to s3"
else
  echo "uploading to s3..."
  aws s3 cp "${mp3Filename}" s3://${S3_BUCKET}/
fi

echo "getting wikipedia id..."
wikipediaId=$(echo "$mp3Filename" | cut -d'-' -f2)
today=$(date +"%B %-d, %Y")
filesize=$(stat -f%z "${mp3Filename}")
filesizeMB=$(echo "($filesize / 1000000) + 1" | bc)
durationSec=$(mp3info -p "%S" "${mp3Filename}")
durationMin=$(echo "($durationSec / 60) + 1" | bc)

echo `
  {
        "title": "${title}",
        "subdomain": "general",
        "tags": [
          "tag1",
          "tag2"
        ],
        "stub": "${title}",
        "shortDescription": "",
        "durationMin": $durationMin,
        "filesize": $filesizeMB,
        "pollyVoice": "SV2",
        "urlAudio": "https://media.spokewiki.com/${outputFilename}",
        "urlWikipedia": "https://en.wikipedia.org/wiki/${title}",
        "wikipediaId": ${wikipediaId},
        "image": "",
        "dateRecorded": "${today}"
    },
`