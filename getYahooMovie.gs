function getYahooMovie() {
  var SpreadSheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/112M5G2Bak6wqhMnkACw1PnkiF0lXtQ4vYla_heKTeZ0/edit#gid=0');
  var arrangeObj = [];
  var BasicList = [
    {
      sheetRange: 'NewWeekMovie!A2:F11',
      FetchUrl: 'https://movies.yahoo.com.tw/movie_thisweek.html'
    },
    {
      sheetRange: 'CominSoonMovie!A2:F11',
      FetchUrl: 'https://movies.yahoo.com.tw/movie_comingsoon.html'
    },
    {
      sheetRange: 'InTheaters!A2:F11',
      FetchUrl: 'https://movies.yahoo.com.tw/movie_intheaters.html'
    }
  ]
  
  //-------------------- function push3UnitMovieInfo -------------------- //
  for(var i in BasicList){
    push3UnitMovieInfo(SpreadSheet, arrangeObj, BasicList[i].sheetRange, BasicList[i].FetchUrl);
  }
  
  // -------------------- function getChartList -------------------- //
  var charList_sheetRange = 'ChartList!A2:B11';
  var chartList_FetchUrl = 'https://movies.yahoo.com.tw/';
  getChartList(SpreadSheet, arrangeObj, charList_sheetRange, chartList_FetchUrl);

  // -------------------- function pushChartMovieInfo -------------------- //
  var charMovieInfo_sheetRange = 'ChartTaipei!A2:H11';
  pushChartMovieInfo(SpreadSheet, arrangeObj, charList_sheetRange, charMovieInfo_sheetRange);

  
  var retMsg = [{
    type: 'text',
    text: '電影資訊已更新完畢!'
  }]  

  return retMsg;  
}


/// -------------------- GET and PUSH BasicList Movie Information -------------------- ///

