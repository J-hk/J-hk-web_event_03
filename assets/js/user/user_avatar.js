$(function() {
    // 1.1获取剪裁区域的 DOM元素
    var $image = $('#image');
    // 1.2配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };
    // 1.3创建剪裁区域
    $image.cropper(options)

    // 2.选择文件
    $("#btnChooseImage").on("click", function() {
        $("#file").click();
    })

    // 3.修改剪裁图片
    var layer = layui.layer;
    $("#file").on("change", function(e) {
        // 3.1拿到用户选择的文件
        var file = e.target.files[0];
        // 前端非空校验
        if (file == undefined) {
            return layer.msg("请选择图片！")
        };
        // 3.2根据选择的文件，创建一个对应的 URL地址
        var newImgURL = URL.createObjectURL(file);
        // 3.3先销毁旧的剪裁区域，再重新设置图片路径，之后再创建
        $image
            .cropper('destroy') // 销毁旧的剪裁区域
            .attr('src', newImgURL) //重新设置图片路径
            .cropper(options) //重新初始化剪裁区域
    })

    // 4.上传头像
    $("#btnUpload").on("click", function() {
        // 获取base64类型的头像（字符串）
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个Canvas
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的
            // 发送 ajax
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您，更换头像成功！");
                window.parent.getUserInfo();
            }
        })
    })
})