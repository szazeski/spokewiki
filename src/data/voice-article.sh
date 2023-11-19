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
lame -V 2 "${outputFilename}" "${mp3Filename}"

echo "adding metadata..."

title=$(basename "$filename")
title=${title/-*/}
title=${title/_/ /}
title=${title/.md//}
mp3edit -title="${title}" -artist="spokewiki" "${mp3Filename}"

echo "removing aiff file..."
rm "${outputFilename}"