// jshint -W030

// 一级菜单
var FIRST_MENU_TPL = '<ul class="first-menu l clearfix" id="firstmenu">{{#items}}<li class="item-first l {{#selected}}select{{/selected}}" data-id="{{code}}" data-url="{{url}}" data-openType="{{openType}}" data-hassub="{{hasSub}}">{{name}}</li>{{/items}}</ul> <a href="javascript:void(0)" class="menu-down {{#hideTrigger}}hidden{{/hideTrigger}} l"></a>',

    // 快捷菜单模板
    QUICK_MENU_TPL = '<li class="quick-menu-item" data-code="{{code}}" data-url="{{url}}" data-opentype="{{openType}}">{{name}}</li>',

    // 菜单搜索列表模板
    SEARCH_MENU_TPL = '<li class="menu-search-item" data-code="{{code}}" data-url="{{url}}" data-opentype="{{openType}}">{{{name}}}</li>',

    // 底部tab
    BOTTOM_TAB_ITEM = '<li class="tabs-nav-item" id="tab-{{id}}" data-id="tab-{{uid}}" data-target="tab-content-{{id}}"><span class="tabs-nav-name" title="{{name}}">{{name}}</span> {{#refresh}}<span class="tabs-nav-item-refresh"></span>{{/refresh}} {{#closeIcon}}<i class="tabs-nav-item-close"></i>{{/closeIcon}}</li>',

    // 底部tab项内容页模板
    TAB_NAV_CONTENT_TPL = '<iframe class="tab-content hidden" id="tab-content-{{id}}" src="{{url}}" height="100%" width="100%" frameborder="0" scrolling="no"></iframe>',

    // 底部tab列表模板
    TAB_SLIDE_TPL = '<li class="slide-list-item" id="tab-{{id}}" data-id="tab-{{uid}}">{{name}}</li>',

    // 底部tab ContextMenu模板(右键)
    CONTEXT_MENU_TPL = '<div class="context-menu hidden" id="{{id}}"><ul>{{#items}}{{#text}}<li><a class="menu-item" role="{{role}}" href="javascript:void(0);"><span class="item-txt">{{text}}</span></a></li>{{/text}}{{^text}}<li class="sep"></li>{{/text}}{{/items}}</ul></div>',

    // 皮肤模板
    SKIN_TPL = '<div class="skin-choose  {{#selected}}{{selected}}{{/selected}}" data-name="{{name}}" style="background-color:{{color}}" title="{{name}}"><i class="choose-skin"></i></div>',

    //新-左侧菜单列表模板
    LIST_TPL = '{{#list}}<div class="{{^level}}left-bar-first{{/level}} {{#level}}left-bar-extend{{/level}} bar-item extend-leve{{level}}" data-level="{{level}}" >{{#tab}}<ul class="{{#level}}left-bar-content{{/level}} {{pid}}">{{#data}} <li class="common-item" data-num="0" data-ref="{{id}}" title="{{name}}" data-name="{{name}}" data-id="{{code}}" data-haschild="{{hasChild}}" data-opentype="{{openType}}" data-url="{{url}}">{{^level}}<i class="modicon-icon-left {{#icon}}{{icon}}{{/icon}}{{^icon}}modicon-1{{/icon}}"></i>{{/level}} <span class="left-text">{{name}}</span>{{#hasChild}}<i class="icon-arrow-right"></i>{{/hasChild}}</li>{{/data}}</ul>{{/tab}}</div>{{/list}}',
    // 消息列表模板
    MSG_TPL = '{{^hasHead}}<div class="msg-category" data-code="{{code}}"><h3 class="msg-category-head"data-url="{{url}}"data-title="{{name}}"><span class="msg-category-title" title="{{name}}">{{{name}}} (<span class="msg-category-num">{{num}}</span>)</span><i class="msg-category-remove" title="忽略全部"></i></h3><ul class="msg-list">{{/hasHead}}{{#items}}<li class="msg-list-item {{#hasNew}}newmsg{{/hasNew}}" data-url="{{url}}" data-guid="{{guid}}" data-title="{{title}}" data-opentype="{{openType}}"><span class="msg-item-text" title="{{title}}">{{{name}}}</span><span class="msg-item-date">{{date}}</span><i class="msg-item-ignore" title="忽略"></i></li>{{/items}}{{^hasHead}}</ul></div>{{/hasHead}}',
    // 消息搜索结果模板
    MSG_SRH_TPL = '<div class="msg-srh-category"><h4 class="msg-srh-head" data-code="{{code}}"><span class="msg-head-text">{{{name}}}</span></h4><ul class="msg-srh-list">{{#items}}<li class="msg-srh-item" data-url="{{url}}" data-guid="{{guid}}" data-title="{{title}}" data-opentype="{{openType}}"><span class="msg-item-text" title="{{title}}">{{{resultName}}}</span><span class="msg-item-date">{{date}}</span></li>{{/items}}</ul>{{#hasMore}}<p class="msg-srh-more"><a class="msg-shr-morelink" href="javascript:void(0);" data-url="{{moreUrl}}">查看更多&gt;</a></p>{{/hasMore}}</div>',
    // 消息搜索历史记录模板
    MSG_HISTORY_TPL = '<li class="msg-srh-item history" data-title="{{name}}"><span class="msg-item-text" title="{{name}}">{{name}}</span><i class="msg-item-remove" title="删除记录"></i></li>',
    // 组织搜索结果模板
    ORG_SRH_TPL = '<div class="msg-srh-category"><h4 class="msg-srh-head" data-code="{{code}}"><span class="msg-head-text">{{name}}</span></h4><ul class="msg-srh-list">{{#items}}<li class="msg-srh-item" data-guid="{{guid}}" data-title="{{name}}"><i class="msg-org-people"></i><span class="msg-item-text msg-org" title="{{name}}">{{{resultName}}}</span><i class="msg-org-email" title="发送邮件"></i><i class="msg-org-emsg" title="发送消息"></i></li>{{/items}}</ul></div>',
    // 组织搜索历史记录模板
    ORG_HISTORY_TPL = '<li class="msg-srh-item history" data-title="{{name}}"><i class="msg-org-people"></i><span class="msg-item-text" title="{{name}}">{{name}}</span><i class="msg-item-remove" title="删除记录"></i></li>',
    // Emsg最近聊天会话模板
    EMSG_RECENT_TPL = '{{#items}}<li class="emsg-recent-item {{^hasRead}}newmsg{{/hasRead}}" data-sessionid="{{sessionId}}" data-uid="{{uid}}" data-type="{{type}}"><div class="emsg-user-img"><img src="{{imgUrl}}" onerror="this.onerror=\'\';this.src=\'../emsg/images/emsg-user-error.jpg\';" /></div><div class="emsg-recent-record"><h2><span class="emsg-user-name" title="{{name}}">{{name}}</span>{{^hasRead}}<i class="emsg-not-read"></i>{{/hasRead}}<span class="emsg-recent-date">{{date}}</span></h2><p class="emsg-recent-message">{{message}}</p>{{^hasRead}} <span class="emsg-ignore-icon">忽略</span>{{/hasRead}}</div></li>{{/items}}';

    
// 顶部菜单容器
var $topMenu = $("#top-menu"),

    $quickMenu = $('#quick-menu'),

    $leftContainer = $("#left-menu"),

    // 页面遮罩 
    $pageCover = $('#page-cover'),

    // 右侧消息
    $msgPanel = $('#msg-panel'),

    $dropBox = $('#bottom-drop'),
    $dropPanel = $('#bottom-slide-box'),

    $userInfo = $("#top-user"),

    $bgImg = $("#bg-img");


// 加载niceSrooll
var _getNiceSroll_xhr,
    _getNiceSroll_cbs = [];
var _getNiceSroll_ = function (cb) {
    if ($.fn.niceScroll) {
        cb();
    } else if (_getNiceSroll_xhr) {
        // 请求已发送但未返回成功，就不需要再重复发请求了
        // 把回调记住，等请求成功后遍历执行回调
        _getNiceSroll_cbs.push(cb);
    } else {
        _getNiceSroll_xhr = Util.ajax({
            url: '/fui/js/lib/jquery.nicescroll.min.js',
            dataType: 'script'
        }).done(function () {
            for (var i = 0, l = _getNiceSroll_cbs.length; i < l; i++) {
                _getNiceSroll_cbs[i]();
            }
            _getNiceSroll_cbs = [];
        });
        _getNiceSroll_cbs.push(cb);
    }
};

//加载toolBar 
var _toolbar_xhr,
    _toolbar_cbs = [];
