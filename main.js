const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

// const url = process.argv.slice(2)[0];

// ###########################################################################################################################

//  (A)

// const url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
// const url = "https://www.thomann.de/de/index.html?gclid=Cj0KCQjw09HzBRDrARIsAG60GP-0GpdydvL5IcyWhMuHWttjfZ0zkmcu0-sKjRHQTg5d8ECefLq4ukYaAnJbEALw_wcB";
// const url = "https://sterilray.com/";
// const url = "http://talicotech.com/";
// const url = "https://www.laser-tech.de/";

// #############################  const url = "https://www.tencom.com/";

// const url = "https://de.tek.com/?utm_source=google&utm_medium=ppc&utm_content=brand&utm_term=tektronix&utm_campaign=tektronix&gclid=Cj0KCQjw09HzBRDrARIsAG60GP8W6T2tHgWxEFKkQ9csvP-CPYwDIlzn6jFYLNYeQnCaqK_GIvHbpnUaAjPcEALw_wcB";
// ----------------------------------------------------------------------------------------------
// const url = "https://www.kontor.com/";
//----------------------------------------------------------------------------------------------
// const url = "https://www.allianz.de/?AZMEDID=SEM_SE-GG_VT-g_PR-Brand_KA-00.brand.gold_AG-allianz.exact_KW-allianz_MT-e_Anzeige-334946579695_SL-keinSL_EG-c_PS-&ef_id=Cj0KCQjw09HzBRDrARIsAG60GP_OUFthmqE4O8fH3IBTVOtg_8CJ3O0Qm8o1FQKVnkXRxHcBExZzhPQaAkHFEALw_wcB:G:s&s_kwcid=AL!8161!3!334946579695!e!!g!!allianz&gclid=Cj0KCQjw09HzBRDrARIsAG60GP_OUFthmqE4O8fH3IBTVOtg_8CJ3O0Qm8o1FQKVnkXRxHcBExZzhPQaAkHFEALw_wcB"

// ###########################################################################################################################

//  (P)

// const url = 'https://www.nikon.de/de_DE/footers/contact_us.page';
// const url = "https://www.telekom.com/de/telekom/impressum-1812";
// const url = "https://www.cisco.com/c/de_de/about.html";
// const url = "https://www.paragon-software.com/about/#contact_form";
// const url = "https://www.lasertech.com/Contact-LTI.aspx";
// const url = "https://www.boersenverlag.de/impressum/";
// ----------------------------------------------------------------------------------------------
// const url = 'http://techking.com/#';
const url = "https://www.telekom.com/de/kontakt";
// const url = "https://www.lasertech-services.de/";
// ----------------------------------------------------------------------------------------------
// const url = 'https://helioworks.com/contact-us/';
// ----------------------------------------------------------------------------------------------
// const url = "https://capricorngroup.net/capricorn/karriere/";
// const url = "https://technikon.com/contact/";
// ----------------------------------------------------------------------------------------------
// const url = "https://www.campusjaeger.de/impressum?rId=D27FJcjWsRz5&utm_campaign=spreading-2020-01&utm_medium=jobboard-jobposting&utm_source=backinjob";
// const url = "https://telefunken.com/de_DE/impressum/";
// const url = "https://telefunken.com/de_DE/kontakt/";
// const url = "https://www.onvista.de/impressum";
// const url = "https://www.finanznachrichten.de/service/impressum.htm";
// const url = "https://www.escom.org/contact.html";
// ----------------------------------------------------------------------------------------------
// const url = "http://www.advancedcarbonsystems.com/contactus.html";


// ###########################################################################################################################

//  (RAW)

// const url = "http://nodecom.com/contact.html";
// const url = "https://www.microfocus.com/en-us/about/meet-micro-focus";
// ----------------------------------------------------------------------------------------------
// const url = "https://www.ariva.de/impressum";
// ----------------------------------------------------------------------------------------------
// const url = "https://www.thomasnet.com/contact/";
// const url = "https://www.ariva.de/impressum";
// ----------------------------------------------------------------------------------------------
// const url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';

// const url = "https://www.ushio.com/contact-us/";

// ###########################################################################################################################

// FEHLEN !!!

// const url = "https://www.sipgate.de/impressum";
// const url = 'https://www.vathos-robotics.de/';
// const url = 'https://mytelco.de/impressum/';
// const url = "https://excellence.ag/";
// const url = "https://www.adenion.de/kontakt";
// const url = "https://www.coretech.com/contact";
// const url = "http://www.escom.mw/";
// const url = "https://teletronusa.com/#";
// const url = "https://www.tesla.com/en_EU/roadside-assistance";
// const url ="https://www.carbonsys.com/contact";


console.log("\n", url, "\n");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

