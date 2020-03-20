var fs = require('fs'), request = require('request'), cheerio = require('cheerio');

var url = process.argv.slice(2)[0];

url = 'https://www.sipgateteam.de/impressum';

request(url, function(error, response, html) {

    const $ = cheerio.load(html);

    /*
    $("a").each(function () {
        var href=$(this).prop('href');
        if (href.indexOf('?') > -1) {
            alert("Contains questionmark");
        }
    });

    */

    const phones = [];
    var attributes = {};

    counter = 0;

    $('p').each((index, element) => {
       // console.log(index," : ",$(element).text())
    });

    /*
    $('a').each((index, element) => {
        console.log(index,element)});

    console.log("\n\n\n");
    */

    var p_elements = [];

    $('p').each((index, element) => {

        /*
            var row = new Array();

            Object.keys(element).map(function(key) {

                // console.log(key);
                // console.log(typeof element[key]);
                // console.log(key, " _ " ,element[key]);

                // if(key.match(/^(children|next)$/))
                // {
                //     if(element[key] != null) {
                //         if (element[key].length != 0) {
                            row.push(element[key]);
                //             row.push(String(key + " ___ " + element[key].length + " ___ "),element[key]);
                //             row.push(String(key + " ___ " + element[key].length + " ___ "));
                        // }
                    // }
                // }

            });

            p_elements.push(row);

            */

            if(element["children"][0])
            {
                // console.log(element["children"][0]["data"]);
            }

            if(element["next"][0])
            {
                console.log(element["next"][0]);
            }

    });

    ////////////////////////////////////////////////////////////////////////////

    for (i = 0; i <= p_elements.length ; i++)
    {
        Object.keys(p_elements[i]).map(function(key) {

            // console.log(String(p_elements[i][key][0]["data"]).trim());

            if(p_elements[i][key][0])
            {
                // console.log(String(p_elements[i][key]).trim());
                console.log(p_elements[i][key]);
            }

        });

        console.log("______________________________________________________________");
    }



});