var _toolBar_ = function (cb) {
    if ($.ToolBar) {
        cb();
    } else if (_toolbar_xhr) {
        // 请求已发送但未返回成功，就不需要再重复发请求了
        // 把回调记住，等请求成功后遍历执行回调
        _toolbar_cbs.push(cb);
    } else {
        _toolbar_xhr = Util.ajax({
            url: '/fui/js/lib/toolbar.js',
            dataType: 'script'
        }).done(function () {
            for (var i = 0, l = _toolbar_cbs.length; i < l; i++) {
                _toolbar_cbs[i]();
            }
            _toolbar_cbs = [];
        });
        _toolbar_cbs.push(cb);
    }
};


// 设置背景图片
// var loadBgImg = function () {
//     var skin = mini.Cookie.get('_grace_skin_') || 'default';
//     var src = './skins/' + skin + '/images/bg.png';
//     var image = new Image();
//     image.src = src;
//     image.onload = function () {
//         $bgImg[0].src = src;
//     };
// };

var loadBgImg = function (src) {
    var image = new Image();
    image.src = src;
    image.onload = function () {
        $bgImg[0].src = src;
    };
};

// $(loadBgImg);


// 用户信息 和 界面信息
(function (win, $) {
    var $logo = $("#logo-img"),

        $headImg = $("#head-img"),
        $dropHeadImg = $('#drop-head-img');

    // 隐藏用户下拉面板
    var hideUserPanel = function () {
        $userInfo.removeClass("showPanel");
        $pageCover.addClass("hidden");
    };

    $userInfo
        // 用户头像点击
        .on("click", ".head-img", function () {
            if (!$userInfo.hasClass("showPanel")) {
                $userInfo.addClass("showPanel");
                $pageCover.removeClass("hidden");
            } else {
                hideUserPanel();
            }
        })
        // 个人资料、界面配置、功能配置
        .on('click', '.setting-item', function () {
            var target = $(this).data('target');
            TabsNav.addTab(userTabData[target]);
            hideUserPanel();
        })
        // 用户注销
        .on("click", '.loginout', function () {
            mini.confirm('您确定要退出系统吗？', '系统提示', function (action) {
                if (action == 'ok') {
                    eMsgSocket && eMsgSocket.close();
                    UserSettins.logout();
                }
            });
            hideUserPanel();
        })
        // 兼职切换
        .on("click", ".role-change", function () {
            hideUserPanel();
            // 兼职切换函数
            UserSettins.changeRole(_userGuid_);
        });

    // 三个按钮
    var userTabData = {
        'personal': {
            name: '个人资料',
            url: UserSettins.datum,
            id: 'personal-datum'
        },
        'page': {
            name: '界面配置',
            url: UserSettins.interfaceUrl,
            id: 'personal-interface'
        },
        'function': {
            name: '功能配置',
            url: UserSettins.functionUrl,
            id: 'personal-function'
        }
    };

    var loadImg = function (url, el) {

        var img = new Image();

        img.onload = function () {
            el.src = url;
        };

        img.onerror = function () {
            console.error(url + '对应的图片资源无法加载！');
        };

        img.src = url;
    };

    // 获取用户信息
    Util.ajax({
        type: 'POST',
        dataType: 'json',
        url: UserSettins.userInfo,
        data: {
            query: "init-header"
        }
    }).done(function (data) {
        // 用户guid和name是E讯必须要使用的 需要记录下来
        win._userName_ = data.userName;
        win._userGuid_ = data.userGuid;
        
        eMsgSocket = new EMsgSocket(_userGuid_, _userName_);

        var title = data.title,
            homeName = data.homeName,
            homeUrl = data.homeUrl,

            bgImg = data.bgImg;

        if (title) {
            document.title = title;
            win.systemTitle = title;
        }

        //设置logo
        loadImg(Util.getRightUrl(data.logoImg || win.DEFAULT_LOGO_URL), $logo[0]);

        // 设置背景图片
        if (bgImg) {
            loadBgImg(Util.getRightUrl(bgImg));
        }

        // 加载首页
        var actualHomes = [],
            hasActiveHome = false;

        if (!win.FixedTabs || FixedTabs.length === 0) {
             if (homeName && homeUrl) {
                actualHomes.push({
                    id: 'home',
                    name: homeName,
                    url: homeUrl
                });
            }
            hasActiveHome = true;
        } else {
            actualHomes = FixedTabs;
            hasActiveHome = true;
        }

        // 遍历完成 在homes中没有 则提醒
        if (!hasActiveHome && homeUrl) {
            epoint.alert('门户地址配置不正确');
        }

        $.each(actualHomes, function (i, item) {
            TabsNav.addTab({
                id: item.id || ("home-" + i),
                url: item.url,
                name: item.name,
                closeIcon: false,
                refresh: true
            }, false);
        });



        // 兼职
        if (data.hasParttime) {
            $userInfo.find('.cancel-out').addClass("hasRoles");
        }

        var $usertxt = $(".user-txt");
        $usertxt.find(".username").text(_userName_);
        if(data.ouName) {
            $usertxt.find(".departname").text(data.ouName);
        }
    });


}(this, jQuery));

// var menuRecord = {}, menuItems;

// 顶部菜单
(function (win, $) {

    // 菜单项目事件
    $topMenu.on("click", ".item-first", function () {
            var $this = $(this),
                guid = $this.data("id"),
                url = $this.data("url"),
                hasSub = $this.data('hassub'),
                name = $this.text(),
                opentype = $this.data("opentype");

            $this.addClass("select").siblings().removeClass("select");

            if (url) {
                if (opentype === 'tabsnav') {
                    TabsNav.addTab({
                        id: guid,
                        name: name,
                        url: url
                    });
                } else {
                    win.open(Util.getRightUrl(url), guid);
                    // 新窗口打开 则不必保留顶级菜单的激活状态
                    // 因为 切换回来时没有左侧菜单的 无对应关系
                    $this.removeClass("select");
                }
            }
            // 有子菜单则加载子菜单
            if (hasSub) {
                win.getLeftMenu(guid, name);
            } else {
                // 没有则 隐藏左侧 
                win.hideLeftMenu();
            }

            // 点击后收起面板
            if ($topMenu.hasClass("showPanel")) {
                $topMenu.removeClass("showPanel");
                $pageCover.addClass("hidden");
            }
        })
        // 下拉按钮
        .on("click", ".menu-down", function () {
            if (!$topMenu.hasClass("showPanel")) {
                $topMenu.addClass("showPanel");
                $pageCover.removeClass("hidden");
            } else {
                $topMenu.removeClass("showPanel");
                $pageCover.addClass("hidden");
            }
        });
    // 大屏幕时 显示为5个 8 个 10 个
    var $trigger,
        resizeTimer,
        ITEM_WIDTH = 95;

    $(win).on('resize.topMunu', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var l = $topMenu.find('.item-first').length,
                c_width = $topMenu.find('#firstmenu').width();
            if (l * ITEM_WIDTH > c_width) {
                $trigger.removeClass('hidden');
            } else {
                $trigger.addClass('hidden');
            }
        }, 200);
    });
    var getNumBySize = function (size) {
        // ie 8 不支持媒体查询
        if (Util.browsers.isIE8 || Util.browsers.isIE67) {
            setTimeout(_renderStyleInIe8, 20);
        }
        if (size >= 1800) {
            return 10;
        } else if (size >= 1500) {
            return 8;
        } else {
            return 5;
        }
    };
    // 解决ie8下不支持媒体查询的问题
    var _renderStyleInIe8 = function () {
        // IE8不用在resize时调整大小
        $(win).off('resize.topMunu');
        // 初始化时样式
        var size = $(win).width();
        if (size >= 1800) {
            $topMenu
                .css({
                    'width': '994px',
                    'margin-left': '-497px'
                })
                .find('#firstmenu').css({
                    'width': '950px'
                });
            return;
        } else if (size >= 1500) {
            $topMenu
                .css({
                    'width': '804px',
                    'margin-left': '--402px'
                })
                .find('#firstmenu').css({
                    'width': '760px'
                });
            return;
        } else {
            return;
        }
    };
    // 获取顶级菜单
    Util.ajax({
        type: 'POST',
        dataType: 'json',
        url: Menu.topMenu,
        data: {
            query: "init-sidebarNav-top"
        }
    }).done(function (res) {
       // if (!data || !data.items) return;
      
       $(res).each(function(index,item) {
            item.openType = item.isBlank ? "blank" : "tabsnav";
       });

        var data = {
                items:[]
        }
        data.items = res;

        //menuItems = data.items;

        var defaultCode = data.code,
            topMenuName = '',
            hasSub;
        // defaultCode 高亮 没有则取第一个
        if (defaultCode) {
            for (var i = 0, l = data.items.length; i < l; i++) {
                var item = data.items[i];
                if (item.code == defaultCode) {
                    item.selected = true;
                    topMenuName = item.name;
                    hasSub = item.hasSub;
                    break;
                }
            }
        } else {
            data.items[0].selected = true;
            defaultCode = data.items[0].code;
            topMenuName = data.items[0].name;
            hasSub = data.items[0].hasSub;
        }


        // //存code对应的下标
        // for(var j = 0,len = menuItems.length; j < len; j++) {
        //     menuRecord[menuItems[j].code] = j;
        // }

        // 小于5、8、10个则不显示trigger
        if (data.items.length <= getNumBySize($(win).width())) {
            data.hideTrigger = true;
        }

        var html = Mustache.render(FIRST_MENU_TPL, data);

        $topMenu.html(html);

        // 渲染完成后 记录切换按钮 
        $trigger = $topMenu.find('.menu-down');

        if (hasSub) {
            // 自动加载子菜单
            win.getLeftMenu(defaultCode, topMenuName);

        }

    });

}(this, jQuery));

