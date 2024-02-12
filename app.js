import express from "express";
import { readFileSync } from "fs";

const app = express();
const port = 3000;
const recipe = JSON.parse(readFileSync("./public/data/recipe.json")).recipe;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
    let choice = req.body["choice"];
    var recipeFromJson;
    const data = {};

    switch(choice) {
        case "chicken":
            recipeFromJson = recipe[0];
            break;
        case "beef":
            recipeFromJson = recipe[1];
            break;
        case "fish":
            recipeFromJson = recipe[2];
            break;
        default:
            recipeFromJson = null;
            break;
    }

    data["recipe"] = recipeFromJson;
    res.render("index.ejs", data);
})

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server listening on port ${port}`);
});