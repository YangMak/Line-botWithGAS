function initMessageKW_schedule(msgText) {
    //console.log('initMessageKW_schedule');
    var note = msgText.split(' ')[1];
    var retMsg = [{
        'type': 'template',
        'altText': 'this is a buttons template',
        'template': {
            'type': 'buttons',
            'thumbnailImageUrl': 'https://i.imgur.com/drp6cOG.jpg',
            'imageSize': 'cover',
            'imageBackgroundColor': '#000000',
            'title': '預約提醒',
            'text': note,
            'actions': [{
              'type': 'datetimepicker',
              'label': '選個良辰吉時吧',
              'data': '[提醒]' + note,
              'mode': 'datetime'
            }]
        }
    }];
    return retMsg;  
}