function initReplyPostback(token, e) {
    //console.log('initReplyPostback')
    var pb = e.postback;
    var data = pb.data;
    var params = pb.params.datetime;
    var postMsg = '已記錄提醒事項:' + '\n時間: ' + params + '\n--------------------------\n' + data; 

    initPush(postMsg);
    return;
}