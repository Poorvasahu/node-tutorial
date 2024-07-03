const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = 3000;

const staticPath = path.join(__dirname, "./public");
const templatePath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")

app.set("view engine", "hbs")

app.set("views", templatePath)
    //  app.use(express.static(staticPath));
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render('index', {
        channelName: "poorva"
    })
})

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get('*', (req, res) => {
    res.render("404", {
        errorcomments: "opps page not found"
    })
})
app.listen(port, () => {
    console.log(`listening to the music  ${port}`)
})