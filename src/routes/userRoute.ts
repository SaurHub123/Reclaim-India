import express  from "express";
import * as controller from '../controllers/usercontroller';
import { verifyToken } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { ROLES } from "../models/userModel";

const router = express.Router();

router.post('/login', controller.login as any);

router.get('/admin', verifyToken as any, authorize([ROLES.ADMIN]) as any, controller.getAdminData);
router.get('/user', verifyToken as any, authorize([ROLES.ADMIN, ROLES.USER]) as any, controller.getUserData);
router.get('/guest', verifyToken as any, authorize([ROLES.ADMIN, ROLES.USER, ROLES.GUEST]) as any, controller.getGuestData);

export default router;