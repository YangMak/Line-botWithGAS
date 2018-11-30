function initReplyMessageKW(note) {
    //console.log('initReplyMessageKW');
    var retMsg = [{
        'type': 'template',
        "altText": "this is a image carousel template",
        "template": {
            'type': "image_carousel",
            "columns": [{
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                    "type": "datetimepicker",
                    "label": "選日期",
                    "data": note[1],
                    "mode": "datetime"
                }
            }]
        }
    }];
    return retMsg;
}