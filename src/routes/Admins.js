import express from 'express';
import adminsControllers from '../controllers/Admins.js';

const router = express.Router();

router.get('/', adminsControllers.getAllAdmins);
router.get('/:id', adminsControllers.getAdminById);
router.post('/add', adminsControllers.createAdmin);
router.put('/update/:id', adminsControllers.editAdmin);
router.delete('/delete/:id', adminsControllers.deleteAdmin);

export default router;