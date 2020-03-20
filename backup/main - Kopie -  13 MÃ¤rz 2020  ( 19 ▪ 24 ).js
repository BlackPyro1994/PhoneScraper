const request = require('request');
const cheerio = require("cheerio");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//██████████████████████████████████████████████████████████

// url = process.argv.slice(2)[0];

// const url = "https://parabola.io/";
// const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = 'https://www.vathos-robotics.de/';
const url = 'https://helioworks.com/contact-us/';
// const url = 'https://pretty-print-json.js.org/';

const options= { resources: 'usable', runScripts: 'dangerously' };

console.log(url);

/*
JSDOM.fromURL(url, options).then(dom => {
    console.log(dom.serialize());
});
*/

/*
const loadWebPage = (done) => {

    const handleWebPage = (dom) => {

        const waitForScripts = () => {
            window = dom.window;
            $ = dom.window.jQuery;

            console.log(dom);

            done();
        };
        dom.window.onload = waitForScripts;
    };

    const options = { resources: 'usable', runScripts: 'dangerously' };
    JSDOM.fromURL(url, options).then(handleWebPage);
};
*/

//██████████████████████████████████████████████████████████

request(url, function (error, response, html) {

    console.log(html);

    const $ = cheerio.load(html);

    // console.log(html);

    var elements = [];
    var empty;

    return false;

//██████████████████████████████████████████████████████████


    $('div').each((index, element) => {

        console.log(element);

        element.children.forEach((item) => {

            empty = true;

            Object.keys(item).map(function (key) {

                if (!Array("type", "name", "namespace", "attribs", "x-attribsNamespace",
                    "x-attribsPrefix", "children", "parent", "next", "prev").includes(key)) {

                    if (item[key].length > 1) {

                        if (String(item[key]).search(/(telefon|phone)/i) != -1)
                        {
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


//██████████████████████████████████████████████████████████


    /*$('a').each((index, element) => {

        // console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*!/);

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
    });*/


//██████████████████████████████████████████████████████████


    /*$('span').each((index, element) => {

        console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*!/);

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
    });*/

//██████████████████████████████████████████████████████████


    /*$('strong').each((index, element) => {

        // console.log(element);

        element.children.forEach((item) => {

            empty = true;

            if(String(item.parent.attribs.href).includes("tel:"))
            {
                var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*!/);

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
    });*/

});