// 快捷菜单
(function (win, $) {
    var $panel = $('.quick-menu-panel', $quickMenu),
        $list = $('.quick-menu-list', $quickMenu);

    $quickMenu.on('click', '.quick-menu-title', function () {
        if ($quickMenu.hasClass('open')) {
            // $quickMenu.removeClass('open');
            // $pageCover.addClass("hidden");
        } else {
            $quickMenu.addClass('open');
            $pageCover.removeClass("hidden");
        }
    }).on('click', '.quick-menu-item', function () {
        var $this = $(this),
            url = $this.data('url'),
            code = $this.data('code'),
            name = $this.text(),
            openType = $this.data('opentype');

        if (url) {
            if (openType === 'tabsnav') {
                TabsNav.addTab({
                    url: url,
                    name: name,
                    id: code
                });
            } else {
                win.open(Util.getRightUrl(url), code);
            }
        }

        hidePanel();
    }).on('click', '.quick-menu-btn', function () {
        var $this = $(this);

        if ($this.hasClass('edit')) {
            TabsNav.addTab({
                id: 'editNav',
                name: '快捷菜单',
                url: QuickNav.editUrl
            });
            hidePanel();
        } else {
            getQuickMenu();
        }
    });

    var render = function (data) {
        if (!data || !data.length) {
            $panel.addClass('empty');
            $list.empty();

            return;
        }

        var html = [];
        for (var i = 0, l = data.length; i < l; i++) {
            data[i].openType = data[i].isBlank ? 'blank':'tabsnav';
            html.push(Mustache.render(QUICK_MENU_TPL, data[i]));
        }

        $panel.removeClass('empty');
        $list.html(html.join(''));

    };

    var hidePanel = function () {
        $quickMenu.removeClass("open");
        $pageCover.addClass("hidden");
    };

    var getQuickMenu = function () {
        Util.ajax({
            type: 'POST',
            dataType: 'json',
            url: QuickNav.quickNav
        }).done(function (data) {
            render(data);
        });
    };

    getQuickMenu();

    _getNiceSroll_(function () {
        $list.niceScroll({
            cursorcolor: '#2590cc',
            cursorborder: '1px solid #d5dee6',
            cursorwidth: '3px'
        });
    });

}(this, jQuery));

// 左侧菜单
(function (win, $) {
    // 记录左侧菜单是否加载
    win.leftMenuStatus = {};

    var $leftWrap = $leftContainer.find('.left-menu-wrap'),
        $topMenuName = $leftContainer.find(".name-txt");

    // 缩进值
    var INDENT_INIT = 35,
        INDENT_STEP = 10,

        // 记录是否已经加载
        leftMenuStatus = {};

    // 是否为展开状态
    win._leftIsWide = false;

    // 获取节点缩进值
    var getIndent = function (rowkey) {
        //分割成数组判断长度
        var len = rowkey.split('-').length;


        return INDENT_INIT + (len - 1) * INDENT_STEP;

    };
    // 宽窄切换
    $leftContainer.on("click", ".icon-triggle", function () {
        if ($leftContainer.hasClass('wide')) {
            $leftContainer.find('.top-item').removeClass('open');
            $leftContainer.removeClass('wide');
            $.cookie('_leftStatus_', 'narrow', {
                expires: 30
            });
            $pageCover.addClass('hidden');
            _leftIsWide = false;

            //替换侧边栏 -窄的情况
            _toolBar_(function() {
                 $.ToolBar({
                    leftBar: '#left-menu-' + $(this).data('code'),
                    slideIn: 'slide-off-in-',
                    slideOut: 'slide-off-out-'
                });
            });
           

        } else {
            $leftContainer.addClass('wide');

            $.cookie('_leftStatus_', 'wide', {
                expires: 30
            });
            _leftIsWide = true;

            //替换侧边栏 -宽的情况
            _toolBar_(function() {
                $.ToolBar({
                    leftBar: '#left-menu-' + $(this).data('code')
                });
            });
        }
        // css 动画存在 需要迟延后调整
        // setTimeout(function () {
        //     $leftWrap.getNiceScroll(0).resize();
        // }, 800);

        // 切换后需要调整底部tab的滚动状态
        TabsNav.adjustSize();
    });
    // 记住上次的菜单状态
    $(function () {
        var status = $.cookie('_leftStatus_') || 'wide';
        if (status == 'wide') {
            $leftContainer.addClass('wide');
            _leftIsWide = true;
        } else {
            $leftContainer.removeClass('wide');
            _leftIsWide = false;
        }
    });
    // 菜单点击事件
    $leftContainer.on("click", ".common-item", function () {
        var $this = $(this),
            $li = $this.parent('.left-menu-item'),
            // $subMenu = $this.siblings('.left-menu-sub'),
            hasSub = !!$this.siblings('.left-menu-sub').length;

        var url = $this.data('url');

        if (url) {
            var openType = $this.data('opentype'),
                name = $this.attr('title');
            if (openType == 'blank') {
                win.open(Util.getRightUrl(url), name);
            } else {
                TabsNav.addTab({
                    id: $this.data('id'),
                    name: name,
                    url: url
                });
            }
        }

    });


    // // 获得节点行标识
    // var getRowkey = function (rowkey, i) {
    //     return (rowkey === undefined) ? (i + '') : (rowkey + '-' + i);
    // };

    /**
     * [renderLeftBar 渲染左侧菜单列表模]
     * @param  {[type]} list [获取的接口数据]
     * @return {[type]}      [html标签字符串]
     */
    var renderLeftBar = function(list) {
        var max = 0;
        var getRowKey = function(rowkey, i) {
            return (rowkey === undefined) ? (i + '') : (rowkey + '-' + i);
        };

        //console.time('calc');
        var calcLength = function(list, rowkey) {
            var listArr = [];

            list.forEach(function(item, index) {

                item.hasChild = !!(item.items && item.items.length);

                item.openType = item.isBlank ? 'blank' : 'tabsnav';

                item.rowkey = getRowKey(rowkey, index);

                var rowkeyLength = item.rowkey.split('-').length;
                
                if(rowkeyLength > max) {
                    max = rowkeyLength;
                }

                if (item.hasChild) {
                    calcLength(item.items, item.rowkey);
                }

            });
        };

        calcLength(list);
        //console.timeEnd('calc');
        //console.log(max);


        var itemArr = [];
        var num = 0;
        var dataArr = [];

        //console.time('handle');
        var handleData = function(list) {

            var tempArr = [];

            if(num == 0 ) {
                var firstArr = [];

                for(var i = 0,len = list.length; i< len; i++) {
                    list[i].id = "w_" + i;
                    firstArr.push(list[i]);
                }
                
                tempArr.push({
                    pid:'',
                    data: firstArr
                });
            } else if(num < max) {

                for(var i = 0, len = list.length; i < len; i++) {

                    for(var m = 0,mlen = list[i].data.length; m < mlen;m++) {
                        if(list[i].data[m].items) {

                            list[i].data[m].items.forEach(function(item, index) {
                                item.id = list[i].data[m].id + '_c_' +index;
                            });

                            tempArr.push({
                                pid: list[i].data[m].id,
                                data: list[i].data[m].items
                            });
                        }
                    }
                    
                }
            } else {
                return;
            }

            num  = num + 1;
            dataArr.push({
                level: num -1,
                tab:tempArr
            });

            
            handleData(tempArr);
        };

        handleData(list);
        
        //console.timeEnd('handle');

        //console.log(dataArr);

        //console.time('render');
        Mustache.parse(LIST_TPL);
        var leftBarHtml = Mustache.render(LIST_TPL,{list:dataArr});
        //console.timeEnd('render');
        return leftBarHtml;
    };

    /**
     * 根据数据渲染菜单
     * @param {Array} data [菜单数据]
     * @param {String} id [顶级菜单id]
     */
    var initLefeMenu = function (data, id) {
        var html = '';
        if (data && data.length) {

            html = renderLeftBar(data);
            // 创建菜单外层ul
            var $leftMenuList = $('<ul id="left-menu-' + id + '" class="left-menu-list"></ul>');

            //缓存id
            $('.icon-triggle', $leftContainer).data('code',id);

            // 给此ul添加数据 并放到页面 隐藏兄弟元素
            $leftMenuList
                .append(Util.clearHtml(html))
                .appendTo($leftWrap)
                .siblings('.left-menu-list').addClass('hidden');

            _getNiceSroll_(function() {
                $('.bar-item', $leftWrap).niceScroll({
                    cursorcolor: '#2590cc',
                    cursorborder: '1px solid #d5dee6',
                    cursorwidth: '3px'
                });
            });

            //替换侧边栏
            var status = $.cookie('_leftStatus_') || 'wide';

            if(status == 'wide') {
                _toolBar_(function() {
                    $.ToolBar({
                        leftBar: '#left-menu-' + id
                    });
                });
                 
            } else {
                _toolBar_(function() {
                    $.ToolBar({
                        leftBar: '#left-menu-' + id,
                        slideIn: 'slide-off-in-',
                        slideOut: 'slide-off-out-'
                    });
                });
                
            }

        }
    };

    /**
     * 切换左侧菜单
     * @param {String} code [顶级菜单id ]
     * @param {String} name [顶级菜单name ]
     */
    var getLeftMenu = function (code, name) {
        $leftContainer.removeClass('noleft');
        $topMenuName.text(name);
        if (!leftMenuStatus[code]) {
            // 未加载则加载数据
            leftMenuStatus[code] = 'waiting';

            // leftMenuStatus[code] = true;
            // var subMenuData = menuItems[menuRecord[code]].items ? menuItems[menuRecord[code]].items : [];
            // initLefeMenu(subMenuData, code);
            Util.ajax({
                type: 'POST',
                dataType: 'json',
                url: Menu.topMenu,
                data: {
                    query: "init-sidebarNav-sub",
                    moduleCode: code
                }
            }).done(function (data) {
                leftMenuStatus[code] = true;
                initLefeMenu(data, code);
            }).fail(function () {
                leftMenuStatus[code] = false;
            });
        } else {
            // 否则直接切换显示
            $leftContainer.find('#left-menu-' + code).removeClass('hidden').addClass('active')
                .siblings('.left-menu-list').addClass('hidden').removeClass('active');
            
            $leftContainer.find('common-item').removeClass('active');
        }
    };
    // 开放此方法 用以顶部菜单加载时自动加载对应子菜单
    win.getLeftMenu = getLeftMenu;

    // 用于无左侧菜单时隐藏左侧菜单。
    win.hideLeftMenu = function () {
        $leftContainer.addClass('noleft');
    };
    // _getNiceSroll_(function () {
    //     $leftWrap.niceScroll({
    //         cursorcolor: '#2590cc',
    //         cursorborder: '1px solid #d5dee6',
    //         cursorwidth: '3px'
    //     });
    // });

}(this, jQuery));

