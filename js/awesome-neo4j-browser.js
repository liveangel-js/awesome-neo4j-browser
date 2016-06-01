/**
 * Created by liveangel on 16-5-16.
 */


/**
 *
 *
 * 配置区域
 *
 * @type {{}}
 */
var awesome_settings = {};
awesome_settings.doubleClickEnabled = false;
var enable_hover_edge = true;
var enable_drag_node = true;
var enable_hover_node = true;
//var colors = ['#111', '#00FFFF', '#4EEE94', '#ccc'];
var colors = ['#00c0ef', '#00a65a', '#f39c12', '#f56954', '#d2d6de', '#39CCCC', '#605ca8', '#ff851b', '#D81B60'];
var edge_types = ['arrow', 'line', 'curve', 'curvedArrow', 'dashed', 'dotted', 'parallel', 'tapered'];
var node_types = ['square', 'circle', 'diamond', 'cross', 'equilateral', 'star', 'pacman'];
awesome_settings.specific = {};
awesome_settings.specific.colors = colors;
awesome_settings.specific.edge_types = edge_types;
awesome_settings.specific.node_types = node_types;
awesome_settings.specific.default_edge_type = 'arrow';
awesome_settings.specific.default_node_type = 'circle';

awesome_settings.specific.default_expand_cypher = "MATCH (n)-[r]-(m) WHERE id(n)=@id@ RETURN n,r,m";
awesome_settings.specific.default_certain_expand_cypher = "MATCH (n)-[r:@relation@]-(m) WHERE id(n)=@id@ RETURN n,r,m";



var server_setting = {
    url: "http://localhost:7474",
    username: "neo4j",
    password: "neo4j"
};

//hover edge
if (enable_hover_edge) {

    awesome_settings.enableEdgeHovering = true;
    //awesome_settings.edgeHoverColor = "edge";
    awesome_settings.edgeHoverColor = "default";
    awesome_settings.defaultEdgeHoverColor = '#000';
    awesome_settings.edgeHoverSizeRatio = 2;
    awesome_settings.edgeHoverExtremities = true;
    awesome_settings.default_node_size = 5;
    awesome_settings.default_edge_size = 2;

    /**
     * Label 相关设置
     * @type {string}
     */

    awesome_settings.defaultLabelColor = '#FFFFFF';//节点标签颜色
    awesome_settings.defaultLabelSize = 14;//节点标签颜色
    awesome_settings.labelSize = 'proportiona';//节点标签大小，proportional与Node成比例，fixed则固定值
    awesome_settings.labelSizeRatio = 1; //节点上的Label和节点的比例关系，如果节点文字太小，将其改大
    awesome_settings.labelThreshold = 2; //节点在图上视觉大小小于多少时，节点的标签不显示

    /**
     * edge 相关设置
     * @type {string}
     */

    awesome_settings.defaultEdgeLabelColor = '#FFFFFF'; //
    //awesome_settings.edgeLabelSize = 'proportional'; //
    //awesome_settings.edgeLabelSizePowRatio = 0.8; //

    //awesome_settings.edgeLabelSize = 'fixed'; //
    //awesome_settings.defaultEdgeLabelSize = 10; //

    awesome_settings.edgeLabelThreshold = 0.8; //
    awesome_settings.minArrowSize = 10; //


    //min max size
    awesome_settings.minNodeSize = 1;
    awesome_settings.maxNodeSize = 10;
    awesome_settings.minEdgeSize = 0.5;
    awesome_settings.maxEdgeSize = 3;


    // LABEL
    awesome_settings.drawLabels = true;
    awesome_settings.drawEdgeLabels = true;

    //LABLE
//        awesome_settings.edgeLabelSize = 'proportional';
}

if (enable_hover_node) {
    awesome_settings.enableHovering = true;
    awesome_settings.borderSize = 5;
    awesome_settings.defaultNodeBorderColor = "#00F";


}
awesome_settings.nodesPowRatio = 1;
awesome_settings.edgesPowRatio = 1;

//glyph相关设置
awesome_settings.glyphScale = 0.5;
awesome_settings.glyphFillColor = '#666';
//awesome_settings.glyphTextColor = 'white';
awesome_settings.glyphStrokeColor = 'transparent';
awesome_settings.glyphFont = 'FontAwesome';
awesome_settings.glyphFontStyle = 'normal';
awesome_settings.glyphTextThreshold = 2;
awesome_settings.glyphThreshold = 2;
awesome_settings.glyphStrokeIfText = true;
//************************配置区域结束****************************


/**
 * 初始化数据
 */
var s,
    g = {
        nodes: [],
        edges: []
    };


// Instantiate sigma:
s = new sigma({
    graph: g,
    renderer: {
        container: document.getElementById('graph-container'),
        type: 'canvas'
    },
    settings: awesome_settings
});


var myAnb = new anb();
var modes = new mode();
modes.setMode("Unlimited");
modes.initModeSetting();

//******************************配置相关初始化区域结束**************************
//******************************游戏模式MODE开始**************************/**
/**
 * Show different mode like game mode according to user's choice
 */

function mode(){
    var _self = this;
    this.current_mode = "";
    var mode_setting = {
        "Unlimited":unlimitedSetting,
    };
    var mode_data = {
        "Unlimited":unlimitedLoadData,
    };

    this.setMode = function setMode(choice){
        this.current_mode = choice;

    };
    this.initModeSetting = function initModeSetting(){
        mode_setting[this.current_mode]();
    };

    this.loadModeData = function loadModeData(s, stop){
        console.log("Load Data: Mode " + this.current_mode);
        mode_data[this.current_mode](s, stop);
    };
    //var modes_func = {
    //    Unlimited:
    //}
    function unlimitedLoadData(){

    }
    function unlimitedSetting(){
        console.log("Set Mode To unlimited");

    }
}


//******************************游戏模式MODE结束**************************

/**
 * 文档加载好后 界面相关的 初始化代码区
 *
 *
 */
