const request = require('request');
const cheerio = require("cheerio");
const iconv = require('iconv-lite');

// var url = process.argv.slice(2)[0];
var url;

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//  (A)

url = 'https://www.meinpraktikum.de/unternehmen/pooliestudios/stellen/praktikant-frontend-entwicklung-mw';
url = "https://www.thomann.de/de/index.html?gclid=Cj0KCQjw09HzBRDrARIsAG60GP-0GpdydvL5IcyWhMuHWttjfZ0zkmcu0-sKjRHQTg5d8ECefLq4ukYaAnJbEALw_wcB";
url = "https://sterilray.com/";
url = "http://talicotech.com/";
url = "https://www.laser-tech.de/";
url = "https://de.tek.com/?utm_source=google&utm_medium=ppc&utm_content=brand&utm_term=tektronix&utm_campaign=tektronix&gclid=Cj0KCQjw09HzBRDrARIsAG60GP8W6T2tHgWxEFKkQ9csvP-CPYwDIlzn6jFYLNYeQnCaqK_GIvHbpnUaAjPcEALw_wcB";
url = "https://www.kontor.com/";

////////////////////////////    url = "https://www.tencom.com/";
///////////////////////////     url = "https://www.allianz.de/?AZMEDID=SEM_SE-GG_VT-g_PR-Brand_KA-00.brand.gold_AG-allianz.exact_KW-allianz_MT-e_Anzeige-334946579695_SL-keinSL_EG-c_PS-&ef_id=Cj0KCQjw09HzBRDrARIsAG60GP_OUFthmqE4O8fH3IBTVOtg_8CJ3O0Qm8o1FQKVnkXRxHcBExZzhPQaAkHFEALw_wcB:G:s&s_kwcid=AL!8161!3!334946579695!e!!g!!allianz&gclid=Cj0KCQjw09HzBRDrARIsAG60GP_OUFthmqE4O8fH3IBTVOtg_8CJ3O0Qm8o1FQKVnkXRxHcBExZzhPQaAkHFEALw_wcB"

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//  (P)

url = 'https://www.nikon.de/de_DE/footers/contact_us.page';
url = "https://www.telekom.com/de/telekom/impressum-1812";
url = "https://www.cisco.com/c/de_de/about.html";
url = "https://www.paragon-software.com/about/#contact_form";
url = "https://www.lasertech.com/Contact-LTI.aspx";
url = "https://www.boersenverlag.de/impressum/";
url = 'http://techking.com/#';
url = "https://www.telekom.com/de/kontakt";
url = 'https://helioworks.com/contact-us/';
url = "https://capricorngroup.net/capricorn/karriere/";
url = "https://technikon.com/contact/";
url = "https://www.campusjaeger.de/impressum?rId=D27FJcjWsRz5&utm_campaign=spreading-2020-01&utm_medium=jobboard-jobposting&utm_source=backinjob";
url = "https://telefunken.com/de_DE/impressum/";
url = "https://telefunken.com/de_DE/kontakt/";
url = "https://www.onvista.de/impressum";
url = "https://www.finanznachrichten.de/service/impressum.htm";
url = "https://www.escom.org/contact.html";
url = "http://www.advancedcarbonsystems.com/contactus.html";

///////////////////////////     url = "https://www.lasertech-services.de/";

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//  (RAW)

url = "http://nodecom.com/contact.html";
url = "https://www.microfocus.com/en-us/about/meet-micro-focus";
url = "https://www.ariva.de/impressum";
url = "https://www.thomasnet.com/contact/";
url = "https://www.ushio.com/contact-us/";

///////////////////////////     url = 'https://libphonenumber.appspot.com/phonenumberparser?number=0221+6306+1113&country=DE';

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

// ( FEHLEN )

url = "https://www.sipgate.de/impressum";
url = 'https://www.vathos-robotics.de/';
url = "https://excellence.ag/";
url = "https://www.adenion.de/kontakt";
url = "http://www.escom.mw/";
url = "https://teletronusa.com/#";

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

// ( ERROR )

///////////////////////////     url = 'https://mytelco.de/impressum/';
///////////////////////////     url = "https://www.coretech.com/contact";
///////////////////////////     url = "https://www.tesla.com/en_EU/roadside-assistance";
///////////////////////////     url = "https://www.carbonsys.com/contact";

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

console.log("\n", url);
shortend = String(url).replace(/https:\/\/de.|https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/|/g, '').match(/(\w|[-])+/)[0];
console.log("\n", shortend, "\n");
var phantom = false;
if (["capricorngroup", "campusjaeger", "ushio"].includes(shortend)) {
    phantom = true;
}
console.log("#######################################################################\n");

//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

