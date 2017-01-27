var http = require("http")
var fs = require("fs")
var cheerio = require("cheerio")
var iconv = require("iconv-lite")
var request = require('sync-request')
var urlList = JSON.parse(fs.readFileSync('list.json', 'utf8'))

function getContent(chapter) {
    var res = request('GET',chapter.link)
    var html = iconv.decode(res.body, 'gb2312')
    var $ = cheerio.load(html, {
        decodeEntities: false
    })
    var content = ($("div#nr1").text()).replace(/\&nbsp;/g, '')
    if (fs.existsSync('bookName.md')) {
                fs.appendFileSync('bookName.md', '### ' + chapter.title)
                fs.appendFileSync('bookName.md', content)
            } else {
                fs.writeFileSync('bookName.md', '### ' + chapter.title)
                fs.appendFileSync('bookName.md', content)
            }
}

for (var i = 0; i < urlList.length; i++) {
    getContent(urlList[i])
    if (i % 10 == 0 && i != 0) {
        console.log("前" + i + "章已经写入完毕")
    }
}

console.log("全部写入完毕");