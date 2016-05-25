var TelegramBot = require('node-telegram-bot-api');

var request = require('request');

var options = {
  url: 'https://api.telegram.org/bot184110722:AAH6XsaM3ZAP7_jq3N_r4dODem_miO4wOnw/getMe',
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("id:" + info.result.id);
    console.log("username:" + info.result.username);
  }
}

var token = '184110722:AAH6XsaM3ZAP7_jq3N_r4dODem_miO4wOnw';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
	console.log("** Echo service")
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
	console.log("** El chat_id:" + msg.chat.id)
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cats.png';
  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
});

//request(options, callback);