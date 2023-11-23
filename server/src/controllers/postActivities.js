const { Activity } = require("../db");

const postActivities = async (req, res) => {
  try {
    const { name, difficulty, duration, season } = req.body;

    if (!name || !season) {
      return res.status(403).send("Missing Data");
    } else {
      const activity = await Activity.create({
        name,
        difficulty,
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
