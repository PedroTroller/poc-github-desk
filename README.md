# POC - Tweetdeck like but for Github notifications

This application is a POC for the next KNPLabs Hackaton session

Yes it's a little bit dirty and there is hard coded Github API cedentials but this credentials are not valid anymore.

## Build the project

```
docker run -it --rm -v $(pwd):/srv/app -p 80:80 -w /srv/app node:7.8 node_modules/.bin/encore dev
```

## Launch a web server

```
docker run -it --rm -v $(pwd):/srv/app -p 80:80 -w /srv/app node:7.8 node_modules/.bin/encore dev-server --host 0.0.0.0 --port 80
```

## Configure the project

First of all, you have to create a [GitHub Application](https://github.com/settings/developers).
And then you have to edit [this file](./src/js/oauth.js) to set your client ID and secret.
