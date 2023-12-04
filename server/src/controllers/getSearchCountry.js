const { Op } = require("sequelize");
const { Country } = require("../db");

const searchCountryByName = async (req, res) => {
  try {
    const { name } = req.query;

    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, 
        },
      },
    });

    if (countries.length === 0) {
      return res.status(404).json({ message: "No se encontraron países con ese nombre." });
    }


    return res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  searchCountryByName,
};

