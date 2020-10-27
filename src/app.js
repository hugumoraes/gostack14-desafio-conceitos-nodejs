const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.status(200).json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs: [...techs],
    likes: 0
  };

  repositories.push(repository);

  return res.status(200).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body;

  const repositoryIndex = repositories.findIndex(r => req.params.id === r.id);

  if(repositoryIndex < 0) return res.status(400).json("Invalid repository.");
  
  if (title)
    repositories[repositoryIndex].title = title;
  
  if (url)
  repositories[repositoryIndex].url = url;

  if (techs)
  repositories[repositoryIndex].techs = techs;

  return res.status(200).json(repositories[repositoryIndex]);
  
});

app.delete("/repositories/:id", (req, res) => {
  const repositoryIndex = repositories.findIndex(r => req.params.id === r.id);

  if (repositoryIndex < 0) return res.status(400).json("Invalid repository.");

  repositories.splice(repositoryIndex, 1);

  return res.status(204).json();
});

app.post("/repositories/:id/like", (req, res) => {
  const repositoryIndex = repositories.findIndex(r => req.params.id === r.id);

  if (repositoryIndex < 0) return res.status(400).json("Invalid repository.");

  repositories[repositoryIndex].likes += 1;
  
  return res.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
