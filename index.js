const express = require("express");

const { getRandomEssay, fetchEssayHtml, fetchAllEssays } = require("./essays");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/essays", async (req, res) => {
  const essays = await fetchAllEssays();

  return res.json({ essays });
});

app.get("/api/essays/:slug", async (req, res) => {
  const slug = req.params.slug || req.query.slug;
  const essay = !slug || slug === "random" ? getRandomEssay() : slug;
  const { title, text, markdown } = await fetchEssayHtml(essay);
  const output = markdown ? `# ${title}\n\n`.concat(markdown) : text;

  return res
    .setHeader("Content-Type", "text/plain")
    .send(output || "Not found.");
});

app.listen(port, () => console.log("Server running..."));
