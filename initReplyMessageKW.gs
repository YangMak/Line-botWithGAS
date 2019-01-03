function initReplyMessageKW(msgText, retMsg) {
  var kw = msgText.split(' ')[0].replace(/[!！]/g, '').toLowerCase();
  
  //Logger.log(kw);
  
  var kwList = ['提醒', '翻譯', 'yt', '更新電影', '本周新片', '即將上映', '功能表'];
  
  switch(kw) {
    case '提醒':
      retMsg = initMessageKW_schedule(msgText, kw);
      break;

    case '翻譯':
      retMsg = initMessageKW_translate(msgText);
      break;

    case 'yt':
      retMsg = initMessageKW_youtube(msgText);
      break;
      
    case '更新電影':
      retMsg = getYahooMovie();
      break;
      
    case '排行榜':
      retMsg = initMessageKW_chartTaipei();
      break;
      
    case '本周新片':
      retMsg = initMessageKW_newWeekMovie();
      break;       

    case '即將上映':
      retMsg = initMessageKW_cominSoonMovie();
      break;

//    case '功能表':
//      retMsg = text();
//      break;
      
    default:
        retMsg = [{
            'type': 'text',
            'text': kw + ' 不是關鍵字喔!'
        }];
        break;
  }
  
    return retMsg;
}