scrape = function (error, response, html) {

// html = iconv.decode(new Buffer.from(html), "win1251");
    const $ = cheerio.load(html);

// console.log(html);

    elements = [];
    data = [];
    phones = [];

//██████████████████████████████████████████████████████████████████████████████████████████████████

    if (true) {

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

                                phones.push(found[0]);

                            }
                        } else if (found.length > 1) {

                            found.forEach((item) => {

                                if (!phones.includes(item)) {
                                    phones.push(item);
                                }

                            });
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

                if (typeof (item.data) !== 'undefined') {

                    field = String(item.data).trim();

                    if (field.length > 1) {
                        // console.log(field);
                        data.push(field);
                    }

                    // found = field.match(/(?<=telefon|fon|phone|tel：|tel:|tel.)(:)(\d|\s|[–|-|-|\/]?)+/ig);
                    // found = field.match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)(\d|\s|[–|-|-|\/]?)+/ig);
                    // found = field.match(/(?<=telefon|fon|phone|tel|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
                    // found = field.match(/(?<=telefon|fon|phone|tel：|tel:|tel.)(:)(\(|\)|\d|\s|[–|-|-|\/]?)+/ig);
                    // found = field.match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([+-]|\d|\s)+/ig);

                    //------------------------------------------------

                    // found = field.match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([+-]|\d|\s|\w|:)+/ig);
                    // found = field.match(/(?<=telefon:)([–|-]|[\/]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon:|Tel.:)([–|-]|[\/]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon:|Tel.:|Phone:)([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon:|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon:|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:|[：|:|.])([–|-|+|-]|[\/]|[(|)]|\d|\s)+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:)([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:)([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:)([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:|Tel:|[\xA0]|.)[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:|Tel:|[\xA0.]|[\xA0.] )[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:])+/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:|Tel:|[\xA0.] )[ ]{0,}[(]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Phone:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Tel：|Phone:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|Tel.:|Tel：|Phone:|Phone Line:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone Line:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone:|Phone Line:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone |Phone:|Phone Line:|Tel:|[\xA0.] )[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone |Phone:|Phone Line:|Tel:|[\xA0].)[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9()]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone |Phone:|Phone Line:|Tel:|[\xA0].)[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone |Phone:|Phone Line:|Tel:|[\xA0.])[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel.:|Tel：|Phone |Phone:|Phone Line:|Tel:|[\xA0])[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);
                    // found = field.match(/(?<=telefon|telefon:|Tel|Tel.:|Tel:|Tel：|Phone |Phone:|Phone Line:|[\xA0])[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);

                    found = field.match(/(?<=telefon|telefon:|Tel|Tel.:|Tel:|Tel：|Phone |Phone:|Phone Line:)[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);

                    //------------------------------------------------

                    // found = field.match(/(?<=telefon|fon|phone|tel|tel：|tel:|tel.)([(|)]|[+-]|\d|\s|\w*|:)+/ig);

                    //##############################################################################################################

                    if (typeof found !== 'undefined') {

                        if (found != null) {

                            if (found.length == 1) {

                                if (!phones.includes(found)[0]) {
                                    phones.push(found[0]);

                                }
                            } else if (found.length > 1) {

                                found.forEach((item) => {

                                    if (!phones.includes(item)) {
                                        phones.push(item);
                                    }

                                });
                            }
                        }
                    }
                }
            });
        });
    }

//██████████████████████████████████████████████████████████████████████████████████████████████████

    if (true) {

        field = String(html).trim();

        if (field.length > 1) {
            data.push(field);
        }

        // found = field.match(/>(phone|Ruf|tel)([(|)]|[+-]|\\d|\s|\w|:)+</ig);

        // found = field.match(/>*(phone|Ruf)([(|)]|[+-]|\d|\s|\w|:)+[^<]/ig);
        // found = field.match(/(phone|Ruf|Tel)[.|:]([(|)]|[+-]|\d|\s|:)+[)|\d]/ig);
        // found = field.match(/>(phone|Ruf|tel|tel:)([(|)]|[+-]|\d|\s|\w|[:|.])+[^<]/ig);
        // found = field.match(/>(phone|Ruf|tel)([(|)]|[+-]|\d|\s|\w|:)+[\d][^<]/ig);

        // found = field.match(/(?<=telefon|telefon:|Tel|Tel.:|Tel:|Tel：|Phone |Phone:|Phone Line:|[\xA0])[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);

        found = field.match(/(?<=telefon|telefon:|Tel|Tel.:|Tel:|Tel：|Phone |Phone:|Phone Line:)[ |(|+]{0,}[0-9]([–|-]|[\/]|[(|)]|\d|\s|[:|.])+[0-9)]/ig);

        if (typeof found !== 'undefined') {

            if (found != null) {

                if (found.length == 1) {

                    if (!phones.includes(found)[0]) {

                        phones.push(found[0]);

                    }
                } else if (found.length > 1) {

                    found.forEach((item) => {

                        if (!phones.includes(item)) {
                            phones.push(item);
                        }

                    });
                }
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////

    if ((phones.length == 0)) {
        console.log(data);
        console.log("\n#######################################################################\n");
    }

    phones.forEach((item) => {
        console.log(item)
    });

};

//██████████████████████████████████████████████████████████████████████████████████████████████████

if (phantom) {

    const {fetch} = require("./phantomjs/index.js");
    fetch(url, error => {
        console.log(error)
    }, html => scrape(null, null, html));

} else {

    request({method: "GET", uri: url, gzip: false}, scrape);
// request({method: "GET",uri: url,gzip: true}, scrape);

}