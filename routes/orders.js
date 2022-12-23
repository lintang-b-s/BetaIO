import express from 'express';
const router = express();
import { index, approvePayment } from '../controllers/orders.js';

import { 
    authenticateUser,
  authorizeRoles,
  
} from "../middlewares/auth.js";

router.get(
    '',
    authenticateUser,
    authorizeRoles('admin', 'organizer', 'participant'),
    index
);



router.put(
  '/:id/:placeId/approve',
  authenticateUser,
  authorizeRoles('admin'),
  approvePayment

)




export default router;
