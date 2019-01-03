function initPush(postMsg) {
    //console.log('initPush');
    //console.log(e);
    var push_url = 'https://api.line.me/v2/bot/message/push';

    var header = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    }

    var payload = {
        'to': USER_ID,
        'messages': postMsg
    }

    var options = {
        'headers': header,
        'method': 'post',
        'payload': JSON.stringify(payload)
    }

    UrlFetchApp.fetch(push_url, options);
    return;
}
