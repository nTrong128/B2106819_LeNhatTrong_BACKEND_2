const express = require('express');
const contacs = require("../controllers/contact.controller");

const router = express.Router();

router.route("/")
    .get(contacs.findAll)
    .post(contacs.create)
    .delete(contacs.deleteAll);

router.route("/favorite")
    .get(contacs.findAllFavorite);

router.route("/:id")
    .get(contacs.findOne)
    .put(contacs.update)
    .delete(contacs.delete);

module.exports = router;