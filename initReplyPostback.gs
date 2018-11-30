function initReplyPostback(token, e) {
    //console.log('initReplyPostback')
    var pb = e.postback;
    var data = pb.data;
    var params = pb.params.datetime;
    var postMsg = '預約事項: ' + data + ' 時間: ' + params;


    initPush(postMsg);
    return;
}