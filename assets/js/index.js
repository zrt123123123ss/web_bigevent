$(function() {
    getUserinfo();
    $('#btnLogout').on('click',function(){
        //提示用户是否确认退出
        layer.confirm('确认退出登录吗？',{icon:3,title:'提示'},function(index) {
            //dosmthing
            //1.清空本地存储中的token
            localStorage.removeItem('token');
            //2.重新跳转到登录页面
            location.href = 'http://127.0.0.1:5500/login.html';
            layer.close(index);
        })
    })
})
function getUserinfo() {
    $.ajax({
        method:'GET',
        url:'http://127.0.0.1:3007/my/userinfo',
        headers:{
            Authorization: localStorage.getItem('token') || '',
        },
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');    
            }
            //调用renderAvatar渲染头像
            renderAvatar(res.data);
        },
        //不论成功还是失败，都会调用complete回调函数
        complete: function(res) {
            //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //强制清空token
                localStorage.removeItem('token')
                //强制跳转到登录页面
                location.href = 'http://127.0.0.1:5500/login.html';
            }
        }
    }
)}
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}