const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const redirectLogin = require("../middleware/redirectLogin");

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/logout", authController.logout);
router.get("/home", redirectLogin, (req, res) => {
	return res.status(200).json({
		message: "user fetched",
		data: req.session.user,
	});
});

router.patch("/home/add", redirectLogin, taskController.addTask);
router.patch("/home/delete/:id", redirectLogin, taskController.deleteTask);
router.patch("/home/share", redirectLogin, taskController.shareTask);
router.patch("/home/reject/:id", redirectLogin, taskController.rejectTask);
router.patch("/home/accept/:id", redirectLogin, taskController.acceptTask);

module.exports = router;
