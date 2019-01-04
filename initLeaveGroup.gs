function initLeaveGroup(groupID) {
  var push_url = 'https://api.line.me/v2/bot/group/' + groupID + '/leave';
  
  var header = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  }
  
  var options = {
    'headers': header,
    'method': 'post'
  }
  
  UrlFetchApp.fetch(push_url, options);
  return;  
}
