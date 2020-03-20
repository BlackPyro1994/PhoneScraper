var fs = require('fs'), request = require('request'), cheerio = require('cheerio');

var url = process.argv.slice(2)[0];

url = "https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw"

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

                        if (String(item[key]).search(/(telefon|phone)/i) != -1)

                            var found = String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

                        if (found != null) {
                            empty = false;
                            console.log(found[0]);
                        }
                    }
                }
            });
        });

        if (!empty) {
            console.log("----------------------------------------------------------------");
        }

    });


    console.log("\n###########################################\n");


    $('a').each((index, element) => {

        element.children.forEach((item) => {

            console.log(item.parent.attribs.href);

            empty = true;

            if (item.data != undefined) {

                var found = String(item.data).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

                if (found != null) {
                    empty = false;

                    if(String(item.parent.attribs.href).includes("tel"))
                    {
                        console.log(found[0]);
                    }
                }

            }

            if (!empty) {
                console.log("----------------------------------------------------------------");
            }

        });

    });
});