const router = require("express").Router();
const {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updatePasswordKaryawan,
  updateKaryawan,
  deleteKaryawan,
} = require("../controller/karyawan.controller");

router.get("/", getAllKaryawan);
router.get("/:id", getKaryawanById);

router.post("/", createKaryawan);

router.put("/:id/password", updatePasswordKaryawan);
router.put("/:id", updateKaryawan);

router.delete("/:id", deleteKaryawan);

module.exports = router;
