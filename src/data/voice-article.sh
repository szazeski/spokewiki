#!/bin/bash

MAX_TOKEN=7000
DELETE_TEMP_FILES=true

function voiceText {
  letterCount=$(cat "$1" | wc -m)
  wordCount=$(cat "$1" | wc -w)
  lineCount=$(cat "$1" | wc -l)
  tokens=$(echo "($letterCount / 4) + ($wordCount / 2)" | bc)
  echo "  [$1] estimated voice tokens: $tokens"

  if [ $tokens -gt $MAX_TOKEN ]; then
    echo "  voice tokens are over ${MAX_TOKEN}, splitting file in half..."

    split -l $((1 + ($lineCount / 2))) "$1"
    mv xaa "$1.part1"
    mv xab "$1.part2"

    voiceText "$1.part1"
    voiceText "$1.part2"

    aiffFilepath=${1//.md/.aiff} #regenerate aiffFilepath after recursion
    echo "    merging audio files [$aiffFilepath.part1]+[$aiffFilepath.part2]..."
    sox "${aiffFilepath}.part1" "${aiffFilepath}.part2" "${aiffFilepath}.aiff"
    mv "${aiffFilepath}.aiff" "${aiffFilepath}" #sox needs to know what format to use

    if [ "$DELETE_TEMP_FILES" = true ]; then
      rm "$1.part1"
      rm "${aiffFilepath}.part1"
      rm "$1.part2"
      rm "${aiffFilepath}.part2"
    fi

  else
    aiffFilepath=${1//.md/.aiff}
    echo "  voicing $1 to audio file $aiffFilepath..."
    cat "$1" | say -o "${aiffFilepath}" --progress
  fi
}

subdomain=${subdomain-"www."} # to override `export subdomain="your-subdomain"`
domain=${domain-"spokewiki"} # to override `export domain="your-site-name"`
tld=${tld-"com"} # to override `export tld="your-tld"`
siteUrl="${subdomain}${domain}.${tld}"

filename=$(find ./articles/${1}*.md)
if [ -z "$filename" ]; then
  echo "no file found for $1"
  exit 1
fi
aiffFilepath=${filename//.md/.aiff}

if [ -f "$aiffFilepath" ]; then
  echo "audio file $aiffFilepath already exists, skipping voice generation"
else
  voiceText "$filename"
fi

echo "converting aiff to mp3..."
if [ ! -f "$aiffFilepath" ]; then
    echo "$aiffFilepath does not exist."
    exit 1
fi
mp3Filepath=${aiffFilepath//.aiff/.mp3}
mp3Filepath=${mp3Filepath//.mp3/-$(uuid).mp3}
lame -V 2 "${aiffFilepath}" "${mp3Filepath}" --nohist
if [ "$DELETE_TEMP_FILES" = true ]; then
  rm "${aiffFilepath}"
fi

echo "adding metadata..."
title=$(basename "$filename" | sedplus --titlecase)
# uppercase first letter of each word
originalTitle=${title/-*/}
title=${originalTitle/_/ }
title=${title/.md//}
mp3edit -title="${title}" -artist="${domain}" "${mp3Filepath}"


if [ -z "$SPOKEWIKI_S3_BUCKET" ]; then
  echo "ENV SPOKEWIKI_S3_BUCKET is not set, skipping upload to s3"
else
  echo "uploading to s3..."
  aws s3 cp "${mp3Filepath}" "s3://${SPOKEWIKI_S3_BUCKET}/"
fi

wikipediaId=$(echo "$mp3Filepath" | cut -d'-' -f2)
today=$(date +"%B %-d, %Y")
filesize=$(stat -f%z "${mp3Filepath}")
filesizeMB=$(echo "($filesize / 1000000) + 1" | bc)
durationSec=$(mp3info -p "%S" "${mp3Filepath}")
durationMin=$(echo "($durationSec / 60) + 1" | bc)
mp3Filename=$(basename "$mp3Filepath")
currentSiriVoice=$(defaults read com.apple.speech.voice.prefs SelectedVoiceName)

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
        \"pollyVoice\": \"${currentSiriVoice}\",
        \"urlAudio\": \"https://media.spokewiki.com/${mp3Filename}\",
        \"urlWikipedia\": \"https://en.wikipedia.org/wiki/${title}\",
        \"wikipediaId\": ${wikipediaId},
        \"image\": \"\",
        \"dateRecorded\": \"${today}\"
    },
" > articles/${originalTitle}.json

echo "<item>
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
                    url=\"https://media.spokewiki.com/deepwater-horizon-oil-spill.cd5c331b-7648-4d45-936b-dbeed080c48d.mp3\"
                    length=\"0\" type=\"audio/mpeg\"/>
        </item>" > articles/${originalTitle}.xml
