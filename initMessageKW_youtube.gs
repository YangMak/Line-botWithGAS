function initMessageKW_youtube(msgText) {
  //msgText = '!yt KUAIZERO';
  var search = msgText.split(' ').slice(1).join(' ');
  var videoList = [];
  
  var results = YouTube.Search.list('id,snippet', {q: search, maxResults: 10, type: 'video'});
  var resultList = results.items
  
  for(var i in resultList) {
    var item = resultList[i];
    videoList[i] = {
      //thumbnailImageUrl: 'https://i.ytimg.com/vi/'+ item.id.videoId +'/default.jpg',
      thumbnailImageUrl: item.snippet.thumbnails.high.url,
      imageBackgroundColor: '#000000',
      title: maxTitleLength(item.snippet.title),
      text : item.snippet.channelTitle,
      actions: [{
        type: 'uri',
        label: '前往Youtube觀看',
        uri: 'https://youtu.be/' + item.id.videoId
      }]
    }
  };
 
  var retMsg = [{
    type: 'template',
    altText: 'Youtube search List',
    template: {
      type: 'carousel',
      columns: videoList
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