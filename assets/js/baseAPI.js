// 1.开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// 2.测试环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net'
// 3.生产环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net'

// 拦截所有ajax请求：get、post、ajax；
// 处理参数：


$.ajaxPrefilter(function (options) {
    //1. 拼接对应环境的服务器地址
    // console.log(options);

    options.url = baseURL + options.url;

    // 2。身份认证
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 3.拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 1。清空本地token
            localStorage.removeItem('token');
            // 2.页面跳珠
            location.href = "/login.html";
        }

    }
})
