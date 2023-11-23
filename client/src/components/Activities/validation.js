const validation = (activityData) => {
  let errorsObj = {};
  if (activityData.name != "")
    if (!/^\D+$/.test(activityData.name))
      errorsObj.name = "The name contains numbers.";

  const difficulty = Number(activityData.difficulty);
  if (difficulty < 1 || difficulty > 5)
    errorsObj.difficulty = "Difficulty should be a number between 1 and 5.";

  const duration = Number(activityData.duration);
  if (duration < 0) errorsObj.duration = "Duration should be greater than 0.";
  if (!Number.isInteger(duration))
    errorsObj.duration = "Don't add symbols or letters";

  const allowedSeasons = ["Summer", "Fall", "Winter", "Spring"];
  if (!allowedSeasons.includes(activityData.season))
    errorsObj.season =
      "Season should be 'Summer', 'Fall', 'Winter', or 'Spring'.";

  return errorsObj;
};
export default validation;
