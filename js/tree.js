let treeRender = (function () {
    let $menu = $('.menu');

    //=> 事件委托实现tree展开或者收起
    let bindEvent = function () {
        $menu.on('click', function (e) {
           //=> JQ中已经把事件对象处理兼容了（以后直接按照标准浏览器的语法使用即可）
            let target = e.target,
                tarTag = target.tagName,
                $target = $(target);
            //=> 点击em或者h3做相同的事情，我们首先把事件源统一：如果点击的是em，我们让target也等于h3，此时我们后续在操作的时候，我们都以h3为标准操作即可
            if (tarTag === 'EM') {
                target = target.parentNode;
                tarTag = target.tagName;
                $target = $(target);
            }

            //=> 如果当前的target是h3，我们进行相关处理
            if (tarTag === 'H3') {
                let $next = $target.next();
                if ($next.length === 0) return; //=> 当前H3所在层级没有下一级ul，我们不需要处理

                let $em = $target.children('em');
                if ($em.hasClass('plus')) {
                    //=> 说明当前是折叠的结构，我们需要展开结构
                    //=> 1/显示下一级结构
                    $next.stop().slideDown('fast');

                    //=> 获取em，让em变成减号
                    $em.removeClass('plus').addClass('minus');
                } else {
                    //=> 说明当前是展开的结构，我们需要折叠结构
                    //=> 1/显示下一级结构
                    $next.stop().slideUp('fast', function() {
                        //=> 动画完成后执行的操作
                        //=> 当把当前层级收起的额时候：我们需要把它后代中相关层级也一并收起，这样再次展开当前层级，后代层级默认收起
                        //=> this就是当前收起的ul $(this) <=> $next
                        $(this).find('ul').css('display', 'none')
                        $(this).find('em').removeClass('minus').addClass('plus');
                    });

                    //=> 获取em，让em变成减号
                    $em.removeClass('minus').addClass('plus');


                }


            }

        })
    };

    return {
        init: function () {
            bindEvent();
        }
    }
})();
treeRender.init();