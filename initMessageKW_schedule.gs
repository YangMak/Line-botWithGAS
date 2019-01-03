function initMessageKW_schedule(msgText, kw) {
    //console.log('initMessageKW_schedule');
    var note = msgText.replace(/[!！]/g, '').replace(kw + ' ', '');
    
    var retMsg = [{
      type: "flex",
      altText: "Notification (choose date)",
      contents: {
        type: "bubble",
          styles: {
            hero: {
              backgroundColor: "#ffffff"
            }
          },          
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              weight: "bold",
              text: '預約提醒'
            },
            {
              type: "separator"
            }              
          ]
        },    
        hero: {
          type: "image",
          url: 'https://i.imgur.com/drp6cOG.jpg',
          size: "5xl",
          aspectMode: 'cover',
          backgroundColor: "#ffffff"
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
              text: note
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
            color: "#ff8400",
              action: {
                type: 'datetimepicker',
                label: '選個良辰吉時吧',
                data: '[提醒]' + note,
                mode: 'datetime'
              }
          }]
        }
      }
    }]  
    
  return retMsg;
}

