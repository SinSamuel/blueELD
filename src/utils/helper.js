const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashString = (string) => {
  return bcrypt.hashSync(string, Number.parseInt(process.env.SALT_ROUND));
};

exports.compareString = (string, hashString) =>
  bcrypt.compareSync(string, hashString);

exports.generateAccessToken = (data) => {
  return jwt.sign(data.toJSON(), process.env.TOKEN_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.decodeToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.SECRET);
};

exports.checkEmployment = (emp) => {
  let employment;
  let permissions;
  switch (emp) {
    case "owner operator":
      employment = "O";
      permissions = [
        "company",
        "equipment",
        "maps",
        "loads",
        "logs",
        "accounting",
        "archive",
        "settings",
      ];
      break;
    case "driver":
      employment = "D";
      permissions = ["logs"];
      break;
    case "mechanic":
      employment = "M";
      permissions = ["equipment"];
      break;
    case "dispatcher":
      employment = "S";
      permissions = ["company", "equipment", "maps", "loads"];

      break;
    case "administration":
      employment = "A";
      permissions = [
        "company",
        "equipment",
        "maps",
        "loads",
        "logs",
        "accounting",
        "archive",
        "settings",
      ];
      break;

    default:
      break;
  }
  return { employment, permissions };
};

exports.getRandomChar = (name) => {
  // Get the first and last characters of the name
  const firstChar = name.charAt(0).toUpperCase();
  const lastChar = name.charAt(name.length - 1).toUpperCase();

  // Generate two random uppercase characters from the name
  const charsInName = [...new Set(name.toUpperCase().split(""))]; // Unique uppercase characters in the name
  const randomChar1 =
    charsInName[Math.floor(Math.random() * charsInName.length)];
  const randomChar2 =
    charsInName[Math.floor(Math.random() * charsInName.length)];

  // Combine the characters to form the final string
  const randomString = `${firstChar}${randomChar1}${randomChar2}${lastChar}`;
  return randomString;
};
