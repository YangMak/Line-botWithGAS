function initGoogleCalendarPush(item, datatime) {
  
  var date = new Date(datatime);
  //var date = new Date('December 25, 2018 21:00:00');
  
  var event = CalendarApp.getCalendarsByName('IronCat')[0].createEvent(
    '[IronCat]' + item, // 活動名稱
    date,           // 開始時間
    date,           // 結束時間
    {
      description: 'Create from [IronCat]'  // 備註
    }).addEmailReminder(0).setColor(6);     // email 提醒 (分鐘) 
  
  var postMsg = [{
    type: 'text',
    text: '已記錄提醒事項:' + '\n時間: ' + datatime + '\n--------------------------\n' + item
  }];
  
  return postMsg;
}
