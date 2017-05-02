var config = require("./config"),
	app    = require("express")(),
	Twit   = require("twit"),
	T = new Twit({
		consumer_key:        config.consumer_key,
		consumer_secret:     config.consumer_secret,
		access_token:        config.access_token,
		access_token_secret: config.access_token_secret
	}),
	screen_name = config.screen_name;

/**
 * Make the landing page be the designated screen name's twitter timeline.
 */
app.get("/", function(req, res) {
	res.redirect("https://twitter.com/" + screen_name);
});
app.listen(3000);

/**
 * Helper function for favoriting a tweet if it isn't already favorited or is a retweet.
 */
var favoriteTweet = function(tweet) {
	if(toString.call(tweet) !== "[object Object]") return console.log("That's not a valid tweet!");
	setTimeout(function() {
		T.get("statuses/show", { id: tweet.id_str }, function(err,data,response) {
			if(err)                   return console.log(JSON.stringify(err));
			if(data.in_reply_to_screen_name !== null) {
				if(toString.call(data.user) === "[object Object]"
				&& data.user.screen_name !== screen_name) {
					return console.log("That isn't by the correct screen name! https://twitter.com/"+data.user.screen_name+"/status/"+data.id_str);
				}
				return console.log("That is just a reply! https://twitter.com/"+screen_name+"/status/"+data.id_str);
			}
			if(data.retweeted_status) return console.log("That's just a retweet! https://twitter.com/"+screen_name+"/status/"+data.id_str);
			if(data.favorited)        return console.log("We already liked that tweet! https://twitter.com/"+screen_name+"/status/"+data.id_str);
			T.post("favorites/create", { id: data.id_str }, function(err,data,response) {
				if(err) return console.log(JSON.stringify(err));
				console.log("Successfully favorited the tweet! https://twitter.com/"+screen_name+"/status/"+data.id_str);
			});
		});
	}, config.interval);
};
/**
 * Find the user's most recent tweets and favorite them every so often.
 */
T.get("statuses/user_timeline", { 
		screen_name: screen_name,
		exclude_replies: true
	}, function(err,data,response) {
		for(var i=0; i<data.length; i++) {
			favoriteTweet(data[i]);
		}
	});
/**
 * Listen for the user to tweet something and favorite it.
 */
T.get("users/lookup", { screen_name: screen_name }, function(err,data,response) {
	var stream = T.stream("statuses/filter", { follow: data[0].id_str });
	stream.on("tweet", function(tweet) {
		favoriteTweet(tweet);
	});
});