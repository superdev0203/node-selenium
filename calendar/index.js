const rp = require('request-promise');
const cheerio = require('cheerio');

const personState = function(url) {
  let info = {};
  return rp(url)
      .then(function(html) {
        $ = cheerio.load(html);
        const name = $('body > h2').text();
        info = {'name': name};
        const days = [];
        $('thead > tr > th').each((i, data) => {
          days.push($(data).text().trim());
        });
        $('tbody > tr > td').each((i, data) => {
          const newItem = {};
          newItem[days[i]] = $(data).text().trim().toUpperCase();
          info = {...info, ...newItem};
        });
        return info;
      })
      .catch(function(err) {
        console.log('error');
        return null;
      });
};
module.exports = personState;
