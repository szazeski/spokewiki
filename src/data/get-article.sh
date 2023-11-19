
SLUG=$1

if [ -z "$SLUG" ]; then
  echo "enter a wikipedia url or slug (https://en.wikipedia.org/wiki/SLUG)?"
  read -r SLUG
  SLUG=${SLUG/https:\/\/en.wikipedia.org\/wiki\//} # removes url part from slug
fi

#URL="https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${SLUG}&redirects=1&explaintext&format=json&formatversion=2"
URL="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${SLUG}&redirects=1&formatversion=2&explaintext"
echo $URL

rm output.json
curl -s -o output.json "$URL"


PAGEID=$(jq '..|.pageid? | select( . != null)' output.json)
if [ -z "$PAGEID" ]; then
  echo "Unable to get pageid"
  cat output.json | grep "p>"
  exit 1
fi
echo "PageID is $PAGEID"

TITLE=$(jq ".query.pages[0].title" output.json)
if [ -z "$TITLE" ]; then
  echo "Unable to get page title"
  exit 1
fi
echo "Title is $TITLE"

FILENAME="articles/${SLUG}-${PAGEID}.md"
TODAY=$(date +"%B %-d, %Y")
FILENAME=$(echo "$FILENAME" | tr '[:upper:]' '[:lower:]')

jq ".query.pages[0].extract" output.json > "$FILENAME"
echo "Thanks for listening to ${TITLE} on spokewiki recorded on ${TODAY}" >> "$FILENAME"

echo "cleaning markdown"
./clean-markdown.sh "$FILENAME"

echo "Thanks for listening to spoke wiki dot com recording of ${TITLE} from ${TODAY}" >> "$FILENAME"
