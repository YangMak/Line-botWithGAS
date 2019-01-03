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
    var kwList = ['文字', '提醒'];
  
    switch(kw) {
      case '文字':
        postMsg = [{
          type: 'text',
          text: item
        }];
        break;        
        
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
    
  initPush(postMsg);
  return;
}