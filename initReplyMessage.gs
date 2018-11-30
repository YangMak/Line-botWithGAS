// var e = JSON.parse(e.postData.contents).events[0];
function initReplyMessage(token, e) {
    //console.log('initReplyMessage');
    var msg = e.message;
    var msgType = msg.type;
    var retMsg;

    switch (msgType) {
        case 'text':
            //console.log(msg.text.split(' ').length);
            if (msg.text.indexOf('提醒') == 0 && msg.text.split(' ').length > 1) {
                var note = msg.text.split(' ');
                //console.log('pre - initReplyMessageKW');
                retMsg = initReplyMessageKW(note);
            } else {
                retMsg = [{
                    'type': msgType,
                    'text': '你剛剛說的是: ' + msg.text
                }];
            }
            break;

        case 'image':
            retMsg = [{
                    'type': 'text',
                    'text': '你剛剛傳的是圖片喔!'
                },
                {
                    'type': 'text',
                    'text': '好看!'
                }
            ];
            break;

        case 'sticker':
            retMsg = [{
                'type': msgType,
                'packageId': msg.packageId,
                'stickerId': msg.stickerId
            }];
            break;

        case 'location':
            retMsg = [{
                    'type': 'text',
                    'text': '位置 + 經緯度'
                },
                {
                    'type': 'text',
                    'text': msg.address
                },
                {
                    'type': 'text',
                    'text': msg.latitude + ' | ' + msg.longitude
                }
            ];
            break;

        default:
            retMsg = [{
                'type': 'text',
                'text': '未知的訊息格式!'
            }];
            break;
    }
    //console.log('retMsg');
    return retMsg;
}