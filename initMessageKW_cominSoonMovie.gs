function initMessageKW_cominSoonMovie() {
  var movieList = [];
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
  // var expecExp = /<div class=\"level_name\">([\s\S]*?)網友想看/gi;
  // var expec = result[0].match(expecExp);    
      
      
  for(var i in img) {
    arrangeObj[i] = {
      img : img[i].replace('<img src="', '').replace('" alt="">', ''),
      url : urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"gabtn\"([\s\S]*?)<\/a>/gi, ''),
      title : urlTile[i].replace(/<div class=\"release_movie_name\">([\s\S]*?)\">/gi, '').replace('</a>', '').trim(),
      date : date[i].replace('<div class="release_movie_time">', '').replace('</div>', ''),
      tlurl : tlUrl[i].replace(/電影介紹([\s\S]*?)<a href=\"/gi, '').replace(/\"([\s\S]*?)class=\"btn_s_vedio/gi, '')
      //,expec : expec[i].replace(/<div class=\"level_name\">([\s\S]*?)<span>/gi, '').replace(/<\/span>([\s\S]*?)網友想看/gi, '')      
    }
  }
  

  for(var i in arrangeObj) {
    var item = arrangeObj[i];
    movieList[i] = {
      thumbnailImageUrl: item.img,
      imageBackgroundColor: '#000000',
      title: maxTitleLength(item.title),
      text : item.date,
      actions: [{
        type: 'uri',
        label: '電影介紹',
        uri: item.url
      },{
        type: 'uri',
        label: '預告片',
        uri: item.tlurl
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
