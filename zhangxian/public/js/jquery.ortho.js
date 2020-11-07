jQuery.ortho = config => {
    let defaultConfig = {
        'boxWidth': 600, 'boxHeight': 600,  //窗口宽高
        'imgWidth': 600, 'imgHeight': 600,  //图片初始宽高
        'maxEdge': 6000,  //图像最大边长可放大的最大值
        'resizeFactor': 100,  //图像最大边长对应的缩放因子
    }, unitR = Math.PI / 180, newConfig = $.extend({}, defaultConfig, config);
    let $box = $('#ortho-box'), $ortho = $box.children('figure'), $links = $ortho.children('section');
    let [boxWidth, boxHeight] = [newConfig['boxWidth'], newConfig['boxHeight']];
    let [initImgWidth, initImgHeight] = [newConfig['imgWidth'], newConfig['imgHeight']];

    //链接固定效果
    $box.width(boxWidth).height(boxHeight);
    $ortho.width(initImgWidth).height(initImgHeight);
    multiLinksFix();
    function linkFix($link, orthoW, orthoH) {
        var theta = parseInt($link.attr('degree')) * unitR;
        var pointX = parseFloat($link.attr('point-left')) * orthoW;
        var pointY = parseFloat($link.attr('point-top')) * orthoH;
        var r = parseInt($link.attr('radius'));
        var [linkX, linkY] = [pointX + Math.sin(theta) * r, pointY - Math.cos(theta) * r];
        $link.css({'left': linkX, 'top': linkY});
    }
    function multiLinksFix() {
        var [orthoW, orthoH] = [$ortho.outerWidth(), $ortho.outerHeight()];
        $links.each(function(i, e) {
            linkFix($(e), orthoW, orthoH);
        });
    }

    //拖动效果
    $box.on({
        'mousedown': function(e) {
            e.preventDefault();
            var [disX, disY] = getMargin($ortho);
            var [disX_, disY_] = [disX, disY];
            var [x, y] = [e.offsetX, e.offsetY];
            //var offsetX = offsetY = 0, offsetFactor = 10;
            $(this).mousemove(function(e) {
                //disX += disX > 0 ? Math.floor(offsetFactor / (e.offsetX - x)) : e.offsetX - x;
                //disY += disY > 0 ? Math.floor(offsetFactor / (e.offsetY - y)) : e.offsetY - y;
                disX += e.offsetX - x;
                disY += e.offsetY - y;
                $ortho.css({'margin-left': disX, 'margin-top': disY});
            }).mouseup(function() {
                checkPosition();
                $(this).off('mousemove mouseup');
            });
        }, 'mouseout': function() {
            checkPosition();
            $(this).off('mousemove mouseup');
        }, 'selectstart': function(e) {
            e.preventDefault();
        }
    });
    function checkPosition() {
        var [left, top] = getMargin($ortho);
        var [right, bottom] = [boxWidth - ($ortho.outerWidth() + left), boxHeight - ($ortho.outerHeight() + top)];
        var [left_, top_] = [boxWidth - $ortho.outerWidth(), boxHeight - $ortho.outerHeight()];
        if(left > 0) $ortho.css('margin-left', 0);
        if(top > 0) $ortho.css('margin-top', 0);
        if(right > 0) $ortho.css('margin-left', left_);
        if(bottom > 0) $ortho.css('margin-top', top_);
    }
    function getMargin($e){
        return [parseInt($e.css('margin-left')), parseInt($e.css('margin-top'))];
    }

    //缩放效果
    let [maxEdge, resizeFactor] = [newConfig['maxEdge'], newConfig['resizeFactor']];
    let resizeWidthFactor, resizeHeightFactor, maxWidth, maxHeight;
    if(initImgWidth > initImgHeight) {
        [resizeWidthFactor, resizeHeightFactor] = [resizeFactor, initImgHeight / initImgWidth * resizeFactor];
        [maxWidth, maxHeight] = [maxEdge, initImgHeight / initImgWidth * maxEdge];
    } else {
        [resizeWidthFactor, resizeHeightFactor] = [initImgWidth / initImgHeight * resizeFactor, resizeFactor];
        [maxWidth, maxHeight] = [initImgWidth / initImgHeight * maxEdge, maxEdge];
    }
    console.log(resizeWidthFactor, resizeHeightFactor, maxWidth, maxHeight);
    $box.on('mousewheel DOMMouseScroll', function(e) {
        var data, offsetX, offsetY;
        if(e.originalEvent.wheelDelta) {  //谷歌内核
            data = e.originalEvent.wheelDelta;
            [offsetX, offsetY] = [e.offsetX, e.offsetY];
        } else { //火狐内核
            data = -e.originalEvent.detail;
            [offsetX, offsetY] = [e.originalEvent.layerX, e.originalEvent.layerY];
        }
        var [befLeft, befTop] = getMargin($ortho);
        var [befWidth, befHeight] = [$ortho.outerWidth(), $ortho.outerHeight()];
        var aftWidth = data > 0 ? befWidth + resizeWidthFactor : befWidth - resizeWidthFactor;
        var aftHeight = data > 0 ? befHeight + resizeHeightFactor : befHeight - resizeHeightFactor;
        $ortho.outerWidth(aftWidth).css('margin-left', befLeft + calMargin(befWidth, aftWidth, offsetX));
        $ortho.outerHeight(aftHeight).css('margin-top', befTop + calMargin(befHeight, aftHeight, offsetY));
        if(data < 0 && aftWidth < initImgWidth) {
            $ortho.outerWidth(initImgWidth);
            $ortho.outerHeight(initImgHeight);
        }
        if(data > 0 && aftWidth > maxWidth) {
            $ortho.outerWidth(maxWidth).css('margin-left', befLeft);
            $ortho.outerHeight(maxHeight).css('margin-top', befTop);
        }
        checkPosition();
        multiLinksFix();
    });
    function calMargin(d1, d2, p) {
        return (d1 - d2) * p / d1;
    }
};