$(document).ready(function () {
    $('#graph-container').height(window.screen.height * 0.7);
    $('#container').height(window.screen.height * 0.75);


    $("#guidance-modal").modal('show');
    //默认账户密码
    $("#input-host").val(server_setting.url);
    $("#input-username").val(server_setting.username);
    $("#input-password").val(server_setting.password);

    $("#open-node-info").on('click', function (event) {
        openSiderbar("node_info");
    });
    $("#open-general-setting").on('click', function (event) {
        openSiderbar("general_setting");
    });
    $('#draw-edge-label').on('change', function (event) {
        //console.log("change");
        changeSigmaSettings(event.target);
    });
    $('#draw-node-label').on('change', function (event) {
        changeSigmaSettings(event.target);
    });
    $('#max-edge-size').val(awesome_settings.maxEdgeSize);
    $('#max-node-size').val(awesome_settings.maxNodeSize);
    $('#max-edge-size').on('blur', function (event) {
        changeSigmaSettings(event.target);
    });
    $('#max-node-size').on('blur', function (event) {
        changeSigmaSettings(event.target);
    });


});

// init codemirror

// init editor
window.cypher_editor = CodeMirror.fromTextArea(document.getElementById('cypher-edit'), {
    mode: 'application/x-cypher-query',
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    lineWrapping: true,
    theme: 'neo'
});
window.cypher_editor.setSize("90%", "70");


//window.expand_cypher_editor = CodeMirror.fromTextArea(document.getElementById('expand-cypher-editor'), {
//    mode: 'application/x-cypher-query',
//    indentWithTabs: true,
//    smartIndent: true,
//    lineNumbers: true,
//    matchBrackets : true,
//    autofocus: true,
//    lineWrapping: true,
//    theme: 'neo'
//});
//window.expand_cypher_editor.setSize("100%","100");
// 取消DROPDOWN的自动关闭
//------******-------
$('li.dropdown.messages-menu a').on('click', function (event) {
    $(this).parent().toggleClass('open');
});
$('body').on('click', function (e) {
    checkCloseDropDown(e);
});
function checkCloseDropDown(e) {
    if (!$('li.dropdown.messages-menu').is(e.target)
        && $('li.dropdown.messages-menu').has(e.target).length === 0
        && $('.open').has(e.target).length === 0
    ) {
        $('li.dropdown.messages-menu').removeClass('open');
    }
}
// 给修改边、节点属性的确定按钮绑定事件

$("#setting-change-class-format").click(function () {
    var new_color = $('#wheel-demo').val();
    var new_size = Number($('#setting-size-input').val());


    var class_name = $("#setting-change-class-format").attr('data-value');
    var class_type = myAnb.checkClassName(class_name);
    if (class_type == "node") {
        var new_type = $("#setting-node-type").val();
    } else if (class_type == "edge") {
        var new_type = $("#setting-edge-type").val();
    }
    myAnb.changeClassFormat(class_name, {color: new_color, size: new_size, shape: new_type});
    myAnb.updateGraphByClass(s, class_name);
    s.refresh();


});
//******************************界面初始化区域结束**************************


//******************************界面逻辑控制代码开始**************************

/**
 * 修改，边，节点 相关设置 控制代码区
 */

function initNodeEdgeSettingDropDown(type, input) {
    var origin_color = input.color;
    var origin_size = input.size;
    var origin_type = input.shape;
    $('#setting-color').css('visibility', 'visible');
    $('#setting-size').css('visibility', 'visible');
    $('#setting-type').css('visibility', 'visible');
    $('#setting-node-edge-save').css('visibility', 'visible');

    // Color Settings
    $("#setting-color").find('.minicolors').remove();
    $("#setting-color").append(
        '<input type="text" id="wheel-demo" class="form-control color-picker" data-control="wheel" value="' + origin_color + '">');
    var colpick = $('.color-picker').each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: 'lowercase',
            opacity: false,
            change: function (hex, opacity) {
                if (!hex) return;
                if (opacity) hex += ', ' + opacity;
                try {
                    //console.log(hex);
                } catch (e) {
                }
                $(this).select();
            },
            theme: 'bootstrap'
        });
    });

    // Size Settings
    $('#setting-size-input').val(origin_size);

    // Select Settings
    if (type == "node") {
        $('#setting-edge-type').css('visibility', 'hidden');
        $('#setting-edge-type').removeClass('align-to-right');
        $('#setting-node-type').css('visibility', 'visible');
        $('#setting-node-type').addClass('align-to-right');

        $('#setting-node-type').val(origin_type);


    } else if (type == "edge") {
        $('#setting-edge-type').css('visibility', 'visible');
        $('#setting-edge-type').addClass('align-to-right');
        $('#setting-node-type').css('visibility', 'hidden');
        $('#setting-node-type').removeClass('align-to-right');

        $('#setting-edge-type').val(origin_type);

    }
    $("#setting-change-class-format").attr('data-value', input.class_name);


}

/**
 * 响应 设置界面，选中 某种节点 标签进行设置
 * @param target
 */

function editNode(target) {
    $('#setting-edges').children().removeClass("import-warn");
    $('#setting-edges').children().addClass("filter-a");
    $(target).siblings().removeClass("import-warn");
    $(target).siblings().addClass("filter-a");
    $(target).removeClass("filter-a").addClass("import-warn");
    var class_name = $(target).attr('data-value');
    var is_node_class = _.findWhere(myAnb.node_types, {class_name: class_name});
    if (is_node_class) {
        console.log("node", class_name);
        // is node class
        initNodeEdgeSettingDropDown("node", is_node_class);
    } else {


    }
}
/**
 * 响应 设置界面，选中 某种边 标签进行设置
 * @param target
 */

function editEdge(target) {
    $('#setting-nodes').children().removeClass("import-warn");
    $('#setting-nodes').children().addClass("filter-a");
    $(target).siblings().removeClass("import-warn");
    $(target).siblings().addClass("filter-a");
    $(target).removeClass("filter-a").addClass("import-warn");
    var class_name = $(target).attr('data-value');
    var is_edge_class = _.findWhere(myAnb.edge_types, {class_name: class_name});
    if (is_edge_class) {
        console.log("edge", class_name);
        initNodeEdgeSettingDropDown("edge", is_edge_class);

    } else {
        // impossible to reach
    }
}

