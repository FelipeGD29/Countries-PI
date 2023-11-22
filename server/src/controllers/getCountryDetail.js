const { Country, Activity } = require("../db");

const getCountryDetail = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await Country.findOne({ where: { ID: idPais }, include: [Activity], });

    return country
      ? res.status(200).json(country)
      : res.status(404).send("Country not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getCountryDetail };
