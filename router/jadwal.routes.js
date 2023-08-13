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
router.get("/:id", jwtVerify, getJadwalById);

router.post("/", jwtVerify, createJadwal);

router.delete("/:id", jwtVerify, deleteJadwalById);

router.put("/:id", jwtVerify, updateJadwalById);

module.exports = router;