// ContextMenu
(function (win, $) {
    var defaultSetting = {
        id: false,
        items: [{
            text: '',
            role: '',
            icon: '',
            click: Util.noop
        }],
        selector: false
    };

    var M = Mustache,
        ID_SUFFIX = '-contextmenu',
        EXTREA_MARGIN = 5,
        template = $.trim(CONTEXT_MENU_TPL);

    win.ContextMenu = function (cfg) {
        this.cfg = $.extend({}, defaultSetting, cfg);
        this._init();
    };

    ContextMenu.prototype = {
        constructor: ContextMenu,

        _init: function () {
            this.cfg.options = {};

            this._initView();
            this._initEvent();
        },

        _getSize: function () {
            var $widget = this.$widget,
                size = null;

            $widget.addClass('hidden-accessible')
                .removeClass('hidden');

            size = {
                width: $widget.outerWidth(),
                height: $widget.outerHeight()
            };

            $widget.addClass('hidden')
                .removeClass('hidden-accessible');

            return size;
        },

        _initView: function () {
            var c = this.cfg;

            if (!c.id) {
                c.id = Util.uuid(8, 16) + ID_SUFFIX;
            }

            this.$widget = $(Util.clearHtml(M.render(template, c))).appendTo('body');

            this.size = this._getSize();
        },

        _initEvent: function () {
            var c = this.cfg,
                self = this,
                callbacks = {},

                $bindEl;

            $.each(c.items, function (i, item) {
                callbacks[item.role] = item.click;

            });

            this.$widget.on('click', '.menu-item', function (event) {
                event.preventDefault();

                var role = this.getAttribute('role'),
                    callback = callbacks[role],
                    rt;
                if (callback) {
                    rt = $.proxy(callback, self, c.options, event)();
                }

                if (rt !== false) {
                    self.hide();
                }
            });

            $(document).on('click', function (event) {
                var t = event.target;
                if (!$.contains(self.$widget[0], t)) {
                    self.hide();
                }
            });

            // if selector is given, bind contextmenu event
            if (c.selector) {
                $bindEl = $(c.selector);
                $bindEl.length && $bindEl.on('contextmenu', function (event) {
                    var pos = {
                        x: event.pageX,
                        y: event.pageY
                    };

                    self.show(pos);
                    return false;
                });
            }
        },

        hide: function () {

            this.$widget.addClass('hidden');
            return this;
        },

        show: function (pos) {
            this.$widget.css({
                top: pos.x,
                left: pos.y,
                zIndex: Util.getZIndex()
            }).removeClass('hidden');

            return this;
        },

        setOptions: function (prop, val) {
            this.cfg.options[prop] = val;
            return this;
        }
    };

}(this, jQuery));

