'use strict';
import express from 'express'
import log from '../controller/log/log'
const router = express.Router();
router.post('/log001', log.insertLog);
router.post('/log002', log.queryLog);
export default router
