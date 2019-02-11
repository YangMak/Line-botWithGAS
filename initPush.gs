function initPush(postMsg) {
    //console.log('initPush');
    //console.log(e);
    var postId = postMsg[0].postId? postMsg[0].postId : USER_ID;
    
    var push_url = 'https://api.line.me/v2/bot/message/push';

    var header = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    }

    var payload = {
        'to': postId,
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