// tabsNav
(function (win, $) {

    // tabs导航容器
    var $allTabList = $('#all-tabs-list'),
        $tabListWrap = $('#tabs-list'),
        $tabList = $tabListWrap.find('.bottom-tab-line'),

        $tabFixList = $('#tabs-fixed-list');

    // ifr容器
    var $ifrContainer = $('#maincontent');

    // 下拉
    var $dropList = $dropPanel.find('.slide-list');

    var tabTmpl = $.trim(BOTTOM_TAB_ITEM),
        conTpl = $.trim(TAB_NAV_CONTENT_TPL),
        tablistTpl = $.trim(TAB_SLIDE_TPL),
        M = Mustache;


    var defaultTabWidth = 115,
        RIGHT_WIDTH = 40;


    var tabsCache = {},
        // 固定项目的id集合 使用对象能更高效查找 键名为id 值 true false
        fixedTab = {},
        // 最后一个固定的tabid 
        lastFixedTabId = '';

    var tabDefaultSetting = {
        closeIcon: true,
        refresh: false
    };

    // 最大可视宽度
    var max_w = $('#footer').width() - RIGHT_WIDTH - $tabFixList.outerWidth(true) - 1;;

    win.TabsNav = {
        _tab_w: 0,
        // 当前激活的tabid
        _activeId: '',

        _getTabWidth: function () {
            if (!this._tab_w) {
                this._tab_w = $tabFixList.children().eq(0).outerWidth(true) || defaultTabWidth;
            }

            return this._tab_w;
        },

        addTab: function (cfg, withoutActive) {
            var data = $.extend({}, tabDefaultSetting, cfg),
                tabId = 'tab-' + data.id,
                $tabContent;

            // 不存在，则添加
            if (!tabsCache[tabId]) {
                // 补全路径
                if (!withoutActive) {
                    data.url = Util.getRightUrl(data.url);
                } else {
                    data.realUrl = Util.getRightUrl(data.url);
                    data.url = 'about:blank';
                }

                // tab模板要渲染到两个地方 id不能相同 uid用以标识其二者相同的id
                data.uid = data.id;

                var tabHtml = Util.clearHtml(M.render(tabTmpl, data));

                // 可关闭，则为非固定tab                
                if (data.closeIcon) {
                    // 插入到底部和右侧           
                    $(tabHtml).appendTo($tabList);
                    // id不能一致 需要处理一下
                    var dropData = $.extend({}, data);
                    dropData.id += '-drop';
                    $(Util.clearHtml(M.render(tablistTpl, dropData))).appendTo($dropList);
                    dropData = null;
                } else {
                    $(tabHtml).appendTo($tabFixList);
                    // 记录此固定项目id
                    fixedTab[tabId] = true;
                    lastFixedTabId = tabId;
                }

                $tabContent = $(Util.clearHtml(M.render(conTpl, data))).appendTo($ifrContainer);

                tabsCache[tabId] = data;

                if (withoutActive) {
                    tabsCache[tabId].notInit = true;
                }

                this.adjustSize();
            }

            if (!withoutActive) {
                this.activeTab(tabId);
            }
        },

        getActiveTab: function () {
            // var $li = $allTabs.find('li.active'),
            var $li = $allTabs.find('#' + this._activeId),
                data = tabsCache[$li[0].id];

            return new Tab(data);
        },

        activeTab: function (id) {
            // id 应该始终指菜单项目的id，而非tab-id， 文档以更新 此处兼容处理
            if (id.indexOf('tab-') !== 0) {
                id = 'tab-' + id;
            }

            var $tab = $('#' + id);
            if ($tab.length) {
                var $tabCon = $('#' + $tab.data('target')),
                    data = tabsCache[id];

                // 非固定项目需要确保可见
                if (!fixedTab[id]) {
                    this.adjustTabPosOnActive(id);
                }

                if ($tab.hasClass('active')) {
                    return;
                }

                $allTabList.find('li.active').removeClass('active');
                $tab.addClass('active');

                this._activeId = id;

                // // 关联右侧激活状态
                // var $dropTab = $dropList.find('#' + id + '-drop');
                // // 非固定则同步激活 否则移除右侧激活状态
                // if ($dropTab.length) {
                //     $dropTab.addClass('active')
                //         .siblings().removeClass('active');
                // } else {
                //     $dropList.find('li').removeClass('active');
                // }

                if (data.notInit) {
                    $tabCon[0].src = data.realUrl;
                    data.notInit = false;
                }
                $tabCon.removeClass('hidden')
                    .siblings('.tab-content')
                    .addClass('hidden');
            }

        },

        // make active tab shown
        adjustTabPosOnActive: function (id) {

            // id 应该始终指菜单项目的id，而非tab-id， 文档以更新 此处兼容处理
            if (id.indexOf('tab-') !== 0) {
                id = 'tab-' + id;
            }

            var $li = $('#' + id),
                $prev_lis = $li.prevAll(),

                tab_w = this._getTabWidth(),
                scroll_w = Math.ceil((Math.abs(parseFloat($tabList.css('margin-left'), 10)))),
                marginLeft = scroll_w,
                prev_w = tab_w * $prev_lis.length;

            // $prev_lis.each(function(i, li) {
            //     prev_w += $(li).outerWidth(true);
            // });

            if (prev_w < scroll_w) {
                marginLeft = prev_w;

            } else if (prev_w >= (max_w + scroll_w)) {
                marginLeft = prev_w + tab_w - max_w;

            } else if (prev_w > scroll_w && prev_w < (max_w + scroll_w) && (prev_w + tab_w) > (max_w + scroll_w)) {
                marginLeft = prev_w + tab_w - max_w;
            }

            $tabList.stop(true).animate({
                marginLeft: -marginLeft
            }, 500);

        },

        removeTab: function (id) {
            // id 应该始终指菜单项目的id，而非tab-id， 文档以更新 此处兼容处理
            if (id.indexOf('tab-') !== 0) {
                id = 'tab-' + id;
            }

            var $tab = $('#' + id),
                $tabCon = $('#' + $tab.data('target'));

            if ($tab.hasClass('active')) {
                if ($tab.prev().length) {
                    this.activeTab($tab.prev()[0].id);
                } else if ($tab.next().length) {
                    this.activeTab($tab.next()[0].id);
                } else {
                    // 高亮最后一个固定tab
                    // this.activeTab($tabFixList.children('li').last()[0].id);
                    this.activeTab(lastFixedTabId);
                }
            }

            // 移除两处的tab和内容
            $tab.remove();
            $dropList.find('#' + id + '-drop').remove();
            // 清理tab内容页iframe
            Util.clearIframe($tabCon);
            $tabCon.remove();

            delete tabsCache[id];

            this.adjustSize();
        },

        // remove all tabs except fixed tabs
        removeAll: function (id) {

            // id 应该始终指菜单项目的id，而非tab-id， 文档以更新 此处兼容处理
            if (id && id.indexOf('tab-') !== 0) {
                id = 'tab-' + id;
            }

            $tabList.find('.tabs-nav-item').each(function (i, li) {
                var tabId = li.id;

                if (tabId != id) {
                    TabsNav.removeTab(tabId);
                }
            });

            if (!id) {
                TabsNav.activeTab(lastFixedTabId);
            }
        },

        adjustSize: function () {
            // 最大可视宽度 = 底部tab条-右侧-固定
            max_w = $('#footer').width() - RIGHT_WIDTH - $tabFixList.outerWidth(true) - 1;

            var tabs_w = this._getTabWidth() * $tabList.children().length + 1;


            if (tabs_w > 0) {
                $tabList.css('width', tabs_w);
            }

            if (max_w > tabs_w) {
                // $tabList.css({
                //     'margin-left': 0
                // });
                $tabList.stop(true).animate({
                    marginLeft: 0
                }, 500);
                $tabListWrap.css('width', 'auto');
            } else {

                var scrollRange = tabs_w - max_w;

                // $tabList.css({
                //     'margin-left': -scrollRange
                // });
                $tabList.stop(true).animate({
                    marginLeft: -scrollRange
                }, 500);
                $tabListWrap.css('width', max_w);
            }
        },

        refreshTabContent: function (id) {
            // id 应该始终指菜单项目的id，而非tab-id， 文档以更新 此处兼容处理
            if (id.indexOf('tab-') !== 0) {
                id = 'tab-' + id;
            }

            var $tab = $('#' + id),
                $tabCon = $('#' + $tab.data('target'));
            // $tabCon[0].contentWindow.location.reload();
            // 不要直接reload，而是赋值为原地址，可防止页面报错后 刷新仍是错误页面的地址。
            $tabCon[0].src = 'about:blank';
            $tabCon[0].src = Util.getRightUrl(tabsCache[id].realUrl || tabsCache[id].url);
        }
    };
    // Tab模型，内部使用
    var Tab = function (data) {
        this._data = data;
    };

    $.extend(Tab.prototype, {
        remove: function () {
            var tabId = 'tab-' + this._data.id;

            if (fixedTab[tabId]) {
                console && console.warn('警告：固定Tab是不能删除的！');
                return;
            }

            TabsNav.removeTab(tabId);
        },

        getData: function () {
            var data = this._data;

            return $.extend({}, data, {
                tabId: 'tab-' + data.id
            });
        },

        refreshContent: function () {
            var tabId = 'tab-' + this._data.id;

            TabsNav.refreshTabContent(tabId);
        },

        active: function () {
            var tabId = 'tab-' + this._data.id;

            TabsNav.activeTab(tabId);
        },

        prev: function () {
            var $li = $('#tab-' + this._data.id),
                $prev = $li.prev();

            if (!$prev.length) {
                console && console.warn('已经到头了！');
                return;
            }

            return new Tab(tabsCache[$prev[0].id]);
        },

        next: function () {
            var $li = $('#tab-' + this._data.id),
                $next = $li.next();

            if (!$next.length) {
                console && console.warn('已经到尾了！');
                return;
            }

            return new Tab(tabsCache[$next[0].id]);
        }
    });

    // resize
    var timer;
    $(win).on('resize', function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            TabsNav.adjustSize();
            TabsNav.activeTab(TabsNav._activeId);
        }, 200);
    });

    // 点击激活
    $allTabList
        .on('click', '.tabs-nav-item', function (e) {
            var id = this.id;
            TabsNav.activeTab(id);
        })
        // 点击关闭
        .on('click', '.tabs-nav-item-close', function (e) {

            var id = this.parentNode.getAttribute('data-id');

            TabsNav.removeTab(id);
        })
        // 刷新
        .on('click', '.tabs-nav-item-refresh', function (e) {
            e.stopPropagation();
            var id = this.parentNode.getAttribute('data-id');

            TabsNav.refreshTabContent(id);
        })
        //  右键菜单
        .on('contextmenu', '.tabs-nav-item', function (event) {
            var tabId = this.id;

            // 固定项目不响应
            if (fixedTab[tabId]) return;

            var $this = $(this),
                positionX = $this.offset().top + 68,
                positionY = $this.offset().left + 3;

            contextMenu.setOptions('tabId', tabId).show({
                x: positionX,
                y: positionY
            });

            return false;
        });
    // 下拉面板中点击激活
    $dropPanel.on('click', '.slide-list-item', function (e) {
        var id = this.getAttribute('data-id');
        TabsNav.activeTab(id);
        // 激活显示后需要 隐藏面板 取消遮罩
        switchDrop();
    });
    // // 下拉中的关闭
    // .on('click', '.tabs-nav-item-close', function (e) {
    //     // 需要阻止冒泡 防止触发激活事件
    //     e.stopPropagation();
    //     var id = this.parentNode.getAttribute('data-id');

    //     TabsNav.removeTab(id);

    //     // // 移除之后判断可见性 不可见则需要移除遮罩
    //     // if ($dropBox.hasClass('invisible')) {
    //     //     switchDrop();
    //     // }
    // })
    // drop切换
    $dropBox.on('click', '.drop-btn', function (e) {
        switchDrop();
    });
    // 切换下拉
    var switchDrop = function () {
        if ($dropBox.hasClass('showPanel')) {
            $dropPanel.stop(true).animate({
                bottom: -($dropPanel.height())
            });
            $pageCover.addClass('hidden');
        } else {
            $dropPanel.stop(true).animate({
                bottom: 30
            });
            $pageCover.removeClass('hidden');
        }
        $dropBox.toggleClass('showPanel');
    };
    // 右键菜单
    var contextMenu = new ContextMenu({
        items: [{
            text: '关闭',
            role: 'close-self',
            click: function (options) {
                var id = options.tabId;
                TabsNav.removeTab(id);
            }
        }, {
            icon: 'remove',
            text: '关闭其他页',
            role: 'close-others',
            click: function (options) {
                var id = options.tabId;
                TabsNav.removeAll(id);
            }
        }, {
            icon: 'remove',
            text: '关闭全部',
            role: 'close-all',
            click: function (options) {
                TabsNav.removeAll();
            }
        }, {
            text: '刷新',
            role: 'refresh-self',
            click: function (options) {
                var id = options.tabId;
                TabsNav.refreshTabContent(id);
            }
        }, 'sep', {
            text: '取消',
            role: 'quit',
            click: function (options) {

            }
        }]
    });

    // 下拉面板nicescoll
    _getNiceSroll_(function () {
        $dropPanel.niceScroll({
            cursorcolor: '#d5dee6'
        });
    });
})(this, jQuery);


