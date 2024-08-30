# spokewiki

A simple PWA (Progressive Web App) that plays audio files with playback speed and memory of which files have been played.

Check out https://www.spokewiki.com

Built with preact
Hosted on aws s3 + cloudfront - it does not need any other servers.

## CLI Commands

### install dependencies

`npm install`

### run test suite (jest and enzyme)

`npm run test`

### serve locally with hot reload at localhost:8080

`npm run dev`

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

Spokewiki uses capacitor to build **ios** and **android** apps.

`npm run build` to get the latest PWA build that the apps will pull in.

You will need a mac with working versions of **xcode** and **cocoapods**:

> Mac OS ships with an ancient version of ruby, highly recommend you install `brew install rbenv` then load in a recent version, then run `rbenv global x.x.x` and `rbenv shell init` to then install a recent version of cocoapods with `gem install cocopods`.

`npx cap open ios` will open the project in xcode

`npx cap run ios` will start the simulator immediately

You will need **android studio** installed:

`npx cap open android` will open the project in android studio

`npx cap run androind` will start the simulator immediately

Extras:

If you need to rebuild the app icons or splash screen: `npx capacitor-assets generate`