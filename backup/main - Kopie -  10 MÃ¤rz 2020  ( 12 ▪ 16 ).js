var fs = require('fs'), request = require('request'), cheerio = require('cheerio');

var url = process.argv.slice(2)[0];

// console.log(Array("children","parent","next","prev").includes("prev"));
// throw new Error("Something went badly wrong!");

url = 'https://www.sipgateteam.de/impressum';

request(url, function (error, response, html) {

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

    $('p').each((index, element) => {
        // console.log(index," : ",$(element).text())
    });

    /*
    $('a').each((index, element) => {
        console.log(index,element)});
    */

    var elements = [];

    var empty;

    $('p').each((index, element) => {

        element.children.forEach((item) => {

            empty = true;

            Object.keys(item).map(function (key) {

                if (!Array("type","name","namespace","attribs","x-attribsNamespace",
                    "x-attribsPrefix","children","parent","next","prev").includes(key)) {

                    if(item[key].length >1)
                    {
                        empty = !empty;
                        console.log(key, "____", String(item[key]).trim())
                    }
                }

            });
        });

        if(!empty){
            console.log("----------------------------------------------------------------");
        }



        /*
        var row = new Array();

        Object.keys(element).map(function(key) {

            // console.log(typeof element[key]);
            // console.log(key, " _ " ,element[key]);
            // console.log(key);

            row.push(element[key]);

            if(key.match(/^(children)$/))
            {
            //     if(element[key] != null) {
            //         if (element[key].length != 0) {

                        // console.log(key,"___",typeof element[key], "___",element[key]);
                        // console.log("");

                        // row.push(element[key]);

                        // row.push(typeof element[key]);
                        // row.push(key);

            //             row.push(String(key + " ___ " + element[key].length + " ___ "),element[key]);
            //             row.push(String(key + " ___ " + element[key].length + " ___ "));
                    // }
                // }
            }

        });

        // elements.push(row);
        elements.push(element);

        */

        /////////////////////////////////////////

        /*

        if(element["children"][0])
        {
            // console.log(element["children"][0]["data"]);
        }

        if(element["next"][0])
        {
            console.log(element["next"][0]);
        }

        */

    });

    ////////////////////////////////////////////////////////////////////////////

    for (i = 0; i <= elements.length - 1; i++) {
        // console.log(elements);

        /*
        if(elements[i] != undefined)
        {
            if(elements[i][0] != undefined)
            {
                if(elements[i][0][0] != undefined) {

                    console.log(String(elements[i][0][0].data).trim());
                }
            }
        }

        */

        /*
        Object.keys(elements[i]).map(function(key) {

            // console.log(String(elements[i][key][0]["data"]).trim());

            if(elements[i][key][0])
            {
                // console.log(String(elements[i][key]).trim());
                console.log(elements[i][key]);
            }

        });

        */

        console.log("\n______________________________________________________________\n");
    }


});



