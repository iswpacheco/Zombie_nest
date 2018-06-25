var express = require("express");
var Zombie = require("./models/zombies");
var Arma = require("./models/equipment");
var passport = require("passport");

var router = express.Router();

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    /*res.locals.currentArma = req.equipment;*/
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", (req, res, next) => {
    Zombie.find()
        .sort({ createdAt: "descending" })
        .exec((err, zombies) => {
            if (err) {
                return next(err);
            }
            res.render("index", { zombies: zombies });
        });
});
router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({ username: username }, (err, zombie) => {
        if (err) {
            return next(err);
        }
        if (zombie) {
            req.flash("error", "El nombre de usuario ya lo ha tomado otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });
        newZombie.save(next);
        return res.redirect("/");
    });
});

router.get("/zombies/:username", (req, res, next) => {
    Zombie.findOne({ username: req.params.username }, (err, zombie) => {
        if (err) {
            return next(err);

        }
        if (!zombie) {
            return next(404);
        }
        res.render("profile", { zombie: zombie });
    });
});


router.get("/equipment", (req, res) => {
    res.render("equipment");

});
router.post("/equipment", (req, res, next) => {
    var description = req.body.description;
    var defense = req.body.defense;
    var category = req.body.category;
    var weight = req.body.weight;

    var newEquipment = new Arma({
        description: description,
        defense: defense,
        category: category,
        weight: weight
    });
    newEquipment.save(next);
    return res.redirect("/equipment_list");
});

router.get("/equipment_list", (req, res, next) => {
    Arma.find()
        .sort({ createdAt: "descending" })
        .exec((err, equipment) => {
            if (err) {
                return next(err);
            }
            res.render("equipment_list", { equipment: equipment });
        });
});
module.exports = router;