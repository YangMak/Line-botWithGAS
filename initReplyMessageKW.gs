function initReplyMessageKW(msgText, retMsg, userid, groupid) {
    var kw = msgText.split(' ')[0].toLowerCase();//var kw = msgText.split(' ')[0].replace(/[!！]/g, '').toLowerCase();
  
  //Logger.log(kw);
  
  var kwList = ['請自我介紹', '先退下吧88', '提醒', '翻譯', 'yt', '更新電影', '本周新片', '即將上映', '功能表'];
  
  switch(kw) {
    case '先退下吧88':
      retMsg = initLeaveGroup(groupid);
      break;
      
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
      
    case '電影排行榜':
      retMsg = initMessageKW_chartTaipei();
      break;
      
    case '電影本周新片':
      retMsg = initMessageKW_newWeekMovie();
      break;       

    case '電影即將上映':
      retMsg = initMessageKW_cominSoonMovie();
      break;

    case '請自我介紹':
      retMsg = [{
        'type': 'text',
        'text': '歐嗨喲~ 在下是 IronCat : )'
      },{
        'type': 'sticker',
        'packageId': '11537',
        'stickerId': '52002735'          
      }];
      break;
      
    default:
        retMsg = 'NotReply';
        break;
  }
  
    return retMsg;
}