// 点击空白处收起滑动面板并其取消遮罩
(function (win, $) {

    // 此处判断是否需要遮罩的显示隐藏与弹窗的显示隐藏
    $('body').on("click", function (e) {
        var $target = $(e.target),
            needhidePanel = true;
        if (!$.contains($userInfo[0], $target[0])) {
            //  不在用户下拉区域内
            $userInfo.removeClass('showPanel');
        } else {
            hidePanel();
            needhidePanel = false;
        }

        if (!$.contains($topMenu[0], $target[0])) {
            // not top menu
            $topMenu.removeClass('showPanel');
        } else {
            needhidePanel = false;
        }

        if (!$.contains($quickMenu[0], $target[0])) {
            // not top menu
            $quickMenu.removeClass('open');
        } else {
            needhidePanel = false;
        }

        if (!$target.closest('.bottom-drop').length) {
            // not bottom panel
            $dropBox.removeClass('showPanel');
            $dropPanel.stop(true).animate({
                bottom: -($dropPanel.height())
            });
        } else {
            needhidePanel = false;
        }

        if (!$.contains($msgPanel[0], $target[0]) && !$target.closest('.js-panel').length) {
            // not rightPanel
            hidePanel();
        } else {
            needhidePanel = false;
        }

        if (!_leftIsWide) {
            if (!$target.closest('.left-menu').length) {
                $leftContainer.find('.top-item.open').removeClass('open');
                // $pageCover.addClass('hidden');
            } else {
                needhidePanel = false;
            }
        }


        needhidePanel && $pageCover.addClass("hidden");

    });
}(this, jQuery));

// 对低级浏览器增加placeholder支持
(function(win, $) {
    var enableHolder = function() {
        $('[placeholder]').placeholder();
    };

    // placeholder
    if ($.placeholder) {
        enableHolder();
    } else {
        Util.loadJs('fui/js/lib/jquery.placeholder.min.js', enableHolder);
    }
}(this, jQuery));


