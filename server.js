const express = require("express");
const app = express();
const db = require("./app//models/");
const initRoutes = require("./app/routes/apod.routes");

global.__basedir = __dirname + "/..";
app.set('views', './views');
app.set('view engine', 'ejs')
// app.use(express.static('/images'));

app.use(express.static('public'));  
app.use('/images', express.static('images'));

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
//
db.sequelize.sync();



// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});