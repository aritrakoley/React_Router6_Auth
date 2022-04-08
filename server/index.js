const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const utils = require("./utils.js");

const app = express();
const port = 4000;

const jsonParser = bodyParser.json();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));

const isAccessTokenValid = (req, res, next) => {
  const accessToken = req.headers.authorization;
  console.log("received token: ", accessToken);
  if (!accessToken) {
    res.status(401).send({ msg: "User not recognized" });
  } else {
    const roles = utils.getRole(accessToken);
    if (roles.length <= 0) {
      res.status(403).send({ msg: "Permission Denied" });
    } else {
      req.roles = roles.join(",");
      next();
    }
  }
};

const isAccessAllowed = (req, res, next) => {
  const role_access_table = {
    fin: ["fin_dash"],
    tech: ["tech_dash"],
  };
  const roles = req.roles.split(',');
  req.locals = {};
  console.log(roles, req.locals);
  console.log(role_access_table[roles[0]]);
  let allPages = [];
  for(let i=0; i < roles.length && role_access_table[roles[i]]; i++){
    allPages.push(...(role_access_table[roles[i]]));
  }
  console.log(allPages);
  if( allPages.includes(req.body.pageKey) ){
    req.locals.hasAccess = true;
  } else {
    req.locals.hasAccess = false;
  }
  next();
};

app.post("/login", jsonParser, (req, res) => {
  const accessToken = utils.getAccessToken({
    username: req.body.username,
    password: req.body.password,
  });
  if (accessToken) {
    res.send({ accessToken });
  } else {
    res.status(400).send({ msg: "login failed" });
  }
});

app.post("/finposts", jsonParser, isAccessTokenValid, isAccessAllowed, (req, res) => {
  res.send(utils.FIN_POSTS);
});

app.post("/techposts", jsonParser, isAccessTokenValid, isAccessAllowed, (req, res) => {
  res.send(utils.TECH_POSTS);
});

app.post(
  "/pageaccess",
  isAccessTokenValid,
  jsonParser,
  isAccessAllowed,
  (req, res) => {
    console.log("page_key:", req.body.pageKey);
    setTimeout(() => {
      res.send({ hasAccess: req.locals.hasAccess });
    }, 2000);
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