//******************************界面逻辑控制代码结束**************************

//------******-------
/**
 *
 * Sigma JS 相关代码区
 *
 */
enableGlyph();
enableDraggable();
var filter = enableFilter();
enableLocate();

enableExportSvg();
enableExportImage();
enableLasso();
enableTooltip();
enableLegend();
enableNeoQuery();
var discover = new enableDiscover();
enableForceAtlas();
//启用事件追踪

enableEventTracker();

//    queryCypher();

/**
 *
 * Awesome neo4j browser 主类，存储 节点、边的META信息，以及封装了刷新图等接口
 *
 */

function anb() {
    this.node_types = [];
    this.edge_types = [];
    _self = this;
    this.reset = function reset() {
        /**
         * 重新执行Query的时候 情况META信息
         * @type {Array}
         */
        this.node_types = [];
        this.edge_types = [];
        this.maxDegree = 0;
        this.minDegree = 0;
        this.node_classes = {};
        this.edge_classes = {};
        this.node_showname_list = {};
        this.node_showname_dict = {};
        this.edge_showname_dict = {};
        this.resetGUI();
    };

    this.stat = function stat(s) {
        /**
         * 统计信息
         */
        var maxDegree = 0,
            minDegree = 0,
            node_classes = {},
            edge_classes = {},
            node_showname_list = {},
            node_showname_dict = {},
            edge_showname_dict = {};

        // read nodes
        s.graph.nodes().forEach(function (n) {
            maxDegree = Math.max(maxDegree, s.graph.degree(n.id));
            minDegree = Math.min(minDegree, s.graph.degree(n.id));
            node_classes[n.class_name] = true;
            node_showname_list[n.label] = n.id;

            if (node_showname_dict[n.class_name] == undefined) {
                node_showname_dict[n.class_name] = [];
                node_showname_dict[n.class_name].push(n.label);
            } else {
                node_showname_dict[n.class_name].push(n.label);
            }


        });

        s.graph.edges().forEach(function (e) {
            edge_classes[e.class_name] = true;
            if (edge_showname_dict[e.class_name] == undefined) {
                edge_showname_dict[e.class_name] = [];
                edge_showname_dict[e.class_name].push(e.label);
            } else {
                edge_showname_dict[e.class_name].push(e.label);
            }
        });

        this.maxDegree = maxDegree;
        this.minDegree = minDegree;
        this.node_classes = node_classes;
        this.edge_classes = edge_classes;
        this.node_showname_list = node_showname_list;
        this.node_showname_dict = node_showname_dict;
        this.edge_showname_dict = edge_showname_dict;

    };

    this.resetGUI = function resetGUI() {
        $("#setting-nodes")[0].innerHTML = "";
        $("#setting-edges")[0].innerHTML = "";
        $("#legend-nodes")[0].innerHTML = "";
        $("#legend-edges")[0].innerHTML = "";
        $('#setting-color').css('visibility', 'hidden');
        $('#setting-size').css('visibility', 'hidden');
        $('#setting-type').css('visibility', 'hidden');
        $('#setting-node-edge-save').css('visibility', 'hidden');
        resetSelect("locate-node-category", "All Nodes", "");
        resetSelect("locate-node-list", "All Nodes", "");
        resetSelect("filter-node-category", "All CATEGORIES", "");
        resetSelect("filter-edge-category", "All CATEGORIES", "");
        resetSelect("filter-node-list", "All NODES", "");

    };
    this.checkClassName = function checkClassName(class_name) {
        if (_.findWhere(this.node_types, {class_name: class_name})) {
            return "node";
        }
        if (_.findWhere(this.edge_types, {class_name: class_name})) {
            return "edge";
        }
        return null;

    };
    this.getClassFormatByName = function getClassFormatByName(class_name) {
        var is_node = _.findWhere(this.node_types, {class_name: class_name});
        if (is_node) {
            return is_node;
        }
        var is_edge = _.findWhere(this.edge_types, {class_name: class_name});
        if (is_edge) {
            return is_edge;
        }
        return null;
    }
    this.changeClassFormat = function changeClassFormat(class_name, new_format) {
        var class_format = this.getClassFormatByName(class_name);
        for (var key in new_format) {
            //console.log(key);
            //console.log(class_format[key]);
            //console.log(class_format.key);
            //console.log(class_format.size);
            //console.log(class_format["size"]);
            //console.log(new_format[key]);
            class_format[key] = new_format[key];
        }

    };

    this.updateMetadata = function updateMetadata(s) {
        /**
         * 从图上所有节点，边，抽取META信息，初次生成图时使用
         */
        s.graph.nodes().forEach(function (node) {
            _self.extractMetaByNode(node);

        });
        s.graph.edges().forEach(function (edge) {
            _self.extractMetaByEdge(edge);
        });

        console.log("NODE TYPES:", this.node_types);
        console.log("EDGE TYPES:", this.edge_types);
    };
    this.extractMetaByNode = function (node) {
        /**
         * 判断节点是否是新类，是新类的话，增加META信息
         * @type {*}
         */
        var class_exist = _.findWhere(_self.node_types, {class_name: node.neo4j_data.class_name});
        if (!class_exist) {

            var class_type = node.neo4j_data.class_name;
            var color, shape;
            switch (class_type) {
                default:
                    shape = "arrow";
                    color = "#DDDDDD";

            }

            _self.node_types.push({
                class_name: node.neo4j_data.class_name,
                size: awesome_settings.default_node_size,
                color: color,
                shape: shape,
                count: 1
            })
        } else {
            class_exist.count += 1;

        }

    };
    this.extractMetaByEdge = function (edge) {
        /**
         * 判断节点是否是新类，是新类的话，增加META信息
         * @type {*}
         */
        var class_exist = _.findWhere(_self.edge_types, {class_name: edge.neo4j_data.class_name});
        if (!class_exist) {
            var class_type = edge.neo4j_data.class_name;
            var color, shape;
            switch (class_type) {
                default:
                    shape = "arrow";
                    color = "#DDDDDD";
            }

            _self.edge_types.push({
                class_name: edge.neo4j_data.class_name,
                size: awesome_settings.default_edge_size,
                color: color,
                shape: shape,
                count: 1
            });
        } else {
            class_exist.count += 1;
        }
    };

    this.mappingNodeFormat = function mappingNodeFormat(node_format, node) {
        /**
         * 根据给定的节点类型，更新单个节点状态
         */
        node.color = node_format.color;
        node.size = node_format.size;
        node.type = node_format.shape;
        //if (node.label)

    };
    this.mappingEdgeFormat = function mappingEdgeFormat(edge_format, edge) {
        /**
         * 根据给定的边类型，更新单个边状态
         */
        edge.color = edge_format.color;
        edge.size = edge_format.size;
        edge.type = edge_format.shape;
        //edge.hover_color = "#000";
    };

    this.updateGraphByClass = function updateGraphByClass(s, class_name) {
        var class_type = this.checkClassName(class_name);
        if (class_type == "node") {
            _self.updateGraphNodeByClass(s, class_name);
        } else if (class_type == "edge") {
            _self.updateGraphEdgeByClass(s, class_name);
        }
    }
    this.updateGraphNodeByClass = function updateGraphNodeByClass(s, class_name) {
        /**
         * 更新所有给定类型的节点的状态
         */
        var node_list = s.graph.nodes();
        var node_format = _.findWhere(_self.node_types, {class_name: class_name});
        node_list.forEach(function (node) {
            if (node.neo4j_data.class_name == class_name) {
                _self.mappingNodeFormat(node_format, node);
            } else {
            }
        });

    };

    this.updateGraphEdgeByClass = function updateGraphEdgeByClass(s, class_name) {
        /**
         * 更新所有给定类型的边的状态
         */
        var edge_list = s.graph.edges();
        var edge_format = _.findWhere(_self.edge_types, {class_name: class_name});
        edge_list.forEach(function (edge) {
            if (edge.neo4j_data.class_name == class_name) {
                _self.mappingEdgeFormat(edge_format, edge);
            } else {
            }
        })

    };
    this.updateGraphNodeByNode = function updateGraphNodeByNode(node) {
        /**
         * 根据给定节点的类型，根据META设置，更新该节点的状态，用于一个新节点加入图中
         * @type {*}
         */

        this.extractMetaByNode(node);
        var node_format = _.findWhere(_self.node_types, {class_name: node.class_name});
        this.mappingNodeFormat(node_format, node);
    };
    this.updateGraphEdgeByEdge = function updateGraphEdgeByEdge(edge) {
        /**
         * 根据给定边的类型，根据META设置，更新该边的状态，用于一个新边加入图中
         * @type {*}
         */
        this.extractMetaByEdge(edge);
        var edge_format = _.findWhere(_self.edge_types, {class_name: edge.class_name});
        this.mappingEdgeFormat(edge_format, edge);

    };
    this.updateGraph = function updateGraph(s) {
        /**
         * 根据META设置信息，刷新整个图的状态
         */
        console.log("updateGraph", _self.node_types);
        console.log("updateGraph", _self.edge_types);
        _self.node_types.forEach(function (node_format) {
            console.log(node_format.class_name);
            _self.updateGraphNodeByClass(s, node_format.class_name);
        });

        _self.edge_types.forEach(function (edge_format) {
            console.log(edge_format.class_name);
            _self.updateGraphEdgeByClass(s, edge_format.class_name);
        });

    };
    this.mappingProperties = function mappingProperties(entity) {
        /**
         * 映射节点或边的基本属性，每个元素新加入图时都要进行
         */
        entity.data = entity.neo4j_data;
        entity.label = String(entity.neo4j_data.show_name);
        entity.class_name = entity.neo4j_data.class_name;
        entity.image = {
            url: undefined,
            // scale/clip are ratio values applied on top of 'size'
            scale: 1.3,
            clip: 0.85
        };
    };
    this.startForceAtlas = function startLayout(s) {
        s.killForceAtlas2();
        s.startForceAtlas2({worker: true, barnesHutOptimize: false});
        console.log("startForceAtlas");
        console.log(new Date().toLocaleTimeString());
    };


    this.stopForceAtlas = function stopLayout(s) {
        console.log("stopForceAtlas");
        console.log(new Date().toLocaleTimeString());
        s.stopForceAtlas2();
        s.killForceAtlas2();
        console.log("s refresh");
        s.refresh();

    };
    this.renderModeData = function renderModeData(s, stop){
        //var current_mode = modes.current_mode;
        modes.loadModeData(s, stop);


    }
}

