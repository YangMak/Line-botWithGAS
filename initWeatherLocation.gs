function initWeatherLocation(address, lat, lon, token) {
  var address = address? address : '112台灣台北市北投區知行路316巷22弄15號',
      lat = lat? lat : '25.121812156861246',
      lon = lon? lon : '121.46874602884054',
      status = token? 'ReplyMode' : 'PushMode';
   

  var response = UrlFetchApp.fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=0a40a77d91018a9eebd11c12c65c8ceb');
  var data = JSON.parse(response);
    
    var windDeg = data.wind.deg? data.wind.deg + '°': '無法偵測';
  
    var retMsg = [{
      type: "flex",
      altText: "Wealther in " + data.name,
      contents: {
        type: "bubble",         
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              align: "center", 
              weight: "bold",
              text: data.name
            },
            {
              type: "separator"
            }              
          ]
        },    
        hero: {
          type: "image",
          url: weatherImageUrl(data.weather[0].main, data.weather[0].icon),//url: 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
          size: "full",
          aspectMode: 'cover',
          aspectRatio: "1.91:1",
          backgroundColor: "#c0c0c0"
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
              text: '溫度: ' + data.main.temp + '°C | 濕度: ' + data.main.humidity + '%'
            },
            {
              type: "separator"
            },
            {
              type: "text",
              size: "xs",
              color: "#636363",
              text: '最低溫: ' + data.main.temp_min + '°C | 最高溫: ' + data.main.temp_max + '°C'
            },
            {
              type: "separator"
            },             
            {
              type: "text",
              size: "xs",
              color: "#636363",
              text: '天氣: ' + data.weather[0].main + ' - ' + data.weather[0].description
            },
            {
              type: "separator"
            },           
            {
              type: "text",
              size: "xs",
              color: "#636363",
              text: '雲量: ' + data.clouds.all + '% | 大氣壓力: ' + data.main.pressure + ' 百帕'
            },
            {
              type: "separator"
            },
            {
              type: "text",
              size: "xs",
              color: "#636363",
              text: '風角度: ' + windDeg + ' | 風速: ' + data.wind.speed + ' 公尺/秒'
            },
            {
              type: "separator"
            }            
          ]
        },    
        footer: {
          type: "box",
          layout: "vertical",
          contents: [{
            type: "button",
            height: "sm",
            style: "primary",
            color: "#132C7B",
              action: {
                type: 'postback',
                label: '地址',
                data: '[文字]' + address + '\n--------------------------' + '\n經度: ' + lon + '\n緯度: ' + lat
              }
          }]
        }
      }
    }]  
  
    if(status == 'PushMode') {
      initPush(retMsg);
    }else {
      return retMsg;
    }
}

function weatherImageUrl(weather, iconId) {
  var imgUrl;
  
  switch(weather) {
    case 'Clear':
      if(iconId == '01d') {
        imgUrl = 'https://i.imgur.com/xIFcwSd.jpg';  //sun
      }else{
        imgUrl = 'https://i.imgur.com/hnEREDK.jpg';  //moon
      }
      break;
      
    case 'Clouds':
      if(iconId == '02d') {
        imgUrl = 'https://i.imgur.com/o3GSrcO.jpg';  //sunCloud
      }
      else if(iconId == '02n') {
        imgUrl = 'https://i.imgur.com/ALIFKWr.jpg';  //moonCloud
      }
      else if(iconId == '03d' || iconId == '03n') {
        imgUrl = 'https://i.imgur.com/HgYtzsn.jpg';  //cloud
      }
      else if(iconId == '04d') {
        imgUrl = 'https://i.imgur.com/SrU4RHm.jpg';  //maxCloudSun
      }
      else if(iconId == '04n') {
        imgUrl = 'https://i.imgur.com/8ao6imG.jpg';  //maxCloudMoon
      }
      break;
    
    case 'Drizzle':
      imgUrl = 'https://i.imgur.com/IKQom7g.jpg'; //drizzle
      break;
      
    case 'Rain':
      imgUrl = 'https://i.imgur.com/5o0J2yT.jpg';  //rain
      break;
      
    case 'Thunderstorm':
      imgUrl = 'https://i.imgur.com/4L7iE6K.jpg';  //thunderstorm
      break;
      
    case 'Snow':
      imgUrl = 'https://i.imgur.com/hoiSFdY.jpg';  //snow
      break;
      
    case 'Atmosphere':
      imgUrl = 'https://i.imgur.com/DXhKAbx.jpg';  //mist
      break;
  }
  
return imgUrl;  
}