// 右侧消息交互
(function(win, $) {
    var $rightMessage = $('#rightMessage'),
        
        $rightMessageTop = $('#top-right-content'),
        $iconList = $('.top-right', $rightMessageTop),

        $remindNum = $('.remind-num', $iconList),
        $eMsgNum = $('.remind-msg-num', $iconList),

        $msgRemind = $('#msgRemind', $msgPanel),
        $msgRemindContent = $('.msg-panel-content', $msgRemind),

        $msgRemindResult = $('.msg-panel-result', $msgRemind),
        $msgRemindResultContent = $('.msg-result-content', $msgRemindResult),

        $msgRemindHistory = $('.msg-panel-history', $msgRemind),
        $msgRemindHistoryContent = $('.msg-history-list', $msgRemindHistory);

    var $msgSound = $('#msg-sound'),
        $soundIframe,
        msgAudio;
    // 根据浏览器加载不同的声音提醒方案
    if (Util.browsers.isIE) {
        $soundIframe = $('<iframe src="" frameborder="0" class="hidden" id="msgcenter-sound"></iframe>').appendTo($msgSound);
    } else {
        $msgSound.html('<audio id="msgcenter-sound-audio" controls="controls" src="../msgsound/newsms.wav" class="hidden-accessible"></audio>');
        msgAudio = document.getElementById('msgcenter-sound-audio');
    }

    var M = Mustache,
        msgRemindTempl = $.trim(MSG_TPL),
        msgRemindSrhTempl = $.trim(MSG_SRH_TPL),
        msgRemindHistoryTempl = $.trim(MSG_HISTORY_TPL);

    var CookieMgr = {
        _cookie: {},

        _reSort: function(cookie, index) {
            var item = cookie[index];
            for (var i = 0; i <= index; i++) {
                var temp = cookie[i];

                cookie[i] = item;

                item = temp;
            }
        },

        _inCookie: function(cookie, value) {
            for (var i = 0, len = cookie.length; i < len; i++) {
                if (cookie[i] == value) {
                    return i;
                }
            }

            return -1;
        },

        getCookie: function(type) {
            if (!this._cookie[type]) {
                var val = $.cookie(type + 'History') || '';
                this._cookie[type] = val.split(';');
            }

            return this._cookie[type];
        },

        setCookie: function(type, value) {
            var cookie = this.getCookie(type);
            var index = this._inCookie(cookie, value);
            if (index > -1) {
                if (index > 0) {
                    this._reSort(cookie, index);
                }
            } else {
                if (cookie.length >= 5) {
                    cookie.pop();
                }
                cookie.unshift(value);
            }

            $.cookie(type + 'History', cookie.join(';'), {
                expires: 30
            });
        },

        removeCookie: function(type, value) {
            var cookie = this.getCookie(type);

            var index = this._inCookie(cookie, value);

            if (index > -1) {
                cookie.splice(index, 1);

                $.cookie(type + 'History', cookie.join(';'), {
                    expires: 30
                });
            }
        }
    };

    var delHtmlTag = function(str) {
        return str.replace(/<[^>]+>/g, "");
    };

    var parseNum = function(num) {
        var n = parseInt(num);

        if (n > 99) {
            return '99+';
        } else if (n <= 0) {
            return '';
        }

        return n + '';
    };

    var getMessageCount = function() {
        var xhr = Util.ajax({
            url: MsgNumUrl,
            dataType: 'json',
            type: 'POST',
            data: {
                query: "get-msgNum"
            }
        });

        xhr.done(function(data) {
            var hasNew = false;
            if (data.msgRemindNum) {
                hasNew = true;
                $remindNum.text(parseNum(data.msgRemindNum));
            } else {
                $remindNum.text('');
            }

            if (data.msgEMsgNum) {
                hasNew = true;
                $eMsgNum.text(parseNum(data.msgEMsgNum));
            } else {
                $eMsgNum.text('');
            }

            if (hasNew) {
                // 新消息加上声音提示
                // $soundIframe[0].src = Util.getRightUrl(SOUND_URL + '?_=' + (+new Date()));
                if (Util.browsers.isIE) {
                    $soundIframe[0].src = Util.getRightUrl(SOUND_URL + '?_=' + (+new Date()));
                } else {
                    msgAudio.play();
                }
                // 标题滚动
                docTitle.roll();

            } else {
                // 停止标题滚动
                docTitle.stop();
            }
        });

    };

    //var getMessageCountTimer = null;
    //var setGetMessageCountTimer = function() {
    //    getMessageCount();

    //    if (getMessageCountTimer) {
    //        clearTimeout(getMessageCountTimer);
    //    }

    //    getMessageCountTimer = setTimeout(setGetMessageCountTimer, 60000);
    //};

    // 初始化消息
    // data: 数据源
    var initMsgRemind = function(data) {
        var html = [];

        if (data.length) {
            $.each(data, function(i, item) {
                item.num = parseNum(item.num);

                $.each(item.items, function(j, child) {
                    child.title = delHtmlTag(child.name);
                });

                html.push(M.render(msgRemindTempl, item));
            });
        } else {
            html.push('<span class="msg-content-empty">没有新消息</span>')
        }

        $(Util.clearHtml(html.join(''))).appendTo($msgRemindContent.empty());
    };

    // 更新消息
    // 用于忽略消息后调用
    var updateMsgRemind = function(data, $parent) {
        if (data.items && data.items.length) {
            data.hasHead = true;

            $.each(data.items, function(i, child) {
                child.title = delHtmlTag(child.name);
            });

            $(Util.clearHtml(M.render(msgRemindTempl, data))).appendTo($parent.empty());

            $parent.prev().find('.msg-category-num').text(parseNum(data.num));
        } else {
            $parent.parent().remove();
        }
    };

    // 获取消息
    var getMsgRemindData = function() {
        var xhr = Util.ajax({
            url: MsgRemind.getUrl,
            dataType: 'json',
            type: 'POST',
            data: {
                query: "get-msgRemind-data"
            }
        });

        xhr.done(initMsgRemind);
    };

    // guid为空，则忽略全部
    var ignoreRemind = function(code, guid) {
        guid = guid || "";

        var xhr = Util.ajax({
            url: MsgRemind.ignoreUrl,
            dataType: 'json',
            type: 'POST',
            data: {
                query: "ignore-msgRemind",
                code: code,
                guid: guid
            }
        });

        xhr.done(function(data) {
            var $item = $msgRemindContent.find('[data-code="' + code + '"]'),
                $parent = $item.children('.msg-list');


            updateMsgRemind(data, $parent);

            if (data.msgRemindNum) {
                $remindNum.text(parseNum(data.msgRemindNum));
            } else {
                $remindNum.text('');
            }
        });
    };

    // var $pageCover = $('#page-cover');

    // 隐藏消息面板
    // var hidePanel = function() {
    //     $msgPanel.animate({
    //         right: -350
    //     }, function() {
    //         $msgPanel.addClass('hidden');
    //     });
    //     $pageCover.fadeOut().addClass('hidden');
    //     $iconList.find('.active').removeClass('active');

    // };

    // 隐藏消息面板
    win.hidePanel = function () {
        $msgPanel.stop(true).animate({
            right: -350
        }, function () {
            $msgPanel.addClass('hidden');
        });
        
        $iconList.find('.active').removeClass('active');
    };

    var openMsg = function(config) {
        if (config.openType == "popdiv") {
            epoint.openDialog(config.name, config.url, null);
        } else if (config.openType == "newwindow") {
            win.open(Util.getRightUrl(config.url));
        } else {
            TabsNav.addTab({
                id: config.id,
                name: config.name,
                url: config.url
            });
        }

        hidePanel();
    };

    var ignoreAllDialogNotTip = false;

    var showIgnoreAllDialog = function(name, code) {
        mini.showMessageBox({
            title: '系统提示',
            message: ('忽略 ' + name + ' 下的所有未读消息？'),
            buttons: ['ok', 'cancel'],
            iconCls: 'mini-messagebox-question',
            showNoTipCheck: true,
            clickNoTipCheck: function(checked) {
                ignoreAllDialogNotTip = checked;
            },
            callback: function(action) {
                if (action == 'ok') {
                    ignoreRemind(code);
                }
            }
        });
    };


    // 顶部图标点击交互
    $iconList.on('click', '.js-panel', function(e) {
        e.stopPropagation();
        var $el = $(this),
            ref = $el.data('ref'),
            $panel = $('#' + ref, $msgPanel);

        if ($el.hasClass('active')) {
            hidePanel();
        } else {
            $el.addClass('active')
                .siblings('.active')
                .removeClass('active');

            if (ref == 'msgRemind') {
                getMsgRemindData();
            } else if (ref == "msgEMsg") {
                getEmsgRecentMessage();
            }

            $panel.removeClass('hidden')
                .siblings()
                .addClass('hidden');

            // 先取消隐藏 再滑出
            $msgPanel.removeClass('hidden');
            $msgPanel.animate({
                right: 0
            });

            $pageCover.removeClass('hidden');
        }
    });

    // 点击任意部位后隐藏panel
    // $('body').on('click', function(e) {
    //     if ($(e.target).closest('.msg-panel').length === 0) {
    //         hidePanel();
    //     }
    // });

    // 2个右侧面板中添加滚动条
    _getNiceSroll_(function() {
        $([$msgRemindContent, $msgEMsgContent]).each(function(i, $item) {
            $item.niceScroll({
                cursorcolor: '#ccc',
                cursorborder: '1px solid #d5dee6',
                cursorwidth: '3px'
            });
        });
    });

    // 消息面板交互
    $msgRemindContent.on('click', '.msg-category-title', function() {
        var $el = $(this),
            $item = $el.parent(),
            name = $item.data('title'),
            url = $item.data('url'),
            code = $item.parent().data('code');

        openMsg({
            id: code,
            name: name,
            url: url
        });

    }).on('click', '.msg-category-remove', function() {
        var $category = $(this).closest('.msg-category'),
            code = $category.data('code'),
            name = $category.children('.msg-category-head').data('title');

        if (!ignoreAllDialogNotTip) {

            showIgnoreAllDialog(name, code);
        } else {
            ignoreRemind(code);
        }
    }).on('click', '.msg-list-item', function() {
        var $el = $(this),
            name = $el.data('title'),
            url = $el.data('url'),
            code = $el.data('guid'),
            openType = $el.data('opentype');

        openMsg({
            id: code,
            name: name,
            url: url,
            openType: openType
        });
    }).on('click', '.msg-item-ignore', function(event) {
        event.stopPropagation();

        var $el = $(this),
            $item = $el.parent(),
            guid = $item.data('guid'),
            code = $item.closest('.msg-category').data('code');

        ignoreRemind(code, guid);
    });


    //EMsg交互

    var $msgEMsg = $('#msgEMsg', $msgPanel),

        $msgEMsgIcon = $("a[data-ref='msgEMsg']", $iconList);
        $msgEMsgContent = $('.msg-panel-content', $msgEMsg),
        $msgEMsgRecent = $('.emsg-recent-list', $msgEMsgContent),

        $msgEMsgResult = $('.msg-panel-result', $msgEMsg),
        $msgEMsgResultContent = $('.emsg-recent-list', $msgEMsgResult),

        $msgEMsgHistory = $('.msg-panel-history', $msgEMsg),
        $msgEMsgHistoryContent = $('.msg-history-list', $msgEMsgHistory);

    var msgEmsgRecentTempl = $.trim(EMSG_RECENT_TPL);

    var renderEmsgPanel = function(data) {
        if (data && data.sessionlist.length) {
            var fixdata = $.map(data.sessionlist, function(e, i) {
                if (e.type === "friend" && e.imgUrl == "") {
                    e.imgUrl = EmsgConfig.userImg;
                }
                if (e.type === "group") {
                    e.imgUrl = EmsgConfig.groupImg;
                }
                e.message = e.message.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "");
                return e;
            });
            var html = M.render(msgEmsgRecentTempl, { items: fixdata });
            $(Util.clearHtml(html)).appendTo($msgEMsgRecent.empty());
        }
    };

    var getEmsgRecentMessage = function() {
        if (!$msgEMsgIcon.hasClass("active")) {
            return false;
        }
        var xhr = Util.ajax({
            url: EmsgConfig.baseUrl,
            data: { 'query': 'loadrecentsession' },
        });
        xhr.done(renderEmsgPanel);
    };

    win.RefreshEMsg = getEmsgRecentMessage;

    var ignoreMessage = function(sessionid) {
        Util.ajax({
            url: EmsgConfig.baseUrl,
            data: { 'query': 'ignoremessage', 'sessionid': sessionid }
        });
    };

    var decreaseEmsgCount = function() {
        var cnt = $eMsgNum.text();
        if (cnt) {
            cnt = (parseInt(cnt)) - 1;
        }
        if (cnt == 0) {
            cnt = "";
        }
        $eMsgNum.text(cnt);
    };


    $msgEMsgRecent.on("click", ".emsg-ignore-icon", function(e) {
        e.stopPropagation();
        $(this).closest("div").find(".emsg-not-read").remove();
        var sessionid = $(this).closest("li").removeClass('newmsg').data("sessionid");
        ignoreMessage(sessionid);
        decreaseEmsgCount();
        $(this).remove();
    }).on("click", ".emsg-recent-item", function(e) {
        e.stopPropagation(e);
        $(this).removeClass('newmsg');
        var $ignoreicon = $(this).find(".emsg-not-read,.emsg-ignore-icon");
        var sessionid = $(this).data("sessionid"),
            uid = $(this).data("uid"),
            type = $(this).data("type");
        if ($ignoreicon.length) {
            $ignoreicon.remove();
            decreaseEmsgCount();
        }
        hidePanel();
        OpenEMsg(sessionid, uid, type);
    });

    $msgEMsgResultContent.on("click", ".emsg-recent-item", function() {
        var sessionid = $(this).data("sessionid"),
            uid = $(this).data("uid"),
            type = $(this).data("type");
        hidePanel();
        OpenEMsg(sessionid, uid, type);
    });

    $msgPanel.on('click', '.msg-panel-hide', function() {
        hidePanel();
    });


    $(function() {
        getMessageCount();
        //setGetMessageCountTimer();

        // $('.msg-srh-input', $msgPanel).placeholder();
    });
}(this, jQuery));


