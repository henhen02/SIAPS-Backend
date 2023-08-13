const express = require("express");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
dotenv.config();

// declare

const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const userRoutes = require("../router/user.routes");
const jadwalRoutes = require("../router/jadwal.routes");
const publicRoutes = require("../router/public.routes");
const authRoutes = require("../router/auth.routes");
const karyawanRoutes = require("../router/karyawan.routes")

app.use(express.json());
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  }, )
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/jadwal", jadwalRoutes);
app.use("/karyawan", karyawanRoutes);
app.use("/public", publicRoutes);

app.listen(PORT, () => {
  console.log("App listen to port " + PORT);
});
