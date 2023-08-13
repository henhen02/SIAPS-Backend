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
router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id/password", updatePasswordUser);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
