const { Activity, Country } = require("../db");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          as: "Countries",
          attributes: ["name", "flag", "ID"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getActivities };
