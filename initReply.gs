function initReply(e) {
    var replyEvent = JSON.parse(e.postData.contents).events[0];
    //console.log(replyEvent);
    var replyToken = replyEvent.replyToken;
    var replyType = replyEvent.type;
  
    /* --- check userid | groupid | roomid --- */
    var userid = replyEvent.source.userId? replyEvent.source.userId : '';
    var groupid = replyEvent.source.groupId? replyEvent.source.groupId : '';
    var roomid =  replyEvent.source.roomId? 'HasRoomId' : '';
    
    var reply_url = 'https://api.line.me/v2/bot/message/reply';

    // 沒有 replyToken 或是有 roomid 直接 return
    if (typeof replyToken === 'undefined' || roomid === 'HasRoomId') {
        return;
    }

  switch (replyType) {
    case 'message':
      var message = initReplyMessage(replyToken, replyEvent, userid, groupid);
      console.log(replyEvent);
      if(message == 'NotReply') {
        return;
      }
      
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
      console.log(options);
      UrlFetchApp.fetch(reply_url, options);         
      break;
      
    case 'postback':
      initReplyPostback(replyToken, replyEvent);
      break;
  }
  return;
}