OUYANG = {
    init: function (data) {
        $(".picFileUpload").each(function (i, e) {
            var _ele = $(e);
            _ele.siblings("div.pics").remove();
            _ele.after('\
          <div class="pics">\
              <ul></ul>\
          </div>');
            // 回显图片
            if (data && data.pics) {

                var imgs = data.pics.split(",");
                for (var i in imgs) {
                    if ($.trim(imgs[i]).length > 0) {
                        _ele.siblings(".pics").find("ul").append("<li><a href='" + imgs[i] + "' target='_blank'><img src='" + imgs[i] + "' width='80' height='50' /></a></li>");
                    }
                }
            }
            //给“上传图片按钮”绑定click事件
            $(e).click(function () {
                //当前表单对象
                var form = $(this).parents("form");
                //打开图片上传窗口
                KindEditor.editor(OUYANG.kingEditorParams).loadPlugin('multiimage', function () {

                    var editor = this;
                    editor.plugin.multiImageDialog({
                        clickFn: function (urlList) { //返回的url
                            var imgArray = [];
                            KindEditor.each(urlList, function (i, data) {
                                imgArray.push(data.url);
                                form.find(".pics ul").append("<li><a href='" + data.url + "' target='_blank'><img src='" + data.url + "' width='80' height='50' /></a></li>");
                            });

                            //将返回的url路径的数组追加至name=image 的input，join方法：数据以,隔开返回一个字符串
                            form.find("[name=image]").val(imgArray.join(","));
                            editor.hideDialog();
                        }
                    });
                });

            });

        });
    },
    //编辑器文件上传初始化参数
    kingEditorParams: {
        
        //指定上传文件请求的url。
        // uploadJson : '/manager/goods/uploadImageToNginx',
         uploadJson: '/Beasts/uploadFile',
        //指定上传文件参数名称
         filePostName: "uploadFile",
        //上传类型，分别为image、flash、media、file
        // dir: "media",

    }
}
