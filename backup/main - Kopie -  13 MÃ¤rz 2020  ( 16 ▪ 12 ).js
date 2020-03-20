// var fs = require('fs');

var request = require('request');
const cheerio = require("cheerio");

// const { fetch } = require("./scrapers/index.js");

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// var url = process.argv.slice(2)[0];

// const url = "https://parabola.io/";
// const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = 'https://www.vathos-robotics.de/';
url = https://helioworks.com/contact-us/


/*

fetch(
    url,
    error => {
        console.log(error);
    },
    html => {

        const $ = cheerio.load(html);
        const title = $("title").text();
        console.log(title);

        // console.log(html);

        scrape(html);
    }
);

*/

/////////////////////////////////////////////////////////////

request(url, function (error, response, html) {

    // const dom = new JSDOM(html, { runScripts: "dangerously" });
    // const dom = new JSDOM(html);

    try {
        // adddlert("Welcome guest!");
        // scrape(dom.serialize());
    }
    catch(e) {}

    scrape(html);

});

function scrape(html)
{
    // console.log(html);
    // return false;

    const $ = cheerio.load(html);

    var elements = [];
    var empty;

    //////////////////////////////////////////////////////////////////////////////

    $('p').each((index, element) => {

        element.children.forEach((item) => {

            empty = true;

            Object.keys(item).map(function (key) {

                if (!Array("type", "name", "namespace", "attribs", "x-attribsNamespace",
                    "x-attribsPrefix", "children", "parent", "next", "prev").includes(key)) {

                    if (item[key].length > 1) {

                        if (String(item[key]).search(/(telefon|phone)/i) != -1)
                        {
                            // var found = String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);
                            var found = String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*/);
                        }

                        if (found != null)
                        {
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

    //////////////////////////////////////////////////////////////////////////////

    $('a').each((index, element) => {

        // console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

                if (found != null)
                {
                    empty = false;
                    console.log(found[0]);
                }
            }

            if (!empty) {
                console.log("----------------------------------------------------------------");
            }

        });
    });

    //////////////////////////////////////////////////////////////////////////////

    $('span').each((index, element) => {

        console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

                if (found != null)
                {
                    empty = false;
                    console.log(found[0]);
                }
            }

            if (!empty) {
                console.log("----------------------------------------------------------------");
            }

        });
    });

    //////////////////////////////////////////////////////////////////////////////

    $('strong').each((index, element) => {

        // console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

                if (found != null)
                {
                    empty = false;
                    console.log(found[0]);
                }
            }

            if (!empty) {
                console.log("----------------------------------------------------------------");
            }

        });
    });
}