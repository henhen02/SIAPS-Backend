const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

// declare
const prisma = new PrismaClient();

router.post("/jabatan", async (req, res) => {
  const data = await prisma.jabatan.createMany({
    data: [
      {
        jabatan: "Kepala cabang",
      },
      {
        jabatan: "Engineer",
      },
      {
        jabatan: "Administrasi",
      },
    ],
  });
  res.status(201).send(data);
});

// jenissample tables default input
router.post("/jenissampel", async (req, res) => {
  const data = await prisma.jenisSampel.createMany({
    data: [
      {
        sampel: "Air limbah",
      },
      {
        sampel: "Air sungai",
      },
      {
        sampel: "Udara",
      },
      {
        sampel: "Udara ambient",
      },
      {
        sampel: "Oksigen",
      },
    ],
  });
  res.status(201).send(data);
});
router.get("/jenissampel", async (req, res) => {
  const data = await prisma.jenisSampel.findMany();
  res.status(200).send(data);
});
// roles tables default input
router.post("/roles", async (req, res) => {
  const data = await prisma.roles.createMany({
    data: [
      {
        role: "Engineer",
      },
      {
        role: "Admin",
      },
    ],
  });
  res.status(201).send(data);
});

// status table default input
router.post("/status", async (req, res) => {
  const data = await prisma.status.createMany({
    data: [
      {
        status: "diproses",
      },
      {
        status: "selesai",
      },
      {
        status: "terlambat selesai",
      },
    ],
  });
  res.status(201).send(data);
});

module.exports = router;
