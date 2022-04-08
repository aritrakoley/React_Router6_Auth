const FIN_ACCESS_TOKEN = "tokenFor_fin";
const TECH_ACCESS_TOKEN = "tokenFor_tech";
const INVALID_ACCESS_TOKEN = "tokenFor_";

const FIN_POSTS = [
  { title: "FIN 1", body: "F1", author: "user1" },
  { title: "FIN 2", body: "F2", author: "user2" },
];

const TECH_POSTS = [
  { title: "TECH 1", body: "T1", author: "user3" },
  { title: "TECH 2", body: "T2", author: "user4" },
];

const getAccessToken = ({ username, password }) => {
  if (username === "fin" && password === "password") {
    return FIN_ACCESS_TOKEN;
  } else if (username === "tech" && password === "password") {
    return TECH_ACCESS_TOKEN;
  } else {
    return null;
  }
};
const getRole = (accessToken) => {
  const rolesCsv = accessToken.split("_")[1];
  return rolesCsv ? rolesCsv.split(",") : [];
};

module.exports = {
  getAccessToken,
  getRole,
  FIN_ACCESS_TOKEN,
  TECH_ACCESS_TOKEN,
  INVALID_ACCESS_TOKEN,
  FIN_POSTS,
  TECH_POSTS,
};
