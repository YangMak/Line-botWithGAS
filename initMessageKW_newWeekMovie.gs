function initMessageKW_newWeekMovie() {
  var movieList = [];
  var arrangeObj;
  
  var url = 'https://docs.google.com/spreadsheets/d/112M5G2Bak6wqhMnkACw1PnkiF0lXtQ4vYla_heKTeZ0/edit#gid=0';
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  
  var range = SpreadSheet.getRange('NewWeekMovie!A2:F11');
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
      type: 'bubble',
      styles: {
        hero: {
          backgroundColor: "#000000"
        }
      },          
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            weight: "bold",
            text: item[0]
          },
          {
            type: "separator"
          }              
        ]
      },         
      hero: {
        type: "image",
        url: item[2],
        size: "5xl",
        backgroundColor: "#000000",
        action: {
          type: "uri",
          label: item[0],
          uri: item[2]
        }        
      },         
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [          
          {
            type: "text",
            size: "xs",
            color: "#636363",
            text: item[5]
          },
          {
            type: "text",
            size: "xs",
            color: "#636363",              
            text: "期待度：" + item[4] + " 網友想看"
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
            color: "#ff8400",
            action: {
              type: "uri",
              label: "電影介紹",
              uri: item[1]
            }
          },
          {
            type: "button",
            height: "sm",                
            style: "primary",
            color: "#ff8400",
            action: {
              type: "uri",
              label: "預告片",
              uri: item[3]
            }
          },               
        ]
      } 
    }
  };  
  
  var retMsg = [{
    type: 'flex',
    altText: 'Yahoo movie List (Released This Week)',
    contents: {
      type: "carousel",
      contents: movieList
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