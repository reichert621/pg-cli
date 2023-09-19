const cheerio = require("cheerio");
const TurndownService = require("turndown");
const Parser = require("rss-parser");

const parser = new Parser();

// Top essays according to:
// http://www.solipsys.co.uk/new/PaulGrahamEssaysRanking.html
const slugs = [
  "avg",
  "lwba",
  "say",
  "icad",
  "rootsoflisp",
  "essay",
  "diff",
  "nerds",
  "taste",
  "gh",
  "road",
  "wealth",
  "power",
  "venturecapital",
  "gba",
  "start",
  "hiring",
  "america",
  "progbot",
  "inequality",
  "siliconvalley",
  "ladder",
  "love",
  "procrastination",
  "credentials",
  "equity",
  "die",
  "hs",
  "spam",
  "angelinvesting",
  "badeconomy",
  "highres",
  "pypar",
  "ideas",
  "better",
  "ffb",
  "relres",
  "webstartups",
  "hundred",
  "bronze",
  "submarine",
  "marginal",
  "startupfunding",
  "convergence",
  "hiresfund",
  "popular",
  "stuff",
  "trolls",
  "googles",
  "startupmistakes",
  "top",
  "hp",
  "bubble",
  "langdes",
  "vcsqueeze",
  "cities",
  "13sentences",
  "fundraising",
  "guidetoinvestors",
  "desres",
  "judgement",
  "unions",
  "maybe",
  "startuphubs",
  "control",
  "notnot",
  "opensource",
];

const t = new TurndownService();

function getRandomEssay(excluding = []) {
  const options = slugs.filter((s) => !excluding.includes(s));
  const index = Math.floor(Math.random() * options.length);

  return slugs[index];
}

async function fetchAllEssays() {
  const feed = await parser.parseURL(
    "http://www.aaronsw.com/2002/feeds/pgessays.rss"
  );

  const regex = /\/\/([^\/]+)\/([^\/]+)\.html$/;

  return feed.items
    .map(({ title, link }) => {
      const match = link.match(regex);
      const slug = match && match.length ? match[2] : null;

      return { title, link, slug };
    })
    .filter((essay) => !!essay.slug);
}

async function fetchEssayHtml(slug) {
  const response = await fetch(`http://www.paulgraham.com/${slug}.html`);
  const html = await response.text();

  if (!html) {
    return { title: null, text: null, markdown: null };
  }

  const $ = cheerio.load(html);
  const essay = $('td[width="435"]');
  // Remove "Want to join YC" banner if necessary
  essay.find('td[bgcolor="#ff9922"]').remove();

  return {
    title: $("title").text(),
    text: essay.text(),
    markdown: t.turndown(essay.html()),
  };
}

module.exports = {
  getRandomEssay,
  fetchAllEssays,
  fetchEssayHtml,
};
