
import fileUpload  from '../controller/demo/fileUpload';
import express from 'express';
const router = express.Router();
router.post('/options',function(res,req,next){
    res.status = 200;
    res.end();
});
router.post('/verify',fileUpload.handleVerifyUpload);
router.post('/merge',fileUpload.handleMerge);
router.post('/',fileUpload.handleFormData);

export default router;