/**
 * Cypher执行完毕后的 回调函数
 *
 * @param s
 */

function initData(s) {
    var nodes_list = s.graph.nodes();
    var edege_list = s.graph.edges();
    g.nodes = nodes_list;
    g.edges = edege_list;

    for (i = 0; i < nodes_list.length; i++) {
        var node = nodes_list[i];
        myAnb.mappingProperties(node);
    }
    for (i = 0; i < edege_list.length; i++) {
        var edge = edege_list[i];
        myAnb.mappingProperties(edge);
    }
    console.log("NODES", nodes_list);
    console.log("EDGES", edege_list);
    myAnb.reset();
    myAnb.updateMetadata(s);
    myAnb.updateGraph(s);
    myAnb.stat(s);
    myAnb.renderModeData(s, true);
    updateGUI();



    s.refresh();
    console.log(s.graph.nodes());

    //打开图信息面板
    showGraphPanel();

    //2秒后停止Force Atlas
    myAnb.startForceAtlas(s);

    setTimeout("myAnb.stopForceAtlas(s)", 2000);
    //spinnerStop();


}

function updateGUI() {
    updateNodeEdgeSettingPanel();
    updateLocatePanel();
    updateFilterPanel();
}

/**
 * 将现有的 节点、边元素 显示在界面上供用户选择
 */
