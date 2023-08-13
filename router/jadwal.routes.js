const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

// declare
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const data = await prisma.tiket.findMany({
      include: {
        user: true,
        jenisSampel: true,
        status: true,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
});

// post tiket
router.post("/", async (req, res) => {
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
      console.log("ygyuf");
      return res.status(500).send({ error: "Internal server error!" });
    }

    if (value.user) {
      value.user.map(async (userId, index) => {
        await prisma.tiket.update({
          where: {
            id: createdTiket.id,
          },
          data: {
            user: {
              connect: {
                id: userId.id,
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
                  id: jenisId.id,
                },
              },
            },
          });
        });
      }
    }

    res.status(200).send({ createdTiket });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error!" });
  }
});

// get tiket by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.tiket.findUnique({
      where: {
        id: id,
      },
      include: {
        status: true,
        user: true,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
});

// delete tiket
router.delete("/:id", async (req, res) => {
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
});

// update tiket
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.statusId;
  try {
    const data = await prisma.tiket.update({
      where: { id: id },
      data: { statusId: newStatus },
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error!" });
  }
});

module.exports = router;
