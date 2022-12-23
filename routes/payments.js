import express from "express";
const router  = express();
import { create, destroy, index} from "../controllers/payments.js";
import  { authenticateUser, authorizeRoles } from "../middlewares/auth.js"
router.get('/', authenticateUser,authorizeRoles('admin', 'organizer', 'participant'),index);

router.delete(
    '/:id',
    authenticateUser,authorizeRoles('admin', 'organizer', 'participant'),
    destroy
  );

router.post('/',authenticateUser,authorizeRoles('admin', 'organizer', 'participant'), create);


export default router;
  

