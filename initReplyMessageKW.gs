function initReplyMessageKW(msgText, retMsg) {
  var kw = msgText.split(' ')[0].replace(/[!！]/g, '');
  //Logger.log(kw);
  
  var kwList = ['提醒', '翻譯'];
  
  switch(kw) {
    case '提醒':
      retMsg = initMessageKW_schedule(msgText);
      break;

    case '翻譯':
      retMsg = initMessageKW_translate(msgText);
      break;      
      
    default:
        retMsg = [{
            'type': 'text',
            'text': kw + ' 不是關鍵字喔!'
        }];
        break;
  }
  
    return retMsg;
}