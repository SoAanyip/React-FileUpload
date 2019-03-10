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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cheesu on 2015/8/17.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Edited by Kevin Wang (thiskevinwang) on 2019/3/09.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/*eslint indent: 0 */
	// const React = require('react')

	// const PropTypes = require('prop-types');


	var emptyFunction = function emptyFunction() {};
	/*当前IE上传组的id*/
	var currentIEID = 0;
	/*存放当前IE上传组的可用情况*/
	var IEFormGroup = [true];
	/*当前xhr的数组（仅有已开始上传之后的xhr）*/
	var xhrList = [];
	var currentXHRID = 0;

	var FileUpload = function (_React$Component) {
	  _inherits(FileUpload, _React$Component);

	  function FileUpload() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, FileUpload);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      chooseBtn: {}, //选择按钮。如果chooseAndUpload=true代表选择并上传。
	      uploadBtn: {}, //上传按钮。如果chooseAndUpload=true则无效。
	      before: [], //存放props.children中位于chooseBtn前的元素
	      middle: [], //存放props.children中位于chooseBtn后，uploadBtn前的元素
	      after: [] //存放props.children中位于uploadBtn后的元素,
	    }, _this._updateProps = function (props) {
	      _this.isIE = !(_this.checkIE() < 0 || _this.checkIE() >= 10);
	      var options = props.options;
	      _this.baseUrl = options.baseUrl; //域名
	      _this.param = options.param; //get参数
	      _this.chooseAndUpload = options.chooseAndUpload || false; //是否在用户选择了文件之后立刻上传
	      _this.paramAddToField = options.paramAddToField || undefined; //需要添加到FormData的对象。不支持IE
	      /*upload success 返回resp的格式*/
	      _this.dataType = "json";
	      options.dataType && options.dataType.toLowerCase() == "text" && (_this.dataType = "text");
	      _this.wrapperDisplay = options.wrapperDisplay || "inline-block"; //包裹chooseBtn或uploadBtn的div的display
	      _this.timeout = typeof options.timeout == "number" && options.timeout > 0 ? options.timeout : 0; //超时时间
	      _this.accept = options.accept || ""; //限制文件后缀
	      _this.multiple = options.multiple || false;
	      _this.numberLimit = options.numberLimit || false; //允许多文件上传时，选择文件数量的限制
	      _this.fileFieldName = options.fileFieldName || false; //文件附加到formData上时的key，传入string指定一个file的属性名，值为其属性的值。不支持IE
	      _this.withCredentials = options.withCredentials || false; //跨域时是否使用认证信息
	      _this.requestHeaders = options.requestHeaders || false; //要设置的请求头键值对

	      /*生命周期函数*/
	      /**
	       * beforeChoose() : 用户选择之前执行，返回true继续，false阻止用户选择
	       * @param  null
	       * @return  {boolean} 是否允许用户进行选择
	       */
	      _this.beforeChoose = options.beforeChoose || emptyFunction;
	      /**
	       * chooseFile(file) : 用户选择文件后的触发的回调函数
	       * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
	       * @return
	       */
	      _this.chooseFile = options.chooseFile || emptyFunction;
	      /**
	       * beforeUpload(file,mill) : 用户上传之前执行，返回true继续，false阻止用户选择
	       * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
	       * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
	       * @return  {boolean || object} 是否允许用户进行上传 (hack:如果是obj{
	       *     assign:boolean 默认true
	       *     param:object
	       * }), 则对本次的param进行处理
	       */
	      _this.beforeUpload = options.beforeUpload || emptyFunction;
	      /**
	       * doUpload(file,mill) : 上传动作(xhr send | form submit)执行后调用
	       * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
	       * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
	       * @return
	       */
	      _this.doUpload = options.doUpload || emptyFunction;
	      /**
	       * uploading(progress) : 在文件上传中的时候，浏览器会不断触发此函数。IE中使用每200ms触发的假进度
	       * @param progress {Progress} progress对象，里面存有例如上传进度loaded和文件大小total等属性
	       * @return
	       */
	      _this.uploading = options.uploading || emptyFunction;
	      /**
	       * uploadSuccess(resp) : 上传成功后执行的回调（针对AJAX而言）
	       * @param resp {json | string} 根据options.dataType指定返回数据的格式
	       * @return
	       */
	      _this.uploadSuccess = options.uploadSuccess || emptyFunction;
	      /**
	       * uploadError(err) : 上传错误后执行的回调（针对AJAX而言）
	       * @param err {Error | object} 如果返回catch到的error，其具有type和message属性
	       * @return
	       */
	      _this.uploadError = options.uploadError || emptyFunction;
	      /**
	       * uploadFail(resp) : 上传失败后执行的回调（针对AJAX而言）
	       * @param resp {string} 失败信息
	       */
	      _this.uploadFail = options.uploadFail || emptyFunction;
	      /**
	       * onabort(mill, xhrID) : 主动取消xhr进程的响应
	       * @param mill {long} 毫秒数，本次上传时刻的时间
	       * @param xhrID {int} 在doUpload时会返回的当次xhr代表ID
	       */
	      _this.onabort = options.onabort || emptyFunction;

	      _this.files = options.files || _this.files || false; //保存需要上传的文件
	      /*特殊内容*/

	      /*IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
	       * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
	       */
	      _this.disabledIEChoose = options.disabledIEChoose || false;

	      _this._withoutFileUpload = options._withoutFileUpload || false; //不带文件上传，为了给秒传功能使用，不影响IE
	      _this.filesToUpload = options.filesToUpload || []; //使用filesToUpload()方法代替
	      _this.textBeforeFiles = options.textBeforeFiles || false; //make this true to add text fields before file data
	      /*使用filesToUpload()方法代替*/
	      if (_this.filesToUpload.length && !_this.isIE) {
	        _this.filesToUpload.forEach(function (file) {
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
	      if (_this.chooseAndUpload) {
	        _react2.default.Children.forEach(props.children, function (child) {
	          if (child && child.ref == "chooseAndUpload") {
	            chooseBtn = child;
	            flag++;
	          } else {
	            flag == 0 ? before.push(child) : flag == 1 ? middle.push(child) : "";
	          }
	        });
	      } else {
	        _react2.default.Children.forEach(props.children, function (child) {
	          if (child && child.ref == "chooseBtn") {
	            chooseBtn = child;
	            flag++;
	          } else if (child && child.ref == "uploadBtn") {
	            uploadBtn = child;
	            flag++;
	          } else {
	            flag == 0 ? before.push(child) : flag == 1 ? middle.push(child) : after.push(child);
	          }
	        });
	      }
	      _this.setState({
	        chooseBtn: chooseBtn,
	        uploadBtn: uploadBtn,
	        before: before,
	        middle: middle,
	        after: after
	      });
	    }, _this.commonChooseFile = function () {
	      var jud = _this.beforeChoose();
	      if (jud != true && jud != undefined) return;
	      _this.refs["ajax_upload_file_input"].click();
	    }, _this.commonChange = function (e) {
	      var files = void 0;
	      e.dataTransfer ? files = e.dataTransfer.files : e.target ? files = e.target.files : "";

	      /*如果限制了多文件上传时的数量*/
	      var numberLimit = typeof _this.numberLimit === "function" ? _this.numberLimit() : _this.numberLimit;
	      if (_this.multiple && numberLimit && files.length > numberLimit) {
	        var newFiles = {};
	        for (var i = 0; i < numberLimit; i++) {
	          newFiles[i] = files[i];
	        }newFiles.length = numberLimit;
	        files = newFiles;
	      }
	      _this.files = files;
	      _this.chooseFile(files);
	      _this.chooseAndUpload && _this.commonUpload();
	    }, _this.commonUpload = function () {
	      /*mill参数是当前时刻毫秒数，file第一次进行上传时会添加为file的属性，也可在beforeUpload为其添加，之后同一文件的mill不会更改，作为文件的识别id*/
	      var mill = _this.files.length && _this.files[0].mill || new Date().getTime();
	      var jud = _this.beforeUpload(_this.files, mill);
	      if (jud != true && jud != undefined && (typeof jud === "undefined" ? "undefined" : _typeof(jud)) != "object") {
	        /*清除input的值*/
	        _this.refs["ajax_upload_file_input"].value = "";
	        return;
	      }

	      if (!_this.files) return;
	      if (!_this.baseUrl) throw new Error("baseUrl missing in options");

	      /*用于存放当前作用域的东西*/
	      var scope = {};
	      /*组装FormData*/
	      var formData = new FormData();
	      /*If we need to add fields before file data append here*/
	      if (_this.textBeforeFiles) {
	        formData = _this.appendFieldsToFormData(formData);
	      }
	      if (!_this._withoutFileUpload) {
	        var fieldNameType = _typeof(_this.fileFieldName);

	        /*判断是用什么方式作为formdata item 的 name*/
	        Object.keys(_this.files).forEach(function (key) {
	          if (key == "length") return;

	          if (fieldNameType == "function") {
	            var file = _this.files[key];
	            var fileFieldName = _this.fileFieldName(file);
	            formData.append(fileFieldName, file);
	          } else if (fieldNameType == "string") {
	            var _file = _this.files[key];
	            formData.append(_this.fileFieldName, _file);
	          } else {
	            var _file2 = _this.files[key];
	            formData.append(_file2.name, _file2);
	          }
	        });
	      }
	      /*If we need to add fields after file data append here*/
	      if (!_this.textBeforeFiles) {
	        formData = _this.appendFieldsToFormData(formData);
	      }
	      var baseUrl = _this.baseUrl;

	      /*url参数*/
	      /*如果param是一个函数*/
	      var param = typeof _this.param === "function" ? _this.param(_this.files) : _this.param;

	      var paramStr = "";

	      if (param) {
	        var paramArr = [];
	        param["_"] = mill;
	        Object.keys(param).forEach(function (key) {
	          return paramArr.push(key + "=" + param[key]);
	        });
	        paramStr = "?" + paramArr.join("&");
	      }
	      var targeturl = baseUrl + paramStr;

	      /*AJAX上传部分*/
	      var xhr = new XMLHttpRequest();
	      xhr.open("POST", targeturl, true);

	      /*跨域是否开启验证信息*/
	      xhr.withCredentials = _this.withCredentials;
	      /*是否需要设置请求头*/
	      var rh = _this.requestHeaders;
	      rh && Object.keys(rh).forEach(function (key) {
	        return xhr.setRequestHeader(key, rh[key]);
	      });

	      /*处理超时。用定时器判断超时，不然xhr state=4 catch的错误无法判断是超时*/
	      if (_this.timeout) {
	        xhr.timeout = _this.timeout;
	        xhr.ontimeout = function () {
	          _this.uploadError({ type: "TIMEOUTERROR", message: "timeout" });
	          scope.isTimeout = false;
	        };
	        scope.isTimeout = false;
	        setTimeout(function () {
	          scope.isTimeout = true;
	        }, _this.timeout);
	      }

	      xhr.onreadystatechange = function () {
	        /*xhr finish*/
	        try {
	          if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
	            var resp = _this.dataType == "json" ? JSON.parse(xhr.responseText) : xhr.responseText;
	            _this.uploadSuccess(resp);
	          } else if (xhr.readyState == 4) {
	            /*xhr fail*/
	            var _resp = _this.dataType == "json" ? JSON.parse(xhr.responseText) : xhr.responseText;
	            _this.uploadFail(_resp);
	          }
	        } catch (e) {
	          /*超时抛出不一样的错误，不在这里处理*/
	          !scope.isTimeout && _this.uploadError({ type: "FINISHERROR", message: e.message });
	        }
	      };
	      /*xhr error*/
	      xhr.onerror = function () {
	        try {
	          var resp = _this.dataType == "json" ? JSON.parse(xhr.responseText) : xhr.responseText;
	          _this.uploadError({ type: "XHRERROR", message: resp });
	        } catch (e) {
	          _this.uploadError({ type: "XHRERROR", message: e.message });
	        }
	      };
	      /*这里部分浏览器实现不一致，而且IE没有这个方法*/
	      xhr.onprogress = xhr.upload.onprogress = function (progress) {
	        _this.uploading(progress, mill);
	      };

	      /*不带文件上传，给秒传使用*/
	      _this._withoutFileUpload ? xhr.send(null) : xhr.send(formData);

	      /*保存xhr id*/
	      xhrList.push(xhr);
	      var cID = xhrList.length - 1;
	      currentXHRID = cID;

	      /*有响应abort的情况*/
	      xhr.onabort = function () {
	        return _this.onabort(mill, cID);
	      };

	      /*trigger执行上传的用户回调*/
	      _this.doUpload(_this.files, mill, currentXHRID);

	      /*清除input的值*/
	      _this.refs["ajax_upload_file_input"].value = "";
	    }, _this.appendFieldsToFormData = function (formData) {
	      var field = typeof _this.paramAddToField == "function" ? _this.paramAddToField() : _this.paramAddToField;
	      field && Object.keys(field).map(function (index) {
	        return formData.append(index, field[index]);
	      });
	      return formData;
	    }, _this.IEBeforeChoose = function (e) {
	      var jud = _this.beforeChoose();
	      jud != true && jud != undefined && e.preventDefault();
	    }, _this.IEChooseFile = function (e) {
	      _this.fileName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
	      _this.chooseFile(_this.fileName);
	      /*先执行IEUpload，配置好action等参数，然后submit*/
	      _this.chooseAndUpload && _this.IEUpload() !== false && document.getElementById("ajax_upload_file_form_" + _this.IETag + currentIEID).submit();
	      e.target.blur();
	    }, _this.IEUpload = function (e) {
	      var mill = new Date().getTime();
	      var jud = _this.beforeUpload(_this.fileName, mill);
	      if (!_this.fileName || jud != true && jud != undefined) {
	        e && e.preventDefault();
	        return false;
	      }
	      var that = _this;

	      /*url参数*/
	      var baseUrl = _this.baseUrl;

	      var param = typeof _this.param === "function" ? _this.param(_this.fileName) : _this.param;
	      var paramStr = "";

	      if (param) {
	        var paramArr = [];
	        param["_"] = mill;
	        param["ie"] === undefined && (param["ie"] = "true");
	        for (var key in param) {
	          if (param[key] != undefined) paramArr.push(key + "=" + param[key]);
	        }
	        paramStr = "?" + paramArr.join("&");
	      }
	      var targeturl = baseUrl + paramStr;

	      document.getElementById("ajax_upload_file_form_" + _this.IETag + currentIEID).setAttribute("action", targeturl);
	      /*IE假的上传进度*/
	      var getFakeProgress = _this.fakeProgress();
	      var loaded = 0,
	          count = 0;

	      var progressInterval = setInterval(function () {
	        loaded = getFakeProgress(loaded);
	        _this.uploading({
	          loaded: loaded,
	          total: 100
	        }, mill);
	        /*防止永久执行，设定最大的次数。暂时为30秒(200*150)*/
	        ++count >= 150 && clearInterval(progressInterval);
	      }, 200);

	      /*当前上传id*/
	      var partIEID = currentIEID;
	      /*回调函数*/
	      window.attachEvent ? document.getElementById("ajax_upload_file_frame_" + _this.IETag + partIEID).attachEvent("onload", handleOnLoad) : document.getElementById("ajax_upload_file_frame_" + _this.IETag + partIEID).addEventListener("load", handleOnLoad);

	      function handleOnLoad() {
	        /*clear progress interval*/
	        clearInterval(progressInterval);
	        try {
	          that.uploadSuccess(that.IECallback(that.dataType, partIEID));
	        } catch (e) {
	          that.uploadError(e);
	        } finally {
	          /*清除输入框的值*/
	          var oInput = document.getElementById("ajax_upload_hidden_input_" + that.IETag + partIEID);
	          oInput.outerHTML = oInput.outerHTML;
	        }
	      }
	      _this.doUpload(_this.fileName, mill);
	      /*置为非空闲*/
	      IEFormGroup[currentIEID] = false;
	    }, _this.IECallback = function (dataType, frameId) {
	      /*回复空闲状态*/
	      IEFormGroup[frameId] = true;

	      var frame = document.getElementById("ajax_upload_file_frame_" + _this.IETag + frameId);
	      var resp = {};
	      var content = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body;
	      if (!content) throw new Error("Your browser does not support async upload");
	      try {
	        resp.responseText = content.innerHTML || "null innerHTML";
	        resp.json = JSON ? JSON.parse(resp.responseText) : eval("(" + resp.responseText + ")");
	      } catch (e) {
	        /*如果是包含了<pre>*/
	        if (e.message && e.message.indexOf("Unexpected token") >= 0) {
	          /*包含返回的json*/
	          if (resp.responseText.indexOf("{") >= 0) {
	            var msg = resp.responseText.substring(resp.responseText.indexOf("{"), resp.responseText.lastIndexOf("}") + 1);
	            return JSON ? JSON.parse(msg) : eval("(" + msg + ")");
	          }
	          return { type: "FINISHERROR", message: e.message };
	        }
	        throw e;
	      }
	      return dataType == "json" ? resp.json : resp.responseText;
	    }, _this.forwardChoose = function () {
	      if (_this.isIE) return false;
	      _this.commonChooseFile();
	    }, _this.fowardRemoveFile = function (func) {
	      _this.files = func(_this.files);
	    }, _this.filesToUpload = function (files) {
	      if (_this.isIE) return;
	      _this.files = files;
	      _this.commonUpload();
	    }, _this.abort = function (id) {
	      id === undefined ? xhrList[currentXHRID].abort() : xhrList[id].abort();
	    }, _this.checkIE = function () {
	      var userAgent = _this.userAgent;
	      var version = userAgent.indexOf("MSIE");
	      if (version < 0) return -1;

	      return parseFloat(userAgent.substring(version + 5, userAgent.indexOf(";", version)));
	    }, _this.fakeProgress = function () {
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
	    }, _this.getUserAgent = function () {
	      var userAgentString = _this.props.options && _this.props.options.userAgent;
	      var navigatorIsAvailable = typeof navigator !== "undefined";
	      if (!navigatorIsAvailable && !userAgentString) {
	        throw new Error("`options.userAgent` must be set rendering react-fileuploader in situations when `navigator` is not defined in the global namespace. (on the server, for example)");
	      }
	      return navigatorIsAvailable ? navigator.userAgent : userAgentString;
	    }, _this._packRender = function () {
	      /*IE用iframe表单上传，其他用ajax Formdata*/
	      var render = "";
	      if (_this.isIE) {
	        render = _this._multiIEForm();
	      } else {
	        var restAttrs = {
	          accept: _this.accept,
	          multiple: _this.multiple
	        };

	        render = _react2.default.createElement(
	          "div",
	          { className: _this.props.className, style: _this.props.style },
	          _this.state.before,
	          _react2.default.createElement(
	            "div",
	            {
	              onClick: _this.commonChooseFile,
	              style: {
	                overflow: "hidden",
	                postion: "relative",
	                display: _this.wrapperDisplay
	              }
	            },
	            _this.state.chooseBtn
	          ),
	          _this.state.middle,
	          _react2.default.createElement(
	            "div",
	            {
	              onClick: _this.commonUpload,
	              style: {
	                overflow: "hidden",
	                postion: "relative",
	                display: _this.chooseAndUpload ? "none" : _this.wrapperDisplay
	              }
	            },
	            _this.state.uploadBtn
	          ),
	          _this.state.after,
	          _react2.default.createElement("input", _extends({
	            type: "file",
	            name: "ajax_upload_file_input",
	            ref: "ajax_upload_file_input",
	            style: { display: "none" },
	            onChange: _this.commonChange
	          }, restAttrs))
	        );
	      }
	      return render;
	    }, _this._multiIEForm = function () {
	      var formArr = [];
	      var hasFree = false;

	      /* IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
	       * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
	       */
	      var isDisabled = typeof _this.disabledIEChoose === "function" ? _this.disabledIEChoose() : _this.disabledIEChoose;

	      /*这里IEFormGroup的长度会变，所以不能存len*/
	      for (var i = 0; i < IEFormGroup.length; i++) {
	        _insertIEForm.call(_this, formArr, i);
	        /*如果当前上传组是空闲，hasFree=true，并且指定当前上传组ID*/
	        if (IEFormGroup[i] && !hasFree) {
	          hasFree = true;
	          currentIEID = i;
	        }
	        /*如果所有上传组都不是空闲状态，push一个新增组*/
	        i == IEFormGroup.length - 1 && !hasFree && IEFormGroup.push(true);
	      }

	      return _react2.default.createElement(
	        "div",
	        {
	          className: _this.props.className,
	          style: _this.props.style,
	          id: "react-file-uploader"
	        },
	        formArr
	      );

	      function _insertIEForm(formArr, i) {
	        /*如果已经push了空闲组而当前也是空闲组*/
	        if (IEFormGroup[i] && hasFree) return;
	        /*是否display*/
	        var isShow = IEFormGroup[i];
	        /*Input内联样式*/
	        var style = {
	          position: "absolute",
	          left: "-30px",
	          top: 0,
	          zIndex: "50",
	          fontSize: "80px",
	          width: "200px",
	          opacity: 0,
	          filter: "alpha(opacity=0)"
	        };

	        /*是否限制了文件后缀，以及是否disabled*/
	        var restAttrs = {
	          accept: this.accept,
	          disabled: isDisabled
	        };

	        var input = _react2.default.createElement("input", _extends({
	          type: "file",
	          name: "ajax_upload_hidden_input_" + i,
	          id: "ajax_upload_hidden_input_" + i,
	          ref: "ajax_upload_hidden_input_" + i,
	          onChange: this.IEChooseFile,
	          onClick: this.IEBeforeChoose,
	          style: style
	        }, restAttrs));

	        i = "" + this.IETag + i;
	        formArr.push(_react2.default.createElement(
	          "form",
	          {
	            id: "ajax_upload_file_form_" + i,
	            method: "post",
	            target: "ajax_upload_file_frame_" + i,
	            key: "ajax_upload_file_form_" + i,
	            encType: "multipart/form-data",
	            ref: "form_" + i,
	            onSubmit: this.IEUpload,
	            style: { display: isShow ? "block" : "none" }
	          },
	          this.state.before,
	          _react2.default.createElement(
	            "div",
	            {
	              style: {
	                overflow: "hidden",
	                position: "relative",
	                display: "inline-block"
	              }
	            },
	            this.state.chooseBtn,
	            input
	          ),
	          this.state.middle,
	          _react2.default.createElement(
	            "div",
	            {
	              style: {
	                overflow: "hidden",
	                position: "relative",
	                display: this.chooseAndUpload ? "none" : this.wrapperDisplay
	              }
	            },
	            this.state.uploadBtn,
	            _react2.default.createElement("input", {
	              type: "submit",
	              style: {
	                position: "absolute",
	                left: 0,
	                top: 0,
	                fontSize: "50px",
	                width: "200px",
	                opacity: 0
	              }
	            })
	          ),
	          this.state.after
	        ));
	        formArr.push(_react2.default.createElement("iframe", {
	          id: "ajax_upload_file_frame_" + i,
	          name: "ajax_upload_file_frame_" + i,
	          key: "ajax_upload_file_frame_" + i,
	          className: "ajax_upload_file_frame",
	          style: {
	            display: "none",
	            width: 0,
	            height: 0,
	            margin: 0,
	            border: 0
	          }
	        }));
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	  /*类型验证*/


	  /*根据props更新组件*/


	  /*触发隐藏的input框选择*/
	  /*触发beforeChoose*/


	  /*现代浏览器input change事件。File API保存文件*/
	  /*触发chooseFile*/


	  /*执行上传*/


	  /*组装自定义添加到FormData的对象*/


	  /*iE选择前验证*/
	  /*触发beforeChoose*/


	  /*IE需要用户真实点击上传按钮，所以使用透明按钮*/
	  /*触发chooseFile*/


	  /*IE处理上传函数*/
	  /*触发beforeUpload doUpload*/


	  /*IE回调函数*/
	  //TODO 处理Timeout


	  /*外部调用方法，主动触发选择文件（等同于调用btn.click()), 仅支持现代浏览器*/


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


	  /*外部调用方法，传入files（File API）对象可以立刻执行上传动作，IE不支持。调用随后会触发beforeUpload*/


	  /*外部调用方法，取消一个正在进行的xhr，传入id指定xhr（doupload时返回）或者默认取消最近一个。*/


	  /*判断ie版本*/


	  /*生成假的IE上传进度*/


	  _createClass(FileUpload, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.userAgent = this.getUserAgent();
	      this.isIE = !(this.checkIE() < 0 || this.checkIE() >= 10);
	      /*因为IE每次要用到很多form组，如果在同一页面需要用到多个<FileUpload>可以在options传入tag作为区分。并且不随后续props改变而改变*/
	      var tag = this.props.options && this.props.options.tag;
	      this.IETag = tag ? tag + "_" : "";

	      this._updateProps(this.props);
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {}
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(newProps) {
	      this._updateProps(newProps);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this._packRender();
	    }

	    /*打包render函数*/


	    /*IE多文件同时上传，需要多个表单+多个form组合。根据currentIEID代表有多少个form。*/
	    /*所有不在空闲（正在上传）的上传组都以display:none的形式插入，第一个空闲的上传组会display:block捕捉。*/

	  }]);

	  return FileUpload;
	}(_react2.default.Component);

	FileUpload.propTypes = {
	  options: _propTypes2.default.shape({
	    /*basics*/
	    baseUrl: _propTypes2.default.string.isRequired,
	    param: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
	    dataType: _propTypes2.default.string,
	    chooseAndUpload: _propTypes2.default.bool,
	    paramAddToField: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
	    wrapperDisplay: _propTypes2.default.string,
	    timeout: _propTypes2.default.number,
	    accept: _propTypes2.default.string,
	    multiple: _propTypes2.default.bool,
	    numberLimit: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
	    fileFieldName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
	    withCredentials: _propTypes2.default.bool,
	    requestHeaders: _propTypes2.default.object,
	    /*specials*/
	    tag: _propTypes2.default.string,
	    userAgent: _propTypes2.default.string,
	    disabledIEChoose: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
	    _withoutFileUpload: _propTypes2.default.bool,
	    filesToUpload: _propTypes2.default.arrayOf(_propTypes2.default.object),
	    textBeforeFiles: _propTypes2.default.bool,
	    /*funcs*/
	    beforeChoose: _propTypes2.default.func,
	    chooseFile: _propTypes2.default.func,
	    beforeUpload: _propTypes2.default.func,
	    doUpload: _propTypes2.default.func,
	    uploading: _propTypes2.default.func,
	    uploadSuccess: _propTypes2.default.func,
	    uploadError: _propTypes2.default.func,
	    uploadFail: _propTypes2.default.func,
	    onabort: _propTypes2.default.func
	  }).isRequired,
	  style: _propTypes2.default.object,
	  className: _propTypes2.default.string
	};
	exports.default = FileUpload;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var ReactIs = __webpack_require__(4);

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(7)(ReactIs.isElement, throwOnDirectAccess);
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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(5);
	} else {
	  module.exports = __webpack_require__(6);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/** @license React v16.8.4
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", { value: !0 });
	var b = "function" === typeof Symbol && Symbol.for,
	    c = b ? Symbol.for("react.element") : 60103,
	    d = b ? Symbol.for("react.portal") : 60106,
	    e = b ? Symbol.for("react.fragment") : 60107,
	    f = b ? Symbol.for("react.strict_mode") : 60108,
	    g = b ? Symbol.for("react.profiler") : 60114,
	    h = b ? Symbol.for("react.provider") : 60109,
	    k = b ? Symbol.for("react.context") : 60110,
	    l = b ? Symbol.for("react.async_mode") : 60111,
	    m = b ? Symbol.for("react.concurrent_mode") : 60111,
	    n = b ? Symbol.for("react.forward_ref") : 60112,
	    p = b ? Symbol.for("react.suspense") : 60113,
	    q = b ? Symbol.for("react.memo") : 60115,
	    r = b ? Symbol.for("react.lazy") : 60116;function t(a) {
	  if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a) {
	    var u = a.$$typeof;switch (u) {case c:
	        switch (a = a.type, a) {case l:case m:case e:case g:case f:case p:
	            return a;default:
	            switch (a = a && a.$$typeof, a) {case k:case n:case h:
	                return a;default:
	                return u;}}case r:case q:case d:
	        return u;}
	  }
	}function v(a) {
	  return t(a) === m;
	}exports.typeOf = t;exports.AsyncMode = l;exports.ConcurrentMode = m;exports.ContextConsumer = k;exports.ContextProvider = h;exports.Element = c;exports.ForwardRef = n;
	exports.Fragment = e;exports.Lazy = r;exports.Memo = q;exports.Portal = d;exports.Profiler = g;exports.StrictMode = f;exports.Suspense = p;exports.isValidElementType = function (a) {
	  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && (a.$$typeof === r || a.$$typeof === q || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n);
	};exports.isAsyncMode = function (a) {
	  return v(a) || t(a) === l;
	};exports.isConcurrentMode = v;exports.isContextConsumer = function (a) {
	  return t(a) === k;
	};
	exports.isContextProvider = function (a) {
	  return t(a) === h;
	};exports.isElement = function (a) {
	  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === c;
	};exports.isForwardRef = function (a) {
	  return t(a) === n;
	};exports.isFragment = function (a) {
	  return t(a) === e;
	};exports.isLazy = function (a) {
	  return t(a) === r;
	};exports.isMemo = function (a) {
	  return t(a) === q;
	};exports.isPortal = function (a) {
	  return t(a) === d;
	};exports.isProfiler = function (a) {
	  return t(a) === g;
	};exports.isStrictMode = function (a) {
	  return t(a) === f;
	};
	exports.isSuspense = function (a) {
	  return t(a) === p;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.8.4
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (process.env.NODE_ENV !== "production") {
	  (function () {
	    'use strict';

	    Object.defineProperty(exports, '__esModule', { value: true });

	    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	    // nor polyfill, then a plain number is used for performance.
	    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

	    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
	    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

	    function isValidElementType(type) {
	      return typeof type === 'string' || typeof type === 'function' ||
	      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
	    }

	    /**
	     * Forked from fbjs/warning:
	     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	     *
	     * Only change is we use console.warn instead of console.error,
	     * and do nothing when 'console' is not supported.
	     * This really simplifies the code.
	     * ---
	     * Similar to invariant but only logs a warning if the condition is not met.
	     * This can be used to log issues in development environments in critical
	     * paths. Removing the logging code for production environments will keep the
	     * same logic and follow the same code paths.
	     */

	    var lowPriorityWarning = function lowPriorityWarning() {};

	    {
	      var printWarning = function printWarning(format) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        var argIndex = 0;
	        var message = 'Warning: ' + format.replace(/%s/g, function () {
	          return args[argIndex++];
	        });
	        if (typeof console !== 'undefined') {
	          console.warn(message);
	        }
	        try {
	          // --- Welcome to debugging React ---
	          // This error was thrown as a convenience so that you can use this stack
	          // to find the callsite that caused this warning to fire.
	          throw new Error(message);
	        } catch (x) {}
	      };

	      lowPriorityWarning = function lowPriorityWarning(condition, format) {
	        if (format === undefined) {
	          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
	        }
	        if (!condition) {
	          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	            args[_key2 - 2] = arguments[_key2];
	          }

	          printWarning.apply(undefined, [format].concat(args));
	        }
	      };
	    }

	    var lowPriorityWarning$1 = lowPriorityWarning;

	    function typeOf(object) {
	      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null) {
	        var $$typeof = object.$$typeof;
	        switch ($$typeof) {
	          case REACT_ELEMENT_TYPE:
	            var type = object.type;

	            switch (type) {
	              case REACT_ASYNC_MODE_TYPE:
	              case REACT_CONCURRENT_MODE_TYPE:
	              case REACT_FRAGMENT_TYPE:
	              case REACT_PROFILER_TYPE:
	              case REACT_STRICT_MODE_TYPE:
	              case REACT_SUSPENSE_TYPE:
	                return type;
	              default:
	                var $$typeofType = type && type.$$typeof;

	                switch ($$typeofType) {
	                  case REACT_CONTEXT_TYPE:
	                  case REACT_FORWARD_REF_TYPE:
	                  case REACT_PROVIDER_TYPE:
	                    return $$typeofType;
	                  default:
	                    return $$typeof;
	                }
	            }
	          case REACT_LAZY_TYPE:
	          case REACT_MEMO_TYPE:
	          case REACT_PORTAL_TYPE:
	            return $$typeof;
	        }
	      }

	      return undefined;
	    }

	    // AsyncMode is deprecated along with isAsyncMode
	    var AsyncMode = REACT_ASYNC_MODE_TYPE;
	    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	    var ContextConsumer = REACT_CONTEXT_TYPE;
	    var ContextProvider = REACT_PROVIDER_TYPE;
	    var Element = REACT_ELEMENT_TYPE;
	    var ForwardRef = REACT_FORWARD_REF_TYPE;
	    var Fragment = REACT_FRAGMENT_TYPE;
	    var Lazy = REACT_LAZY_TYPE;
	    var Memo = REACT_MEMO_TYPE;
	    var Portal = REACT_PORTAL_TYPE;
	    var Profiler = REACT_PROFILER_TYPE;
	    var StrictMode = REACT_STRICT_MODE_TYPE;
	    var Suspense = REACT_SUSPENSE_TYPE;

	    var hasWarnedAboutDeprecatedIsAsyncMode = false;

	    // AsyncMode should be deprecated
	    function isAsyncMode(object) {
	      {
	        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	          hasWarnedAboutDeprecatedIsAsyncMode = true;
	          lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	        }
	      }
	      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	    }
	    function isConcurrentMode(object) {
	      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	    }
	    function isContextConsumer(object) {
	      return typeOf(object) === REACT_CONTEXT_TYPE;
	    }
	    function isContextProvider(object) {
	      return typeOf(object) === REACT_PROVIDER_TYPE;
	    }
	    function isElement(object) {
	      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	    }
	    function isForwardRef(object) {
	      return typeOf(object) === REACT_FORWARD_REF_TYPE;
	    }
	    function isFragment(object) {
	      return typeOf(object) === REACT_FRAGMENT_TYPE;
	    }
	    function isLazy(object) {
	      return typeOf(object) === REACT_LAZY_TYPE;
	    }
	    function isMemo(object) {
	      return typeOf(object) === REACT_MEMO_TYPE;
	    }
	    function isPortal(object) {
	      return typeOf(object) === REACT_PORTAL_TYPE;
	    }
	    function isProfiler(object) {
	      return typeOf(object) === REACT_PROFILER_TYPE;
	    }
	    function isStrictMode(object) {
	      return typeOf(object) === REACT_STRICT_MODE_TYPE;
	    }
	    function isSuspense(object) {
	      return typeOf(object) === REACT_SUSPENSE_TYPE;
	    }

	    exports.typeOf = typeOf;
	    exports.AsyncMode = AsyncMode;
	    exports.ConcurrentMode = ConcurrentMode;
	    exports.ContextConsumer = ContextConsumer;
	    exports.ContextProvider = ContextProvider;
	    exports.Element = Element;
	    exports.ForwardRef = ForwardRef;
	    exports.Fragment = Fragment;
	    exports.Lazy = Lazy;
	    exports.Memo = Memo;
	    exports.Portal = Portal;
	    exports.Profiler = Profiler;
	    exports.StrictMode = StrictMode;
	    exports.Suspense = Suspense;
	    exports.isValidElementType = isValidElementType;
	    exports.isAsyncMode = isAsyncMode;
	    exports.isConcurrentMode = isConcurrentMode;
	    exports.isContextConsumer = isContextConsumer;
	    exports.isContextProvider = isContextProvider;
	    exports.isElement = isElement;
	    exports.isForwardRef = isForwardRef;
	    exports.isFragment = isFragment;
	    exports.isLazy = isLazy;
	    exports.isMemo = isMemo;
	    exports.isPortal = isPortal;
	    exports.isProfiler = isProfiler;
	    exports.isStrictMode = isStrictMode;
	    exports.isSuspense = isSuspense;
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ReactIs = __webpack_require__(4);
	var assign = __webpack_require__(8);

	var ReactPropTypesSecret = __webpack_require__(9);
	var checkPropTypes = __webpack_require__(10);

	var has = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning = function printWarning() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function printWarning(text) {
	    var message = 'Warning: ' + text;
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
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

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
	    elementType: createElementTypeTypeChecker(),
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
	          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (!manualPropTypeCallCache[cacheKey] &&
	          // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
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
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
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

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
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
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
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
	        if (has(propValue, key)) {
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
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
	        return emptyFunctionThatReturnsNull;
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

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
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
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
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

	var printWarning = function printWarning() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(9);
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function printWarning(text) {
	    var message = 'Warning: ' + text;
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
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === 'undefined' ? 'undefined' : _typeof(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function () {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

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

	var ReactPropTypesSecret = __webpack_require__(9);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
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
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ })
/******/ ])
});
;