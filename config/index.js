try {
	module.exports = require("./config.secret");
} catch(_err) {
	module.exports = require("./config");
}