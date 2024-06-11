import express from 'express';
import { isAuthorized } from '../middlewares/auth.js';
import { employerGetAllapplications, jobseekerGetAllapplications, jobseekerDeleteTheirApplication, postApplication } from '../controllers/applicationcontroller.js'

const router = express.Router();

router.get('/employergetallapplications', isAuthorized, employerGetAllapplications);
router.get('/jobseekergetallapplications/:id', isAuthorized, jobseekerGetAllapplications);
router.delete('/deleteapplication/:id', isAuthorized, jobseekerDeleteTheirApplication);
router.post('/post', isAuthorized, postApplication)

export default router;