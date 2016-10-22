/**
 * 使用了单例模式
 * 单例可以节省不必要的内存开销，屏蔽对象创建的复杂性
 * @type {{init: index.init, render: index.render, bind: index.bind}}
 */
var skin = {
    init: function() {
        var me = this;
        me.changeskin();

    },
    changeskin: function() {
        // 换肤

        //帮助函数
        var getDom = function(selector) {
            //根据传入参数的特征返回对应的dom对象
            if (selector.indexOf('.') == 0) {
                selector = selector.replace('.', '');
                return document.getElementsByClassName(selector);
            } else if (selector.indexOf('#') == 0) {
                selector = selector.replace('#', '');
                return document.getElementById(selector);
            } else {
                return document.getElementsByTagName(selector);
            }
        };


        //themeStorageHelper函数接收参数为get时返回当前主题颜色
        //否则设置当前主题
        var themeStorageHelper = function(option) {
            var theme;
            //如果浏览器不支持localStorage则使用cookie
            if (window.localStorage) {
                theme = localStorage;
            } else {
                theme = documentCookie;
            }

            if (option == 'get') {
                return theme.getItem('theme');
            }
            theme.setItem('theme', option);
            //检查偏好主题写入是否成功
            if (!themeStorageHelper('get') == option) {
                console.log('Write Prefer Theme Storage Failed!');
                return false;
            }
            return true;
        };
        //更换主题颜色
        var changeTheme = function(preColor, color) {
            var css = getDom('#color');
            var currentStyle = css.getAttribute('href');
            currentStyle = currentStyle.replace(preColor, color);
            css.setAttribute('href', currentStyle);
        };

        window.onload = function() {
            var con = getDom('.contents');
            //绑定click事件
            for (var i = 0; i < con.length; i++) {
                con[i].onclick = function() {
                    var toTheme = this.getAttribute('id');
                    changeTheme(themeStorageHelper('get'), toTheme);
                    themeStorageHelper(toTheme);
                }
            }
            if (!themeStorageHelper('get')) {
                //如果偏好设置不存在则默认为default
                themeStorageHelper('t1');
            } else {
                //如果存在偏好设置，则应用偏好设置
                changeTheme('t1', themeStorageHelper('get'));
            }
        };

    }

}
var index = {
    init: function(argument) {
        var me = this;
        me.render();
        me.bind();
        me.setupEvent();
    },
    render: function() {
        var me = this;
        me.gengduo = $(".gengduo");
        me.more = $("#more");
        me.change = $(".change");
        me.tchange = $(".t-change");
        me.slideup = $(".slideup");
        me.newsn = $(".news-n");
        me.xianshi = $(".xianshi");
        me.xianshi2 = $(".xianshi2");
        me.biaoqian = $(".biaoqian");


    },
    setupEvent: function() {
        var me = this;
        me.gengduo.bind("mouseover", function() { $("#more").show(); });
        me.gengduo.bind("mouseout", function() { $("#more").hide(); });

    },
    bind: function() {

        var me = this;
        me.newsn.each(function(index) {
            me.newsn.click(function() {
                // 移除样式
                $(".xianshi").removeClass("xianshi");
                $(".xianshi2").removeClass("xianshi2")
                    // 添加样式
                me.biaoqian.eq($(this).index()).addClass("xianshi");
                me.newsn.eq($(this).index()).addClass("xianshi2");
            })
        });



        // 点击换肤，切换换肤页面
        me.change.click('.change', function() {
            me.tchange.animate({
                top: '0'
            });
        });
        me.slideup.click('.slideup', function() {
            me.tchange.animate({
                top: '-500'
            });
        });




    }

};
skin.init();
index.init();
