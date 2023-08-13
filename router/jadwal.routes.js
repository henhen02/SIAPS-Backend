const router = require("express").Router();
const {
  getAllJadwal,
  createJadwal,
  getJadwalById,
  deleteJadwalById,
  updateJadwalById,
} = require("../controller/jadwal.controller");
const jwtVerify = require("../middlewares/jwtVerify");

router.get("/", jwtVerify, getAllJadwal);
router.get("/:id", getJadwalById);

router.post("/", createJadwal);

router.delete("/:id", deleteJadwalById);

router.put("/:id", updateJadwalById);

module.exports = router;
