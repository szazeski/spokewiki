#!/bin/bash

filename=$(find ./articles/${1}*.md)
if [ -z "$filename" ]; then
  echo "no file found for $1"
  exit 1
fi
aiffFilepath=${filename//.md/.aiff}

if [ -f "$aiffFilepath" ]; then
  echo "audio file $aiffFilepath already exists"
  exit 1
fi

echo "voicing $filename to audio file $aiffFilepath..."

cat "$filename" | say -o "${aiffFilepath}" --progress

echo "converting aiff to mp3..."
mp3Filepath=${aiffFilepath//.aiff/.mp3}
mp3Filepath=${mp3Filepath//.mp3/-$(uuid).mp3}
lame -V 2 "${aiffFilepath}" "${mp3Filepath}" --nohist

echo "adding metadata..."

title=$(basename "$filename")
originalTitle=${title/-*/}
title=${originalTitle/_/ }
title=${title/.md//}
mp3edit -title="${title}" -artist="spokewiki" "${mp3Filepath}"

echo "removing aiff file..."
rm "${aiffFilepath}"


if [ -z "$SPOKEWIKI_S3_BUCKET" ]; then
  echo "ENV SPOKEWIKI_S3_BUCKET is not set, skipping upload to s3"
else
  echo "uploading to s3..."
  aws s3 cp "${mp3Filepath}" s3://${S3_BUCKET}/
fi

echo "getting wikipedia id..."
wikipediaId=$(echo "$mp3Filepath" | cut -d'-' -f2)
today=$(date +"%B %-d, %Y")
filesize=$(stat -f%z "${mp3Filepath}")
filesizeMB=$(echo "($filesize / 1000000) + 1" | bc)
durationSec=$(mp3info -p "%S" "${mp3Filepath}")
durationMin=$(echo "($durationSec / 60) + 1" | bc)
mp3Filename=$(basename "$mp3Filepath")

echo "
  {
        \"title\": \"${title}\",
        \"subdomain\": \"general\",
        \"tags\": [
          \"tag1\",
          \"tag2\"
        ],
        \"stub\": \"${originalTitle}\",
        \"shortDescription\": \"\",
        \"durationMin\": $durationMin,
        \"filesize\": $filesizeMB,
        \"pollyVoice\": \"SV2\",
        \"urlAudio\": \"https://media.spokewiki.com/${mp3Filename}\",
        \"urlWikipedia\": \"https://en.wikipedia.org/wiki/${title}\",
        \"wikipediaId\": ${wikipediaId},
        \"image\": \"\",
        \"dateRecorded\": \"${today}\"
    },
"

echo "
<item>
            <title>${title}</title>
            <link>https://www.spokewiki.com/article/${originalTitle}</link>
            <description>TODO
            </description>
            <pubDate>Thu, 13 Jul 2023 07:00:00 -0000</pubDate>
            <itunes:title>${title}</itunes:title>
            <itunes:episodeType>full</itunes:episodeType>
            <itunes:season>1</itunes:season>
            <itunes:episode>2</itunes:episode>
            <itunes:author>Spokewiki</itunes:author>
            <itunes:summary>TODO
            </itunes:summary>
            <content:encoded>
                <![CDATA[ <p>TODO</p> ]]>
            </content:encoded>
            <itunes:duration>4140</itunes:duration>
            <itunes:explicit>no</itunes:explicit>
            <guid isPermaLink="false">
                <![CDATA[ 5e298165-7ffa-4ab2-88d9-2fde68b7f7b1 ]]>
            </guid>
            <enclosure
                    url="https://media.spokewiki.com/deepwater-horizon-oil-spill.cd5c331b-7648-4d45-936b-dbeed080c48d.mp3"
                    length="0" type="audio/mpeg"/>
        </item>
"