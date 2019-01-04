function initReply(e) {
    var replyEvent = JSON.parse(e.postData.contents).events[0];
    //console.log(replyEvent);
    var replyToken = replyEvent.replyToken;
    var replyType = replyEvent.type;
  
    /* --- check userid and groupid --- */
    var userid = replyEvent.source.userId? replyEvent.source.userId : '';
    var groupid = replyEvent.source.userId? replyEvent.source.groupId : '';
    
    var reply_url = 'https://api.line.me/v2/bot/message/reply';

    // 沒有 replyToken 直接 return
    if (typeof replyToken === 'undefined') {
        return;
    }

    switch (replyType) {
        case 'message':
            //console.log('pre - initReplyMessage');
            var message = initReplyMessage(replyToken, replyEvent, userid, groupid);
            //console.log(message);

            var header = {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            }

            var payload = {
                'replyToken': replyToken,
                'messages': message
            }

            var options = {
                'headers': header,
                'method': 'post',
                'payload': JSON.stringify(payload)
            }

            UrlFetchApp.fetch(reply_url, options);
            break;
        case 'postback':
            initReplyPostback(replyToken, replyEvent);
            break;
    }
    return;
}