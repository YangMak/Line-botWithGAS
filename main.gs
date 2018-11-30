// 抓取IP位置
function doGet(e) {
    return ContentService.createTextOutput(UrlFetchApp.fetch("http://ip-api.com/json"));
}

// 處理Line server傳進來訊息，再送出訊息到用戶端
function doPost(e) {
    //var json = e.postData.getDataAsString();
    //console.log(json);
    var param = e.parameter;
    // e => reply Event  
    if (JSON.stringify(param) == '{}') {
        initReply(e);
        //console.log('pre - initReply');
    } else {
        // e => push Event
        initPush(param);
        //console.log('pre - initPush');      
    }
    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}