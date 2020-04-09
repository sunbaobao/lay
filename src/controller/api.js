import request from 'request';
import qs from 'querystring';
import Token from '../models/Token';

class Api {
    constructor() {
        this.getToken = this.getToken.bind(this)
    }

    async getBdToken() {
        const param = qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': 'SnEO6ZblR8xDD5RyYMeaeQ3x',
            'client_secret': 'mEg6dy7W19QrfZ1GawGjUPe7Te8VW1GS'
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
        const tokenName = req.body.tokenName;
        if (tokenName && tokenName === "bdToken") {
            try {
                const token = await Token.find({tokenName: "bdToken"});
                if (token.length) {
                   if(token[0].expressIn<=Date.now()){
                       this.getBdToken().then(function (data) {
                           const dataJSon=JSON.parse(data)

                           token[0].save({
                               token: dataJSon.access_token,
                               tokenName:"bdToken",
                               expressIn: Date.now()+parseInt(data.expires_in)
                           });
                           res.tools.setJson(0, "获取成功", {
                               token:dataJSon.access_token,
                               tokenName
                           })
                       });
                   }else {
                       res.tools.setJson(0, "获取成功", {
                           token:token[0].token
                       })
                   }
                } else {
                    this.getBdToken().then(function (data) {
                        const dataJSon=JSON.parse(data);
                        Token.create({
                            token: dataJSon.access_token,
                            tokenName:"bdToken",
                            expressIn: Date.now()+parseInt(dataJSon.expires_in)
                        });
                        res.tools.setJson(0, "获取成功", {
                            token:dataJSon.access_token,
                            tokenName
                        })
                    });
                    // Token.create({
                    //
                    // })
                }

            } catch (e) {
                console.log(e);
                res.tools.setJson(1, "获取失败", {e})
            }
        }
    }
}

export default new Api()