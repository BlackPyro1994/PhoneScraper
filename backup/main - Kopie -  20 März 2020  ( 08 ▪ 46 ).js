const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

//██████████████████████████████████████████████████████████████████████████████████████████████████

//          const url = process.argv.slice(2)[0];

//          const url = 'https://www.google.com';
//          const url = "https://parabola.io/";
//          const url = 'https://pretty-print-json.js.org/';

//██████████████████████████████████████████████████████████████████████████████████████████████████

//    (✓)   const url = 'https://helioworks.com/contact-us/';
//    (✓)   const url = 'http://techking.com/#';
//    (✓)   const url = 'https://mytelco.de/impressum/';
//    (✓)   const url = 'https://www.nikon.de/de_DE/footers/contact_us.page';

//██████████████████████████████████████████████████████████████████████████████████████████████████
//    RAW TEXT IN BODY TEST !!!
//██████████████████████████████████████████████████████████████████████████████████████████████████

//    const url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';

//██████████████████████████████████████████████████████████████████████████████████████████████████
//    A-TAG HREF TEST !!!
//██████████████████████████████████████████████████████████████████████████████████████████████████

//    const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
//    const url = "https://www.kontor.com/";

//██████████████████████████████████████████████████████████████████████████████████████████████████
//    KONTAKT BLOCK ELEMENT TEST !!!
//██████████████████████████████████████████████████████████████████████████████████████████████████

//    const url = 'https://www.vathos-robotics.de/';

//██████████████████████████████████████████████████████████████████████████████████████████████████

   // const url = "https://www.sipgate.de/impressum";
   
//██████████████████████████████████████████████████████████████████████████████████████████████████

scrape = function (error, response, html) {
   
   // html = iconv.decode(new Buffer.from(html), "win1251");
   const $ = cheerio.load(html);
   
   elements = [];
   phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   $('p').each((index, element) => {
      
      element.children.forEach((item) => {
         
         console.log(item.data);
         
         // NIKON
         found = String(item.data).match(/(?<=telefon|phone|tel：|tel:|tel.)(:)(\d|\s|[–|-|-|\/]?)+/ig);
         
         // TECHKING
         found = String(item.data).match(/(?<=telefon|phone|tel|tel：|tel:|tel.)(\d|\s|[–|-|-|\/]?)+/ig);
         
         // HELIOWORKS
         found = String(item.data).match(/(?<=telefon|phone|tel：|tel:|tel.)(:)(\(|\)|\d|\s|[–|-|-|\/]?)+/ig);
         
         if (found != null) {
            
            found2 = String(found).match(/[\d](\d|\s|[-|–|\/+]+)+/g);
            
            if (found2 != null) {
               
               if (!phones.includes(found2)) {
                  phones.push("Original : " + item.data);
                  phones.push("Found : ", found);
                  phones.push("Found 2 : ", found2);
                  phones.push("----------------------------");
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

console.log();

request({method: "GET", uri: url, gzip: false}, scrape);
// request({method: "GET",uri: url,gzip: true}, scrape);