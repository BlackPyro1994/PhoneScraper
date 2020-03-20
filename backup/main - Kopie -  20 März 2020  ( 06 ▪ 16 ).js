const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

//██████████████████████████████████████████████████████████████████████████████████████████████████

// const url = process.argv.slice(2)[0];
// const url = 'https://www.google.com';
// const url = "https://parabola.io/";
// const url = 'https://pretty-print-json.js.org/';
// const url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';
// const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = 'https://www.vathos-robotics.de/';
// const url = 'https://helioworks.com/contact-us/';
// const url = 'http://techking.com/#';
// const url = 'https://mytelco.de/impressum/';
const url = 'https://www.nikon.de/de_DE/footers/contact_us.page';

//██████████████████████████████████████████████████████████████████████████████████████████████████

scrape = function (error, response, html) {
   
   // html = iconv.decode(new Buffer.from(html), "win1251");
   const $ = cheerio.load(html);
   
   elements = [];
   phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   $('p').each((index, element) => {
      
      element.children.forEach((item) => {
         
         search = "telefon|phone|tel：|tel:|tel";
         regex = new RegExp('(?<=' + search + ')([.|:| ]|[-|–]?)+(\\d|\\s|[-|–|\\/+]+)+', 'ig');
         found = String(item.data).match(regex);
         
         // (telefon|phone|tel：|tel:|tel)( |:|\d|[–|-]?)+
         
         if (found != null) {
   
            console.log("Original : ",item.data);
            console.log("Found : ",found);
            
            found2 = String(found).match(/[\d](\d|\s|[-|–|\/+]+)+/g);
            // found2 = String(found).match(/[\d]+/g);
            
            console.log("Found 2 : ",found2);
            
            console.log("--------------------------------");
            
            if (!phones.includes(item.data)) {
               // phones.push(item.data);
               // phones.push(found);
               // phones.push("----------------------------");
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