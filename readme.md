# React-FileUpload #

![npm version](https://badge.fury.io/js/react-fileupload.svg)

## Index ##


### EN ###
* [Introduce](#introduce)
* [Download](#download)
* [API](#api-en)
  * [options](#options) 
  * [Life Circle Functions](#life-circle-functions)
  * [Special Properties](#special-properties)
  * [Component Functions](#component-functions)
  * [Children](#children)
* [Examples](#examples)
* [Development](#development)
* [Contributor](#contributor)
* [Change-log](#change-log)
* [License](#license)

### CN ###

* [简介](#简介)
* [下载](#下载)
* [API](#api-cn)
  * [options](#options) 
  * [生命周期函数](#生命周期函数)
  * [特殊属性](#特殊属性)
  * [组件方法](#组件方法)
  * [Children](#children)
* [例子](#例子)
* [Development](#development)
* [Contributor](#contributor)
* [Change-log](#change-log)
* [License](#license)


## Introduce ##
1. A React component of async file uploading, using File API+FormData in modern browser, and form+iframe in IE9-. If want to use in IE8, use es5-shim or so.
2. With help of ES6, so babel is required.
3. When in IE9-, an invisible `<input>` will be put over the chooseBtn so that it can catch the click event. It is simpler in moderns because the event will be caught by the wrapper.
5. Life circle functions.
6. No preset styles. Just use your favorite. 

### Get started ###
```
const FileUpload = require('react-fileupload');
...
render(){
	/*set properties*/
	const options={
		baseUrl:'http://127.0.0.1',
		param:{
			fid:0
		}
	}
	/*Use FileUpload with options*/
	/*Set two dom with ref*/
	return (
		<FileUpload options={options}>
			<button ref="chooseBtn">choose</button>
			<button ref="uploadBtn">upload</button>
		</FileUpload>
	)	        
}
```

## Download ##
`npm install react-fileupload --save`

## API-EN ##

### options ###
```
options:{
    baseUrl:'xxx',
    ...
}
```
`options` is an attribute of `<FileUpload />`. The properties of `options` are: 

name | type | default | note
------------ | ------------- | ------------ | ------------
baseUrl | string | ``''`` | url
param | object | ``{}`` | params that appended after baseUrl.
dataType | `'json'/'text'`  | ``'json'`` | type of response.
chooseAndUpload | boolean | ``false`` | whether the upload action will be triggered just after the user choose a file. If true, an DOM with the `ref='chooseAndUpload'` should be use as a child. default to false.
paramAddToFile(deprecated) | array[string] | ``[]`` | an array that including names of params that need to append to the file instance(File ApI instance). default to [].
wrapperDisplay | string | ``'inline-block'`` | the display of the wrappers of chooseBtn or uploadBtn. default to 'inline-block'.
timeout | number | ``0`` | Timeout of the request, not support IE9- right now, when is timeout the `uploadError` will be triggered, and an object `{type:'TIMEOUTERROR',message:'timeout'}` will be return as the argument. default to 0 as no limit.
paramAddToField | object/func | ``undefined`` | Key-value that need to add to  formData. When it is a function, use the return.
accept | string | ``''`` | Limit the type (extension) of file.
multiple | boolean | ``false`` | Allow multi-upload or not. Not supporting IE9-.
numberLimit | number/func | false | Limit how much file that user can choose in multi-upload case.User can still choose but FileUpload will filter.
fileFieldName | string/func | false | When a file is added to formData, defaulting file name as key. When is a string, use it. And When is a func, use return value. Func will receive the File object as argument.
withCredentials | boolean | false | Same as `xhr.withCredentials`.
requestHeaders | object | false | Key-values that will be set using  `xhr.setRequestHeader(key, value)`.
userAgent | string | undefined | Used to set the User Agent String when serverside rendering isomorphic applications. (required when rendering on the server)

### Life circle functions ###
Also set as the properties of options.

#### beforeChoose() ####
Triggered after clicking the `chooseBtn` and before choosing file. return true to continue or false to stop choosing.

@param  null

@return  {boolean} allow the choose or not

#### chooseFile(files) ####
The callback triggered after choosing.

@param files {array[File] | string} In moderns it will be the array contains the File instance(the way that File API returns). In IE9- it will be the full name of file.

@return

#### beforeUpload(files,mill) ####
Triggered before uploading. return true to continue or false to stop uploading.

@param files {array[File] | string} In moderns it will be the array contains the File instance(the way that File API returns). In IE9- it will be the full name of file.

@param mill {long} The time of the upload action (millisecond). If the File instance has the `mill` property it will be the same as it.

@return  {boolean} Allow the upload action or not.

#### doUpload(files,mill,xhrID) ####
Triggered after the request is sent(xhr send | form submit).

@param files {array[File] | string} In moderns it will be the array contains the File instance(the way that File API returns). In IE9- it will be the full name of file.

@param mill {long} The time of the upload action (millisecond). If the File instance has the `mill` property it will be the same as it.

@param xhrID {int} ID of this uploading xhr. Could be useful for `abort`.

@return

#### onabort(mill,id) ####
Triggered after you aborting a xhr.

@param mill {long} The time of the upload action (millisecond) that you aborted.

@param xhrID {int} The ID of the xhr taht you aborted.

#### uploading(progress) ####
It will be triggered continuously when the file is uploading in moderns.

@param progress {Progress} Progress instance，useful properties such as loaded and total can be found.

@return

#### uploadSuccess(resp) ####
Callback when upload succeed (according to the AJAX simply).

@param resp {json | string} The response is fomatted According to options.dataType.

@return

#### uploadError(err) ####
Callback when error occurred (according to the AJAX simply).

@param err {Error | object} If this is an error that caught by `try`, it will be an object with `type` and `message`.

@return

#### uploadFail(resp) ####
Callback when upload failed (according to the AJAX simply).

@param resp {string} Message of it.

### Special properties ###
Also can be set as property of `options`, but is not in common use.

#### textBeforeFiles ####
{boolean}

make this true to add text fields before file data.

#### tag ####
{string}

Multi form groups are required in IE. If there are multi-use of `<FileUpload>` in one page, use tag to distinguish them.

#### _withoutFileUpload ####
{boolean}

Send AJAX without the file(without the FormData).

#### disabledIEChoose ####
{boolean | func}
In IE, the upload button is actually covered by an invisible `<input />` , and the `disabled` attribute for button will not work. So set this property as `true` (function return true) to disabled choose behavior.

#### filesToUpload(deprecated) ####
Use filesToUpload(files) of component functions instead.

{array[File]}

IF there is file(File instance) that need to be uploaded immediately, it can be pushed in this array, and should be cleared in `beforeUpload` or `doUpload`. Not supporting IE. This file will be detected in `componentWillReceiveProps` and uploaded.


### children ###

You can just set two btns.
```
<FileUpload options={options}>
	<button ref="chooseBtn">choose</button>
	<button ref="uploadBtn">upload<button>
</FileUpload>
```

Or if you set the `chooseAndUpload` to true, you need to set only one with `ref="chooseAndUpload"`.
```
<FileUpload options={options}>
    <button ref="chooseAndUpload">chooseAndUpload</button>
</FileUpload>
```

Other DOMs can also be set as children.
```
<FileUpload options={options}>
    <h3>Please choose</h3>
    <div ref="chooseBtn">
        <i className="icon icon-upload" />
        <span>do it</span>
    </div>
    <p>You have uploaded {this.state.rate}</p>
    <button ref="uploadBtn">upload<button>
    <p>Thanks for using</p>
</FileUpload>
```


### Component functions ###
Use via refs. eg:

```
componentDidUpdate(){
    this.refs['File-Upload'].filesToUpload([this.state.file]);
}

render(){
    return(){
        <FileUpload ref="File-Upload" options={...}>
        </FileUpload>
    }
}
```

#### filesToUpload ####
IF there is file(File instance) that need to be uploaded immediately,use this function. BeforeUpload() will be triggered after this function

@param files {array[file]} files array that need to be uploaded

@return null

#### forwardChoose ####
Do the same as clicking `chooseBtn` . Only support modern browsers.

@param null

@return null

#### abort ####
Abort a xhr. Temporarily only works in modern browsers.

@param xhrID {int} If not passing an ID, will abort the newest one. You can get the ID of a xhr in `doUpload()`. 

## examples ##

If you have better and clearer demos, plz tell me! Online or offline.

simple example:

```
const FileUpload = require('react-fileupload');
...
render(){
	/*set properties*/
	const options={
		baseUrl:'http://127.0.0.1',
		param:{
			fid:0
		}
	}
	/*Use FileUpload with options*/
	/*Set two dom with ref*/
	return (
		<FileUpload options={options}>
			<button ref="chooseBtn">choose</button>
			<button ref="uploadBtn">upload</button>
		</FileUpload>
	)	        
}
```

Most of the options may be set like:

```
options:{
    baseUrl : './upload',
    param : {
        category: '1',
        _: Date().getTime()
    },
    dataType : 'json',
    wrapperDisplay : 'inline-block',
    multiple: true,
    numberLimit: 9,
    accept: 'image/*',
    chooseAndUpload : false,
    paramAddToField : {purpose: 'save'},
    //fileFieldName : 'file',
    fileFieldName(file){ return file.name },
    withCredentials: false,
	  requestHeaders: {'User-Agent': 'So Aanyip'},
    beforeChoose : function()[
        return user.isAllowUpload
    },
    chooseFile : function(files){
        console.log('you choose',typeof files == 'string' ? files : files[0].name)
    },
    beforeUpload : function(files,mill){
        if(typeof files == string) return true
        if(files[0].size<1024*1024*20){
            files[0].mill = mill
            return true
        }
        return false
    },
    doUpload : function(files,mill){
        console.log('you just uploaded',typeof files == 'string' ? files : files[0].name)
    },
    uploading : function(progress){
        console.log('loading...',progress.loaded/progress.total+'%')
    },
    uploadSuccess : function(resp){
        console.log('upload success..!')
    },
    uploadError : function(err){
        alert(err.message)
    },
    uploadFail : function(resp){
        alert(resp)
    }
}

if (typeof window === 'undefined') {
  options.userAgent = this.props.userAgentString;
}

```

An working example:

```
this.uploadOptions = {
  baseUrl: '/node/api',
  param: {
    _c: 'file',
    _a: 'UploadFile'
  },
  multiple: true,
  numberLimit: this._getLimitNumber,
  accept: 'image/*',
  fileFieldName(file) {
    return file.rawID
  },
  chooseAndUpload: true,
  wrapperDisplay: 'block',
  beforeUpload: this._checkUploadImg,
  uploading: this._handleUploading,
  /*xhr success*/
  uploadSuccess: this._handleUploadSuccess,
  /*xhr fail*/
  uploadFail: this._handleUploadFailed,
  uploadError: this._handleUploadFailed
}

/*Litmit how much files could be uploaded*/
@autobind
_getLimitNumber() {
  const IMAGE_LIMIT = this.props.imageLimit  //e.g. 9
  const stateRawID = this.props.formState.rawIDs,
    rawIDs = stateRawID && stateRawID.value ? JSON.parse(stateRawID.value) : []  //How much imgs chosed.

  return rawIDs.length >= IMAGE_LIMIT ? 0 : IMAGE_LIMIT - rawIDs.length
}

/*determine whether the files could be sent or not*/
@autobind
_checkUploadImg(files, mill) {
  const { formState } = this.props,
    formRawIDs = formState.rawIDs && formState.rawIDs.value ? JSON.parse(formState.rawIDs.value) : [],
    attachment = {},
    errorMsg = {
      size:{
        desc: 'Size lagger than 20Mb is not supported',
        names: []
      },
      ext:{
        desc: 'Not supported extention',
        names: []
      }
    }
  let canUpload = true

  Object.keys(files).forEach(key => {
    /*Some browsers may find 'length' as key.*/
    if(key === 'length') return
    const file = files[key],
      dataUrl = window.URL.createObjectURL(file),
      /*rawID: The way I use like md5*/
      rawID = this._addRawID(file),
      { name, size, lastModified } = file

    /*size > 20Mb or not*/
    if( size > (20 * 1024 * 1024) ) return errorMsg.size.names.push(name)
    /*Check extention*/
    if(!isImg(name)) return errorMsg.ext.names.push(name)

    /*Whether img already in FormData*/
    formRawIDs.includes(rawID) ?
      message.info(`You had already chosed ${name}`,2500) :
      attachment[rawID] = {
        name,
        size,
        lastModified,
        rawID,
        dataUrl,
        mill
      }
  })

  const rawIDs = Object.keys(attachment)

  !rawIDs.length && ( canUpload = false )

  const msgStr = this._packErrorMessage(errorMsg)
  msgStr.length && message.error(msgStr)

  !Object.keys(attachment).length && (canUpload = false)

  /*Do xhr or not*/
  return canUpload
}

/*Progress*/
@autobind
_handleUploading(progress, mill) {
  this.props.dispatch(
    this.props.uploadProgress( {progress,mill} )
  )
}


@autobind
_handleUploadSuccess(respArr) {
 //depends on your response
}

@autobind
_handleUploadFailed(err) {
  typeof err !== 'string' && (err = err.msg)
  if(err == 'undefined' || err == undefined) err = 'Unknown error'
  message.error(`Upload failed，${err}`)
}

render() {
  return (
    <FileUpload options={this.uploadOptions} ref="fileUpload">
      <div styleName={dashedBoxStyle} ref="chooseAndUpload">
        {plusIcon}
      </div>
    </FileUpload>
  )
}
```


## 简介 ##
1. React文件上传组件，现代浏览器采用File API+FormData异步上传，兼容IE9使用form+iframe异步上传。(babel6不兼容IE8，如需在IE8使用请再次转换)
2. 使用到ES6，需要经babel转译。
3. IE通过把透明的上传按钮覆盖在传入的children的上传按钮上进行点击的捕捉。同时隐藏iframe。现代浏览器通过传入的按钮上再增加一层wrapper来捕捉。
5. 丰富的生命周期函数
6. 不包含预设样式，开放式组件 

简单使用方式：
```
var FileUpload = require('react-fileupload');
...
render(){
	/*指定参数*/
	var options={
		baseUrl:'http://127.0.0.1',
		param:{
			fid:0
		}
	}
	/*调用FileUpload,传入options。然后在children中*/
	/*传入两个dom(不一定是button)并设置其ref值。*/
	return (
		<FileUpload options={options}>
			<button ref="chooseBtn">choose</button>
			<button ref="uploadBtn">upload<button>
		</FileUpload>
	)	        
}
```

## 下载 ##
`npm install react-fileupload --save`

## API-CN ##

### options ###                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
```
options:{
    baseUrl:'xxx',
    ...
}
```
作为FileUpload的属性传入。其属性为：

字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
baseUrl | string | ``''`` | 目标域名
param | object | ``{}`` | 作为get参数配置在域名之后
dataType | `'json'/'text'` | ``'json'`` | 回应的格式
chooseAndUpload | boolean | ``false`` | 是否在用户选择了文件之后立刻上传,如果为true则只需在children传入ref="chooseAndUpload"的DOM就可触发。默认false
wrapperDisplay | string | ``'inline-block'`` | 包裹chooseBtn或uploadBtn的div的display默认'inline-block'
timeout | number | ``0`` | 请求的超时时间，暂不兼容IE9-，超时调用`uploadError`,返回`{type:'TIMEOUTERROR',message:'timeout'}`。默认为0没有超时限制
paramAddToField | object/func | ``undefined`` | 添加到formData上的参数键值对。func时取返回值。
accept | string | ``''`` | 限制选择文件的类型（后缀）
multiple | boolean | ``false`` | 是否允许同时选择多文件）不支持IE9-
numberLimit | number/func | false | 多文件上传时限制用户选择的数量（用户仍可以选择，但是会在选择后进行过滤）
fileFieldName | string/func | false | 文件添加到formData时，默认用file.name作为key。传入string会直接使用此string作为key，若为func则取返回值，func的参数为对应的file对象。
withCredentials | boolean | false | 与 `xhr.withCredentials` 一致。
requestHeaders | object | false | 对象中的键值对会作为 `xhr.setRequestHeader(key, value)` 的参数。
userAgent | string | undefined | 在服务器端渲染同构应用时可以自己设定User Agent。(例如在组件内部是通过navigator的userAgent来判定浏览器的，服务器端获取不到navigator)


### 生命周期函数 ###
同样作为options的属性传入

#### beforeChoose() ####
在用户点击选择按钮后，进行选择文件之前执行，返回true继续，false阻止用户选择

@param  null

@return  {boolean} 是否允许用户进行选择

#### chooseFile(files) ####
用户选择文件后的触发的回调函数

@param files {array[File] | string} 现代浏览器返回包含File对象的数组(File API返回的方式)，IE返回文件名

@return

#### beforeUpload(files,mill) ####
进行上传动作之前执行，返回true继续，false阻止文件上传

@param file {array[File] | string} 现代浏览器返回包含File对象的数组(File API返回的方式)，IE返回文件名

@param mill {long} 上传动作执行时的时间(毫秒)，如果File对象已有mill属性则返回一样的

@return  {boolean} 是否允许用户进行上传

#### doUpload(files,mill,xhrID) ####
上传动作(xhr send | form submit)执行后(请求发送后)调用

@param file {array[File] | string} 现代浏览器返回包含File对象的数组(File API返回的方式)，IE返回文件名

@param mill {long} 上传动作执行时的时间(毫秒)，如果File对象已有mill属性则返回一样的

@param xhrID {int} 这次上传所属的xhr的id。在 `abort` 的组件方法中会用到。

@return

#### onabort(mill,id) ####
在你主动取消一个xhr后触发。

@param mill {long} 你所取消的上传动作执行时的时间(毫秒)

@param xhrID {int} 你所取消的xhr所属id。

#### uploading(progress) ####
在文件上传中的时候，浏览器会不断触发此函数，IE9-为虚拟的进度

@param progress {Progress} progress对象，里面存有例如上传进度loaded和文件大小total等属性，IE9-只有loaded和total属性，且loaded为100

@return

#### uploadSuccess(resp) ####
上传成功后执行的回调（针对AJAX而言）

@param resp {json | string} 根据options.dataType指定返回数据的格式

@return

#### uploadError(err) ####
上传错误后执行的回调（针对AJAX而言）

@param err {Error | object} 如果返回的是catch到的error，则其为object，具有type和message属性

@return

#### uploadFail(resp) ####
上传失败后执行的回调（针对AJAX而言）

@param resp {string} 失败信息

### 特殊属性 ###
以下也可以作为options的属性传入，但一般不使用到

#### textBeforeFiles ####
{boolean}

当属性为 `true` 时让 `paramAddToField` 的参数添加在文件之前。

#### tag ####
{string}

IE上传需要多个form组，如需在一个页面引入多个<FileUpload>，用tag区分form组。

#### _withoutFileUpload ####
{boolean}

不带文件上传(不构造FormData对象)，为了给秒传功能使用，不影响IE

#### disabledIEChoose ####
{boolean | func}
IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。

#### filesToUpload(废弃) ####
使用组件方法filesToUpload(files)代替。

{array[File]}

如有要立即上传的文件(File对象)，放入这个数组，然后在beforeUpload或者doUpload外部清除传入file，不支持IE。传入的文件会在componentWillReceiveProps检测到并立刻上传。


### children ###

可以传入两个btn
```
<FileUpload options={options}>
	<button ref="chooseBtn">choose</button>
	<button ref="uploadBtn">upload<button>
</FileUpload>
```

如果选择chooseAndUpload为true，则需要传入一个，且ref为chooseAndUpload
```
<FileUpload options={options}>
    <button ref="chooseAndUpload">chooseAndUpload</button>
</FileUpload>
```

当然并不一定是btn
```
<FileUpload options={options}>
    <div ref="chooseBtn">
        <i className="icon icon-upload" />
        <span>do it</span>
    </div>
    <button ref="uploadBtn">upload<button>
</FileUpload>
```

在这中间也可以插入其他DOM
```
<FileUpload options={options}>
    <h3>Please choose</h3>
    <div ref="chooseBtn">
        <i className="icon icon-upload" />
        <span>do it</span>
    </div>
    <p>You have uploaded {this.state.rate}</p>
    <button ref="uploadBtn">upload<button>
    <p>Thanks for using</p>
</FileUpload>
```

### 组件方法 ###
通过refs来使用。eg:

```
componentDidUpdate(){
    this.refs['File-Upload'].filesToUpload([this.state.file]);
}

render(){
    return(){
        <FileUpload ref="File-Upload" options={...}>
        </FileUpload>
    }
}
```

#### filesToUpload ####
如有要立即上传的文件(File对象),调用此方法上传。调用后会接着触发beforeUpload方法。

@param files {array[file]} 需要上传的文件数组

@return null

#### forwardChoose ####
主动触发选择文件（等同于调用btn.click()), 仅支持现代浏览器

@param null

@return null

#### abort ####
主动取消一个xhr。暂时只在现代浏览器起作用。

@param xhrID {int} 这里如果不传入id，就会取消最新的一个xhr。 在  `doUpload()` 函数的参数中可以得到xhrID。

## 例子 ##

简单使用方式：
```
var FileUpload = require('react-fileupload');
...
render(){
	/*指定参数*/
	var options={
		baseUrl:'http://127.0.0.1',
		param:{
			fid:0
		}
	}
	/*调用FileUpload,传入options。然后在children中*/
	/*传入两个dom(不一定是button)并设置其ref值。*/
	return (
		<FileUpload options={options}>
			<button ref="chooseBtn">choose</button>
			<button ref="uploadBtn">upload<button>
		</FileUpload>
	)	        
}
```

多数options的设置方式

```
options:{
    baseUrl : './upload',
    param : {
        category: '1',
        _: Date().getTime()
    },
    dataType : 'json',
    wrapperDisplay : 'inline-block',
    multiple: true,
    numberLimit: 9,
    accept: 'image/*',
    chooseAndUpload : false,
    paramAddToField : {purpose: 'save'},
    //fileFieldName : 'file',
    fileFieldName(file){ return file.name },
    withCredentials: false,
	requestHeaders: {'User-Agent': 'So Aanyip'},
    beforeChoose : function()[
        return user.isAllowUpload
    },
    chooseFile : function(files){
        console.log('you choose',typeof files == 'string' ? files : files[0].name)
    },
    beforeUpload : function(files,mill){
        if(typeof files == string) return true
        if(files[0].size<1024*1024*20){
            files[0].mill = mill
            return true
        }
        return false
    },
    doUpload : function(files,mill){
        console.log('you just uploaded',typeof files == 'string' ? files : files[0].name)
    },
    uploading : function(progress){
        console.log('loading...',progress.loaded/progress.total+'%')
    },
    uploadSuccess : function(resp){
        console.log('upload success..!')
    },
    uploadError : function(err){
        alert(err.message)
    },
    uploadFail : function(resp){
        alert(resp)
    }
}

if (typeof window === 'undefined') {
  options.userAgent = this.props.userAgentString;
}
```

一个实际应用的例子：

```
this.uploadOptions = {
  baseUrl: '/node/api',
  param: {
    _c: 'file',
    _a: 'UploadFile'
  },
  multiple: true,
  numberLimit: this._getLimitNumber,
  accept: 'image/*',
  fileFieldName(file) {
    return file.rawID
  },
  chooseAndUpload: true,
  wrapperDisplay: 'block',
  beforeUpload: this._checkUploadImg,
  uploading: this._handleUploading,
  /*上传成功*/
  uploadSuccess: this._handleUploadSuccess,
  /*xhr失败*/
  uploadFail: this._handleUploadFailed,
  uploadError: this._handleUploadFailed
}

/*限制这次上传的文件数,超过的数量会在FileUpload直接被遗弃*/
@autobind
_getLimitNumber() {
  const IMAGE_LIMIT = this.props.imageLimit  //e.g. 9
  const stateRawID = this.props.formState.rawIDs,
    rawIDs = stateRawID && stateRawID.value ? JSON.parse(stateRawID.value) : []  //How much imgs chosed.

  return rawIDs.length >= IMAGE_LIMIT ? 0 : IMAGE_LIMIT - rawIDs.length
}

/*上传前的信息保存的验证*/
@autobind
_checkUploadImg(files, mill) {
  const { formState } = this.props,
    formRawIDs = formState.rawIDs && formState.rawIDs.value ? JSON.parse(formState.rawIDs.value) : [],
    attachment = {},
    errorMsg = {
      size:{
        desc: '暂不支持上传超过20Mb的附件',
        names: []
      },
      ext:{
        desc: '不支持的文件后缀',
        names: []
      }
    }
  let canUpload = true

  Object.keys(files).forEach(key => {
    /*部分浏览器会keys到length属性。如果要彻底避免需要用for*/
    if(key === 'length') return
    const file = files[key],
      dataUrl = window.URL.createObjectURL(file),
      rawID = this._addRawID(file),
      { name, size, lastModified } = file

    /*检查文件大小是否超过20M*/
    if( size > (20 * 1024 * 1024) ) return errorMsg.size.names.push(name)
    /*检查文件后缀*/
    if(!isImg(name)) return errorMsg.ext.names.push(name)

    /*检查formState中是否已有此图片*/
    formRawIDs.includes(rawID) ?
      message.info(`您已经选择过${name}`,2500) :
      /*不保存整个真实文件。仅保存文件属性*/
      attachment[rawID] = {
        name,
        size,
        lastModified,
        rawID,
        dataUrl,
        mill
      }
  })

  /*本次选择文件的rawIDs数组*/
  const rawIDs = Object.keys(attachment)

  !rawIDs.length && ( canUpload = false )

  const msgStr = this._packErrorMessage(errorMsg)
  msgStr.length && message.error(msgStr)

  !Object.keys(attachment).length && (canUpload = false)

  /*满足上传返回true进行上传，否则为false*/
  return canUpload
}

/*上传中的进度条*/
@autobind
_handleUploading(progress, mill) {
  this.props.dispatch(
    this.props.uploadProgress( {progress,mill} )
  )
}


@autobind
_handleUploadSuccess(respArr) {
 //depends on your response
}

@autobind
_handleUploadFailed(err) {
  typeof err !== 'string' && (err = err.msg)
  if(err == 'undefined' || err == undefined) err = '未知错误'
  message.error(`上传失败，${err}`)
}

render() {
  return (
    <FileUpload options={this.uploadOptions} ref="fileUpload">
      <div styleName={dashedBoxStyle} ref="chooseAndUpload">
        {plusIcon}
      </div>
    </FileUpload>
  )
}
```

## Development ##
- npm install
- npm start

## Contributor ##
- [@Pritoj](https://github.com/Pritoj)
- [@David Stevens](https://github.com/davidstevens37)

## Change-log ##

### 2.4.0 ###
- Add property `userAgent`, thanks [@David Stevens](https://github.com/davidstevens37).
- Add Webpack build scripts, thanks [@David Stevens](https://github.com/davidstevens37).

### 2.3.0 ###
- Add special property `textBeforeFiles`, thanks [@Pritoj](https://github.com/Pritoj).
- Add component function `abort`
- Update function `doUpload(files, mill, xhrID)`
- Add life circle function `onabort`

### 2.2.0 ###
- Add property `withCredentials`.
- Add property `requestHeaders`.
- Add `main.min.js`, and `main` in `package.json` points at that file now.

### 2.1.2 ###
- Fix #7, unexpected error on `fileFIeldName`.

### 2.1.1 ###
- Fix #6, when passing undefined and null as child, a TypeError is raised.

### 2.1.0 ###
- Update property `fileFieldName`, can be string or func.

### 2.0.2 ###
- Fix bug in main.js
- Update dependency `react` to `^15.0.2` 

### 2.0.0 ###
- Update lib (babel6+), *not supporting IE8 by default, you can use es5-shim or so to rebuild.*
- *DELETE* property `paramsAddToFile` in options. Just add your params to formData.
- Now supporting multiple upload, add property `multiple`
- Add property `numberLimit`
- Add property `accept`
- Add property `fileFieldName`
- Add special property `disabledIEChoose`
- Add component function `forwardChoose`
- `Uploading` is now supporting IE9-, but just using inteval to create percentage.


### 1.1.3 ###
- Add `PropTypes`

### 1.1.2 ###
- Fix a bug in 1.1.1, which will throw an error in IE

### 1.1.1 ###
- Add property `timeout`
- Optimize logic of `IE form group`

### 1.1.0 ###
- Add component function `filesToUpload`
- Add special property `tag`

### 1.0.1 ###
- init

## License ##
MIT	
