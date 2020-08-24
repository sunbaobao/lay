import request from 'request';
import qs from 'querystring';
import Token from '../models/Token';
import setting from '../../settings.js';
class Api {
    constructor() {
        this.getToken = this.getToken.bind(this)
    }
    /**
     * 获取百度token
     * @type token类型
     */
    async getBdToken(type) {
        type = type || 'face';
        let key = setting.bdToken[type];
        if (!key) {
            return Promise.reject('未知的类型');
        }
        const param = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': key.client_id,
            'client_secret': key.client_secret
        });

        const url = 'http://aip.baidubce.com//oauth/2.0/token?' + param;
        // console.log(url)
        return new Promise(function (resolve, reject) {
            request({
                url: url,//请求路径
                method: "get",//请求方式，默认为get
            }, function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    resolve(body);
                }
            });
        })

    }

    async getToken(req, res, next) {
        let tokenName = req.body.tokenName;
        let type = req.body.tokenType || '';
        if (tokenName && tokenName === "bdToken") {
            tokenName = tokenName + type.trim();
            try {
                const token = await Token.find({ tokenName: tokenName });
                if (token.length) {
                    if (token[0].expressIn <= Date.now()) {
                        this.getBdToken(type).then(function (data) {
                            const dataJSon = JSON.parse(data)

                            token[0].save({
                                token: dataJSon.access_token,
                                tokenName: tokenName,
                                expressIn: Date.now() + parseInt(data.expires_in)
                            });
                            res.tools.setJson(0, "获取成功", {
                                token: dataJSon.access_token,
                                tokenName
                            })
                        });
                    } else {
                        res.tools.setJson(0, "获取成功", {
                            token: token[0].token
                        })
                    }
                } else {
                    this.getBdToken(type).then(function (data) {
                        const dataJSon = JSON.parse(data);
                        Token.create({
                            token: dataJSon.access_token,
                            tokenName: tokenName,
                            expressIn: Date.now() + parseInt(dataJSon.expires_in)
                        });
                        res.tools.setJson(0, "获取成功", {
                            token: dataJSon.access_token,
                            tokenName
                        })
                    }).catch(err => {
                        res.tools.setJson(1, "获取失败", err)
                    })
                }

            } catch (e) {
                console.log(e);
                res.tools.setJson(1, "获取失败", { e })
            }
        }
    }
}

export default new Api()