const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllKaryawan = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      include: {
        jabatan: true,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const getKaryawanById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.user.findUnique({
      where: { id: id },
      include: {
        jabatan: true,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const createKaryawan = async (req, res) => {
  try {
    const data = await prisma.user.create({ data: req.body });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const updateKaryawan = async (req, res) => {
  const id = req.params.id;
  const value = req.body;
  try {
    const data = await prisma.user.update({
      where: { id: id },
      data: {
        ...value,
        updateAt: new Date(),
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const updatePasswordKaryawan = async (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.password;
  try {
    const data = await prisma.user.update({
      where: { id: id },
      data: { password: newPassword },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const deleteKaryawan = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.user.delete({
      where: { id: id },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updatePasswordKaryawan,
  updateKaryawan,
  deleteKaryawan,
};
