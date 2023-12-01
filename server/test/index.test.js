const server = require("../src/server");
const session = require("supertest");
const agent = session(server);

describe("Routing test", () => {
  describe("GET /countries", () => {
    it("The response comes with a status: 200", async () => {
      const { statusCode } = await agent.get("/countries");

      expect(statusCode).toBe(200);
    });

    it("Responds with an array of objects with 250 elements", async () => {
      const { body } = await agent.get("/countries");

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(250);
    });
  });

  describe("GET /countries/:idPais", () => {
    it("The response comes with a status: 200", async () => {
      const { statusCode } = await agent.get("/countries/ARG");

      expect(statusCode).toBe(200);
    });

    it("Responds with an object with the properties ID, name, flag, continent, capital, subregion, area, population, Activities", async () => {
      const { body } = await agent.get("/countries/ARG");

      expect(body).toHaveProperty(
        "ID" &&
          "name" &&
          "flag" &&
          "continent" &&
          "capital" &&
          "subregion" &&
          "area" &&
          "population" &&
          "Activities"
      );
    });

    it("Should get the correct country", async () => {
      const { body: bodyArg } = await agent.get("/countries/ARG");
      const { body: bodyBra } = await agent.get("/countries/BRA");

      expect(bodyArg.ID).toBe("ARG");
      expect(bodyBra.ID).toBe("BRA");
    });

    it("If there is an error responds with a status: 404", async () => {
      const { statusCode } = await agent.get("/countries/AAA");

      expect(statusCode).toBe(404);
    });
  });

  describe("GET /country/name?name={...}", () => {
    it("The response comes with a status: 200", async () => {
      const { statusCode } = await agent.get("/country/name?name=Argentina");

      expect(statusCode).toBe(200);
    });

    it("Capital letters don't matter, should get the same response", async () => {
      const { body: bodyUpperCase } = await agent.get(
        "/country/name?name=Argentina"
      );
      const { body: bodyLowerCase } = await agent.get(
        "/country/name?name=argentina"
      );

      expect(bodyUpperCase[0].name).toEqual(bodyLowerCase[0].name);
    });
  });

  describe("POST /activities", () => {
    const activity1 = {
      name: "Swim",
      duration: 1,
      difficulty: 1,
      season: "Summer",
      CountryID: ["ARG", "BOL"],
    };
    const activity2 = {
      name: "Hiking",
      duration: 2,
      difficulty: 2,
      season: "Fall",
      CountryID: ["ARG", "BOL"],
    };
    it("The response comes with a status: 201 and has the same properties as what is sent but now with a new property named ID", async () => {
      const { statusCode: statusCode1, body: body1 } = await agent
        .post("/activities")
        .send(activity1);
      const { statusCode: statusCode2, body: body2 } = await agent
        .post("/activities")
        .send(activity2);

      expect(statusCode1).toBe(201);
      expect(statusCode2).toBe(201);

      expect(typeof body1).toBe("object");
      expect(body1).toHaveProperty("ID");
      expect(body1.name).toBe(activity1.name);
      expect(body1.difficulty).toBe(activity1.difficulty);
      expect(body1.duration).toBe(activity1.duration);
      expect(body1.season).toBe(activity1.season);

      expect(typeof body2).toBe("object");
      expect(body2).toHaveProperty("ID");
      expect(body2.name).toBe(activity2.name);
      expect(body2.difficulty).toBe(activity2.difficulty);
      expect(body2.duration).toBe(activity2.duration);
      expect(body2.season).toBe(activity2.season);
    });

    it("The activity should be added to the array Activities (/countries/:idPais) in the object of the countries selected by body", async () => {
      const { body: bodyArg } = await agent.get("/countries/ARG");
      const { body: bodyBol } = await agent.get("/countries/BOL");

      const isActivityInArg = bodyArg.Activities.some(
        (item) =>
          item.name === activity1.name &&
          item.difficulty === activity1.difficulty &&
          item.duration === activity1.duration &&
          item.season === activity1.season
      );

      const isActivityInBol = bodyBol.Activities.some(
        (item) =>
          item.name === activity1.name &&
          item.difficulty === activity1.difficulty &&
          item.duration === activity1.duration &&
          item.season === activity1.season
      );

      expect(isActivityInArg).toBe(true);
      expect(isActivityInBol).toBe(true);
    });
  });

  describe("GET /activities", () => {
    it("The response comes with a status: 200", async () => {
      const { statusCode } = await agent.get("/activities");

      expect(statusCode).toBe(200);
    });

    it("Responds with an array", async () => {
      const { body } = await agent.get("/activities");

      expect(Array.isArray(body)).toBe(true);
    });

    it("When an activity is created, it should be added to the /activities array", async () => {
      const newActivity = {
        name: "Running",
        duration: 2,
        difficulty: 2,
        season: "Spring",
        CountryID: ["USA"],
      };

      const { body: createdActivity } = await agent
        .post("/activities")
        .send(newActivity);
      const { body: bodyActivities } = await agent.get("/activities");

      const isActivityInArray = bodyActivities.some(
        (activity) => activity.ID === createdActivity.ID
      );

      expect(isActivityInArray).toBe(true);
    });
  });
});