scrape = function (error, response, html) {
 
 // html = iconv.decode(new Buffer.from(html), "win1251");
 const $ = cheerio.load(html);
 
 // console.log(html);
 
 elements = [];
 phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████
 
 if (false) {
  $('a').each((index, element) => {
   
   if (element != null) {
    
    // console.log(element.attribs.href);
    
    // ALLIANZ CHECK OB NUR EIN CHILD IM A_TAG IST !!!!
    
    // found = String(element.attribs.href).match(/(?<=telefon|fon:|phone|tel|tel：|tel:|tel.)([+-]|\d|\s|\w|:)+/ig);
    // found = String(element.attribs.href).match(/[^"](?<=telefon|fon:|phone|tel|tel：|tel:]|tel)[.|:]([+-]|\d|\s|\w|:)+[^"]/ig);
    // found = String(element.attribs.href).match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([(|)]|[+-]|\d|\s|\w|:)+/ig);
    // found = String(element.attribs.href).replace("%", " ").match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([(|)]|[+-]|\d|\s|\w|:)+/ig);
    
    // console.log(element.attribs.href);
    
    found = String(element.attribs.href).match(/(?<=tel:)([+-]|[%]|[\/]|[(|)]|\d|\s|:)+/ig);
    
    if (typeof found !== 'undefined') {
     
     if (found != null) {
      
      if (found.length == 1) {
       
       if (!phones.includes(found)[0]) {
        
        phones.push(found.length + " __ " + found[0]);
        
       }
      } else {
       
       if (!phones.includes(found)) {
        
        phones.push(found.length + " __ " + found);
        
       }
       
      }
      
      
     }
    }
    
   }
  });
 }

//██████████████████████████████████████████████████████████████████████████████████████████████████
 
 if (true) {
  
  $('p').each((index, element) => {
   
   element.children.forEach((item) => {
    
    if (item != null) {
 
     // console.log(item.data);
     
     // found = null;
     
     //##############################################################################################################
     
     // CAPRICORNGROUP MUSS MIT PHANTOM-JS !!
     // CAMPUSJÄGER MUSS MIT PHANTOM-JS !!
     
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel：|tel:|tel.)(:)(\d|\s|[–|-|-|\/]?)+/ig);
     
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)(\d|\s|[–|-|-|\/]?)+/ig);
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
     
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel：|tel:|tel.)(:)(\(|\)|\d|\s|[–|-|-|\/]?)+/ig);
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([+-]|\d|\s)+/ig);
     
     //------------------------------------------------
     
     //      found = String(item.data).match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([+-]|\d|\s|\w|:)+/ig);
     //      found = String(item.data).match(/(?<=telefon:)([–|-]|[\/]|\d|\s|[:])+/ig);
     //      found = String(item.data).match(/(?<=telefon:|Tel.:)([–|-]|[\/]|\d|\s|[:])+/ig);
     //      found = String(item.data).match(/(?<=telefon:|Tel.:|Phone:)([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
     //      found = String(item.data).match(/(?<=telefon:|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
     // found = String(item.data).match(/(?<=telefon:|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
     found = String(item.data).match(/(?<=telefon|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
 
     // console.log(found);
     
     //------------------------------------------------
     
     // found = String(item.data).match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([(|)]|[+-]|\d|\s|\w*|:)+/ig);
     
     //##############################################################################################################
     
     if (typeof found !== 'undefined') {
      
      if (found != null) {
       
       if (found.length == 1) {
        
        if (!phones.includes(found)[0]) {
         
         phones.push(found[0]);
         
        }
       } else {
        
        if (!phones.includes(found)) {
         
         phones.push(found.length + " __ " + found);
         
        }
        
       }
      }
     }
    }
   });
  });
 }

//██████████████████████████████████████████████████████████████████████████████████████████████████
 
 if (false) {
  
  // USHIO MUSS MIT PHANTOM-JS !
  
  found = String(html).trim().match(/>(phone|Ruf|tel)([(|)]|[+-]|\\d|\s|\w|:)+</ig);
  
  // found = String(html).trim().match(/>*(phone|Ruf)([(|)]|[+-]|\d|\s|\w|:)+[^<]/ig);
  
  // found = String(html).trim().match(/(phone|Ruf|Tel)[.|:]([(|)]|[+-]|\d|\s|:)+[)|\d]/ig);
  
  // found = String(html).match(/>(phone|Ruf|tel|tel:)([(|)]|[+-]|\d|\s|\w|[:|.])+[^<]/ig);
  
  // found = String(html).trim().match(/>(phone|Ruf|tel)([(|)]|[+-]|\d|\s|\w|:)+[\d][^<]/ig);
  
  if (found != null) {
   
   if (!phones.includes(found)) {
    
    phones.push("Found : ", found);
    phones.push("----------------------------");
   }
  }
 }

//██████████████████████████████████████████████████████████████████████████████████████████████████
 
 console.log("#######################################################################\n");
 
 phones.forEach((item) => {
  console.log(item)
 });
 
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

const {fetch} = require("./phantomjs/index.js");
fetch(url, error => {
   console.log(error)
}, html => scrape(null, null, html));

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

request({method: "GET", uri: url, gzip: false}, scrape);


// request({method: "GET",uri: url,gzip: true}, scrape);