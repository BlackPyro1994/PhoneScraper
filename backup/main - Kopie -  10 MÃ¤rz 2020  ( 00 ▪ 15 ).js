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

    count=0

    $('a').each((index, element) => {

            var row = new Array();

            Object.keys(element).map(function(key) {

                // console.log(key);
                // console.log(typeof element[key]);
                // console.log(key, " _ " ,element[key]);

                if(key.match(/^(children|next)$/))
                {
                    if(element[key] != null) {
                        if (element[key].length != 0) {
                            row.push(element[key]);
                        }
                    }
                }

            });

            p_elements.push(row);

            if(count==3)
            {
                // return false
            }

            count++
    });

    for (i = 0; i <= p_elements.length ; i++)
    {
        //console.log(p_elements[i]);

        Object.keys(p_elements[i]).map(function(key) {
            // console.log("(",i,")");
            // console.log(String(p_elements[i][key][0]["data"]).trim());

            console.log("\n" , key , "  ########################");

            if(p_elements[i][key][0])
            {
                console.log(p_elements[i][key][0]["data"]);
            }

        });

        console.log("______________________________________________________________");
    }



});