function updateNodeEdgeSettingPanel() {

    myAnb.node_types.forEach(function (n) {
        $("#setting-nodes").append('<label class="filter-a" ' +
            'style="border: 1px solid ' + n.color + ';color:white;background:' + n.color + '"' +
            'data-value="' + n.class_name + '" onclick="editNode(this)">' + n.class_name + '</label>');
        $("#legend-nodes").append('<label class="filter-a" ' +
            'style="border: 1px solid ' + n.color + ';color:white;background:' + n.color + '"' +
            'data-value="' + n.class_name + '" >' + n.class_name + '</label>');

    });

    myAnb.edge_types.forEach(function (n) {
        $("#setting-edges").append('<label class="filter-a" ' +
            'style="border: 1px solid ' + n.color + ';color:white;background:' + n.color + '"' +
            'data-value="' + n.class_name + '" onclick="editEdge(this)">' + n.class_name + '</label>');
        $("#legend-edges").append('<label class="filter-a" ' +
            'style="border: 1px solid ' + n.color + ';color:white;background:' + n.color + '"' +
            'data-value="' + n.class_name + '">' + n.class_name + '</label>');
    });

}
/**
 * 重置 Select
 * @param id
 * @param defaultText
 * @param defaultValue
 */

function resetSelect(id, defaultText, defaultValue) {
    var selectElt = __.$(id);
    selectElt.innerHTML = "";
    var defaultOpt = document.createElement("option");
    defaultOpt.value = defaultValue;
    defaultOpt.text = defaultText;
    selectElt.add(defaultOpt);
    selectElt.selectedIndex = 0;
}

function updateLocatePanel() {
    // node category
    //resetSelect("locate-node-category", "All Nodes", "");
    var nodecategoryElt = __.$('locate-node-category');
    Object.keys(myAnb.node_classes).forEach(function (c) {
        var optionElt = document.createElement("option");
        optionElt.text = c;

        nodecategoryElt.add(optionElt);
    });

    // node list
    //resetSelect("locate-node-list", "All Nodes", "");
    var nodelistElt = __.$('locate-node-list');
    Object.keys(myAnb.node_showname_list).forEach(function (c) {
        var optionElt = document.createElement("option");
        optionElt.text = c;
        optionElt.value = myAnb.node_showname_list[c];
        nodelistElt.add(optionElt);
    });

}
function updateFilterPanel() {
    // min degree

    __.$('now-degree-value').textContent = myAnb.minDegree;
    __.$('min-degree-value').textContent = myAnb.minDegree;
    __.$('max-degree-value').textContent = myAnb.maxDegree;
    __.$('degree-control').min = myAnb.minDegree;
    __.$('degree-control').max = myAnb.maxDegree;

    // node category

    var nodecategoryElt = __.$('filter-node-category');
    Object.keys(myAnb.node_classes).forEach(function (c) {
        var optionElt = document.createElement("option");
        optionElt.text = c;
        nodecategoryElt.add(optionElt);
    });
    var edgecategoryElt = __.$('filter-edge-category');
    Object.keys(myAnb.edge_classes).forEach(function (c) {
        var optionElt = document.createElement("option");
        optionElt.text = c;
        edgecategoryElt.add(optionElt);
    });
    // node list

    var nodelistElt = __.$('filter-node-list');
    Object.keys(myAnb.node_showname_list).forEach(function (c) {
        var optionElt = document.createElement("option");
        optionElt.text = c;
        optionElt.value = myAnb.node_showname_list[c];
        nodelistElt.add(optionElt);
    });
}

function enableGlyph(){
    //glyph相关
    var sRenderers = s.renderers[0];
    sRenderers.glyphs();
    sRenderers.bind('render', function(e){
        sRenderers.glyphs();
    });

}

function enableNeoQuery() {
    window.cypher_editor.setValue("MATCH (n) OPTIONAL MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 10");
    window.cypher_editor.addKeyMap(
        {
            "Ctrl-Enter": runQuery,
            "Alt-Enter": runQuery
        },
        false
    );
    function runQuery() {
        spinnerStart();
        var statement = window.cypher_editor.getValue();
        console.log(statement);
        queryCypher(statement);
    };
    __.$("query-btn").addEventListener("click", function (e) {
        runQuery();
    });
}
function queryCypher(sql) {
    //console.log($("#input-host").val());
    //console.log($("#input-username").val());
    //console.log($("#input-password").val());\
    s.killForceAtlas2();
    s.graph.clear();
    sigma.neo4j.cypher(
        {url: $("#input-host").val(), user: $("#input-username").val(), password: $("#input-password").val()},
        sql,
        s,
        function (s) {
            console.log('Number of nodes :' + s.graph.nodes().length);
            console.log('Number of edges :' + s.graph.edges().length);
            initData(s);
        }
    );
    s.refresh();

}


function enableDiscover() {
    var query = awesome_settings.specific.default_expand_cypher;
    //

    var _self = this;
    this.mergeData = function (currentNode) {
        return function (result_graph) {
            //console.log("currentNode" ,currentNode);
            //console.log("result_graph" ,result_graph);
            //console.log("original nodes",s.graph.nodes());
            //console.log("original edges",s.graph.edges());
            result_graph.nodes.forEach(function (node, index) {

                if (_.findWhere(s.graph.nodes(), {id: node.id}) === undefined) {
                    node.x = currentNode.x + Math.cos(Math.PI * 2 * index / result_graph.nodes.length - Math.PI / 2);
                    node.y = currentNode.y + Math.sin(Math.PI * 2 * index / result_graph.nodes.length - Math.PI / 2);
                    myAnb.mappingProperties(node);
                    myAnb.updateGraphNodeByNode(node);
                    s.graph.addNode(node);
                }
            });

            result_graph.edges.forEach(function (edge) {
                if (_.findWhere(s.graph.edges(), {id: edge.id}) === undefined) {
                    myAnb.mappingProperties(edge);
                    myAnb.updateGraphEdgeByEdge(edge);
                    s.graph.addEdge(edge);
                }
            });

            //console.log("after nodes",s.graph.nodes());
            //console.log("after edges",s.graph.edges());
            //console.log(s.settings("drawEdgeLabels", false));
            s.refresh();

            myAnb.resetGUI();
            myAnb.stat(s);
            myAnb.renderModeData(s, false);
            spinnerStop();
            updateGUI();


        };
    };

    s.bind('doubleClickNode', function (e) {


        //spinnerStart();
        //var cypher = query.replace('@id@', e.data.node.id);
        //sigma.neo4j.cypher(
        //    {url: $("#input-host").val(), user: $("#input-username").val(), password: $("#input-password").val()},
        //    cypher,
        //    undefined,
        //    _self.mergeData(e.data.node));
    });
    this.expand = function expand(cypher, node_id){
        spinnerStart();
        var current_node ;
        for (var i =0; i< s.graph.nodes().length; i++){
            if (Number(s.graph.nodes()[i].id) == Number(node_id)){
                current_node = s.graph.nodes()[i];
                break;
            }
        }
        console.log(cypher);
        sigma.neo4j.cypher(
            {url: $("#input-host").val(), user: $("#input-username").val(), password: $("#input-password").val()},
            cypher,
            undefined,
            _self.mergeData(current_node));

    }

}


