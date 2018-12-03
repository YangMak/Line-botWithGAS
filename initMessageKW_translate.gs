function initMessageKW_translate(msgText) {
  var transController = msgText.split(' ')[1];
  var sl, tl;
  var originText = msgText.split(' ').slice(2).join(' ');
  var transText;
  
  var langList = {
    土耳其文: 'tr', 中文: 'zh-TW', 丹麥文: 'da', 巴斯克文: 'eu', 日文: 'ja', 毛利文: 'mi', 爪哇文: 'jw', 世界語: 'eo', 加里西亞文: 'gl', 加泰羅尼亞文: 'ca', 卡納達文: 'kn', 尼泊爾文: 'ne',
    希爾文: 'af', 弗利然文: 'fy', 白俄羅斯文: 'be', 立陶宛文: 'lt', 伊博文: 'ig', 冰島文: 'is', 匈牙利文: 'hu', 印尼文: 'id', 印尼巽他文: 'su', 印度文: 'hi', 印度古哈拉地文: 'gu', 吉爾吉斯文: 'ky',
    西班牙文: 'es', 克羅埃西亞文: 'hr', 希伯來文: 'iw', 希臘文: 'el', 亞美尼西亞: 'hy', 亞塞拜然文: 'az', 奇切瓦文: 'ny', 孟加拉文: 'bn', 帕施圖文: 'ps', 拉丁文: 'la', 拉脫維亞文: 'lv', 法文: 'fr',
    波士尼亞文: 'bs', 波斯文: 'fa', 波蘭文: 'pl', 芬蘭文: 'fi', 阿姆哈拉文: 'am', 阿拉伯文: 'ar', 阿爾巴尼亞文: 'sq', 俄文: 'ru', 保加利亞文: 'bg', 信德文: 'sd', 南非柯薩文: 'xh', 南非祖魯文: 'zu',
    哈薩克文: 'kk', 威爾斯文: 'cy', 科西嘉文: 'co', 苗文: 'hmn', 英文: 'en', 夏威夷文: 'haw', 庫德文: 'ku', 挪威文: 'no', 旁遮普文: 'pa', 泰文: 'th', 泰米爾文: 'ta', 泰盧固文: 'te',
    海地克里奧文: 'ht', 烏克蘭文: 'uk', 烏茲別克文: 'uz', 烏爾都文: 'ur', 索馬里文: 'so', 馬耳他文: 'mt', 馬來文: 'ms', 馬其頓文: 'mk', 馬拉加斯文: 'mg', 馬拉地文: 'mr', 馬拉雅拉姆文: 'ml', 高棉文: 'km',
    宿霧文: 'ceb', 捷克文: 'cs', 紹納文: 'sn', 荷蘭文: 'nl', 喬治亞文: 'ka', 斯瓦希里文: 'sw', 斯洛伐克文: 'sk', 斯洛維尼亞文: 'sl', 非律賓文: 'tl', 越南文: 'vi', 塔吉克文: 'tg', 塞爾維亞文: 'sr', 意第緒文: 'yi',
    愛沙尼亞文: 'et', 艾爾蘭文: 'ga', 瑞典文: 'sv', 瑟索托文: 'st', 義大利文: 'it', 葡萄牙文: 'pt', 蒙古文: 'mn', 豪沙文: 'ha', 寮文: 'lo', 德文: 'de', 緬甸文: 'my', 盧森堡文: 'lb',
    錫蘭文: 'si', 優魯巴文: 'yo', 韓文: 'ko', 薩摩亞文: 'sm', 羅馬尼亞文: 'ro', 蘇格蘭的蓋爾文: 'gd'
  }
  
  var tcArray = transController.split('轉');
  if(tcArray.length == 1) { 
    sl = ''; 
    tl = langList[tcArray[0]];
  }else {
    sl = langList[tcArray[0]];
    tl = langList[tcArray[1]];
  }
  
  transText = LanguageApp.translate(originText, sl, tl);
  Logger.log(transText);
  var retMsg = [{
    'type': 'text',
    'text': '翻譯: ' + originText + '\n--------------------------\n' + transController
  },
  {
    'type': 'text',
    'text': transText
  }];
  
  return retMsg;
}
