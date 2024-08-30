#!/bin/bash

touch sitemap.xml
PATHTOFILE=sitemap.xml

echo '<?xml version="1.0" encoding="UTF-8"?>' > $PATHTOFILE
echo '<?xml-stylesheet type="text/xsl" href="https://www.spokewiki.com/sitemap.xsl" ?>' >> $PATHTOFILE
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >> $PATHTOFILE

echo '  <url><loc>https://www.spokewiki.com/</loc><lastmod>2018-06-04</lastmod></url>' >> $PATHTOFILE
echo '  <url><loc>https://www.spokewiki.com/all</loc><lastmod>2018-06-04</lastmod></url>' >> $PATHTOFILE

cat data.json | jq -r '.articles[] | .stub + "|" +  .dateRecorded' > sitemap-articles.txt

COUNT=0
while read line; do
  title=$(echo $line | cut -d'|' -f1)
  dateRecorded=$(echo $line | cut -d'|' -f2)
  dateRecorded=$(date -j -f "%B %d, %Y" "$dateRecorded" "+%Y-%m-%d")
  echo '  <url><loc>https://www.spokewiki.com/article/'$title'</loc><lastmod>'$dateRecorded'</lastmod></url>' >> $PATHTOFILE
  COUNT=$((COUNT+1))
done <sitemap-articles.txt

echo '</urlset>' >> $PATHTOFILE

echo "sitemap.xml generated with $COUNT articles"