filename=$(find ./src/data/articles/${1}*.md)
if [ -z "$filename" ]; then
  echo "no file found for $1"
  exit 1
fi

# Estimate voice tokens
maxTokens=10000
letterCount=$(cat "$filename" | wc -m)
wordCount=$(cat "$filename" | wc -w)
tokens=$(echo "($letterCount / 4) + ($wordCount / 2)" | bc)
echo " letter count: ${letterCount}"
echo " word count: ${wordCount}"
echo " estimated voice tokens: $tokens"