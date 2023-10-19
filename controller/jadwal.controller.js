const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllJadwal = async (req, res) => {
  try {
    const data = await prisma.tiket.findMany({
      include: {
        karyawan: true,
        jenisSampel: true,
        status: true,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const getJadwalById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.tiket.findUnique({
      where: {
        id: id,
      },
      include: {
        status: true,
        karyawan: true,
        jenisSampel: true
      },
    });
    res.status(200).send(data);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const createJadwal = async (req, res) => {
  try {
    const value = req.body;

    if (!value) {
      res.status(400).send({ error: "Masukan data yang lengkap!" });
    }

    value.statusId = 1;
    value.tanggal = new Date(value.tanggal).toISOString();

    const createdTiket = await prisma.tiket.create({
      data: {
        instansi: value.instansi,
        lokasi: value.lokasi,
        tanggal: value.tanggal,
        pj: value.pj,
        kontak_pj: value.kontak_pj,
        statusId: value.statusId,
      },
      select: {
        id: true,
      },
    });

    if (!createdTiket) {
      return res.status(500).send({ error: "Internal server error!" });
    }

    if (value.karyawan) {
      value.karyawan.map(async (karyawanId, index) => {
        await prisma.tiket.update({
          where: {
            id: createdTiket.id,
          },
          data: 
              {
              karyawan: {
                connect: {
                  id: parseInt(karyawanId.id),
                },
              },
            },
        });
      });
      if (value.jenisSampel) {
        value.jenisSampel.map(async (jenisId, index) => {
          await prisma.tiket.update({
            where: {
              id: createdTiket.id,
            },
            data: {
              jenisSampel: {
                connect: {
                  id: parseInt(jenisId.id),
                },
              },
            },
          });
        });
      }
    }

    res.status(200).send({ createdTiket });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
};

const deleteJadwalById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.tiket.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

const updateJadwalById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.tiket.update({
      where: { id: id },
      data: { statusId: 2 },
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
};

module.exports = {
  getAllJadwal,
  createJadwal,
  getJadwalById,
  deleteJadwalById,
  updateJadwalById,
};
