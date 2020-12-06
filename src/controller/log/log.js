import log from '../../models/loginLog';

class Log {
    constructor() {

    }

    /**
     * 插入日志
     * @returns {Promise<void>}
     */
    async insertLog(req, res, next) {
        let { username, time, IP, browser, description}=req.body
        log.create({
            username, time, IP, browser, description
        }).then(function (){
            res.tools.setJson(0,'记录成功')
        },function (err){
            res.tools.setJson(1,'记录失败')
        })
    }

    async queryLog(req, res, next) {
        res.tools.setJson(0,'记录成功')
    }
}

export default new Log()