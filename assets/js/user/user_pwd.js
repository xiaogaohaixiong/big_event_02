$(function () {
    // 1.定义校验规则
    let form = layui.form;
    form.verify({
        // 1.原密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 2.新旧不重复
        samePwd: function (value) {
            // value 新密码，旧密码需要获取
            if (value == $('[name=oldPwd]').val()) {
                return '新密码和旧密码不能相同！';
            }
        },
        // 3.两次新密码要一致
        rePwd: function (value) {
            // value 是再次输入的新密码，上面的密码需要获取
            if (value !== $('[name=newPwd]').val()) {
                return '新密码和确认密码不一致！';
            }
        },

    });

    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if(res.status != 0){
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功！');
                $('.layui-form')[0].reset();
            }
        })
    })
})