'use strict';

import express from 'express'
import api from '../controller/api'
const router = express.Router();
router.post('/getToken', api.getToken);

export default router