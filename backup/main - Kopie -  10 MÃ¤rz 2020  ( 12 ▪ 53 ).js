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

                        if (String(item[key]).search(/(telefon|phone)/i) != -1)
                            console.log(String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/)[0])
                    }
                }
            });
        });

        if (!empty) {
            console.log("----------------------------------------------------------------");
        }

    });

});



