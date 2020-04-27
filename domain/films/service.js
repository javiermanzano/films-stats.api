const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const logger = require('../../components/logger')({});


module.exports = () => {
  const SELECTOR_CARD = '#top-movies > li';
  const SELECTOR_TITLE_URL = '.mc-title a';
  const SELECTOR_POSITION = '.position';
  const SELECTOR_COUNTRY = '.nflag';
  const SELECTOR_RATING = '.avg-rating';
  const startScrapping = async () => {
    logger.info('Start scrapping');
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=es-ES'],
    });
    const page = await browser.newPage();
    await page.goto(
      'https://www.filmaffinity.com/es/topgen.php',
    );
    const content = await page.content();
    const $ = cheerio.load(content);
    const filmsResults = $(SELECTOR_CARD);

    $.prototype.exists = function (selector) {
      return this.find(selector).length > 0;
    };

    console.log('Start loop on elements');
    filmsResults.each((i, el) => {
      if (!$(el).exists(SELECTOR_TITLE_URL)) {
        return;
      }
      const titleTag = $(el).find(SELECTOR_TITLE_URL);
      const positionTag = $(el).find(SELECTOR_POSITION);
      const countryTag = $(el).find(SELECTOR_COUNTRY);
      const avgRatingTag = $(el).find(SELECTOR_RATING);
      if (Array.isArray(el.children)) {
        const film = {
          rank: parseInt(positionTag.html(), 10),
          title: titleTag[0].attribs.title.trim(),
          country: countryTag[0].attribs.title.trim(),
          averageRating: avgRatingTag.html(),

        };
        console.log('--> INSERT', { film });
      }
    });
  };


  return {
    startScrapping,
  };
};
