# spokewiki

A simple PWA (Progressive Web App) that plays audio files with playback speed and memory of which files have been played.

Check out https://www.spokewiki.com

Built with preact
Hosted on aws s3 + cloudfront - it does not need any other servers.

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run tests with jest and enzyme
npm run test
```

## Adding Content

Spokewiki is designed to pull articles from wikipedia and then voice them, but you can adjust it to use any text source and voicing engine that you want to use.

`./get-article Baseball`
will use the wikipedia api to get the content of an article and save it to the `src/data/articles` directory.

`./voice-article base`
(notice you don't need to write the entire article name, it will find the first match)

```
SPOKEWIKI_S3_BUCKET=spokewiki-media-output
```

## Deployment

This script will run the test suite, build the app and deploy it to S3 if you have env setup for it.

```
export S3PATH=s3://bucketname
export AWS_CLOUDFRONT_DISTRIBUTION_ID=A1BCDEFGHI2345

./build-and-deploy.sh
```

## Mobile Apps

Spokewiki uses capacitor to build ios and android apps.

You will need a mac with working versions of xcode and cocoapods:
`npx cap open ios`

You will need android studio installed:
`npx cap run android`