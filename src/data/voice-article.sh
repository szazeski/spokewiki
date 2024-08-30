#!/bin/bash

maxTokens=9000

# voiceText inputText output
function voiceText {
  filename=$1
  aiffFilepath="$filename.aiff"
  mp3Filepath="$filename.mp3"

  echo "voicing filename to audio file $aiffFilepath..."
  cat "$filename.md" | say -o "${aiffFilepath}" --progress

  echo "converting aiff to mp3..."
  lame -V 2 "${aiffFilepath}" "${mp3Filepath}" --nohist
}

function splitText {
  filename=$1


  wordCount=$(cat "$filename" | wc -w)
  lineCount=$(cat "$filename" | wc -l)
  echo " letter count: ${letterCount}"
  echo " word count: ${wordCount}"
  echo " line count: ${lineCount}"

}

subdomain=${subdomain-"www"} # to override `export subdomain="your-subdomain"`
domain=${domain-"spokewiki"} # to override `export domain="your-site-name.com"`
tld=${tld-"com"} # to override `export tld="your-tld"`

siteUrl="${subdomain}.${domain}.${tld}"

filename=$(find ./articles/${1}*.md)
if [ -z "$filename" ]; then
  echo "no file found for $1"
  exit 1
fi
aiffFilepath=${filename//.md/.aiff}


if [ -f "$aiffFilepath" ]; then
  echo "audio file $aiffFilepath already exists, skipping voice generation"
else
  letterCount=$(cat "$filename" | wc -m)
  wordCount=$(cat "$filename" | wc -w)
  tokens=$(echo "($letterCount / 4) + ($wordCount / 2)" | bc)
  echo " estimated voice tokens: $tokens"
  if [ $tokens -gt $maxTokens ]; then
    echo "[WARNING] voice tokens are over ${maxTokens}, splitting file into 2"

    split -l $(($lineCount / 2)) "$filename"
    mv xaa "${filename}.part1"
    mv xab "${filename}.part2"

    echo "voicing ${filename}.part1 to audio file ${aiffFilepath}.part1..."
    cat "${filename}.part1" | say -o "${aiffFilepath}.part1" --progress
    echo "voicing ${filename}.part2 to audio file ${aiffFilepath}.part2..."
    cat "${filename}.part2" | say -o "${aiffFilepath}.part2" --progress

    echo "merging audio files..."
    sox "${aiffFilepath}.part1" "${aiffFilepath}.part2" "${aiffFilepath}"

  else
    echo "voicing $filename to audio file $aiffFilepath..."
    cat "$filename" | say -o "${aiffFilepath}" --progress
  fi
fi


echo "converting aiff to mp3..."
mp3Filepath=${aiffFilepath//.aiff/.mp3}
mp3Filepath=${mp3Filepath//.mp3/-$(uuid).mp3}
lame -V 2 "${aiffFilepath}" "${mp3Filepath}" --nohist

echo "adding metadata..."
title=$(basename "$filename")
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

echo "getting wikipedia id..."
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

echo "removing aiff file..."
rm "${aiffFilepath}"