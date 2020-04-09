'use strict';
import express from 'express'
import user from '../controller/user/user'
const router = express.Router();
router.post('/wechat/sign/up', user.wechatSignUp);
router.post('/wechat/sign/in', user.wechatSignIn);
router.post('/wechat/decrypt/data', user.wechatDecryptData);
router.post('/sign/up', user.signUp);
router.post('/sign/in', user.signIn);
router.post('/sign/out', user.signOut);
router.post('/reset/password', user.resetPassword);
router.post('/info', user.saveInfo);
router.get('/info', user.getInfo);
router.get('/allUser', user.getAllUser);
export default router;
