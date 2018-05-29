var $attrPanel = jQuery('#attr-panel'),
  $attrIframe = jQuery('#attr-iframe'),
  $attrName = $('.attr-name', $attrPanel),
  $header = $('#header'),
  $rangeScale = $('#range-scale'),  //放大缩小
  $myOverviewDiv = $('#myOverviewDiv'),//鸟瞰图
  $cover = $('#cover'),
  $moduleUl = $('#module-ul');  //模板列表

var selectedObj = '';//选择的节点对象或者连线

var isSaveTemEd = false;

var LEFT_WIDTH = 170;

var cacheData = '',  //缓存数据
    attrType = 1; //打开节点属性的类型 1表示拖拽，2表示右键


var cacheRequest = {};  //缓存ajax

var myDiagram;

var Util = {};
Util.ajax = function(opt) {
    if(typeof opt != 'object') {
      console.warning('ajax 请求参数为对象格式');
      return false;
    }
    console.log(opt);

    var data = opt.data || '',
      url = opt.url,
      success = opt.success;

      if(typeof data == 'object') {
        data = JSON.stringify(data);
      }

    if(!cacheRequest[url]) {
      cacheRequest[url] = {};
    }
    if(!cacheRequest[url][data]) {
      cacheRequest[url][data]= {
        hasEnd:true
      }
    }

    if(cacheRequest[url][data].hasEnd) {
      cacheRequest[url][data].hasEnd = false;
      $.ajax({
            type: 'post',
            data: data,
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            url: url,
            success: function(res) {
              if(typeof success == 'function') {
                success(res);
              }
            }
        }).always(function(){
          console.warn('请求结束');
          cacheRequest[url][data].hasEnd = true;
        });
    } else {
      console.error('该请求正在发送，请勿多次操作');
    }

};

// 获取url参数
Util.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null) context = decodeURIComponent(r[2]);
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
};

