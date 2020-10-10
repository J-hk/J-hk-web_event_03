//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";

//拦截所有ajax请求：get/post/ajax
// 处理参数
$.ajaxPrefilter(function(option) {
    // 拼接对应环境的服务器地址
    option.url = baseURL + option.url;

    // 2.对需要权限的接口配置头信息
    //   必须以my开头才行
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 3.拦截所有响应，判断身份认证信息
    option.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 1.清空本地token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = "/login.html";
        }
    }
})