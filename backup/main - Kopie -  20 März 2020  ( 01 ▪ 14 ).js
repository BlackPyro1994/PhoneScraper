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
const url = 'https://mytelco.de/impressum/';

//██████████████████████████████████████████████████████████████████████████████████████████████████

scrape = function (error, response, html) {
   // html = iconv.decode(new Buffer.from(html), "win1251");
   const $ = cheerio.load(html);
   
   elements = [];
   phones = [];
   
   regex_search = /(telefon|phone|tel：|href|tel:|tel :)/i;
   
   search = "telefon|phone|tel：|tel:|tel|entered";

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   // Number([a-z]|\s|:)+(\d|\s)+/i);
   // href:([a-z]|\\s|:)+(\\d|\\s)+/i);
   // (href=.*)+/i);
   
   // var found = String(html).trim().match(/(href=).*/g);

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   // var found_list = String(html).trim().match(/(href=").*/g);
   
   // var _regex = new RegExp('(' + search + ')(:| | :|: )(\\d| )+','ig');
   var _regex = new RegExp('(' + search + ')(:| | :|: ).*', 'ig');
   // var _regex = new RegExp('(' + search + '|:)+.*','ig');
   
   var found_list = String(html).trim().match(_regex);
   
   if (found_list != null && found_list.length > 0) {
      
      found_list.forEach((item) => {
         
         phones.push(item);
         
         return;
         
         found = item.match(/([a-z]|\s|:)+(\d|\s)+/);
         
         // found = item.match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);
         
         if (found != null) {
            
            // if (!phones.includes(found[0]))
            // {
            phones.push(found[0]);
            // }
         }
      });
   }

//██████████████████████████████████████████████████████████████████████████████████████████████████
   
   found_list = String(html).trim().match(/(href=").*/g);
   
   // if (found_list != null && found_list.length > 0) {
   if (false) {
      
      found_list.forEach((item) => {
         
         found = item.match(/([a-z]|\s|:)+(\d|\s)+/);
         
         // found = item.match(/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/);
         
         if (found != null) {
            
            // if (!phones.includes(found[0]))
            // {
            phones.push(found[0]);
            // }
         }
      });
   }

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
   
   phones.forEach((item) => {
      console.log(item)
   });
   
};

console.log();
request({method: "GET", uri: url, gzip: false}, scrape);
// request({method: "GET",uri: url,gzip: true}, scrape);

