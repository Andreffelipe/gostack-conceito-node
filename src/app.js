const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repo = {
    id : uuid(),
    title,
    url,
    techs,
    likes : 0
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repositorie => repositorie.id === id);
  if(index < 0){
    return response.status(400).json({err : "user not found"});
  };
  const { likes } = repositories[index];
  const repo = {
    id,
    title,
    url,
    techs,
    likes
  };
  repositories[index] =  repo;
  return response.json(repo)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const index = repositories.findIndex(repositorie => repositorie.id === id)
  if(index < 0){
    return response.status(400).send()
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const index = repositories.findIndex(repositorie => repositorie.id === id)
  if(index < 0){
    return response.status(400).json({err: "repository not found"})
  }
  const { title, url, techs , likes} = repositories[index];

  repolike = {id, title, url, techs, likes : likes + 1 };
  repositories[index] = repolike;
  return response.json(repolike)
});

module.exports = app;
