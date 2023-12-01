const server = require("./src/server");
const { conn } = require("./src/db.js");
const countriesData = require("./api/db.json");
const { Country } = require("./src/db.js");
const PORT = 3001;

conn;
conn
  .sync({ force: true })
  .then(() => {
    // Carga los datos en la base de datos
    countriesData.countries.forEach((countryData) => {
      Country.create({
        ID: countryData.cca3,
        name: countryData.name.common,
        flag: countryData.flags.png,
        continent: countryData.continents[0],
        capital: countryData.capital ? countryData.capital[0] : "none",
        subregion: countryData.subregion,
        area: countryData.area.toString(),
        population: countryData.population.toString(),
        activities: []
      });
    });

    // Levanta el servidor después de cargar los datos
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