var eMsg, eMsgSocket;

//消息通讯WebSocket
function EMsgSocket(uid, uname) {
    var socket = atmosphere;
    var subSocket;
    var transport = 'websocket';

    var request = {
        url: EmsgConfig.websocketUrl,
        contentType: "application/json",
        transport: transport,
        reconnectInterval: 5000,
        headers: { "uid": uid, "uname": uname }
    };
    request.onTransportFailure = function(errorMsg, request) {
        request.fallbackTransport = "long-polling";
        transport = "long-polling";
    };
    request.onMessage = function(response) {
        var msgStr = response.responseBody;
        try {
            if (transport == "long-polling") { //处理在长轮训的情况下，可能请求到多条消息
                msgStr = "[" + msgStr.replace(/}{/g, '},{') + "]";
                var msgObj = atmosphere.util.parseJSON(msgStr);
                $.each(msgObj, function(i, e) {
                    handleMsgObj(e);
                });
            } else {
                var msgObj = atmosphere.util.parseJSON(msgStr);
                handleMsgObj(msgObj);
            }
        } catch (e) {
            return;
        }
    };

    var handleMsgObj = function(msgObj) {
        if (msgObj.type == "messagecount") {
            NewMessageRemind(msgObj);
        } else if (msgObj.type == "remotelogin") {
            epoint.alert(msgObj.message, "系统提示", function(action) {
                if (UserConfig.onLogout) {
                    eMsgSocket && eMsgSocket.close();
                    UserConfig.onLogout();
                }
            });
        } else {
            if (eMsg) {
                eMsg.receiveMessage(msgObj);
            }
            if (!eMsg || eMsg.status() != "max") {
                if (msgObj.type == "message") {
                    MsgNotify(msgObj);
                }
            }
            if ($.inArray(msgObj.type, ["message", "creategroup", "joingroup"]) > -1) {
                RefreshEMsg();
            }
        }
    };

    var errorMsg = function(msg) {
        mini.showTips({
            content: msg,
            state: "danger",
            x: "center",
            y: "center",
            timeout: 2000
        });
    };

    request.onClose = function(response) {
        if (EmsgConfig.showErrorMsg) {
            setTimeout(function() {
                errorMsg(EmsgConfig.closeMsg || "E讯已断开连接，请尝试重新登录！");
            }, 3000);
        }
    };

    request.onError = function(response) {
        if (EmsgConfig.showErrorMsg) {
            setTimeout(function() {
                errorMsg(EmsgConfig.errorMsg || "E讯连接出现错误，请联系管理员！");
            }, 3000);
        }
    };

    request.onReconnect = function(request, response) {};

    subSocket = socket.subscribe(request);

    this.sendMessage = function(message) {
        if (!subSocket.request.isOpen) {
            errorMsg("E讯已断开连接，无法发送消息！");
            return false;
        }
        subSocket.push(message);
        return true;
    };
    this.isConnect = function() {
        return subSocket.request.isOpen;
    };
    this.close = function() {
        socket.unsubscribe();
    };
    this.uid = uid;
}

(function(win, $) {
    var $rightMessageTop = $('#top-right-content'),

        $iconList = $('.top-right', $rightMessageTop),

        $remindNum = $('.remind-num', $iconList),
        $eMsgNum = $('.remind-msg-num', $iconList);

        // $remindNum = $('.icon-info', $rightMessageTop).next(),
        // $attentionNum = $('.icon-attention', $rightMessageTop).next(),
        // $eMsgNum = $('.icon-emsg', $rightMessageTop).next();

    var $soundIframe = $('#msgcenter-sound');
    var msgAudio = document.getElementById('msgcenter-sound-audio');

    //消息数量推送
    win.NewMessageRemind = function(data) {
        var parseNum = function(num) {
            if (num > 99) {
                return '99+';
            } else if (num <= 0) {
                return '';
            }
            return num + '';
        };

        var hasNew = false;
        var oNum, nNum;
        if (data.msgRemindNum) {
            nNum = parseInt(data.msgRemindNum);
            oNum = parseInt($remindNum.text()) || 0;
            if (nNum > oNum) {
                hasNew = true;
            }
            $remindNum.text(parseNum(nNum));
        } else {
            $remindNum.text('');
        }

        if (data.msgAttentionNum) {
            nNum = parseInt(data.msgAttentionNum);
            if (!hasNew) {
                oNum = parseInt($attentionNum.text()) || 0;
                if (nNum > oNum) {
                    hasNew = true;
                }
            }
            $attentionNum.text(parseNum(nNum));
        } else {
            $attentionNum.text('');
        }

        if (data.msgEMsgNum) {
            nNum = parseInt(data.msgEMsgNum);
            if (!hasNew) {
                oNum = parseInt($eMsgNum.text()) || 0;
                if (nNum > oNum) {
                    hasNew = true;
                }
            }
            $eMsgNum.text(parseNum(nNum));
        } else {
            $eMsgNum.text('');
        }

        if (hasNew) {
            // 新消息加上声音提示
            // 在前面已经动态创建过了。直接根据元素判断
            if ($soundIframe.length) {
                // 有这个iframe则为其设置地址即可
                $soundIframe[0].src = Util.getRightUrl(SOUND_URL + '?_=' + (+new Date()));
            } else {
                // 非IE使用audio提醒
                msgAudio && msgAudio.play();
            }

            // 标题滚动
            docTitle.roll();


        } else {
            // 停止标题滚动
            docTitle.stop();
        }


    };

    /*
     * 打开E讯聊天窗口
     * sessionid 会话id，当传入一个参数时sessionid表示uid
     * uid 对方用户id
     * type 个人：friend 讨论组：group
     */
    win.OpenEMsg = function(sessionid, uid, type) {

        if (!!eMsg) {
            if (typeof uid == 'undefined') {
                eMsg.open(sessionid);
            } else {
                eMsg.openSession(sessionid, uid, type);
            }
        } else {
            Util.loadPageModule({
                templ: 'fui/pages/emsg/emsg.tpl',
                js: 'fui/pages/emsg/emsg.js',
                css: 'fui/pages/emsg/emsg.css',
                callback: function() {
                    eMsg = new EMsgDialog();
                    if (typeof uid == 'undefined') {
                        eMsg.open(sessionid);
                    } else {
                        eMsg.openSession(sessionid, uid, type);
                    }
                }
            });
        }
    };

    var infodict = {};

    win.MsgNotify = function(message) {
        var sessiontype = message.sessiontype,
            querydata;
        if (sessiontype == "friend") {
            querydata = { 'query': 'getuserinfo', 'uid': message.from_uid };
        } else {
            querydata = { 'query': 'getgroupinfo', 'uid': message.sessionid };
        }
        if (typeof(infodict[querydata.uid]) == "undefined") {
            Util.ajax({
                url: EmsgConfig.baseUrl,
                data: querydata
            }).done(function(info) {
                if (sessiontype == "friend") {
                    info.imgUrl = info.imgUrl || EmsgConfig.userImg;
                } else {
                    info.imgUrl = EmsgConfig.groupImg;
                }
                infodict[querydata.uid] = info;
                WinNotify(info.name, {
                    body: message.content,
                    icon: info.imgUrl
                });

            }).fail(function() {

            });
        } else {
            var info = infodict[querydata.uid];
            WinNotify(info.name, {
                body: message.content,
                icon: info.imgUrl
            });
        }

    };


    //消息提醒
    win.WinNotify = function(title, options, interval) {
        var n;
        if (typeof options == "string") {
            options = {
                body: options
            };
        }
        if (!("Notification" in window)) {
            return false;
        } else if (Notification.permission === "granted") {
            n = new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function(permission) {
                if (permission === "granted") {
                    n = new Notification(title, options);
                }
            });
        }
        setTimeout(function() {
            n.close();
        }, interval || 3000);
    };
}(this, jQuery));

// 标题滚动
(function(win, $) {
    var ROLLER_TEXT = '您有新消息提醒，请点击查看！';

    // document title roller
    // 标题是获取用户信息后设置的，不能直接取 在实际调用时再取得
    // var title = document.title,
    var title,
        rollerTip = ROLLER_TEXT,
        timer = 0;

    var restoreDocTitle = function() {
        clearTimeout(timer);

        document.title = title || document.title;
        rollerTip = ROLLER_TEXT;
    };

    var rollDocTitle = function() {
        // 仅在首次时赋值标题
        if (!title) title = document.title;

        document.title = rollerTip;

        clearTimeout(timer);

        timer = setTimeout(function roll() {
            document.title = rollerTip.substring(1, rollerTip.length) + rollerTip.substring(0, 1);
            rollerTip = document.title;

            timer = setTimeout(roll, 300);
        }, 300);
    };

    win.docTitle = {
        roll: rollDocTitle,
        stop: restoreDocTitle
    };

})(window, jQuery);