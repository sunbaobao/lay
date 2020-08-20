import Log from '../../models/log'

class LogCTL {
  constructor() {
  }

  /**插入日志
   * @req {req}
   *@res
   * @next
   * **/
  insertLog(req, res, next) {
    let { username, time, browser, description } = req.body
    Log.create({ username, IP:req.ip, browser, description }).then(function(doc) {
      if (doc) {
        res.tools.setJson(0, '插入成功')
      } else {
        res.tools.setJson(1, '插入失败')
      }
    })
  }

  /**查询日志
   * **/
  searchLog(req, res, next) {
    let { username = '', time = [] } = req.body
    let userArr = username.replace(',', '|')
    console.log('用户名，时间', username, time, userArr, req.ip)
    Log.find({
      username: new RegExp(userArr),
      time: { $gt: time[0], $lt: time[1] }
    }).then(function(doc) {
      console.log('查询数据库结果', doc)
      res.tools.setJson(0, '查询成功', doc)
    })
  }
}

export default new LogCTL()
