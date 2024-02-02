const { Router } = require("express");
const { getCountries } = require("../controllers/getCountries");
const { getCountryDetail } = require("../controllers/getCountryDetail");
const { searchCountryByName } = require("../controllers/getSearchCountry");
const { postActivities } = require("../controllers/postActivities");
const { getActivities } = require("../controllers/getActivities");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:idPais", getCountryDetail);
router.get("/country/name", searchCountryByName);
router.post("/activities", postActivities);
router.get("/activities", getActivities);

module.exports = router;
