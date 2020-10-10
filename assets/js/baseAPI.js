//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";

//拦截所有ajax请求：get/post/ajax
// 处理参数
$.ajaxPrefilter(function(option) {
    // 拼接对应环境的服务器地址
    option.url = baseURL + option.url;
})