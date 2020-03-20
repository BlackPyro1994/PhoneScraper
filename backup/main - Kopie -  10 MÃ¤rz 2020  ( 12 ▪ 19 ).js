var fs = require('fs'), request = require('request'), cheerio = require('cheerio');
var url = process.argv.slice(2)[0];
request(url, function (error, response, html) {
    const $ = cheerio.load(html);
    var elements = [];
    var empty;
    $('p').each((index, element) => {
        element.children.forEach((item) => {
            empty = true;
            Object.keys(item).map(function (key) {
                if (!Array("type", "name", "namespace", "attribs", "x-attribsNamespace",
                    "x-attribsPrefix", "children", "parent", "next", "prev").includes(key)) {
                    if (item[key].length > 1) {
                        empty = !empty;
                        console.log(key, "____", String(item[key]).trim())
                    }
                }
            });
        });
        if (!empty)
        {
            console.log("----------------------------------------------------------------");
        }
    });

});



