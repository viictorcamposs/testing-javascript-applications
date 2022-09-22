const { objectToQueryString } = require("./queryString");

describe("Object to query string", () => {
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Victor",
      profession: "software developer",
    };

    expect(objectToQueryString(obj)).toBe(
      "name=Victor&profession=software2%developer"
    );

    obj.company = "conquer holding";

    expect(objectToQueryString(obj)).toBe(
      "name=Victor&profession=software2%developer&company=conquer2%holding"
    );
  });
});
