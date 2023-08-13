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

router.post("/", jwtVerify, addKaryawan);

router.delete("/:id", jwtVerify, deleteKaryawan);

router.put("/:id", jwtVerify, editKaryawan)

module.exports = router;