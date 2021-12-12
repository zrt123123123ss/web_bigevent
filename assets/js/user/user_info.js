$(function(){

  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    nickname:function(value) {
      if(value.length > 6) {
        return '昵称长度必须在1~6个字符之间';
      }
    }
  })


   initUserinfo();


  function initUserinfo() {
    $.ajax({
      method:'GET',
      url:'http://127.0.0.1:3007/my/userinfo',
      // 请求标头
      headers:{
        Authorization: localStorage.getItem('token') || '',
    },
      success: function(res) {
           if(res.status !== 0) {
               return layer.msg('获取用户信息失败！');
           }
           console.log(res);
           form.val('formUserinfo',res.data);
      }
    })
  }


  //重置表单的数据
  $('#btnReset').on('click',function(e){
      //阻止表单的默认重置行为
       e.preventDefault();
       initUserinfo();
  })

  //提交修改
  $('.layui-form').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'http://127.0.0.1:3007/my/userinfo',
      headers:{
        Authorization: localStorage.getItem('token') || '',
    },
      data:$(this).serialize(),
      success:function(res){
          if(res.status !== 0) {
            return layer.msg('更新用户信息失败！');
          }
          layer.msg('更新用户信息成功！');
          //调用父页面中的方法，重新渲染用户的头像和用户的信息
          window.parent.getUserinfo();
      }
    })
  })
})