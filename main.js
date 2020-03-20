const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

// const url = process.argv.slice(2)[0];

// const url = "https://www.sipgate.de/impressum";
// const url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';
// const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = 'https://www.vathos-robotics.de/';
// const url = 'https://helioworks.com/contact-us/';
// const url = 'http://techking.com/#';
// const url = 'https://mytelco.de/impressum/';
// const url = 'https://www.nikon.de/de_DE/footers/contact_us.page';
// const url = "https://www.kontor.com/";
// const url = "https://www.thomann.de/de/index.html?gclid=Cj0KCQjw09HzBRDrARIsAG60GP-0GpdydvL5IcyWhMuHWttjfZ0zkmcu0-sKjRHQTg5d8ECefLq4ukYaAnJbEALw_wcB";
// const url = "https://gitlab.com/sipgate/hacking-talents/homework/homework-alexander";
// const url = "https://www.telekom.com/de/telekom/impressum-1812";
// const url = "https://www.telekom.com/de/kontakt";
// const url = "https://excellence.ag/";
const url = "https://capricorngroup.net/capricorn/karriere/";


scrape = function (error, response, html) {
   
   // html = iconv.decode(new Buffer.from(html), "win1251");
   
   const $ = cheerio.load(html);
   
   console.log(html);
   
   elements = [];
   phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   $('p').each((index, element) => {
      
      element.children.forEach((item) => {
         
         // console.log(item);
         console.log(item.data);
         
         found = null;
         
         // NIKON // TELEKOM-IMPRESSUM
         // found = String(item.data).match(/(?<=telefon|phone|tel：|tel:|tel.)(:)(\d|\s|[–|-|-|\/]?)+/ig);
         
         // TECHKING // TELEKOM-KONTAKT
         // found = String(item.data).match(/(?<=telefon|phone|tel|tel：|tel:|tel.)(\d|\s|[–|-|-|\/]?)+/ig);
         
         // HELIOWORKS // TELEKOM-IMPRESSUM
         // found = String(item.data).match(/(?<=telefon|phone|tel：|tel:|tel.)(:)(\(|\)|\d|\s|[–|-|-|\/]?)+/ig);
         
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

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const options =

JSDOM.fromURL(url, {resources: 'usable', runScripts: 'dangerously'}).then(dom => {
   html = dom.serialize();
   scrape(null, null, html);
});

// request({method: "GET", uri: url, gzip: false}, scrape);
// request({method: "GET",uri: url,gzip: true}, scrape);