function push3UnitMovieInfo(SpreadSheet, arrangeObj, sheetRange, FetchUrl) {
  var range = SpreadSheet.getRange(sheetRange);
  
  var html = UrlFetchApp.fetch(FetchUrl).getContentText();
  
  // ---  result html --- //
  var htmlExp = /<ul class=\"release_list\">([\s\S]*?)<\/ul>/gi;
  var result = html.match(htmlExp);
  
  // --- img --- //
  var photoExp = /<img src=\"([\s\S]*?)\"([\s\S]*?)alt=\"\">/gi;
  var img = result[0].match(photoExp);
  
  // --- url & title --- //
  var urlTitleExp = /<div class=\"release_movie_name\">([\s\S]*?)<\/a>/gi;  
  var urlTitle = result[0].match(urlTitleExp);
  
  // --- release date --- //
  var dateExp = /<div class=\"release_movie_time\">([\s\S]*?)<\/div>/gi;
  var date = result[0].match(dateExp);
  
  // --- trailer --- //
  var tlUrlExp = /電影介紹<\/a>([\s\S]*?)class=\"btn_s_vedio/gi;
  var tlUrl = result[0].match(tlUrlExp);
  
  //--- Expectation --- //
  var expecExp = /<div class=\"level_name\">期待度([\s\S]*?)網友想看/gi;
  var expec = result[0].match(expecExp);     
      
      
  for(var i in img) {
    var replace_urlTitle = urlTitle[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"gabtn\"([\s\S]*?)<\/a>/gi, '')
    var replace_tlUrl = tlUrl[i].indexOf('href=') != -1? tlUrl[i].replace(/電影介紹([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"btn_s_vedio/gi, '') : replace_urlTitle;

    arrangeObj[i] = [
      /*title : */urlTitle[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)\">/gi, '').replace('</a>', '').trim(),
      /*url : */replace_urlTitle,      
      /*img : */img[i].replace('<img src="', '').replace('" alt="">', ''),
      /*tlurl : */replace_tlUrl,
      /*expec : */expec[i].replace(/<div class=\"level_name\">([\s\S]*?)<span>/gi, '').replace(/<\/span>([\s\S]*?)網友想看/gi, ''),  
      /*date : */date[i].replace('<div class="release_movie_time">', '').replace('</div>', '')
    ]
  }

  range.setValues(arrangeObj);  
}


/// -------------------- GET and PUSH chartList -------------------- ///

function getChartList(SpreadSheet, arrangeObj, sheetRange, FetchUrl) {
  var range = SpreadSheet.getRange(sheetRange);
  var html = UrlFetchApp.fetch(FetchUrl).getContentText();
  arrangeObj = [];
  
  // ---  result html --- //
  var htmlExp = /<div id=\"list1\"([\s\S]*?)<ul class="ranking_list_r">([\s\S]*?)<div class="rankin_time_r">/gi;
  var result = html.match(htmlExp);
  result = result[0].replace(/<div id=\"list1\"([\s\S]*?)<ul class="ranking_list_r">/gi, '').replace(/<\/ul>([\s\S]*?)<div class="rankin_time_r">/gi, '').trim();

  // --- url & title --- //
  var urlTitleExp = /<a href=\"([\s\S]*?)<\/a>/gi;  
  var urlTitle = result.match(urlTitleExp);
    Logger.log(urlTitle);

  for(var i in urlTitle){
    arrangeObj[i] = [
      /*title : */urlTitle[i].replace(/([\s\S]*?)<span>/gi, '').replace(/<\/span>([\s\S]*?)<\/a>/gi, '').replace('&#039;',  "'").trim(),
      /*url : */urlTitle[i].replace(/<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"gabtn\"([\s\S]*?)<\/a>/gi, '')
    ]
  }
  
  //Logger.log(arrangeObj);
  range.setValues(arrangeObj);
}


/// -------------------- GET and PUSH chartMovieInfo -------------------- ///

function pushChartMovieInfo(SpreadSheet, arrangeObj, chartListRange, chartTaipeiRange) {
  var range = SpreadSheet.getRange(chartListRange);
  var sheetObj = range.getValues();
  var arrChild;
  arrangeObj = [];

  for (var i in sheetObj) {
    var html = UrlFetchApp.fetch(sheetObj[i][1]).getContentText();

    // ---  result html --- //
    var htmlExp = /<div class=\"movie_intro_info _c\"([\s\S]*?)<div class=\"l_box have_arbox _c\">/gi;
    var result = html.match(htmlExp);

    // --- img --- //
    var photoExp = /<div class=\"movie_intro_foto\"([\s\S]*?)\"([\s\S]*?)alt=\"\">/gi;
    var ExpImg = result[0].match(photoExp);
    var img = ExpImg[0].replace(/<div class=\"movie_intro_foto\"([\s\S]*?)<img src=\"/gi, '').replace(/\"([\s\S]*?)alt=\"\">/gi, '');
    
    // --- trailer --- //
    var tlUrlExp = /<a class=\"btn_s_vedio\" href=\"([\s\S]*?)\">預告片<\/a>/gi;
    var ExpTlUrl = result[0].match(tlUrlExp);
    var tlUrl = ExpTlUrl[0].replace( /<a class=\"btn_s_vedio\" href=\"/gi, '').replace(/\">預告片<\/a>/gi, '')
    
    // --- movieTime --- //
    var movieTimeExp = /\">預告片<\/a>([\s\S]*?)<a href="([\s\S]*?)class=\"btn_s_time\">時刻表<\/a>/gi;
    var ExpmovieTime = result[0].match(movieTimeExp);
    if(ExpmovieTime){
      var movieTime = ExpmovieTime[0].replace( /\">預告片<\/a>([\s\S]*?)<a href="/gi, '').replace(/\"([\s\S]*?)class=\"btn_s_time\">時刻表<\/a>/gi, '');
    }else{
      var movieTime = sheetObj[i][1];
    }
    //--- Expectation --- //
    var expecExp = /<div class=\"circlenum\"([\s\S]*?)<div class=\"num\">([\s\S]*?)<\/span>/gi;
    var Expexpec = result[0].match(expecExp);
    var expec = Expexpec[0].replace(/<div class=\"circlenum\"([\s\S]*?)<div class=\"num\"><span>/gi, '').replace(/<\/span>/gi, '');
    
    //--- score --- //
    var scoreExp = /<div class="score_num count" data-num=([\s\S]*?)>([\s\S]*?)<\/div>/gi;
    var Expscore = result[0].match(scoreExp);
    var score = Expscore[0].replace(/<div class="score_num count" data-num=([\s\S]*?)>/gi, '').replace(/<\/div>/gi, '');
    
    // --- release date --- //
    var dateExp = /<span>上映日期：([\s\S]*?)<\/span>/gi;
    var ExpDate = result[0].match(dateExp);
    var date = ExpDate[0].replace(/<span>上映日期：/gi, '').replace(/<\/span>/gi, '');
    
    arrChild = [sheetObj[i][0], sheetObj[i][1], img, tlUrl, movieTime, expec, score, date];
    arrangeObj.push(arrChild);
  }
  
  range = SpreadSheet.getRange(chartTaipeiRange);
  range.setValues(arrangeObj);  
}