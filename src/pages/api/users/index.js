const database = require("utils/database").instance;

export default async (request, response) => {
  // console.log("q", request.body.json());

  try {
    const post = await database
      .one(
        "INSERT INTO users(ssn, user_name, first_name, last_name, email, website, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
          "030120TEST",
          "user_name0",
          "first_name",
          "last_name",
          "email@email.is",
          "website",
          "01234"
        ]
      )
      .then((data) => {
        database.none(
          "INSERT INTO addresses(user_id, postal_code, street_name, city, country) VALUES($1, $2, $3, $4, $5)",
          [data.id, "107", "Öldugrandi 7", "Reykjavík", "Ísland"]
        );
      });
    response.status(200).json("OK");
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};
