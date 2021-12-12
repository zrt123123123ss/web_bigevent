$(function(){
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samePwd: function(value){
            if(value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if(value !== $('[name=rePwd]').val()) {
                return '两次输入的新密码不同！'
            }
        }
    })
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:3007/my/updatepwd',
            headers:{
                Authorization: localStorage.getItem('token') || '',
            },
            data:$(this).serialize(),
            success:function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                localStorage.removeItem('token');
                window.parent.location.href = 'http://127.0.0.1:5500/login.html';
            }
        })
    })
})