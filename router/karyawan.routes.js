const router = require("express").Router();
const {
    addKaryawan, 
    getAllKaryawan,
    editKaryawan,
    getKaryawanById,
    deleteKaryawan
} = require("../controller/karyawan.controller");
const jwtVerify = require("../middlewares/jwtVerify");

router.get("/", jwtVerify, getAllKaryawan);
router.get("/:id", jwtVerify, getKaryawanById);

router.post("/", addKaryawan);

router.delete("/:id", deleteKaryawan);

router.put("/:id", editKaryawan)

module.exports = router;