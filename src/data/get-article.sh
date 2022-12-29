
echo "enter a wikipedia url or slug"

read -r SLUG

SLUG="Kyrsten_Sinema"

rm output.json
curl -o output.json "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${SLUG}&explaintext&format=json"

PAGEID=$(cat output.json | jq '..|.pageid?')
TITLE=$(cat output.json | jq ".query.pages.${PAGEID}.title")
TEXT=$(cat output.json | jq ".query.pages.${PAGEID}.extract")

FILENAME="articles/${SLUG}.md"
echo "${TEXT}" > "$FILENAME"

echo "Thanks for listening to ${TITLE} on spokewiki recorded on ${TODAY}" >> "$FILENAME"

echo "$PAGEID" >> "$FILENAME"