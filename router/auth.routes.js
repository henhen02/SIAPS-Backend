const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", logout);
router.get("/refresh", refreshToken);

module.exports = router;