function spinnerStart() {
    $('#loading').css('visibility', 'visible');
    console.log("Start loading");

}
function spinnerStop() {
    $('#loading').css('visibility', 'hidden');
    console.log("Stop loading");

}


function getNeoAllTypes() {
    // Calling neo4j to get all its relationship type
    sigma.neo4j.getTypes(
        {url: $("#input-host").val(), user: $("#input-username").val(), password: $("#input-password").val()},
        function (types) {
            console.log("Relationship types" + types);
        }
    );

}
function getNeoAllLabels() {
    // Calling neo4j to get all its node label
    sigma.neo4j.getLabels(
        {url: $("#input-host").val(), user: $("#input-username").val(), password: $("#input-password").val()},
        function (labels) {
            console.log("Node labels" + labels);
        }
    );

}

function enableDraggable() {
    dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
    dragListener.bind('startdrag', function (event) {
    });
    dragListener.bind('drag', function (event) {
    });
    dragListener.bind('drop', function (event) {
    });
    dragListener.bind('dragend', function (event) {
    });
    return dragListener;
}
;

function enableEventTracker() {
    s.bind('clickNode', function (e) {
        //console.log(e.type, e.data.node.label, e.data.captor);
        //filter.undo().neighborsOf(e.data.node.id).apply();
    });
    s.bind('clickStage', function (e) {
//            console.log(e.type, e.data.captor);
//        filter.undo().apply();
        //console.log("click Stage");
        checkCloseDropDown(e);
    });
    s.bind('overNode outNode clickNode doubleClickNode rightClickNode', function (e) {
        //        console.log(e.type, e.data.node.label, e.data.captor);
    });
    s.bind('overEdge outEdge clickEdge doubleClickEdge rightClickEdge', function (e) {
        //        console.log(e.type, e.data.edge, e.data.captor);
    });
    s.bind('clickStage', function (e) {
        //        console.log(e.type, e.data.captor);
    });
    s.bind('doubleClickStage rightClickStage', function (e) {
        //        console.log(e.type, e.data.captor);
    });

}
;


/**
 * 使用Noverlap 布局,保证不OVERLAP和保持Marigin的算法
 *
 */
function enableNoverLap() {
    var config = {
        nodeMargin: 3.0,
        scaleNodes: 1.3
    };
    // Configure the algorithm
    var listener = s.configNoverlap(config);

    // Bind all events:
    listener.bind('start stop interpolate', function (event) {
        console.log(event.type);
    });
    // Start the algorithm:
    s.startNoverlap();

}


/**
 * 使用Force ATlas2布局
 *
 */
function enableForceAtlas() {

    __.$('btn-force-atlas-start').addEventListener("click", function (e) {
        //console.log("btn-force-atlas-start");
        //console.log(s.graph.nodes());
        myAnb.startForceAtlas(s);
    });
    __.$('btn-force-atlas-stop').addEventListener("click", function (e) {
        myAnb.stopForceAtlas(s);
        //console.log("btn-force-atlas-stop");
    });

}


function enableFilter() {
    var filter = new sigma.plugins.filter(s);

    // reset filter button
    __.$('filter-reset-btn').addEventListener("click", function (e) {
        __.$('degree-control').value = myAnb.minDegree;
        __.$('now-degree-value').textContent = myAnb.minDegree;
        __.$('filter-node-category').selectedIndex = 0;
        __.$('filter-edge-category').selectedIndex = 0;
        __.$('filter-node-list').selectedIndex = 0;
        filter.undo().apply();
//            __.$('dump').textContent = '';
//            __.hide('#dump');
    });

    function applyMinDegreeFilter(e) {
        var v = e.target.value;
        __.$('now-degree-value').textContent = v;

        filter
            .undo('min-degree')
            .nodesBy(function (n) {
                //定义的过滤数据的方法，只显示度大于V的
                return this.degree(n.id) >= v;
            }, 'min-degree')
            //min-degree is filter name, 被用作去undo
            .apply();
    }

    function applyNodeCategoryFilter(e) {
        var c = e.target[e.target.selectedIndex].value;
        if (c == "") {
            filter.undo().apply();
            return;
        }
        filter
            .undo('node-category')
            .nodesBy(function (n) {
                //定义过滤数据的方法，如果C的MAP为0，直接返回
                //否则判断Node的category属性是否为C，是的话 保留Return
                return !c.length || n.class_name === c;
            }, 'node-category')
            //node-category is filter name, 被用作去undo
            .apply();
    }

    function applyEdgeCategoryFilter(e) {
        var c = e.target[e.target.selectedIndex].value;
        if (c == "") {
            filter.undo().apply();
            return;
        }
        filter
            .undo('edge-category')
            .edgesBy(function (e) {
                //定义过滤数据的方法，如果C的MAP为0，直接返回
                //否则判断Edge的category属性是否为C，是的话 保留Return
                return !c.length || e.class_name === c;
            }, 'edge-category')
            //node-category is filter name, 被用作去undo
            .apply();
    }

    function applyNodeFilter(e) {
        var node = e.target[e.target.selectedIndex].value;

        if (node == "") {
            filter.undo().apply();
            return;
        }
        filter.undo().neighborsOf(node).apply();
    }

    __.$('degree-control').addEventListener("input", applyMinDegreeFilter);  // for Chrome and FF
    __.$('degree-control').addEventListener("change", applyMinDegreeFilter); // for IE10+, that sucks
    __.$('filter-node-category').addEventListener("change", applyNodeCategoryFilter);
    __.$('filter-edge-category').addEventListener("change", applyEdgeCategoryFilter);
    __.$('filter-node-list').addEventListener("change", applyNodeFilter);


    return filter;
}

