const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { nip, password, nama, alamat, telp } = req.body;
    if (!nip || !password || !nama || !alamat || !telp)
      return res.status(400).send({ error: "Masukan semua data!" });

    const foundNip = await prisma.user.findUnique({
      where: {
        nip: nip,
      },
    });

    if (foundNip)
      return res.status(400).send({ error: "NIP sudah terdaftar!" });

    const user = await prisma.user.create({
      data: {
        nip: nip,
        password: bcrypt.hashSync(password, 8),
        nama: nama,
        alamat: alamat,
        telp: telp,
        // jabatanId: 2,
        // roles: {
        //   connect: {
        //     role: "engineer",
        //   },
        // },
      },
    });

    if (!user) return res.status(500).send({ error: "Internal server error" });

    if (req.body.roles) {
      const roles = await prisma.role.findMany({
        where: {
          role: {
            in: req.body.roles,
          },
        },
      });

      if (!roles)
        return res.status(500).send({ error: "Internal server error" });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          roles: {
            connect: roles.map((role) => ({
              id: role.id,
            })),
          },
        },
      });
    }

    res.status(201).send({ message: "Berhasil mendaftar!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { nip, password } = req.body;

    if (!nip || !password)
      return res.status(400).send({ error: "Masukan semua data!" });

    const user = await prisma.user.findUnique({
      where: {
        nip: nip,
      },
    });

    if (!user) return res.status(400).send({ error: "NIP tidak terdaftar!" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ error: "Password salah!" });

    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    const updateRefreshToken = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    if (!updateRefreshToken)
      return res.status(500).send({ error: "Internal server error" });

    req.session.token = refreshToken;

    user.password = undefined;
    user.refreshToken = undefined;
    user.accessToken = accessToken;

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.session.token;

    if (!token) return res.status(200).send({ error: "Token not provided!" });

    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.status(401).send({ error: "Unauthorized!" });

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) return res.status(400).send({ error: "User not found!" });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: null,
        },
      });
    });

    req.session = null;
    res.status(200).send({ message: "Logout berhasil!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.session.token;

    if (!token) return res.status(401).send({ error: "Token not provided!" });

    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.status(403).send({ error: "Forbidden!" });

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          nip: true,
          nama: true,
          alamat: true,
          telp: true,
          jabatanId: true,
          refreshToken: true,
        },
      });

      if (!user) return res.status(404).send({ error: "User not found!" });

      if (!user.refreshToken)
        return res.status(404).send({ error: "Forbidden!" });

      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });

      user.refreshToken = undefined;
      user.accessToken = accessToken;

      res.status(200).send(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
