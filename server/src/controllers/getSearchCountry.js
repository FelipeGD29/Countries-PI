const { Op } = require("sequelize");
const { Country } = require("../db");

const searchCountryByName = async (req, res) => {
  try {
    // Obtener el nombre del país desde la consulta (query) en la URL
    const { name } = req.query;

    // Realizar la búsqueda en la base de datos (sin distinción entre mayúsculas y minúsculas)
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // ILIKE para búsqueda sin distinción entre mayúsculas y minúsculas
        },
      },
    });

    // Verificar si se encontraron países
    if (countries.length === 0) {
      return res.status(404).json({ message: "No se encontraron países con ese nombre." });
    }

    // Devolver la lista de países encontrados
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  searchCountryByName,
};

