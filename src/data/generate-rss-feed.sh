# convert json to xml rss feed

TITLE=Spokewiki

echo '<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
          xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:atom="http://www.w3.org/2005/Atom"
          xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
         <channel>
             <atom:link href="https://www.spokewiki.com/rss.xml" rel="self" type="application/rss+xml"/>
             <title>'$TITLE'</title>
             <link>https://www.spokewiki.com/</link>
             <language>en-us</language>
             <copyright>'$TITLE'</copyright>
             <description>Listen to popular current wikipedia articles</description>
             <image>
                 <url>https://www.spokewiki.com/assets/og.jpg</url>
                 <title>Spokewiki</title>
                 <link>https://www.spokewiki.com/</link>
             </image>
             <itunes:explicit>no</itunes:explicit>
             <itunes:type>episodic</itunes:type>
             <itunes:subtitle>Listen to popular wikipedia articles</itunes:subtitle>
             <itunes:author>Spokewiki</itunes:author>
             <itunes:summary>spokewiki tracks current events and pulls the wikipedia article, does minor editing to improve
                 readability then uses Amazon Polly to voice the article. We try our best to be fair, accurate and open to
                 feedback.
             </itunes:summary>
             <content:encoded>
                 <![CDATA[ <p>spokewiki tracks current events and pulls the wikipedia article, does minor editing to improve readability then uses Amazon Polly to voice the article. We try our best to be fair, accurate and open to feedback.</p> ]]>
             </content:encoded>
             <itunes:owner>
                 <itunes:name/>
                 <itunes:email>rss@spokewiki.com</itunes:email>
             </itunes:owner>
             <itunes:image href=""/>
             <itunes:category text="Technology"/>
             <itunes:category text="History"/>' > rss.xml

# load json file
cat data.json | jq -r '.articles[] | .title, .url, .date, .description'

# loop through json file


echo '</channel> </rss>' >> rss.xml