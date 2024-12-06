const express = require ('express');
const router = express.Router();
const { getAllEmp, addEmp, updateEmp, deleteEmp } = require('../controller/userController');
const { registerUser, loginUser } = require('../controller/authController');
const { authenticate } = require('../middleware/authMiddleware');

// public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// protected routes
router.get("/getAll", authenticate, getAllEmp);
router.post("/addEmp", authenticate, addEmp);
router.put("/emp/:empId", authenticate, updateEmp);   // takes parameter after /emp
router.delete("/emp/:empId", authenticate, deleteEmp);

module.exports = router;
