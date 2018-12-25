function initReplyPostback(token, e) {
    var postMsg;
    var data = e.postback.data;
    var kwReg = /^\[([\s\S]*?)\]/gi;
      if(data.search(kwReg) == -1) {
        postMsg = [{
          type: 'text',
          text: '[錯誤] PostBack格式不符 => Data : ' + data
        }];
        return postMsg;
      }
    
    var item = data.replace(kwReg, '');
    var kw = data.match(kwReg)[0].replace('[', '').replace(']', '');
    var kwList = ['提醒'];
  
    switch(kw) {
      case '提醒':
        postMsg = initGoogleCalendarPush(item, e.postback.params.datetime);
        break;
      
      default:
        postMsg = [{
          type: 'text',
          text: kw + ' 不是PB關鍵字喔!'
        }];
        break;
    }   
  
//  var params = e.postback.params.datetime;
//    var postMsg = '已記錄提醒事項:' + '\n時間: ' + params + '\n--------------------------\n' + data;
//
//    initPush(postMsg);
    
  initPush(postMsg);
  return;
}