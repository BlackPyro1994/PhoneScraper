const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

//██████████████████████████████████████████████████████████████████████████████████████████████████


// const url = process.argv.slice(2)[0];

// const url = 'https://www.google.com';
// const url = "https://parabola.io/";
// const url = 'https://pretty-print-json.js.org/';
// const url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';
const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = 'https://www.vathos-robotics.de/';
// const url = 'https://helioworks.com/contact-us/';
// const url = 'http://techking.com/#';


//██████████████████████████████████████████████████████████████████████████████████████████████████

scrape = function (error, response, html) {

   // html = iconv.decode(new Buffer.from(html), "win1251");

   const $ = cheerio.load(html);

   // console.log(html);
   // console.log("\n\n\n\n\n\n\n\n#################################################################################################################\n\n\n\n\n\n\n\n\n\n\n\n");

   elements = [];
   empty = "";

   regex_search = /(telefon|phone|tel：|tel:|tel :)/i;

   phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████

   if (html.includes("tel:")) {
      /// bla bla
   }

   // var found = String(html).trim().match(/Number([a-z]|\s|:)+(\d|\s)+/i);

   // var found = String(html).trim().match(/href:([a-z]|\\s|:)+(\\d|\\s)+/i);

   // console.log(String(html).trim());

   // var found = String(html).trim().match(/(href=.*)+/i);
   // var found = String(html).trim().match(/(href=).*/g);

   var found_list = String(html).trim().match(/(href=").*/g);

   // console.log("HTML Regex  ---------------------------------------------\n");

   if (found_list != null && found_list.length > 0) {

      found_list.forEach((item) => {

         found = item.match(/([a-z]|\s|:)+(\d|\s)+/);
         // found = found[0].match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

         if (found != null) {

            console.log(found[0]);
            console.log("--------------------------------------------------------------------------------------------");

            if (!phones.includes(found[0])) {
               phones.push(found[0]);
            }
         }
      });
   }

// if (String(item[key]).search(regex_search) != -1) {}

//██████████████████████████████████████████████████████████████████████████████████████████████████

   $('p').each((index, element) => {

      return false;

      element.children.forEach((item) => {

         Object.keys(item).map(function (key) {

            if (!Array("type", "name", "namespace", "attribs", "x-attribsNamespace",
              "x-attribsPrefix", "children", "parent", "next", "prev").includes(key)) {

               if (item[key].length > 1) {
                  // console.log(item);

                  if (String(item[key]).search(regex_search) != -1) {
                     var found = String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*/);
                  }

                  if (found != null) {

                     if (!phones.includes(found[0])) {
                        phones.push(found[0]);
                     }
                  }
               }
            }
         });
      });
   });

//██████████████████████████████████████████████████████████████████████████████████████████████████

   $('a').each((index, element) => {

      return false;

      console.log(element);

      element.children.forEach((item) => {

         // console.log(item);

         if (String(item.parent.attribs.href).includes("tel:")) {
            // var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

            var found = String(item.parent.attribs.href).trim().match(/Number([a-z]|\s|:)+(\d|\s)+/);

            if (found != null) {
               if (!phones.includes(found[0])) {
                  phones.push(found[0]);
               }
            }
         }
      });
   });

//██████████████████████████████████████████████████████████████████████████████████████████████████

   $('span').each((index, element) => {

      return false;

      // console.log(element);

      element.children.forEach((item) => {

         Object.keys(item).map(function (key) {

            if (!Array("type", "name", "namespace", "attribs", "x-attribsNamespace",
              "x-attribsPrefix", "children", "parent", "next", "prev").includes(key)) {

               if (item[key].length > 1) {
                  console.log(item.data);

                  if (String(item[key]).search(regex_search) != -1) {
                     var found = String(item[key]).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*/);
                  }

                  if (found != null) {

                     if (!phones.includes(found[0])) {
                        phones.push(found[0]);
                     }
                  }
               }
            }
         });

         /*if (String(item.parent.attribs.href).includes("tel:")) {
             var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*!/);

             if (found != null) {
                 if (!phones.includes(found[0])) {
                     phones.push(found[0]);
                 }
             }
         }*/

      });
   });

//██████████████████████████████████████████████████████████████████████████████████████████████████

   $('strong').each((index, element) => {

      return false;

      // console.log(element);

      element.children.forEach((item) => {

         if (String(item.parent.attribs.href).includes("tel:")) {
            var found = String(item.parent.attribs.href).trim().match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);

            if (found != null) {
               if (!phones.includes(found[0])) {
                  phones.push(found[0]);
               }
            }
         }

      });
   });

//██████████████████████████████████████████████████████████████████████████████████████████████████

   phones.forEach((item) => {
      console.log(item)
   });

};


// request({method: "GET",uri: url,gzip: true}, scrape);
request({method: "GET", uri: url, gzip: false}, scrape);

