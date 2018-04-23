var util = require('util');
var youtube_node = require('youtube-node');
var AuthDetails = require("../../config.json");

function YoutubePlugin () {
	this.youtube = new youtube_node();
	this.youtube.setKey(AuthDetails.youtube_api_key);
};

YoutubePlugin.prototype.respond = function (query, channel, bot) {
	this.youtube.search(query, 1, function(error, result) {
				if (!result || !result.items || result.items.length < 1) {
					msg.channel.sendMessage("I couldn't find a video for: " + query);
				} else {
					msg.channel.sendMessage("http://www.youtube.com/watch?v=" + result.items[0].id.videoId );
				}
		});
};

module.exports = YoutubePlugin;
