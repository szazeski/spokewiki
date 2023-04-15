
SLUG=$1
if [ -z "$SLUG" ]; then
  echo "enter a wikipedia url or slug (https://en.wikipedia.org/wiki/SLUG)?"
  read -r SLUG
  SLUG=${SLUG/https://en.wikipedia.org/wiki//} # removes url part from slug
fi

rm output.json
curl -o output.json "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${SLUG}&explaintext&format=json"

PAGEID=$(jq '..|.pageid? | select( . != null)' output.json)
if [ -z "$PAGEID" ]; then
  echo "Unable to get pageid"
  exit 1
fi
echo "PageID is $PAGEID"

TITLE=$(jq ".query.pages.\"${PAGEID}\".title" output.json)
if [ -z "$TITLE" ]; then
  echo "Unable to get page title"
  exit 1
fi
echo "Title is $TITLE"

FILENAME="articles/${SLUG}.md"
jq ".query.pages.\"${PAGEID}\".extract" output.json > "$FILENAME"
echo "Thanks for listening to ${TITLE} on spokewiki recorded on ${TODAY}" >> "$FILENAME"
echo "$PAGEID" >> "$FILENAME"

echo "cleaning markdown"
./clean-markdown.sh "$FILENAME"