function initMessageKW_cominSoonMovie() {
  var movieList = [];
  var arrangeObj;
  
  var url = 'https://docs.google.com/spreadsheets/d/112M5G2Bak6wqhMnkACw1PnkiF0lXtQ4vYla_heKTeZ0/edit#gid=0';
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  
  var range = SpreadSheet.getRange('CominSoonMovie!A2:F11');
  var arrangeObj = range.getValues();

  /*
  0 -> title
  1 -> url
  2 -> img
  3 -> tlUrl
  4 -> expec
  5 -> date
  */  

  for(var i in arrangeObj) {
    var item = arrangeObj[i];
    movieList[i] = {
      thumbnailImageUrl: item[2],
      imageBackgroundColor: '#000000',
      title: maxTitleLength(item[0]),
      text : item[5] + '\n期待度 ： ' + item[4] + ' 網友想看',
      actions: [{
        type: 'uri',
        label: '電影介紹',
        uri: item[1]
      },{
        type: 'uri',
        label: '預告片',
        uri: item[3]
      }]
    }
  };  
  
//  Logger.log(movieList);
//  return;
  
  var retMsg = [{
    type: 'template',
    altText: 'Yahoo movie List (Released this week)',
    template: {
      type: 'carousel',
      columns: movieList,
      imageAspectRatio: "square",
      imageSize: "contain"      
    }
  }]  

  return retMsg;
}

// title 必須小於 40 characters!
function maxTitleLength(text) {
  if(text.length > 40) {
    text = text.substr(0, 37) + '...';
  }
  return text;  
}
