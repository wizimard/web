require("@babel/register");
const Sitemap = require("react-router-sitemap").default;

const router = require("./router").default;

new Sitemap(router).build("http://localhost:4200").save("./sitemap.xml");
