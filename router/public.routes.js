const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

// declare
const prisma = new PrismaClient();

router.post("/karyawan", async (req, res) => {
  const { nip, nama, alamat, telp } = req.body;
  if (!nip || !nama || !alamat || !telp)
    return res.status(400).send({ error: "Masukan semua data!" });
  const data = await prisma.karyawan.create({
    data: {
      nip: nip,
      nama: nama,
      alamat: alamat,
      telp: telp,
      jabatanId: 3,
    },
  });
  res.status(200).send(data);
})

router.post("/jabatan", async (req, res) => {
  const data = await prisma.jabatan.createMany({
    data: [
      {
        jabatan: "Kepala cabang",
      },
      {
        jabatan: "Administrasi",
      },
      {
        jabatan: "Engineer",
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
        sampel: "Air Laut",
      },
      {
        sampel: "Air Limbah",
      },
      {
        sampel: "Air Sungai",
      },
      {
        sampel: "Air Bersih",
      },
      {
        sampel: "Udara Ambient",
      },
      {
        sampel: "Kebisingan",
      },
      {
        sampel: "Getaran",
      },
      {
        sampel: "Kebauan",
      },
    ],
  });
  res.status(201).send(data);
});
router.get("/jenissampel", async (req, res) => {
  const data = await prisma.jenisSampel.findMany();
  res.status(200).send(data);
});

// status table default input
router.post("/status", async (req, res) => {
  const data = await prisma.status.createMany({
    data: [
      {
        status: "Di Proses",
      },
      {
        status: "Selesai",
      },
      {
        status: "Terlambat Selesai",
      },
    ],
  });
  res.status(201).send(data);
});

module.exports = router;
