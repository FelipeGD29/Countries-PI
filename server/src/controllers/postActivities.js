const { Activity } = require("../db");

const postActivities = async (req, res) => {
  try {
    const { ID, name, dificulty, duration, season } = req.body;

    if (!ID || !name || !season) {
      return res.status(403).send("Missing Data");
    } else {
      const activity = await Activity.create({
        ID,
        name,
        dificulty,
        duration,
        season,
      });
      return res.status(200).json(activity);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { postActivities };
