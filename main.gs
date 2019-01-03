// 抓取IP位置
function doGet(e) {
    return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

// 處理Line server傳進來訊息，再送出訊息到用戶端
function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    console.log(msg);
    var param = e.parameter;
    // e => reply Event  
    if (JSON.stringify(param) == '{}') {
        initReply(e);
    } else {
        // e => push Event
        var postMsg = param.msg;
        initPush(postMsg, e);      
    }
    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}