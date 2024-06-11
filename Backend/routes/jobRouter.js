import express from 'express';
import { getAlljobs, postJob, getMyJobs, updateJob, deletejob} from '../controllers/jobcontroller.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get('/getalljobs', getAlljobs);
router.post('/post', isAuthorized, postJob);
router.get('/getmyjobs', isAuthorized, getMyJobs);
router.put('/updatejob/:id',isAuthorized, updateJob);
router.delete('/deletejob/:id',isAuthorized, deletejob)

export default router;