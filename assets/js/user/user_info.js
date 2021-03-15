$(function () {
    // 1.自定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 2 || value.length > 6) {
                return "昵称长度为2 - 6位之间！";
            }
        }
    });

    // 2.用户渲染
    initUserInfo();
    // 导出layer
    let layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            data: {},
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res, message);
                }
                // 成功后渲染
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 3.表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止重置
        e.preventDefault();
        // 从新用户渲染
        initUserInfo();
    });

    // 4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止浏览器默认行为 ， form表单的提交
        e.preventDefault();
        // 发送ajax，修改用户信息
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg('用户修改失败！')
                }
                layer.msg('恭喜您，用户信息修改成功！')
                window.parent.getUserInfo();
            }
        })
    })
})