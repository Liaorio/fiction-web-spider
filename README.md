##利用Node.js进行网络小说的爬取

###实例网站毒物小说网http://qvduwu.cc/

###1. $ npm install包安裝
###2. $ node list.js获取小说列表于list.json文件
###3. 在获取的json文件中查找多余的"]["符号，替换成", "
###4. 获取了小说列表后，$node article.js 写入文章，得到bookName.md