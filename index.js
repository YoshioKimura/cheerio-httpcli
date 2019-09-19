var fs = require('fs');
var client = require('cheerio-httpcli');

// ①ダウンロードマネージャーの設定(全ダウンロードイベントがここで処理される)


client.download
.on('ready', function (stream) {
    var rand = Math.floor(Math.random() * 10000)
    var index   = stream.url.href.lastIndexOf('_Tarot_');
    var temp = stream.url.href.slice(index + 1);

    console.log(temp);
    // stream.pipe(fs.createWriteStream('img/'+ temp ));  
    // console.log(stream.url.href + 'をダウンロードしました');
})
.on('error', function (err) {
    console.error(err.url + 'をダウンロードできませんでした: ' + err.message);
})
.on('end', function () {
    console.log('ダウンロードが完了しました');
});

// ④並列ダウンロード制限の設定
client.download.parallel = 4;

// ②スクレイピング開始
client.fetch('https://hogehoge.com', function (err, $, res, body) {
    $('img').download();
    console.log('OK!');
});