var CHANNEL_ACCESS_TOKEN = 'Your Channel access token';

//抓取IP位置
function doGet(e) {
    return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

//處理Line server傳進來訊息，再送出訊息到用戶端
function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    console.log(msg);
    var userMessage = msg.events[0].message; //JSON.parse(e.postData.contents).events[0];
    var replyToken = msg.events[0].replyToken;

    if (typeof replyToken === 'undefined')
        return;

    var url = 'https://api.line.me/v2/bot/message/reply';

    var header = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    }

    var payload = {
        'replyToken': replyToken,
        'messages': ProcMsg(userMessage)
    }

    var options = {
        'headers': header,
        'method': 'post',
        'payload': JSON.stringify(payload)
    }

    UrlFetchApp.fetch(url, options);

    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

function ProcMsg(message) {
    var type = message.type;
    var retMsg;

    switch (type) {
        case 'text':
            retMsg = {
                'type': type,
                'text': '你剛剛說的是: ' + message.text
            };
            break;

        case 'image':
            retMsg = {
                'type': type,
            };
            break;

        case 'sticker':
            retMsg = {
                'type': type,
                'packageId': message.packageId,
                'stickerId': message.stickerId
            };
            break;


    }

    return [retMsg];
}