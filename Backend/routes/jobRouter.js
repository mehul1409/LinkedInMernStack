import express from 'express';
import { getAlljobs, postJob, getMyJobs} from '../controllers/jobcontroller.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get('/getalljobs', getAlljobs);
router.post('/post', isAuthorized, postJob);
router.get('/getmyjobs', isAuthorized, getMyJobs);

export default router;