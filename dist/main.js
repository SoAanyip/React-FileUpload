/**
 * Created by cheesu on 2015/8/17.
 */

/**
 * React文件上传组件，兼容IE8+
 * 现代浏览器采用AJAX（XHR2+File API）上传。低版本浏览器使用form+iframe上传。
 * 使用到ES6，需要经babel转译
 */
'use strict';
var React = require('react');

var emptyFunction = function emptyFunction() {
};
/*当前IE上传组的id*/
var currentIEID = 0;
/*存放当前IE上传组的可用情况*/
var IEFormGroup = [true];

var FileUpload = React.createClass({
    displayName: 'FileUpload',

    /*类型验证*/
    propTypes: {
        options: React.PropTypes.shape({
            /*basics*/
            baseUrl: React.PropTypes.string.isRequired,
            param: React.PropTypes.object,
            dataType: React.PropTypes.string,
            chooseAndUpload: React.PropTypes.bool,
            paramAddToFile: React.PropTypes.arrayOf(React.PropTypes.string),
            wrapperDisplay: React.PropTypes.string,
            timeout: React.PropTypes.number,
            /*specials*/
            tag: React.PropTypes.string,
            _withoutFileUpload: React.PropTypes.bool,
            filesToUpload: React.PropTypes.arrayOf(React.PropTypes.object),
            /*funcs*/
            beforeChoose: React.PropTypes.func,
            chooseFile: React.PropTypes.func,
            beforeUpload: React.PropTypes.func,
            doUpload: React.PropTypes.func,
            uploading: React.PropTypes.func,
            uploadSuccess: React.PropTypes.func,
            uploadError: React.PropTypes.func,
            uploadFail: React.PropTypes.func
        }).isRequired,
        style: React.PropTypes.object,
        className: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        return {
            chooseBtn: {}, //选择按钮。如果chooseAndUpload=true代表选择并上传。
            uploadBtn: {}, //上传按钮。如果chooseAndUpload=true则无效。
            before: [], //存放props.children中位于chooseBtn前的元素
            middle: [], //存放props.children中位于chooseBtn后，uploadBtn前的元素
            after: [] //存放props.children中位于uploadBtn后的元素,
        };
    },

    componentWillMount: function componentWillMount() {
        this.isIE = this.checkIE() > 0;
        /*因为IE每次要用到很多form组，如果在同一页面需要用到多个<FileUpload>可以在options传入tag作为区分。并且不随后续props改变而改变*/
        var tag = this.props.options && this.props.options.tag;
        this.IETag = tag ? tag + '_' : '';

        this.updateProps(this.props);
    },

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.updateProps(newProps);
    },

    render: function render() {
        return this.packRender();
    },

    /*根据props更新组件*/
    updateProps: function updateProps(props) {
        this.isIE = this.checkIE() > 0;
        var options = props.options;
        this.baseUrl = options.baseUrl; //域名
        this.param = options.param; //get参数
        this.chooseAndUpload = options.chooseAndUpload || false; //是否在用户选择了文件之后立刻上传
        this.paramAddToFile = options.paramAddToFile || []; //需要添加到file对象（file API）上的param，不支持IE
        /*upload success 返回resp的格式*/
        this.dataType = 'json';
        options.dataType && options.dataType.toLowerCase() == 'text' && (this.dataType = 'text');
        this.wrapperDisplay = options.wrapperDisplay || 'inline-block'; //包裹chooseBtn或uploadBtn的div的display
        this.timeout = typeof options.timeout == 'number' && options.timeout > 0 ? options.timeout : 0; //超时时间

        /*生命周期函数*/
        /**
         * beforeChoose() : 用户选择之前执行，返回true继续，false阻止用户选择
         * @param  null
         * @return  {boolean} 是否允许用户进行选择
         */
        this.beforeChoose = options.beforeChoose || emptyFunction;
        /**
         * chooseFile(file) : 用户选择文件后的触发的回调函数
         * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
         * @return
         */
        this.chooseFile = options.chooseFile || emptyFunction;
        /**
         * beforeUpload(file,mill) : 用户上传之前执行，返回true继续，false阻止用户选择
         * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
         * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
         * @return  {boolean} 是否允许用户进行上传
         */
        this.beforeUpload = options.beforeUpload || emptyFunction;
        /**
         * doUpload(file,mill) : 上传动作(xhr send | form submit)执行后调用
         * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
         * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
         * @return
         */
        this.doUpload = options.doUpload || emptyFunction;
        /**
         * uploading(progress) : 在文件上传中的时候，现代浏览器会不断触发此函数
         * @param progress {Progress} progress对象，里面存有例如上传进度loaded和文件大小total等属性
         * @return
         */
        this.uploading = options.uploading || emptyFunction;
        /**
         * uploadSuccess(resp) : 上传成功后执行的回调（针对AJAX而言）
         * @param resp {json | string} 根据options.dataType指定返回数据的格式
         * @return
         */
        this.uploadSuccess = options.uploadSuccess || emptyFunction;
        /**
         * uploadError(err) : 上传错误后执行的回调（针对AJAX而言）
         * @param err {Error | object} 如果返回catch到的error，其具有type和message属性
         * @return
         */
        this.uploadError = options.uploadError || emptyFunction;
        /**
         * uploadFail(resp) : 上传失败后执行的回调（针对AJAX而言）
         * @param resp {string} 失败信息
         */
        this.uploadFail = options.uploadFail || emptyFunction;

        this.files = options.files || this.files || false; //保存需要上传的文件
        /*特殊内容*/
        this._withoutFileUpload = options._withoutFileUpload || false; //不带文件上传，为了给秒传功能使用，不影响IE
        this.filesToUpload = options.filesToUpload || []; //使用filesToUpload()方法代替

        /*使用filesToUpload()方法代替*/
        if (this.filesToUpload.length && !this.isIE) {
            for (var i = 0, len = this.filesToUpload.length; i < len; i++) {
                this.files = [this.filesToUpload[i]];
                this.commonUpload();
            }
        }

        /*放置虚拟DOM*/
        var chooseBtn = undefined,
            uploadBtn = undefined,
            before = [],
            middle = [],
            after = [],
            flag = 0;
        if (this.chooseAndUpload) {
            React.Children.forEach(props.children, function (child) {
                if (child.ref == 'chooseAndUpload') {
                    chooseBtn = child;
                    flag++;
                } else {
                    flag == 0 ? before.push(child) : flag == 1 ? middle.push(child) : '';
                }
            });
        } else {
            React.Children.forEach(props.children, function (child) {
                if (child.ref == 'chooseBtn') {
                    chooseBtn = child;
                    flag++;
                } else if (child.ref == 'uploadBtn') {
                    uploadBtn = child;
                    flag++;
                } else {
                    flag == 0 ? before.push(child) : flag == 1 ? middle.push(child) : after.push(child);
                }
            });
        }
        this.setState({
            chooseBtn: chooseBtn,
            uploadBtn: uploadBtn,
            before: before,
            middle: middle,
            after: after
        });
    },
    /*打包render函数*/
    packRender: function packRender() {
        /*IE用iframe表单上传，其他用ajax Formdata*/
        var render = '';
        if (this.isIE) {
            render = this.multiIEForm();
        } else {
            render = React.createElement(
                'div',
                {className: this.props.className, style: this.props.style},
                this.state.before,
                React.createElement(
                    'div',
                    {
                        onClick: this.commonChooseFile,
                        style: {overflow: 'hidden', postion: 'relative', display: this.wrapperDisplay}
                    },
                    this.state.chooseBtn
                ),
                this.state.middle,
                React.createElement(
                    'div',
                    {
                        onClick: this.commonUpload,
                        style: {
                            overflow: 'hidden',
                            postion: 'relative',
                            display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
                        }
                    },
                    this.state.uploadBtn
                ),
                this.state.after,
                React.createElement('input', {
                    type: "file",
                    name: "ajax_upload_file_input",
                    ref: "ajax_upload_file_input",
                    style: {display: "none"},
                    onChange: this.commonChange
                })
            );
        }
        return render;
    },

    /*IE多文件同时上传，需要多个表单+多个form组合。根据currentIEID代表有多少个form。*/
    /*所有不在空闲（正在上传）的上传组都以display:none的形式插入，第一个空闲的上传组会display:block捕捉。*/
    multiIEForm: function multiIEForm() {
        var formArr = [];
        var hasFree = false;

        /*这里IEFormGroup的长度会变，所以不能存len*/
        for (var i = 0; i < IEFormGroup.length; i++) {
            insertIEForm.call(this, formArr, i);
            /*如果当前上传组是空闲，hasFree=true，并且指定当前上传组ID*/
            if (IEFormGroup[i] && !hasFree) {
                hasFree = true;
                currentIEID = i;
            }
            /*如果所有上传组都不是空闲状态，push一个新增组*/
            if (i == IEFormGroup.length - 1 && !hasFree) {
                IEFormGroup.push(true);
            }
        }

        return React.createElement(
            'div',
            {className: this.props.className, style: this.props.style, id: "react-file-uploader"},
            formArr
        );

        function insertIEForm(formArr, i) {
            /*如果已经push了空闲组而当前也是空闲组*/
            if (IEFormGroup[i] && hasFree) return;
            /*是否display*/
            var isShow = IEFormGroup[i];

            i = '' + this.IETag + i;
            formArr.push(React.createElement(
                'form',
                {
                    id: 'ajax_upload_file_form_' + i, method: "post", target: 'ajax_upload_file_frame_' + i,
                    key: 'ajax_upload_file_form_' + i,
                    encType: "multipart/form-data", ref: 'form_' + i, onSubmit: this.IEUpload,
                    style: {display: isShow ? 'block' : 'none'}
                },
                this.state.before,
                React.createElement(
                    'div',
                    {style: {overflow: 'hidden', position: 'relative', display: 'inline-block'}},
                    this.state.chooseBtn,
                    React.createElement('input', {
                        type: "file",
                        name: 'ajax_upload_hidden_input_' + i,
                        id: 'ajax_upload_hidden_input_' + i,
                        ref: 'ajax_upload_hidden_input_' + i,
                        onChange: this.IEChooseFile,
                        onClick: this.IEBeforeChoose,
                        style: {
                            position: 'absolute',
                            left: '-30px',
                            top: 0,
                            zIndex: '50',
                            fontSize: '80px',
                            width: '200px',
                            opacity: 0,
                            filter: 'alpha(opacity=0)'
                        }
                    })
                ),
                this.state.middle,
                React.createElement(
                    'div',
                    {
                        style: {
                            overflow: 'hidden',
                            position: 'relative',
                            display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
                        }
                    },
                    this.state.uploadBtn,
                    React.createElement('input', {
                        type: "submit",
                        style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            fontSize: '50px',
                            width: '200px',
                            opacity: 0
                        }
                    })
                ),
                this.state.after
            ));
            formArr.push(React.createElement('iframe', {
                id: 'ajax_upload_file_frame_' + i, name: 'ajax_upload_file_frame_' + i,
                key: 'ajax_upload_file_frame_' + i,
                className: "ajax_upload_file_frame"
            }));
        }
    },

    /*触发隐藏的input框选择*/
    /*触发beforeChoose*/
    commonChooseFile: function commonChooseFile() {
        var jud = this.beforeChoose();
        if (jud != true && jud != undefined) return;
        this.refs['ajax_upload_file_input'].getDOMNode().click();
    },
    /*现代浏览器input change事件。File API保存文件*/
    /*触发chooseFile*/
    commonChange: function commonChange(e) {
        var files = undefined;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        this.files = files;
        this.chooseFile(files);
        if (this.chooseAndUpload) {
            this.commonUpload();
        }
    },
    /*iE选择前验证*/
    /*触发beforeChoose*/
    IEBeforeChoose: function IEBeforeChoose(e) {
        var jud = this.beforeChoose();
        if (jud != true && jud != undefined) e.preventDefault();
    },
    /*IE需要用户真实点击上传按钮，所以使用透明按钮*/
    /*触发chooseFile*/
    IEChooseFile: function IEChooseFile(e) {
        this.fileName = e.target.value.substring(e.target.value.lastIndexOf('\\') + 1);
        this.chooseFile(this.fileName);
        /*先执行IEUpload，配置好action等参数，然后submit*/
        if (this.chooseAndUpload && this.IEUpload() !== false) {
            document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).submit();
        }
        e.target.blur();
    },
    /*IE处理上传函数*/
    /*触发beforeUpload doUpload*/
    IEUpload: function IEUpload(e) {
        var mill = new Date().getTime();
        var jud = this.beforeUpload(this.fileName, mill);
        if (!this.fileName || jud != true && jud != undefined) {
            if (e) e.preventDefault();
            return false;
        }
        var that = this;

        /*url参数*/
        var baseUrl = this.baseUrl;
        var param = this.param;
        var paramStr = '';
        var paramAddToFile = {};
        if (param) {
            var paramArr = [];
            param['_'] = mill;
            param['ie'] = 'true';
            for (var i in param) {
                if (param[i] != undefined) paramArr.push(i + '=' + param[i]);
            }
            paramStr = '?' + paramArr.join('&');

            for (var i = 0, len = this.paramAddToFile.length; i < len; i++) {
                paramAddToFile[this.paramAddToFile[i]] = param[this.paramAddToFile[i]];
            }
        }
        var targeturl = baseUrl + paramStr;
        document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).setAttribute('action', targeturl);
        /*当前上传id*/
        var partIEID = currentIEID;
        /*回调函数*/
        document.getElementById('ajax_upload_file_frame_' + this.IETag + partIEID).attachEvent('onload', function (e) {
            //$(`#ajax_upload_file_frame_${this.IETag}${partIEID}`).on('load',function(e){
            console.log('load', partIEID);
            try {
                that.uploadSuccess(that.IECallback(that.dataType, partIEID));
            } catch (e) {
                that.uploadError(e);
            } finally {
                /*清除输入框的值*/
                var oInput = document.getElementById('ajax_upload_hidden_input_' + that.IETag + partIEID);
                oInput.outerHTML = oInput.outerHTML;
            }
        });
        this.doUpload(this.fileName, mill, paramAddToFile);
        /*置为非空闲*/
        IEFormGroup[currentIEID] = false;
    },
    /*IE回调函数*/
    //TODO 处理Timeout
    IECallback: function IECallback(dataType, frameId) {
        /*回复空闲状态*/
        IEFormGroup[frameId] = true;

        var frame = document.getElementById('ajax_upload_file_frame_' + this.IETag + frameId);
        var resp = {};
        var content = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body;
        if (!content) throw new Error('Your browser does not support async upload');
        try {
            resp.responseText = content.innerHTML || 'null innerHTML';
            resp.json = JSON ? JSON.parse(resp.responseText) : eval('(' + resp.responseText + ')');
        } catch (e) {
            /*如果是包含了<pre>*/
            if (e.message && e.message.indexOf('Unexpected token') >= 0) {
                /*包含返回的json*/
                if (resp.responseText.indexOf('{') >= 0) {
                    var msg = resp.responseText.substring(resp.responseText.indexOf('{'), resp.responseText.lastIndexOf('}') + 1);
                    return JSON ? JSON.parse(msg) : eval('(' + msg + ')');
                }
                return {type: 'FINISHERROR', message: e.message};
            }
            throw e;
        }
        return dataType == 'json' ? resp.json : resp.responseText;
    },
    /*执行上传*/
    commonUpload: function commonUpload() {
        /*mill参数是当前时刻毫秒数，file第一次进行上传时会添加为file的属性，也可在beforeUpload为其添加，之后同一文件的mill不会更改，作为文件的识别id*/
        var mill = this.files.length && this.files[0].mill || new Date().getTime();
        var jud = this.beforeUpload(this.files, mill);
        if (jud != true && jud != undefined) {
            /*清除input的值*/
            this.refs['ajax_upload_file_input'].getDOMNode().value = '';
            return;
        }

        if (!this.files) return;
        if (!this.baseUrl) {
            throw new Error('BaseUrl missing in options');
        }
        /*用于存放当前作用域的东西*/
        var scope = {};
        /*组装FormData*/
        var formData = new FormData();
        if (!this._withoutFileUpload) {
            for (var i = 0, len = this.files.length; i < len; i++) {
                formData.append(this.files[i].name, this.files[i]);
            }
        }
        /*url参数*/
        var that = this;
        var baseUrl = this.baseUrl;
        var param = this.param;
        var paramStr = '';
        if (param) {
            var paramArr = [];
            param['_'] = mill;
            for (var i in param) {
                paramArr.push(i + '=' + param[i]);
            }
            paramStr = '?' + paramArr.join('&');

            for (var i = 0, len = this.paramAddToFile.length; i < len; i++) {
                if (param[this.paramAddToFile[i]]) {
                    this.files[0][this.paramAddToFile[i]] = param[this.paramAddToFile[i]];
                }
            }
        }
        var targeturl = baseUrl + paramStr;

        /*AJAX上传部分*/
        var xhr = new XMLHttpRequest();
        xhr.open('POST', targeturl, true);
        //xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');

        /*处理超时。用定时器判断超时，不然xhr state=4 catch的错误无法判断是超时*/
        if (this.timeout) {
            xhr.timeout = this.timeout;
            xhr.ontimeout = function (e) {
                that.uploadError({type: 'TIMEOUTERROR', message: 'timeout'});
                scope.isTimeout = false;
            };
            scope.isTimeout = false;
            setTimeout(function () {
                scope.isTimeout = true;
            }, this.timeout);
        }

        xhr.onreadystatechange = function () {
            /*xhr finish*/
            try {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    var resp = that.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                    that.uploadSuccess(resp);
                } else if (xhr.readyState == 4) {
                    /*xhr fail*/
                    var resp = that.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                    that.uploadFail(resp);
                }
            } catch (e) {
                /*超时抛出不一样的错误*/
                !scope.isTimeout && that.uploadError({type: 'FINISHERROR', message: e.message});
            }
        };
        /*xhr error*/
        xhr.onerror = function (e) {
            try {
                console.log('err', e);
                var resp = that.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                that.uploadError({type: 'XHRERROR', message: resp});
            } catch (e) {
                that.uploadError({type: 'XHRERROR', message: e.message});
            }
        };
        /*这里部分浏览器实现不一致，而且IE没有这个方法*/
        xhr.onprogress = xhr.upload.onprogress = function (progress) {
            that.uploading(progress, mill);
        };

        /*不带文件上传，给秒传使用*/
        this._withoutFileUpload ? xhr.send(null) : xhr.send(formData);

        /*trigger执行上传的用户回调*/
        this.doUpload(this.files, mill);

        /*清除input的值*/
        this.refs['ajax_upload_file_input'].getDOMNode().value = '';
    },

    /*供外部调用方法，传入files（File API）数组可以立刻执行上传动作，IE不支持。调用随后会触发beforeUpload*/
    filesToUpload: function filesToUpload(files) {
        if (this.isIE) return;
        for (var i = 0, len = this.filesToUpload.length; i < len; i++) {
            this.files = [this.filesToUpload[i]];
            this.commonUpload();
        }
    },
    /*判断ie版本*/
    checkIE: function checkIE() {
        var userAgent = navigator.userAgent;
        var version = userAgent.indexOf('MSIE');
        if (version < 0) {
            return -1;
        }
        return parseFloat(userAgent.substring(version + 5, userAgent.indexOf(";", version)));
    }

});

module.exports = FileUpload;