//流程图
(function(win,_$){


    function init(nodeList) {
        if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates

        //初始化整个流程图
        myDiagram =
            $(go.Diagram, "myDiagramDiv", // must name or refer to the DIV HTML element
                {
                    "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
                    autoScrollRegion:0,
                    hasVerticalScrollbar:false,
                    hasHorizontalScrollbar:false,//滚动条隐藏
                    initialContentAlignment: go.Spot.Center,
                    allowDrop: true, // must be true to accept drops from the Palette
                    allowCopy: false,
                    allowRelink: false,
                    "LinkDrawn": showLinkLabel, // this DiagramEvent listener is defined below
                    "LinkRelinked": showLinkLabel,
                    scrollsPageOnFocus: false,
                      // "removeModelChanged": function(e) {
                      //   console.log('remove')
                      //   console.log(e)
                      //  },
                    "undoManager.isEnabled": true // enable undo & redo
                });

        myDiagram.toolManager.mouseDownTools.add($(LinkShiftingTool));

        myDiagram.commandHandler.canDeleteSelection = function() {
          return true;
        };

        myDiagram.commandHandler.deleteSelection = function() {

            //节点的data属性为null，所以先判断data，有则表示是连线
             if(selectedObj.data && selectedObj.data.from && selectedObj.data.to) {
                var fromKey  = selectedObj.data.from,
                    toKey =  selectedObj.data.to;

                var fromNode = myDiagram.findNodeForKey(fromKey),
                    toNode = myDiagram.findNodeForKey(toKey);

                //有一端数据里type为1则表示有右键，有右键就不能删
                if(fromNode.data.type == 1 || toNode.data.type == 1) {
                    return false;
                } else {
                    myDiagram.remove(selectedObj.part);
                }
            } else if(selectedObj.part && selectedObj.part.data.type !=1 ) {
                //节点，有右键菜单的可以删除
                myDiagram.remove(selectedObj.part);
            } 
        };


        // when the document is modified, add a "*" to the title and enable the "Save" button
        myDiagram.addDiagramListener("Modified", function(e) {
            var button = document.getElementById("SaveButton");
            if (button) button.disabled = !myDiagram.isModified;
            var idx = document.title.indexOf("*");
            if (myDiagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
            }
        });

        //监听节点拖拽的事件
        myDiagram.addModelChangedListener(function(evt) {
            // ignore unimportant Transaction events
            if (!evt.isTransactionFinished) return;
            var txn = evt.object; // a Transaction
            if (txn === null) return;
            // iterate over all of the actual ChangedEvents of the Transaction
            txn.changes.each(function(e) {
                console.log('变化....')
                console.log(e.modelChange);
                // if(e.modelChange == 'linkDataArray') {
                //     console.log(e.change.name)
                //     if(e.change.name === 'Insert') {
                //         console.log(evt.propertyName);
                //         if(evt.propertyName == 'CommittedTransaction') {
                //             myDiagram.model.setDataProperty(e.newValue,'new','test');
                //         }
                //     }
                    
                    
                // }
                // ignore any kind of change other than adding/removing a node
                // if (e.modelChange !== "nodeDataArray") return;
                // record node insertions and removals
                if(e.modelChange == 'nodeDataArray') {
                     if (e.change === go.ChangedEvent.Insert) {
                        console.log(evt.propertyName + " added node with key: " + e.newValue.key);

                        if(evt.propertyName != 'FinishedUndo') {
                          console.log(e);


                          cacheData = e.newValue;
                          attrType = 1;

                            $attrName.text(e.newValue.name);
                            _$('#cover').show();
                            $attrIframe.attr('src', e.newValue.url);
                            _$('#attr-panel').addClass('show');
                          } else {
                            //撤销节点，并且删除本地缓存
                          }

                        

                    } else if (e.change === go.ChangedEvent.Remove) {
                        console.log(evt.propertyName + " removed node with key: " + e.oldValue.key);
                    }
                }
               
            });
        });
        // helper definitions for node templates

        //节点部分样式
        function nodeStyle() {
            return [
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
                    locationSpot: go.Spot.LeftCenter,
                    mouseEnter: function(e, obj) {
                        showPorts(obj.part, true);
                    },
                    mouseLeave: function(e, obj) {
                        showPorts(obj.part, false);
                    }
                }
            ];
        }

        // Define a function for creating a "port" that is normally transparent.
        // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
        // and where the port is positioned on the node, and the boolean "output" and "input" arguments
        // control whether the user can draw links from or to the port.
        function makePort(name, spot, output, input) {
            // the port is basically just a small circle that has a white stroke when it is made visible
            return $(go.Shape, "Circle", {
                fill: "transparent",
                stroke: null, // this is changed to "white" in the showPorts function
                desiredSize: new go.Size(8, 8),
                alignment: spot,
                alignmentFocus: spot, // align the port on the main Shape
                portId: name, // declare this object to be a "port"
                fromSpot: spot,
                toSpot: spot, // declare where links may connect at this port
                fromLinkable: output,
                toLinkable: input, // declare whether the user may draw links to/from here
                cursor: "pointer" // show a different cursor to indicate potential link point
            });
        }

        //图标设置
        function findIconImg(icon) {
            //if (key < 0 || key > 16) return "images/HSnopic.png"; // There are only 16 images on the server
            if(!icon) return './css/images/1.jpg';
            return "./css/images/" + icon + ".jpg"
        }

        //右键菜单
        var cxElement = document.getElementById("contextMenu");

        cxElement.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            return false;
        }, false);

        function showContextMenu(e) {
            console.log('右键菜单');
            // console.log(e.selectionObject.Zd);
            cacheData = e.selectionObject.data;
            console.log(e);
            console.log(cacheData)
            if(cacheData.type == 1) {
              return false;
            }
            cxElement.style.display = "block";
            // console.log(myDiagram.lastInput);

            var mousePt = myDiagram.lastInput.viewPoint;
            cxElement.style.left = mousePt.x + LEFT_WIDTH + "px";
            cxElement.style.top = mousePt.y + "px";
        }

        var myContextMenu = $(go.HTMLInfo, {
            show: showContextMenu,
            mainElement: cxElement
        });

        //定义节点模板，可添加多个
        var lightText = '#666666';

        myDiagram.nodeTemplate =  // the default category
            $(go.Node, "Spot", nodeStyle(), {
                    contextMenu: myContextMenu,
                    selectionAdorned: false
                     // resizable: true,
                },
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                $(go.Panel, "Auto",
                    $(go.Shape, "RoundedRectangle", {
                        minSize: new go.Size(142, 40),
                        maxSize: new go.Size(142, 40),
                        // desiredSize: new go.Size(150, 32),
                        fill: "#fff",
                        stroke: '#b9bec5',
                        strokeWidth: 1
                    }),
                    $(go.Panel, 'Horizontal',
                        $(go.Picture, {
                                name: "Picture",
                                desiredSize: new go.Size(16, 16),
                                margin: new go.Margin(10,10,10,15),
                            },
                            new go.Binding("source", "icon", findIconImg)),
                        $(go.TextBlock, {
                                font: "normal 14px Helvetica, Arial, sans-serif",
                                stroke: lightText,
                                margin: new go.Margin(10,10,10,0),
                                minSize: new go.Size(99, NaN),
                                maxSize: new go.Size(99, NaN),
                                wrap: go.TextBlock.WrapFit,
                                editable: false
                            },
                            new go.Binding("text", "name").makeTwoWay())
                    ), {
                        click: function(e, node) {
                            console.log('click')
                            console.log(node);
                            console.log(e);
                            selectedObj = node;
                            // alert(1)
                            // _$('#cover').show();
                            // $attrIframe.attr('src', 'https://www.baidu.com');
                            // _$('#attr-panel').addClass('show');
                        },
                        doubleClick:function(e,node) {
                            var _data = node.part.data;
                            if(_data.type == 1) {
				              return false;
				            }
                            cacheData = _data;
                            attrType = 2;
                            $attrName.text(_data.name);
                            $cover.show();
                            $attrIframe.attr('src', _data.url);
                            _$('#attr-panel').addClass('show');
                        }
                    }
                ),
                // four named ports, one on each side:
                makePort("T", go.Spot.Top, true, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, true)
            );

        myDiagram.nodeTemplate.contextMenu = myContextMenu;

        var nodeData = [
            { id: '1', category: '', name: '百度', icon: '1',url:'./test/test.html',type: 0},
            { id: '2', category: '', name: '谷歌', icon: '2',url:'./test/test.html',type: 0},
            { id: '3', category: '', name: '名字很长名字很长名字很长', icon: '3',url:'./test/test.html',type: 0},
            { id: '4', category: '', name: '这是名字', icon: '4',url:'./test/test.html',type: 1},
        ];

        //定义连线模板
        myDiagram.linkTemplate =
            $(go.Link, // the whole link panel
                {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 0,
                    toShortLength: 4,
                    relinkableFrom: true,
                    relinkableTo: true,
                    reshapable: true,
                    // adjusting: go.Link.Stretch,
                    selectionAdorned: false,
                    resegmentable: true,
                    click: function(e,link) {
                        console.log(11111);
                        console.log(e);
                        console.log(link);
                        selectedObj = link;
                    },
                    // mouse-overs subtly highlight links:
                    mouseEnter: function(e, link) {
                        link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.1)";
                    },
                    mouseLeave: function(e, link) {
                        link.findObject("HIGHLIGHT").stroke = "transparent";
                    }
                },
                new go.Binding("points").makeTwoWay(),
                $(go.Shape, // the highlight shape, normally transparent
                    {
                        isPanelMain: true,
                        strokeWidth: 4,
                        stroke: "transparent",
                        name: "HIGHLIGHT"
                    }),
                $(go.Shape, // the link path shape
                    {
                        isPanelMain: true,
                        stroke: "#525c6f",
                        strokeWidth: 2
                    }),
                $(go.Shape, // the arrowhead
                    {
                        toArrow: "standard",
                        stroke: null,
                        fill: "gray"
                    }),
                $(go.Panel, "Auto", // the link label, normally not visible
                    {
                        visible: false,
                        name: "LABEL",
                        segmentIndex: 2,
                        segmentFraction: 0.5
                    },
                    new go.Binding("visible", "visible").makeTwoWay(),
                    $(go.Shape, "RoundedRectangle", // the label shape
                        {
                            fill: "#F8F8F8",
                            stroke: null
                        }),
                    $(go.TextBlock, "Yes", // the label
                        {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: "#333333",
                            editable: true
                        },
                        new go.Binding("text").makeTwoWay())
                )
            );


        // Make link labels visible if coming out of a "conditional" node.
        // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
        function showLinkLabel(e) {
            var label = e.subject.findObject("LABEL");
            if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
        }

        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
        myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

        
      load();  // load an initial diagram from some JSON text

        //初始化左侧面板
        myPalette =
            $(go.Palette, "myPaletteDiv", // must name or refer to the DIV HTML element
                { 
                    nodeTemplate: myDiagram.nodeTemplate,
                    "contextMenuTool.isEnabled": false,
                    allowHorizontalScroll: false,
                    autoScrollRegion:0,

                    allowVerticalScroll: false,
                    hasVerticalScrollbar:false,
                    hasHorizontalScrollbar:false,//滚动条隐藏

                    scrollsPageOnFocus: false,
                    // nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
                    model: new go.GraphLinksModel(nodeList)
                });

        

        //初始化鸟瞰图
        myOverview =
            $(go.Overview, "myOverviewDiv",
                { observed: myDiagram, maxScale: 0.5 });

            // change color of viewport border in Overview
            myOverview.box.elt(0).stroke = "#2590eb";
            myOverview.box.elt(0).fill = "rgba(77,139,235,.35)";


       
    } // end init

    // Make all ports on a node visible when the mouse is over the node
    function showPorts(node, show) {
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        node.ports.each(function(port) {
            port.stroke = (show ? "#007dfc" : null);
        });
        node.cursor = 'move';
    }


    // Show the diagram's model in JSON format that the user may edit
    /*function save() {
        console.log(myDiagram.model.toJson());
        myDiagram.isModified = false;
    }
    window.save = save;*/

    function load() {
        var pid = Util.getQueryString('pid')||'';//不存在则表示新建
        Util.ajax({
          url: apiConfig.flowData,
          data:{
            pid: pid
          },
          success: function(res) {
            if(typeof res === 'string') {
              res = JSON.parse(res);
            }
            console.log(res);
            res.data["linkFromPortIdProperty"] = "fromPort";
            res.data["linkToPortIdProperty"] = "toPort";
            myDiagram.model = go.Model.fromJson(res.data);
          }
        })
        // myDiagram.model = go.Model.fromJson(data);
    }

    // add an SVG rendering of the diagram at the end of this page
    function makeSVG() {
        var svg = myDiagram.makeSvg({
            scale: 0.5
        });
        svg.style.border = "1px solid black";
        obj = document.getElementById("SVGArea");
        obj.appendChild(svg);
        if (obj.children.length > 0) {
            obj.replaceChild(svg, obj.children[0]);
        }
    }

    function loadNodeList() {
      Util.ajax({
        url: apiConfig.nodeList,
        data: {
          id: 1
        },
        success: function(res) {
          if(typeof res === 'string') {
            res = JSON.parse(res);
          }
          if(res.list && res.list.length) {
            $('#myPaletteDiv').css('height',res.list.length * 42+'px');
             $('.pannel-node').niceScroll({ cursorwidth: "5px", cursorcolor: "#ccc" });
            // $(".nano").nanoScroller();
            init(res.list);
          } else {
            init();
          }
          $('.module-scroll').niceScroll({ cursorwidth: "5px", cursorcolor: "#ccc" });
          // $(".pannel-node").nanoScroller();
          // $('.palette').niceScroll({ cursorwidth: "5px", cursorcolor: "#ccc" });
          // $('.palette').niceScroll("#myPaletteDiv");
        }
      })
    }

    loadNodeList();

    //获取模板的列表
    function loadTemplate() {
        Util.ajax({
            url: apiConfig.templateData,
            data: {
              id: 1
            },
            success: function(res) {
              if(typeof res === 'string') {
                res = JSON.parse(res);
              }
              console.log('loadTemplate');
              console.log(res);
              var listStr = '',
                listArr = res.data,
                i = 0,
                len = listArr.length;

              for( i; i < len; i++) {
                 listStr += '<li class="module-item" data-id="'+listArr[i].templateguid+'"><p class="module-name">'+listArr[i].templatename+'</p></li>';
              };

              $moduleUl.html(listStr);
              // $(".pannel-node").nanoScroller();
              // $('.palette').niceScroll({ cursorwidth: "5px", cursorcolor: "#ccc" });
              // $('.palette').niceScroll("#myPaletteDiv");
            }
        })
    }

    if(Util.getQueryString('tmp') == 1) {
        loadTemplate();
    } else {
        $('.module-list').hide();
        $('.module').hide();
        $('.node ').addClass('active');
        $('.save-temp-icon').hide();
    }

    //获取模板详情
    function getTempDetail(id, callback) {
        Util.ajax({
            url: apiConfig.tempDetail,
            data: {
                templateguid: id
            },
            success: function(res) {
                if (typeof res === 'string') {
                    res = JSON.parse(res);
                }

                res.data["linkFromPortIdProperty"] = "fromPort";
                res.data["linkToPortIdProperty"] = "toPort";
                myDiagram.model = go.Model.fromJson(res.data);


                if(typeof callback == 'function') {
                    callback();
                }

            }
        })
    }

    win.getTempDetail = getTempDetail;
    
})(window, jQuery);

