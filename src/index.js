const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// declare
const prisma = new PrismaClient();
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const karyawanRoutes = require("../router/karyawan.routes");
const jadwalRoutes = require("../router/jadwal.routes");
const publicRoutes = require("../router/public.routes");

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
dotenv.config();

app.use("/karyawan", karyawanRoutes);
app.use("/jadwal", jadwalRoutes);
app.use("/public", publicRoutes);

app.listen(PORT, () => {
  console.log("App listen to port " + PORT);
});
