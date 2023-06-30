const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

ctowns5
router.get("/",(req,res) => res.render("homepage"))
router.get("/login",(req,res) => res.render("login"))

module.exports = router;