function enableLocate() {
    /**
     * Locate
     *
     *
     */

    var locate_conf = {
        animation: {
            node: {
                duration: 800
            },
            edge: {
                duration: 800
            },
            center: {
                duration: 300
            }
        },
        focusOut: true,
        zoomDef: 1
    };
    var locate = sigma.plugins.locate(s, locate_conf);

    locate.setPadding({
        // top:250,
        // bottom: 250,
        right: 250,
        // left:250
    });

    if (!s.settings('autoRescale')) {
        sigma.utils.zoomTo(s.camera, 0, 0, locate_conf.zoomDef);
    }

    function locateNode(e) {
        var nid = e.target[e.target.selectedIndex].value;
        if (nid == '') {
            locate.center(1);
        }
        else {
            locate.nodes(nid);
        }
    };

    function locateNodesByCategory(e) {
        var c = e.target[e.target.selectedIndex].value;
        if (c == '') {
            locate.center(1);
        }
        else {
            var nodes = s.graph.nodes().filter(function (n) {
                return n.class_name == c;
            }).map(function (n) {
                return n.id;
            });

            locate.nodes(nodes);
        }
    };

    __.$('locate-node-list').addEventListener("change", locateNode);
    __.$('locate-node-category').addEventListener("change", locateNodesByCategory);

    // reset button
    __.$('locate-reset-btn').addEventListener("click", function (e) {
        __.$('locate-node-list').selectedIndex = 0;
        __.$('locate-node-category').selectedIndex = 0;
        locate.center(locate_conf.zoomDef);
    });
    return locate;
}


function enableChangeNodeType() {
    /**
     * 带图片的修改，统一修改的，已废弃
     *
     * 增加 修改 节点类型
     * @param e
     */
    var urls = [
        'img/img1.png',
        'img/img2.png',
        'img/img3.png',
        'img/img4.png'
    ];

    function changeNodeType(e) {
        var node_type = e.target[e.target.selectedIndex].value;
        s.graph.nodes().forEach(function (node) {
            node.type = node_type;
            // Insert Image
            if (Math.random() > 0.75 && node.type != 'pacman') { // ~0.75 of the (non-pacman)shapes will have an image
                node.image = {
                    url: urls[Math.floor(Math.random() * urls.length)],
                    // scale/clip are ratio values applied on top of 'size'
                    scale: 1.3,
                    clip: 0.85
                }
            }

            // Setting according to types

            switch (node.type) {
                case "equilateral":
                    node.equilateral = {
                        rotate: Math.random() * 45, // random rotate up to 45 deg
                        numPoints: Math.round(5 + Math.random() * 3)
                    };
                    break;
                case "star":
                    node.star = {
                        innerRatio: 0.4 + Math.random() * 0.2,
                        numPoints: Math.round(4 + Math.random() * 3)
                    };
                    if (node.image) {
                        // note clip/scale are ratio values. So we fit them to the inner ratio of the star shape
                        node.image.clip = node.star.innerRatio * 0.95;
                        node.image.scale = node.star.innerRatio * 1.2;
                    }
                    break;
                case "square":
                case "diamond":
                    if (node.image) {
                        // note clip/scale are ratio values. So we fit them to the borders of the square shape
                        node.image.clip = 0.7;
                    }
                    break;
                case "circle":
                    break;
                case "cross":
                    node.cross = {
                        lineWeight: Math.round(Math.random() * 5)
                    };
                    break;
            }

        });
        CustomShapes.init(s);
        s.refresh();
    }

    //__.$('node-type').addEventListener("change", changeNodeType);

}

function enableExportImage() {
    /**
     * 保存图片
     *
     */
    function generateImage(mouse, clip) {
        var size = 3000;
        var color = "#455660";
        sigma.plugins.image(s, s.renderers[0], {
            download: true,
            size: size,
            margin: 50,
            background: color,
            clip: clip,
            zoomRatio: 1,
            labels: true,
            format: 'jpg'
        });
    }

    __.$('download-btn').addEventListener("click", generateImage);
}
function enableExportSvg() {
    /**
     * 保存成SVG
     */
    function generateSvg() {
        console.log("Export to SVG");
        s.toSVG(
            {
                download: true,
                filename: 'mygraph.svg',
                size: 1000,
                data: true,
                labels: true,
            });
    }

    __.$('export-svg-btn').addEventListener("click", generateSvg);
}
function enableLasso() {
    /**
     *
     * Lasso Section
     *
     */
    var nodeRadius = 50;
    var initializeGraph = function (sigmaInstance) {

        var lasso = new sigma.plugins.lasso(sigmaInstance, sigmaInstance.renderers[0], {
            'strokeStyle': 'black',
            'lineWidth': 2,
            'fillWhileDrawing': true,
            'fillStyle': 'rgba(41, 41, 41, 0.2)',
            'cursor': 'crosshair'
        });

        // Listen for selectedNodes event
        lasso.bind('selectedNodes', function (event) {
            // Do something with the selected nodes
            var nodes = event.data;

            console.log('nodes', nodes);

            // For instance, reset all node size as their initial size
            sigmaInstance.graph.nodes().forEach(function (node) {
                node.color = 'black';
                node.size = nodeRadius;
            });

            // Then increase the size of selected nodes...
            nodes.forEach(function (node) {
                node.color = 'rgb(42, 187, 155)';
                node.size *= 3;
            });

            sigmaInstance.refresh();
        });

        return lasso;
    };
    var firstLasso = initializeGraph(s);

    document.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 76:
                if (event.altKey) {
                    if (firstLasso.isActive) {
                        firstLasso.deactivate();
                    } else {
                        firstLasso.activate();
                    }
                }
                break;
        }
    });
};

