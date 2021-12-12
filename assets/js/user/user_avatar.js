$(function(){
    //获取裁剪区域的dom元素
    var $image = $('#image');
    //配置选项
    const options = {
        //纵横比
        aspectRatio:1,
        //指定预览区域
        preview:'.img-preview'
    }
    //创建裁剪区域
    $image.cropper(options);
    $('#btnChooseImage').on('click',function(){
        $('#file').click();
    })
    //为文件选择框绑定change事件
    $('#file').on('change',function(e) {
        var filelist = e.target.files[0];
        var newImgURL = URL.createObjectURL(filelist);
        $image.cropper('destroy');
        $image.attr('src',newImgURL);
        $image.cropper(options);
    })
    //为确定按钮，绑定点击事件
    $('#btnUpLoad').on('click',function() {
    //1.要拿到用户裁剪之后的头像
    //2.调用接口，把头像上传到服务器上
        var dataURL = $image.cropper('getCroppedCanvas',{
            width:100,
            height:100
        }).toDataURL('image/png');
        $.ajax({
            method:'POST',
            url:'http://127.0.0.1:3007/my/update/avatar',
            data:{
                avatar:dataURL
            },
            headers:{
                Authorization: localStorage.getItem('token') || '',
            },
            success:function(res) {
                console.log(res);
                 if(res.status !== 0) {
                      return layui.layer.msg('更换头像失败！');
                 }
                 layui.layer.msg('更换头像!');
                 window.parent.getUserinfo();
            }
        })
    })
})