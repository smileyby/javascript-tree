let treeRender = (function () {
    function getClass(className) {
        return document.getElementsByClassName(className)[0];
    }
    function next(node, flag) {
        //=> 获取当前元素的下一个元素节点，没有则返回null
        let nextNode = node.nextSibling,
            nextType = nextNode.nodeType,
            nodeType = node.nodeType;
        if (nodeType === 1 && flag){
            return node;
        }

        if (nextType === 1) {
            return nextNode;
        }
        return next(nextNode, true);

    }
    function getChildNode(context, tag) {
        return context.getElementsByTagName(tag);
    }
    let $menu = getClass('menu');
    let bindEvent = function () {
        $menu.addEventListener('click', function (e) {
            //=> 监听事件源，并把事件源统一到h3上
            e = e || window.event;
            let target = e.target,
                tarTag = target.tagName;
            if (tarTag === 'EM'){
                target = target.parentNode;
                tarTag = target.tagName;
            }
            if (tarTag === 'H3'){
                let $next = next(target);
                if (!$next) return;
                let $h3Em = getChildNode(target, 'em')[0];
                let isPlus = $h3Em.getAttribute('class').indexOf('plus') > -1;
                let $ems = getChildNode($next, 'em');
                if (isPlus){
                    $h3Em.setAttribute('class', 'minus');
                } else {
                    $h3Em.setAttribute('class', 'plus');
                }

                if ($ems){
                    if (isPlus){
                        $next.style.display = 'block';
                        let ulClassName = $next.getAttribute('class');
                        $next.setAttribute('class', ulClassName + ' anim-opacity');
                    } else {
                        //=> 关闭的时候，不仅要关闭当前的还要关闭当前菜单下面所有的子级别全部菜单
                        let childrenUl = getChildNode(target.parentNode, 'ul');
                        let childrenEm = getChildNode(target.parentNode, 'em');

                        for (let i = 0; i < childrenUl.length; i += 1){
                            childrenUl[i].style.display = 'none';
                            childrenEm[i].setAttribute('class', 'plus');
                        }
                    }
                }
            }
        }, false);
    };
    return {
        init: function(){
            bindEvent();
        }
    }
})();
treeRender.init();