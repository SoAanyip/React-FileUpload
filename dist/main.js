(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-fileupload"] = factory(require("react"));
	else
		root["react-fileupload"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Created by cheesu on 2015/8/17.
	 */

	/**
	 * React文件上传组件，兼容IE8+
	 * 现代浏览器采用AJAX（XHR2+File API）上传。低版本浏览器使用form+iframe上传。
	 * 使用到ES6，需要经babel转译
	 */

	/*eslint indent: 0 */
	var React = __webpack_require__(1);
	var emptyFunction = function emptyFunction() {};
	/*当前IE上传组的id*/
	var currentIEID = 0;
	/*存放当前IE上传组的可用情况*/
	var IEFormGroup = [true];
	/*当前xhr的数组（仅有已开始上传之后的xhr）*/
	var xhrList = [];
	var currentXHRID = 0;

	var PT = __webpack_require__(2);
	var createClass = __webpack_require__(12);

	var FileUpload = createClass({

	    /*类型验证*/
	    propTypes: {
	        options: PT.shape({
	            /*basics*/
	            baseUrl: PT.string.isRequired,
	            param: PT.oneOfType([PT.object, PT.func]),
	            dataType: PT.string,
	            chooseAndUpload: PT.bool,
	            paramAddToField: PT.oneOfType([PT.object, PT.func]),
	            wrapperDisplay: PT.string,
	            timeout: PT.number,
	            accept: PT.string,
	            multiple: PT.bool,
	            numberLimit: PT.oneOfType([PT.number, PT.func]),
	            fileFieldName: PT.oneOfType([PT.string, PT.func]),
	            withCredentials: PT.bool,
	            requestHeaders: PT.object,
	            /*specials*/
	            tag: PT.string,
	            userAgent: PT.string,
	            disabledIEChoose: PT.oneOfType([PT.bool, PT.func]),
	            _withoutFileUpload: PT.bool,
	            filesToUpload: PT.arrayOf(PT.object),
	            textBeforeFiles: PT.bool,
	            /*funcs*/
	            beforeChoose: PT.func,
	            chooseFile: PT.func,
	            beforeUpload: PT.func,
	            doUpload: PT.func,
	            uploading: PT.func,
	            uploadSuccess: PT.func,
	            uploadError: PT.func,
	            uploadFail: PT.func,
	            onabort: PT.func
	        }).isRequired,
	        style: PT.object,
	        className: PT.string
	    },

	    /*根据props更新组件*/
	    _updateProps: function _updateProps(props) {
	        var _this = this;

	        this.isIE = !(this.checkIE() < 0 || this.checkIE() >= 10);
	        var options = props.options;
	        this.baseUrl = options.baseUrl; //域名
	        this.param = options.param; //get参数
	        this.chooseAndUpload = options.chooseAndUpload || false; //是否在用户选择了文件之后立刻上传
	        this.paramAddToField = options.paramAddToField || undefined; //需要添加到FormData的对象。不支持IE
	        /*upload success 返回resp的格式*/
	        this.dataType = 'json';
	        options.dataType && options.dataType.toLowerCase() == 'text' && (this.dataType = 'text');
	        this.wrapperDisplay = options.wrapperDisplay || 'inline-block'; //包裹chooseBtn或uploadBtn的div的display
	        this.timeout = typeof options.timeout == 'number' && options.timeout > 0 ? options.timeout : 0; //超时时间
	        this.accept = options.accept || ''; //限制文件后缀
	        this.multiple = options.multiple || false;
	        this.numberLimit = options.numberLimit || false; //允许多文件上传时，选择文件数量的限制
	        this.fileFieldName = options.fileFieldName || false; //文件附加到formData上时的key，传入string指定一个file的属性名，值为其属性的值。不支持IE
	        this.withCredentials = options.withCredentials || false; //跨域时是否使用认证信息
	        this.requestHeaders = options.requestHeaders || false; //要设置的请求头键值对

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
	         * @return  {boolean || object} 是否允许用户进行上传 (hack:如果是obj{
	         *     assign:boolean 默认true
	         *     param:object
	         * }), 则对本次的param进行处理
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
	         * uploading(progress) : 在文件上传中的时候，浏览器会不断触发此函数。IE中使用每200ms触发的假进度
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
	        /**
	         * onabort(mill, xhrID) : 主动取消xhr进程的响应
	         * @param mill {long} 毫秒数，本次上传时刻的时间
	         * @param xhrID {int} 在doUpload时会返回的当次xhr代表ID
	         */
	        this.onabort = options.onabort || emptyFunction;

	        this.files = options.files || this.files || false; //保存需要上传的文件
	        /*特殊内容*/

	        /*IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
	         * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
	         */
	        this.disabledIEChoose = options.disabledIEChoose || false;

	        this._withoutFileUpload = options._withoutFileUpload || false; //不带文件上传，为了给秒传功能使用，不影响IE
	        this.filesToUpload = options.filesToUpload || []; //使用filesToUpload()方法代替
	        this.textBeforeFiles = options.textBeforeFiles || false; //make this true to add text fields before file data
	        /*使用filesToUpload()方法代替*/
	        if (this.filesToUpload.length && !this.isIE) {
	            this.filesToUpload.forEach(function (file) {
	                _this.files = [file];
	                _this.commonUpload();
	            });
	        }

	        /*放置虚拟DOM*/
	        var chooseBtn = void 0,
	            uploadBtn = void 0,
	            flag = 0;
	        var before = [],
	            middle = [],
	            after = [];
	        if (this.chooseAndUpload) {
	            React.Children.forEach(props.children, function (child) {
	                if (child && child.ref == 'chooseAndUpload') {
	                    chooseBtn = child;
	                    flag++;
	                } else {
	                    flag == 0 ? before.push(child) : flag == 1 ? middle.push(child) : '';
	                }
	            });
	        } else {
	            React.Children.forEach(props.children, function (child) {
	                if (child && child.ref == 'chooseBtn') {
	                    chooseBtn = child;
	                    flag++;
	                } else if (child && child.ref == 'uploadBtn') {
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


	    /*触发隐藏的input框选择*/
	    /*触发beforeChoose*/
	    commonChooseFile: function commonChooseFile() {
	        var jud = this.beforeChoose();
	        if (jud != true && jud != undefined) return;
	        this.refs['ajax_upload_file_input'].click();
	    },

	    /*现代浏览器input change事件。File API保存文件*/
	    /*触发chooseFile*/
	    commonChange: function commonChange(e) {
	        var files = void 0;
	        e.dataTransfer ? files = e.dataTransfer.files : e.target ? files = e.target.files : '';

	        /*如果限制了多文件上传时的数量*/
	        var numberLimit = typeof this.numberLimit === 'function' ? this.numberLimit() : this.numberLimit;
	        if (this.multiple && numberLimit && files.length > numberLimit) {
	            var newFiles = {};
	            for (var i = 0; i < numberLimit; i++) {
	                newFiles[i] = files[i];
	            }newFiles.length = numberLimit;
	            files = newFiles;
	        }
	        this.files = files;
	        this.chooseFile(files);
	        this.chooseAndUpload && this.commonUpload();
	    },


	    /*执行上传*/
	    commonUpload: function commonUpload() {
	        var _this2 = this;

	        /*mill参数是当前时刻毫秒数，file第一次进行上传时会添加为file的属性，也可在beforeUpload为其添加，之后同一文件的mill不会更改，作为文件的识别id*/
	        var mill = this.files.length && this.files[0].mill || new Date().getTime();
	        var jud = this.beforeUpload(this.files, mill);
	        if (jud != true && jud != undefined && (typeof jud === 'undefined' ? 'undefined' : _typeof(jud)) != 'object') {
	            /*清除input的值*/
	            this.refs['ajax_upload_file_input'].value = '';
	            return;
	        }

	        if (!this.files) return;
	        if (!this.baseUrl) throw new Error('baseUrl missing in options');

	        /*用于存放当前作用域的东西*/
	        var scope = {};
	        /*组装FormData*/
	        var formData = new FormData();
	        /*If we need to add fields before file data append here*/
	        if (this.textBeforeFiles) {
	            formData = this.appendFieldsToFormData(formData);
	        }
	        if (!this._withoutFileUpload) {
	            var fieldNameType = _typeof(this.fileFieldName);

	            /*判断是用什么方式作为formdata item 的 name*/
	            Object.keys(this.files).forEach(function (key) {
	                if (key == 'length') return;

	                if (fieldNameType == 'function') {
	                    var file = _this2.files[key];
	                    var fileFieldName = _this2.fileFieldName(file);
	                    formData.append(fileFieldName, file);
	                } else if (fieldNameType == 'string') {
	                    var _file = _this2.files[key];
	                    formData.append(_this2.fileFieldName, _file);
	                } else {
	                    var _file2 = _this2.files[key];
	                    formData.append(_file2.name, _file2);
	                }
	            });
	        }
	        /*If we need to add fields after file data append here*/
	        if (!this.textBeforeFiles) {
	            formData = this.appendFieldsToFormData(formData);
	        }
	        var baseUrl = this.baseUrl;

	        /*url参数*/
	        /*如果param是一个函数*/
	        var param = typeof this.param === 'function' ? this.param(this.files) : this.param;

	        var paramStr = '';

	        if (param) {
	            var paramArr = [];
	            param['_'] = mill;
	            Object.keys(param).forEach(function (key) {
	                return paramArr.push(key + '=' + param[key]);
	            });
	            paramStr = '?' + paramArr.join('&');
	        }
	        var targeturl = baseUrl + paramStr;

	        /*AJAX上传部分*/
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', targeturl, true);

	        /*跨域是否开启验证信息*/
	        xhr.withCredentials = this.withCredentials;
	        /*是否需要设置请求头*/
	        var rh = this.requestHeaders;
	        rh && Object.keys(rh).forEach(function (key) {
	            return xhr.setRequestHeader(key, rh[key]);
	        });

	        /*处理超时。用定时器判断超时，不然xhr state=4 catch的错误无法判断是超时*/
	        if (this.timeout) {
	            xhr.timeout = this.timeout;
	            xhr.ontimeout = function () {
	                _this2.uploadError({ type: 'TIMEOUTERROR', message: 'timeout' });
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
	                    var resp = _this2.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
	                    _this2.uploadSuccess(resp);
	                } else if (xhr.readyState == 4) {
	                    /*xhr fail*/
	                    var _resp = _this2.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
	                    _this2.uploadFail(_resp);
	                }
	            } catch (e) {
	                /*超时抛出不一样的错误，不在这里处理*/
	                !scope.isTimeout && _this2.uploadError({ type: 'FINISHERROR', message: e.message });
	            }
	        };
	        /*xhr error*/
	        xhr.onerror = function () {
	            try {
	                var resp = _this2.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
	                _this2.uploadError({ type: 'XHRERROR', message: resp });
	            } catch (e) {
	                _this2.uploadError({ type: 'XHRERROR', message: e.message });
	            }
	        };
	        /*这里部分浏览器实现不一致，而且IE没有这个方法*/
	        xhr.onprogress = xhr.upload.onprogress = function (progress) {
	            _this2.uploading(progress, mill);
	        };

	        /*不带文件上传，给秒传使用*/
	        this._withoutFileUpload ? xhr.send(null) : xhr.send(formData);

	        /*保存xhr id*/
	        xhrList.push(xhr);
	        var cID = xhrList.length - 1;
	        currentXHRID = cID;

	        /*有响应abort的情况*/
	        xhr.onabort = function () {
	            return _this2.onabort(mill, cID);
	        };

	        /*trigger执行上传的用户回调*/
	        this.doUpload(this.files, mill, currentXHRID);

	        /*清除input的值*/
	        this.refs['ajax_upload_file_input'].value = '';
	    },


	    /*组装自定义添加到FormData的对象*/
	    appendFieldsToFormData: function appendFieldsToFormData(formData) {
	        var field = typeof this.paramAddToField == 'function' ? this.paramAddToField() : this.paramAddToField;
	        field && Object.keys(field).map(function (index) {
	            return formData.append(index, field[index]);
	        });
	        return formData;
	    },


	    /*iE选择前验证*/
	    /*触发beforeChoose*/
	    IEBeforeChoose: function IEBeforeChoose(e) {
	        var jud = this.beforeChoose();
	        jud != true && jud != undefined && e.preventDefault();
	    },

	    /*IE需要用户真实点击上传按钮，所以使用透明按钮*/
	    /*触发chooseFile*/
	    IEChooseFile: function IEChooseFile(e) {
	        this.fileName = e.target.value.substring(e.target.value.lastIndexOf('\\') + 1);
	        this.chooseFile(this.fileName);
	        /*先执行IEUpload，配置好action等参数，然后submit*/
	        this.chooseAndUpload && this.IEUpload() !== false && document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).submit();
	        e.target.blur();
	    },

	    /*IE处理上传函数*/
	    /*触发beforeUpload doUpload*/
	    IEUpload: function IEUpload(e) {
	        var _this3 = this;

	        var mill = new Date().getTime();
	        var jud = this.beforeUpload(this.fileName, mill);
	        if (!this.fileName || jud != true && jud != undefined) {
	            e && e.preventDefault();
	            return false;
	        }
	        var that = this;

	        /*url参数*/
	        var baseUrl = this.baseUrl;

	        var param = typeof this.param === 'function' ? this.param(this.fileName) : this.param;
	        var paramStr = '';

	        if (param) {
	            var paramArr = [];
	            param['_'] = mill;
	            param['ie'] === undefined && (param['ie'] = 'true');
	            for (var key in param) {
	                if (param[key] != undefined) paramArr.push(key + '=' + param[key]);
	            }
	            paramStr = '?' + paramArr.join('&');
	        }
	        var targeturl = baseUrl + paramStr;

	        document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).setAttribute('action', targeturl);
	        /*IE假的上传进度*/
	        var getFakeProgress = this.fakeProgress();
	        var loaded = 0,
	            count = 0;

	        var progressInterval = setInterval(function () {
	            loaded = getFakeProgress(loaded);
	            _this3.uploading({
	                loaded: loaded,
	                total: 100
	            }, mill);
	            /*防止永久执行，设定最大的次数。暂时为30秒(200*150)*/
	            ++count >= 150 && clearInterval(progressInterval);
	        }, 200);

	        /*当前上传id*/
	        var partIEID = currentIEID;
	        /*回调函数*/
	        window.attachEvent ? document.getElementById('ajax_upload_file_frame_' + this.IETag + partIEID).attachEvent('onload', handleOnLoad) : document.getElementById('ajax_upload_file_frame_' + this.IETag + partIEID).addEventListener('load', handleOnLoad);

	        function handleOnLoad() {
	            /*clear progress interval*/
	            clearInterval(progressInterval);
	            try {
	                that.uploadSuccess(that.IECallback(that.dataType, partIEID));
	            } catch (e) {
	                that.uploadError(e);
	            } finally {
	                /*清除输入框的值*/
	                var oInput = document.getElementById('ajax_upload_hidden_input_' + that.IETag + partIEID);
	                oInput.outerHTML = oInput.outerHTML;
	            }
	        }
	        this.doUpload(this.fileName, mill);
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
	                return { type: 'FINISHERROR', message: e.message };
	            }
	            throw e;
	        }
	        return dataType == 'json' ? resp.json : resp.responseText;
	    },


	    /*外部调用方法，主动触发选择文件（等同于调用btn.click()), 仅支持现代浏览器*/
	    forwardChoose: function forwardChoose() {
	        if (this.isIE) return false;
	        this.commonChooseFile();
	    },


	    /**
	     * 外部调用方法，当多文件上传时，用这个方法主动删除列表中某个文件
	     * TODO: 此方法应为可以任意操作文件数组
	     * @param func 用户调用时传入的函数，函数接收参数files（filesAPI 对象）
	     * @return Obj File API 对象
	     * File API Obj:
	     * {
	     *   0 : file,
	     *   1 : file,
	     *   length : 2
	     * }
	     */
	    fowardRemoveFile: function fowardRemoveFile(func) {
	        this.files = func(this.files);
	    },


	    /*外部调用方法，传入files（File API）对象可以立刻执行上传动作，IE不支持。调用随后会触发beforeUpload*/
	    filesToUpload: function filesToUpload(files) {
	        if (this.isIE) return;
	        this.files = files;
	        this.commonUpload();
	    },


	    /*外部调用方法，取消一个正在进行的xhr，传入id指定xhr（doupload时返回）或者默认取消最近一个。*/
	    abort: function abort(id) {
	        id === undefined ? xhrList[currentXHRID].abort() : xhrList[id].abort();
	    },


	    /*判断ie版本*/
	    checkIE: function checkIE() {
	        var userAgent = this.userAgent;
	        var version = userAgent.indexOf('MSIE');
	        if (version < 0) return -1;

	        return parseFloat(userAgent.substring(version + 5, userAgent.indexOf(';', version)));
	    },


	    /*生成假的IE上传进度*/
	    fakeProgress: function fakeProgress() {
	        var add = 6;
	        var decrease = 0.3,
	            end = 98,
	            min = 0.2;
	        return function (lastTime) {
	            var start = lastTime;
	            if (start >= end) return start;

	            start += add;
	            add = add - decrease;
	            add < min && (add = min);

	            return start;
	        };
	    },
	    getUserAgent: function getUserAgent() {
	        var userAgentString = this.props.options && this.props.options.userAgent;
	        var navigatorIsAvailable = typeof navigator !== 'undefined';
	        if (!navigatorIsAvailable && !userAgentString) {
	            throw new Error('\`options.userAgent\` must be set rendering react-fileuploader in situations when \`navigator\` is not defined in the global namespace. (on the server, for example)');
	        }
	        return navigatorIsAvailable ? navigator.userAgent : userAgentString;
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
	        this.userAgent = this.getUserAgent();
	        this.isIE = !(this.checkIE() < 0 || this.checkIE() >= 10);
	        /*因为IE每次要用到很多form组，如果在同一页面需要用到多个<FileUpload>可以在options传入tag作为区分。并且不随后续props改变而改变*/
	        var tag = this.props.options && this.props.options.tag;
	        this.IETag = tag ? tag + '_' : '';

	        this._updateProps(this.props);
	    },
	    componentDidMount: function componentDidMount() {},
	    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	        this._updateProps(newProps);
	    },
	    render: function render() {
	        return this._packRender();
	    },


	    /*打包render函数*/
	    _packRender: function _packRender() {
	        /*IE用iframe表单上传，其他用ajax Formdata*/
	        var render = '';
	        if (this.isIE) {
	            render = this._multiIEForm();
	        } else {
	            var restAttrs = {
	                accept: this.accept,
	                multiple: this.multiple
	            };

	            render = React.createElement(
	                'div',
	                { className: this.props.className, style: this.props.style },
	                this.state.before,
	                React.createElement(
	                    'div',
	                    { onClick: this.commonChooseFile,
	                        style: { overflow: 'hidden', postion: 'relative', display: this.wrapperDisplay }
	                    },
	                    this.state.chooseBtn
	                ),
	                this.state.middle,
	                React.createElement(
	                    'div',
	                    { onClick: this.commonUpload,
	                        style: {
	                            overflow: 'hidden',
	                            postion: 'relative',
	                            display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
	                        }
	                    },
	                    this.state.uploadBtn
	                ),
	                this.state.after,
	                React.createElement('input', _extends({ type: 'file', name: 'ajax_upload_file_input', ref: 'ajax_upload_file_input',
	                    style: { display: 'none' }, onChange: this.commonChange
	                }, restAttrs))
	            );
	        }
	        return render;
	    },


	    /*IE多文件同时上传，需要多个表单+多个form组合。根据currentIEID代表有多少个form。*/
	    /*所有不在空闲（正在上传）的上传组都以display:none的形式插入，第一个空闲的上传组会display:block捕捉。*/
	    _multiIEForm: function _multiIEForm() {
	        var formArr = [];
	        var hasFree = false;

	        /* IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
	         * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
	         */
	        var isDisabled = typeof this.disabledIEChoose === 'function' ? this.disabledIEChoose() : this.disabledIEChoose;

	        /*这里IEFormGroup的长度会变，所以不能存len*/
	        for (var i = 0; i < IEFormGroup.length; i++) {
	            _insertIEForm.call(this, formArr, i);
	            /*如果当前上传组是空闲，hasFree=true，并且指定当前上传组ID*/
	            if (IEFormGroup[i] && !hasFree) {
	                hasFree = true;
	                currentIEID = i;
	            }
	            /*如果所有上传组都不是空闲状态，push一个新增组*/
	            i == IEFormGroup.length - 1 && !hasFree && IEFormGroup.push(true);
	        }

	        return React.createElement(
	            'div',
	            { className: this.props.className, style: this.props.style, id: 'react-file-uploader' },
	            formArr
	        );

	        function _insertIEForm(formArr, i) {
	            /*如果已经push了空闲组而当前也是空闲组*/
	            if (IEFormGroup[i] && hasFree) return;
	            /*是否display*/
	            var isShow = IEFormGroup[i];
	            /*Input内联样式*/
	            var style = {
	                position: 'absolute',
	                left: '-30px',
	                top: 0,
	                zIndex: '50',
	                fontSize: '80px',
	                width: '200px',
	                opacity: 0,
	                filter: 'alpha(opacity=0)'

	                /*是否限制了文件后缀，以及是否disabled*/
	            };var restAttrs = {
	                accept: this.accept,
	                disabled: isDisabled
	            };

	            var input = React.createElement('input', _extends({ type: 'file', name: 'ajax_upload_hidden_input_' + i, id: 'ajax_upload_hidden_input_' + i,
	                ref: 'ajax_upload_hidden_input_' + i, onChange: this.IEChooseFile, onClick: this.IEBeforeChoose,
	                style: style }, restAttrs));

	            i = '' + this.IETag + i;
	            formArr.push(React.createElement(
	                'form',
	                { id: 'ajax_upload_file_form_' + i, method: 'post', target: 'ajax_upload_file_frame_' + i,
	                    key: 'ajax_upload_file_form_' + i,
	                    encType: 'multipart/form-data', ref: 'form_' + i, onSubmit: this.IEUpload,
	                    style: { display: isShow ? 'block' : 'none' }
	                },
	                this.state.before,
	                React.createElement(
	                    'div',
	                    { style: { overflow: 'hidden', position: 'relative', display: 'inline-block' } },
	                    this.state.chooseBtn,
	                    input
	                ),
	                this.state.middle,
	                React.createElement(
	                    'div',
	                    { style: {
	                            overflow: 'hidden',
	                            position: 'relative',
	                            display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
	                        }
	                    },
	                    this.state.uploadBtn,
	                    React.createElement('input', { type: 'submit',
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
	            formArr.push(React.createElement('iframe', { id: 'ajax_upload_file_frame_' + i,
	                name: 'ajax_upload_file_frame_' + i,
	                key: 'ajax_upload_file_frame_' + i,
	                className: 'ajax_upload_file_frame',
	                style: {
	                    display: 'none',
	                    width: 0,
	                    height: 0,
	                    margin: 0,
	                    border: 0
	                }
	            }));
	        }
	    }
	});

	module.exports = FileUpload;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	  var isValidElement = function isValidElement(object) {
	    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(4)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(11)();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) {
	    return [];
	};

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var emptyFunction = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var warning = __webpack_require__(7);
	var assign = __webpack_require__(8);

	var ReactPropTypesSecret = __webpack_require__(9);
	var checkPropTypes = __webpack_require__(10);

	module.exports = function (isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (!manualPropTypeCallCache[cacheKey] &&
	          // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(6);
	  var warning = __webpack_require__(7);
	  var ReactPropTypesSecret = __webpack_require__(9);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var ReactPropTypesSecret = __webpack_require__(9);

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(1);
	var factory = __webpack_require__(13);

	if (typeof React === 'undefined') {
	  throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(React.Component, React.isValidElement, ReactNoopUpdateQueue);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _assign = __webpack_require__(8);

	var emptyObject = __webpack_require__(14);
	var _invariant = __webpack_require__(6);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(7);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function displayName(Constructor, _displayName) {
	      Constructor.displayName = _displayName;
	    },
	    mixins: function mixins(Constructor, _mixins) {
	      if (_mixins) {
	        for (var i = 0; i < _mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, _mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function childContextTypes(Constructor, _childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, _childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, _childContextTypes);
	    },
	    contextTypes: function contextTypes(Constructor, _contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, _contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign({}, Constructor.contextTypes, _contextTypes);
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function getDefaultProps(Constructor, _getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, _getDefaultProps);
	      } else {
	        Constructor.getDefaultProps = _getDefaultProps;
	      }
	    },
	    propTypes: function propTypes(Constructor, _propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, _propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, _propTypes);
	    },
	    statics: function statics(Constructor, _statics) {
	      mixStaticSpecIntoComponent(Constructor, _statics);
	    },
	    autobind: function autobind() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName);
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec === 'undefined' ? 'undefined' : _typeof(spec);
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(isMixinValid, "%s: You're attempting to include a mixin that is either null " + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec);
	        }
	      }

	      return;
	    }

	    _invariant(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
	    _invariant(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

	      var isInherited = name in Constructor;
	      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(one && two && (typeof one === 'undefined' ? 'undefined' : _typeof(one)) === 'object' && (typeof two === 'undefined' ? 'undefined' : _typeof(two)) === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function (newThis) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName);
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName);
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function componentDidMount() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function componentWillUnmount() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function replaceState(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function isMounted() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component');
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function ReactClassComponent() {};
	  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory');
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

	    if (process.env.NODE_ENV !== 'production') {
	      warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component');
	      warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component');
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ })
/******/ ])
});
;