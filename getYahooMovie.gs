function getYahooMovie() {
  var SpreadSheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/112M5G2Bak6wqhMnkACw1PnkiF0lXtQ4vYla_heKTeZ0/edit#gid=0');
  var arrangeObj = [];
  
  pushThisWeek(SpreadSheet, arrangeObj);
  pushCominSoon(SpreadSheet, arrangeObj);
  
  var retMsg = [{
    type: 'text',
    text: '電影資訊已更新完畢!'
  }]  

  return retMsg;  
}

/// -------------------- pushThisWeek -------------------- ///

function pushThisWeek(SpreadSheet, arrangeObj) {
  var range = SpreadSheet.getRange('NewWeekMovie!A2:F11');
  
  var html = UrlFetchApp.fetch('https://movies.yahoo.com.tw/movie_thisweek.html').getContentText();
  
  // ---  result html --- //
  var htmlExp = /<ul class=\"release_list\">([\s\S]*?)<\/ul>/gi;
  var result = html.match(htmlExp);
  
  // --- img --- //
  var photoExp = /<img src=\"([\s\S]*?)\"([\s\S]*?)alt=\"\">/gi;
  var img = result[0].match(photoExp);
  
  // --- url & title --- //
  var urlTitleExp = /<div class=\"release_movie_name\">([\s\S]*?)<\/a>/gi;  
  var urlTile = result[0].match(urlTitleExp);
  
  // --- release date --- //
  var dateExp = /<div class=\"release_movie_time\">([\s\S]*?)<\/div>/gi;
  var date = result[0].match(dateExp);
  
  // --- trailer --- //
  var tlUrlExp = /電影介紹<\/a>([\s\S]*?)<a href=\"([\s\S]*?)class=\"btn_s_vedio/gi;
  var tlUrl = result[0].match(tlUrlExp);
  
  //--- Expectation --- //
  var expecExp = /<div class=\"level_name\">期待度([\s\S]*?)網友想看/gi;
  var expec = result[0].match(expecExp);     
      
      
  for(var i in img) {
    arrangeObj[i] = [
      /*title : */urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)\">/gi, '').replace('</a>', '').trim(),
      /*url : */urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"gabtn\"([\s\S]*?)<\/a>/gi, ''),      
      /*img : */img[i].replace('<img src="', '').replace('" alt="">', ''),
      /*tlurl : */tlUrl[i].replace(/電影介紹([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"btn_s_vedio/gi, ''),
      /*expec : */expec[i].replace(/<div class=\"level_name\">([\s\S]*?)<span>/gi, '').replace(/<\/span>([\s\S]*?)網友想看/gi, ''),  
      /*date : */date[i].replace('<div class="release_movie_time">', '').replace('</div>', '')
    ]
  }

  range.setValues(arrangeObj);  
}

/// -------------------- pushCominSoon -------------------- ///

function pushCominSoon(SpreadSheet, arrangeObj) {
  var range = SpreadSheet.getRange('CominSoonMovie!A2:F11');
  
  var arrangeObj = [];
  var html = UrlFetchApp.fetch('https://movies.yahoo.com.tw/movie_comingsoon.html').getContentText();
  
  // ---  result html --- //
  var htmlExp = /<ul class=\"release_list\">([\s\S]*?)<\/ul>/gi;
  var result = html.match(htmlExp);
  
  // --- img --- //
  var photoExp = /<img src=\"([\s\S]*?)\"([\s\S]*?)alt=\"\">/gi;
  var img = result[0].match(photoExp);
  
  // --- url & title --- //
  var urlTitleExp = /<div class=\"release_movie_name\">([\s\S]*?)<\/a>/gi;  
  var urlTile = result[0].match(urlTitleExp);
  
  // --- release date --- //
  var dateExp = /<div class=\"release_movie_time\">([\s\S]*?)<\/div>/gi;
  var date = result[0].match(dateExp);
  
  // --- trailer --- //
  var tlUrlExp = /電影介紹<\/a>([\s\S]*?)<a href=\"([\s\S]*?)class=\"btn_s_vedio/gi;
  var tlUrl = result[0].match(tlUrlExp);
  
  //--- Expectation --- //
  var expecExp = /<div class=\"level_name\">([\s\S]*?)網友想看/gi;
  var expec = result[0].match(expecExp);    
      
      
  for(var i in img) {
    arrangeObj[i] = [
      /*title : */urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)\">/gi, '').replace('</a>', '').trim(),
      /*url : */urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"gabtn\"([\s\S]*?)<\/a>/gi, ''),      
      /*img : */img[i].replace('<img src="', '').replace('" alt="">', ''),
      /*tlurl : */tlUrl[i].replace(/電影介紹([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"btn_s_vedio/gi, ''),
      /*expec : */expec[i].replace(/<div class=\"level_name\">([\s\S]*?)<span>/gi, '').replace(/<\/span>([\s\S]*?)網友想看/gi, ''),  
      /*date : */date[i].replace('<div class="release_movie_time">', '').replace('</div>', '')
    ]
  }
  
  range.setValues(arrangeObj);    
}