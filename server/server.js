const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

(async () => {
  await server.start();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  // Database connection
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL API ready at http://localhost:${PORT}/graphql`);
    });
  });
})();
