#You are my favorite

Twitter bot for favoriting a special someone's Tweets in a non-aggressive manner.

## Installation

This project requires having node and npm installed. As well as a Twitter App access token and consumer key with their secrets.

Once the project has been cloned, navigate to the project's directory and install the dependencies:

```bash
$ npm install
```

The app requires a file for configuring the unique values for your purposes. 
Simply add the tokens and keys that you generate on your Twitter App.
Then add your special someone's Twitter handle with the frequency of favorites.
You can either update the config.js file or create a config.secret.js file that will be ignored by git (RECOMMENDED).

```js
module.exports = {
    consumer_key        = '',      // Put your consumer key here
    consumer_secret     = '',      // Put your consumer secret here
    access_token        = '',      // Put your access token here
    access_token_secret = '',      // Put your access token secret here
    screen_name         = '',      // Put your desired user's screen name here
    interval            = 5*60000, // 5 minutes
  };
```

Finally, run the server and it will go and grab the most recent Tweets and favorite any you might have missed.
It will do this at the frequency defined in the config file, followed by listening for any new Tweets by the user.

```bash
$ node app.js
```