var http = require("http")
var fs = require("fs")
var cheerio = require("cheerio")
var iconv = require("iconv-lite")
var host = 'http://qvduwu.cc/'
var url_part = 'http://qvduwu.cc/25/25225_'

var totalPage = 2;
var index = 0;

var timer = setInterval(change,1000);

function change() {
    if (index < totalPage) {
        var url = url_part + (index+1) + '/';
        http.get(url, function (res) { 
            var chunks = []
            res.on('data', function (chunk) {
                chunks.push(chunk)
            })
            res.on('end', function () {
                var html = iconv.decode(Buffer.concat(chunks), 'gb2312')
                var $ = cheerio.load(html, {
                    decodeEntities: false
                })
                var links = [];
                $('.chapter li').children('a').each(function (i, elem) {
                    var link = new Object()
                    link.title = $(this).text()
                    link.link = host + $(this).attr('href')
                    links.push(link)
                })
                fs.appendFile("list.json", JSON.stringify(links), function (err) {
                    if (!err) {
                        console.log("第" + index + "页列表爬取完成")
                    }
                })
            })
        })
        index++;
    } else {
        console.log('列表全部爬取完成')
        clearInterval(timer);
    }
}

