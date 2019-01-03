function initMessageKW_youtube(msgText) {
  //msgText = '!yt KUAIZERO';
  var search = msgText.split(' ').slice(1).join(' ');
  var videoList = [];
  
  var results = YouTube.Search.list('id,snippet', {q: search, maxResults: 10, type: 'video'});
  var resultList = results.items
  
  /*
  title -> maxTitleLength(item.snippet.title)
  img -> item.snippet.thumbnails.high.url
  text -> item.snippet.channelTitle
  url -> "https://youtu.be/" + item.id.videoId
  */
  
  for(var i in resultList) {
    var item = resultList[i];
    videoList[i] = {
      type: 'bubble',
      styles: {
        hero: {
          backgroundColor: "#000000"
        }
      },     
      hero: {
        type: "image",
        url: item.snippet.thumbnails.high.url,
        size: "full",
        aspectMode: 'cover',        
        aspectRatio: "1.91:1",
        backgroundColor: "#000000"
      },         
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [          
          {
            type: "text",
            weight: "bold",
            color: "#000000",  
            text: item.snippet.title
          },
          {
            type: "text",
            size: "xs",
            color: "#636363",              
            text: item.snippet.channelTitle
          },
          {
            type: "separator"
          }              
        ]
      },       
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [              
          {
            type: "button",
            height: "sm",                
            style: "primary",
            color: "#ff0000",
            action: {
              type: "uri",
              label: "前往Youtube觀看",
              uri: "https://youtu.be/" + item.id.videoId
            }
          }
        ]
      } 
    }
  };
 
  var retMsg = [{
    type: 'flex',
    altText: 'Youtube search List',
    contents: {
      type: "carousel",
      contents: videoList
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