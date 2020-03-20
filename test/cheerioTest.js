// Import the Cheerio library
const cheerio = require('cheerio')

// Load the HTML code as a string, which returns a Cheerio instance
const $ = cheerio.load('<p id="example">This is an <strong>example</strong> paragraph</p>')

// We can use the same API as jQuery to get the desired result
const txt = $('#example').text()
console.log(txt)
// Output: "This is an exam