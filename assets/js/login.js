$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    // var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
    form.verify({
        'pwd': [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\S·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
                alert('用户名不能为敏感词');
                return true;
            }
        },
        wiped: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次输入的密码不匹配';
            }
        }
    })
    $('#form_reg').on('submit',function(e) {
        e.preventDefault();
        $.post('http://127.0.0.1:3007/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功!请登录');
            //模拟人的点击行为
            $('#link_login').click();
        })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:'http://127.0.0.1:3007/api/login',
            method:'POST',
            data:$(this).serialize(),//快速获取表单中的数据
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                console.log(res.token);
                localStorage.setItem('token',res.token);
                location.href = '/index.html';
            }
        })
    })
})
