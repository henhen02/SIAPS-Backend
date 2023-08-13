const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updatePasswordUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const jwtVerify = require("../middlewares/jwtVerify");

router.get("/", jwtVerify, getAllUser);
router.get("/:id", jwtVerify, getUserById);

router.post("/", jwtVerify, createUser);

router.put("/:id/password", jwtVerify, updatePasswordUser);
router.put("/:id", jwtVerify, updateUser);

router.delete("/:id", jwtVerify, deleteUser);

module.exports = router;
