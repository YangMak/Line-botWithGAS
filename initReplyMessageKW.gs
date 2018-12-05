function initReplyMessageKW(msgText, retMsg) {
  var kw = msgText.split(' ')[0].replace(/[!！]/g, '').toLowerCase();
  
  //Logger.log(kw);
  
  var kwList = ['提醒', '翻譯', 'yt', '本周新片', '即將上映'];
  
  switch(kw) {
    case '提醒':
      retMsg = initMessageKW_schedule(msgText);
      break;

    case '翻譯':
      retMsg = initMessageKW_translate(msgText);
      break;

    case 'yt':
      retMsg = initMessageKW_youtube(msgText);
      break;

    case '本周新片':
      retMsg = initMessageKW_newWeekMovie();
      break;       

    case '即將上映':
      retMsg = initMessageKW_cominSoonMovie();
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