var testkey = 123;
//其他事件
(function(win, $) {

    var $addTemplate = $('#add-template'),
        $changeTemplate = $('#change-template'),
        $addConfirm = $('.tmp-save', $addTemplate),
        $addCancle = $('.tmp-cancle', $addTemplate),
        $tmpName = $('#tmp-name',$addTemplate),
        $changeConfirm = $('.tmp-save', $changeTemplate),
        $changeCancle = $('.tmp-cancle', $changeTemplate);


    $rangeScale.jRange({
        from: 0.1,
        to: 10.0,
        step: 0.1,
        scale: [],
        format: '%s',
        width: 100,
        showLabels: false,
        snap: true
    });

    

   /* $(document).on('click', '.icon-download' ,function() {
        var $this = $(this),
            id = $this.data('id');
        var path = Util.getRootPath();
        window.open(path + "frame/base/attach/attachdown?attachGuid=" + id);
    });*/

    $(document).on('click', '#cover', function() {
        $(this).hide();
        $attrPanel.removeClass('show');

        if(attrType == 1) {
            myDiagram.commandHandler.deleteSelection();
        }
        
        var iframe = $attrIframe;

        iframe.attr('src', 'about:blank');
        try {
            iframe.contentWindow.document.write('');
            iframe.contentWindow.document.close();
        } catch (e) {
            console.log(e)
        }

        if($changeTemplate.css('display') == 'block') {
            $changeTemplate.hide();
        }

        if($addTemplate.css('display') == 'block') {
            $addTemplate.hide();
        }

    }).on('click', '.cxm',function(event) {
        var $this = $(this),
          type = $this.data('type');

          var val = event.currentTarget.id;
          console.log(event.currentTarget);
          console.log(val);
          console.log(type);

          if(type == 'delete') {
              myDiagram.commandHandler.deleteSelection();
          } else if(type == 'set') {
            // console.log(cacheData);

                attrType = 2;
                $attrName.text(cacheData.name);
                $cover.show();
                $attrIframe.attr('src', cacheData.url);
                $('#attr-panel').addClass('show');
          }

          myDiagram.currentTool.stopTool();
    });

    $moduleUl.on('click', '.module-item', function() {
        var $this = $(this),
            id = $this.data('id');

        $changeTemplate.data('id', id);
        $changeTemplate.show();
        $cover.show();

        
    });

    //切换模板
    $changeTemplate.on('click', '.tmp-save', function() {
        var _id = $changeTemplate.data('id');
        //此处不做缓存判断，可能用户就想再点击一次重新进行编辑
        getTempDetail(_id, function() {
            $cover.hide();
            $changeTemplate.hide();
        });
        
    }).on('click', '.tmp-cancle,.tmp-close', function() {
        $cover.hide();
        $changeTemplate.hide();
    });

    //新增模板
    $addTemplate.on('click', '.tmp-save', function() {
        var _name = $.trim($tmpName.val());
        if( !_name) {
            alert('请填写模板名称');
            return false;
        }

        var saveData = {
            templatename: _name,
            templatejson: myDiagram.model.toJson(),
            image: myDiagram.makeImageData({
              size: new go.Size(138,94),
              background: "white"
            }),
            templatetype: 1
        };

        //保存中
       isSaveTemEd = false;

       saveTempData(saveData, function() {
            $cover.hide();
            $addTemplate.hide();
            isSaveTemEd = true;
       });

       
    }).on('click', '.tmp-cancle,.tmp-close', function() {
        $cover.hide();
        $addTemplate.hide();
    });

    $attrPanel.on('click', '.attr-cancel', function() {
        $('#cover').hide();
        $attrPanel.removeClass('show');
        if(attrType == 1) {
            myDiagram.commandHandler.deleteSelection();
        }
        
        var iframe = $attrIframe;

        iframe.attr('src', 'about:blank');
        try {
            iframe.contentWindow.document.write('');
            iframe.contentWindow.document.close();
        } catch (e) {
            // console.log(e)
        }


    }).on('click', '.attr-confirm', function() {
        //点击确定
        
        //传到主页面并修改主页面的节点名称
        // var iframeData = $attrIframe.contents().getAllData();
        var iframeData = $(window.parent.document).contents().find("#attr-iframe")[0].contentWindow.getAllData();
        
        if(cacheData.name != iframeData.name) {
          myDiagram.model.setDataProperty(cacheData, "name", JSON.parse(iframeData).name);
        }

        myDiagram.model.setDataProperty(cacheData, "info", iframeData);
        myDiagram.model.setDataProperty(cacheData, "key", testkey);

        // myDiagram.model.setDataProperty({"from":-3, "to":-2, "points":[]},'new','test');

        testkey++;

        $('#cover').hide();
        $attrPanel.removeClass('show');
        var iframe = $attrIframe;

        iframe.attr('src', 'about:blank');
        try {
            iframe.contentWindow.document.write('');
            iframe.contentWindow.document.close();
        } catch (e) {
            // console.log(e)
        }
    });

    $header.on('click','.icon-item', function() {
      var $this = $(this),
        type = $this.data('type');
      
      switch(type) {
        case 'savetemp':
            //需要判断
            //是新建，还是修改
            $cover.show();
            $addTemplate.show();
            
            break;

        case 'save':
          console.log(myDiagram.model.toJson());
          saveFlow(myDiagram.model.toJson());
          myDiagram.isModified = false;
          break;
        case 'undo':
          myDiagram.undoManager.undo();
          console.log('撤销');
          break;
        case 'redo':
          myDiagram.undoManager.redo();
          console.log('前进');
          break;
        case 'coordinate':
          // console.log('直角坐标系是什么鬼');
          break;
        case 'algin':
          // myDiagram.initialContentAlignment = "Left";
          // myDiagram.rebuildParts();
          // myDiagram.scale = 3;
          // console.log('剧中');
          break;
        case 'vertical':
          // console.log('看不懂');
          myDiagram.zoomToFit();
          break;
        case 'max':
          // $rangeScale.val() += 0.2;
          if(myDiagram.scale < 10) {
            myDiagram.scale += .1;

            $rangeScale.jRange('setValue',myDiagram.scale+'');
          }
          
          break;
        case 'min':
          if(myDiagram.scale > 0.1) {
            myDiagram.scale -= .1;
            $rangeScale.jRange('setValue',myDiagram.scale+'');
          }
          break;
        case 'view':
          $this.toggleClass('active');
          $myOverviewDiv.toggleClass('active');

        default:
          break;
      }
    }).on('click','.head-site-item', function() {
      var $this = $(this),
        type = $this.find('.icon-item').data('type');

        if(Util.getQueryString('tmp') == 1) {
            $this.toggleClass('active').siblings().toggleClass('active');

            $('.pannel-'+ type).toggleClass('active').siblings().toggleClass('active');
        }
        
        

    }).on('change', '#range-scale', function(){
      console.log($(this).val());
      myDiagram.scale = + $(this).val();
    });

    //保存流程
    function saveFlow(data) {
      Util.ajax({
        url: apiConfig.saveFlow,
        data:data,
        success: function(res){
          if(res.code == 200) {
            alert('保存成功');
          }
        }
      })
    }

    //保存模板
    function saveTempData(data, callback) {
        console.log(data);

        Util.ajax({
            url: apiConfig.saveTempData,
            data:data,
            success: function(res){
              if(res.code == 200) {
                alert('保存模板成功');

                if(typeof callback == 'function') {
                    callback();
                }
              }
            }
        })
    }
})(window, jQuery);