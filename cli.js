#!/usr/bin/env node

const yargs = require("yargs");
const format = require("cli-format");
const chalk = require("chalk");

const { getRandomEssay, fetchEssayHtml, fetchAllEssays } = require("./essays");

const regex = {
  bold: /\*\*(.*?)\*\*|__(.*?)__/g,
  italic: /\*(.*?)\*|_(.*?)_/g,
  image: /!\[([^\]]+)\]\(([^)]+)\)/g,
  link: /\[([^\]]+)\]\(([^)]+)\)/g,
};

yargs
  .command({
    command: "list",
    describe: "List Paul Graham's essays",
    handler: async () => {
      const t = setTimeout(() => console.log("Fetching essays..."), 1000);
      const essays = await fetchAllEssays();

      clearTimeout(t);

      const output = essays
        .map((essay) => {
          return format.columns.wrap(
            [
              { content: chalk.bold(essay.slug), width: 20 },
              { content: essay.title },
              { content: chalk.underline(essay.link) },
            ],
            {
              paddingMiddle: " | ",
            }
          );

          // return `${chalk.bold(essay.slug)} ${essay.title} (${chalk.underline(
          //   essay.link
          // )})`;
        })
        .join("\n");

      console.log(output);
    },
  })
  .command({
    command: "read <slug>",
    describe: "Read Paul Graham's essay",
    handler: async (argv) => {
      const slug = argv.slug === "random" ? getRandomEssay() : argv.slug;
      const t = setTimeout(() => console.log("Fetching essays..."), 1000);

      clearTimeout(t);

      const { title, text, markdown } = await fetchEssayHtml(slug);
      const output = markdown
        ? `# ${chalk.bold.underline(title)}\n\n`.concat(
            markdown
              // .replaceAll(regex.image, (str) => chalk.dim(str))
              .replaceAll(regex.link, (str) => chalk.underline(str))
              .replaceAll(regex.bold, (str) => chalk.bold(str))
              .replaceAll(regex.italic, (str) => chalk.italic(str))
          )
        : text;
      const formatted = format.wrap(output, { width: 80 });

      console.log(formatted);
    },
  });

yargs.parse();
