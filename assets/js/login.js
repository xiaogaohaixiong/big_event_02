// 入口函数
$(function () {
    // 点击去注册账号，隐藏登录区域，显示注册区域
    $('.link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    // 点击去登录账号，隐藏注册区域，显示登录区域
    $('.link_login').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    })

    //自定义验证规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 选择器必须带空格，选择的是后代中的input，name属性值为password的那个标签
            let pwd = $(".reg_box input[name=password]").val()
            // 比较
            if (value != pwd) {
                return "两次密码输入不一致！"
            }
        }
    });


    // 注册功能
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val(),
            },
            success: (res) => {
                if (res.status != 0) {
                    // 返回状态判断
                    return layer.msg(res.message, { icon: 5 });
                }
                // 提交成功后处理代码
                $('.link_login').click();
                $('#form_reg')[0].reset();
            }
        })
    })

    // 登录功能（给form标签邦定事件，button按钮触发提交 事件）
    $('#form_login').submit(function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // 校验返回状态
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 提示信息，保存token，跳转页面

                // 保存token，未来的接口要使用token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = '/index.html';
            }
        })
    })
})