function rightClickExpand(target){
    var node_id = $(target).attr('data-value');
    var relation_type = $(target).attr('name');
    if (relation_type=="DEFAULT"){
        var cypher = awesome_settings.specific.default_expand_cypher;

    }else{
        var cypher = awesome_settings.specific.default_certain_expand_cypher;
        cypher = cypher.replace('@relation@', relation_type);


    }

    cypher = cypher.replace('@id@', node_id);
    discover.expand(cypher, node_id);


}

$('#snapshot_modal').on('hidden.bs.modal', function (e) {
    $('#snapshot_iframe').attr("src", "");
});


function enableTooltip() {
    /**
     * 增加Tooltip
     */
    var config = {
        node: [{
            show: '',
            hide: 'outNode',
            cssClass: 'sigma-tooltip',
            position: 'top',
            //autoadjust: true,
            template: '<div class="arrow"></div>' +
            ' <div class="sigma-tooltip-header">{{tooltip_title}}</div>' +
            '  <div class="sigma-tooltip-body">' +
            '    <table id = "tooltip-table">' +
            '      <content></content>' +
            '    </table>' +
            '  </div>' +
            '  <div class="sigma-tooltip-footer">Number of connections: {{degree}}</div>',
            renderer: function (node, template) {
                // The function context is s.graph
                node.degree = this.degree(node.id);
                // control header title
                node.tooltip_title = node.label;

                var content = "";


                template = template.replace('<content></content>', content);
                return Mustache.render(template, node);

            }
        }, {
            show: '',
            cssClass: 'sigma-tooltip',
            position: 'right',
            template: '<div class="arrow"></div>' +
            ' <div class="sigma-tooltip-header">{{label}}</div>' +
            '  <div class="sigma-tooltip-body">' +
            '      <content></content>' +
            '  </div>' +
            ' <div class="sigma-tooltip-footer">Number of connections: {{degree}}</div>',
            renderer: function (node, template) {
                var content = "";
                content += "<div><a href='#' name='DEFAULT' data-value='" + node.id +"' onclick='rightClickExpand(this)'>Expand All Relation</a></div>";
                template = template.replace('<content></content>', content);
                node.degree = this.degree(node.id);
                return Mustache.render(template, node);
            }
        }],
    };

    // Instanciate the tooltips plugin with a Mustache renderer for node tooltips:
    var tooltips = sigma.plugins.tooltips(s, s.renderers[0], config);
    tooltips.bind('shown', function (event) {
        //console.log('tooltip shown', event);
    });

    tooltips.bind('hidden', function (event) {
//        console.log('tooltip hidden', event);
    });
    var x = (document.body.clientWidth - $('#graph-container').width()) / 2;
    var y = $("#container").offset().top;
    var y2 = $("#graph-container").offset().top;
    // self bind event
    s.bind('overNode', function (e) {
        console.log("OVER NODE");
        var n = e.data.node;
        var prefix = "renderer1:";
        console.log(e.data.captor);
        tooltips.open(n, config.node[0], n[prefix + 'x'] +15, n[prefix + 'y'] + 15);
        setInfoTable(n);

    });
    //$('#graph-container').on('contextmenu', 'img', function(e){ return false; });
    s.bind('rightClickNode', function (e) {
        //$("#expand-cypher-editor").value = ""
        console.log("Right Click NODE");
        var n = e.data.node;
        var prefix = "renderer1:";
        console.log(e.data.captor);
        tooltips.open(n, config.node[1], n[prefix + 'x'] +15, n[prefix + 'y'] + 15);
        setInfoTable(n);

    });

};
function setInfoTable(node) {
    var table_id = "#info-table";
    $(table_id).html("");
    var content = "";
    Object.keys(node.neo4j_data).forEach(function (key) {
        content += "<tr><th>key</th> <td>value</td></tr>".replace('key', key).replace('value', node.neo4j_data[key]);
    });
    content = "<tbody>" + content + "</tbody>";
    $(table_id).append(content);


}


function enableLegend() {
    /**
     * 图例, 必须与Design捆绑使用，否则不显示
     */

    /* Initialize the legend and display all the widgets that have a mapping */
    var legend = sigma.plugins.legend(s);
    //    legend.addWidget('node', 'color', '$');
    //    legend.getWidget('node', 'size').setUnit('$'); // Add '($)' to the widget representing the node size
    legend.setPlacement('left'); // Position the legend on the left (default: bottom)
    legend.addTextWidget('This is an example legend'); // Add a widget that will display some text

    /* Some code that change the mappings */

    legend.draw(); // Redraw the widgets based on the new mappings
    return legend;
};

function openSiderbar(active_tab) {
    function reset() {
        $('#control-sidebar-general-setting-tab').removeClass("active");
        $('#control-sidebar-general-tab').removeClass("active");
    }

    reset();
    if (active_tab == "node_info") {
        $('#control-sidebar-general-tab').addClass("active");

        console.log("Open node info");
    } else if (active_tab == "general_setting") {
        console.log("Open general setting");
        $('#control-sidebar-general-setting-tab').addClass("active");
    }

}

// automate open legend and info panel after execute query
function showGraphPanel() {
    $("#open-node-info").click();
    //$("#legend-trigger").click();
    openSiderbar("node_info");

}
// change setting
function changeSigmaSettings(target) {
    if (target.nodeName == "SELECT") {
        //console.log(target);
        var key = target.name;
        var value = target[target.selectedIndex].value;
        //console.log(value);
        s.settings(key, value === "true");
        s.refresh();
    } else if (target.nodeName == "INPUT") {
        var value = target.value;
        var key = target.name;
        s.settings(key, Number(value));
        s.refresh();
    }

}



$('#guidance-modal').on('show.bs.modal', function (e){


});

