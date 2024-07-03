// const path = require("path")
// const express = require("express");

// const app = express();
// const port = 8000

// const staticPath = path.join(__dirname, "./public");

// app.use(express.static(staticPath));

// app.get("/", (req, res) => {
//     res.send(" home page")
// })

// app.get("/about", (req, res) => {
//     res.send("welcome to my about page")
// })

// // app.get("/contact", (req, res) => {
// //     res.send({
// //         id: 1,
// //         name: "vinod"
// //     })
// // })
// // app.get("/temp", (req, res) => {
// //     res.send("welcome to my temp page")
// // })

// app.listen(port, () => {
//     console.log(` listening ${port}`);
// });
// // app.listen(port, () => {
// //     console.log(` listening ${port}`);
// // });


const express = require("express");
const app = express();
const port = 5000

app.get("/", (req, res) => {
    res.send("welcome to my world")
})
app.get("/about", (req, res) => {
    res.send("welcome to my about world")
})
app.get("/weather", (req, res) => {
    res.send("welcome to my weather world")
})
app.get("*", (req, res) => {
    res.send("404 error page oops")
})
app.listen(port, () => {
    console.log(`listening${port}`)
})