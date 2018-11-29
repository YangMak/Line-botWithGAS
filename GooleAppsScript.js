var CHANNEL_ACCESS_TOKEN = 'Your Channel access token';

// 抓取IP位置
function doGet(e) {
    return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

// 處理Line server傳進來訊息，再送出訊息到用戶端
function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    console.log(msg);
    var userEvent = msg.events[0]; //JSON.parse(e.postData.contents).events[0];
    var replyToken = msg.events[0].replyToken;

    if (typeof replyToken === 'undefined')
        return;

    var url = 'https://api.line.me/v2/bot/message/reply';

    var header = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    }

    var payload = {
        'replyToken': replyToken,
        'messages': ProcMsg(userEvent)
    }

    var options = {
        'headers': header,
        'method': 'post',
        'payload': JSON.stringify(payload)
    }

    UrlFetchApp.fetch(url, options);

    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

function ProcMsg(ev) {
    var eventType = ev.type;
    var retMsg;

    // 如果 使用者發送的 Events source == 'message' 
    if (eventType == 'message') {
        var type = ev.message.type;

        // switch 判斷 message 的 type
        switch (type) {
            case 'text':
                if (ev.message.text.indexOf('提醒') == 0 && ev.message.text.split(' ').length > 1) {
                    var note = ev.message.text.split(' ')
                    retMsg = {
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
                    };
                } else {
                    retMsg = {
                        'type': type,
                        'text': '你剛剛說的是: ' + ev.message.text
                    };
                }
                break;

            case 'image':
                retMsg = {
                    'type': 'text',
                    'text': '你剛剛傳的是圖片喔!'
                };
                break;

            case 'sticker':
                retMsg = {
                    'type': type,
                    'packageId': ev.message.packageId,
                    'stickerId': ev.message.stickerId
                };
                break;

            case 'location':
                retMsg = {
                    'type': 'text',
                    'text': ev.message.address + ' => 經緯度:( ' + ev.message.latitude + ' | ' + ev.message.longitude + ' )'
                };
                break;
        }
    }
    // 如果 使用者發送的 Events source == 'postback'   
    else if (eventType == 'postback') {
        retMsg = {
            'type': 'text',
            'text': '預約提醒: ' + ev.postback.data + ' 時間: ' + ev.postback.params.datetime
        };
    }

    // 返回 retMsg (message 內容)
    return [retMsg];
}