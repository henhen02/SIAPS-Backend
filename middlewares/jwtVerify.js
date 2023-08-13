const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient();

const jwtVerify = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    console.log("token not found");
    return res.status(401).send({ error: "Unauthorized" });
  }

  token = token.split(" ")[1];

  try {
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(403).send({ error: "Unauthorized" });
      }

      const userId = decoded.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).send({ error: "User not found!" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = jwtVerify;
