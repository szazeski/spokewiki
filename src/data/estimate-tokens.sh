# Estimate voice tokens
maxTokens=10000
letterCount=$(cat "$filename" | wc -m)
wordCount=$(cat "$filename" | wc -w)
tokens=$(echo "($letterCount / 4) + ($wordCount / 2)" | bc)
echo " letter count: ${letterCount}"
echo " word count: ${wordCount}"
echo " estimated voice tokens: $tokens"