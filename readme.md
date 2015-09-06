# React-FileUpload #

![npm version](https://badge.fury.io/js/react-fileupload.svg)

##目录

*	[简介](#introduce)
*   [Download](#download)
*	[API](#api)
*	[License](#license)

## Introduce ##
1. react文件上传组件，现代浏览器采用File API+Form data异步上传，兼容IE8+使用form+iframe异步上传。
2. 使用到ES6，需要经babel转译。
3. IE通过把透明的上传按钮覆盖在传入的children的上传按钮上进行点击的捕捉。同时隐藏iframe。现代浏览器通过传入的按钮上再增加一层wrapper来捕捉。
4. 现代浏览器支持progress，从而显示上传进度
5. 丰富的生命周期函数
6. **暂时不支持多文件同时上传**

简单使用方式：
```
var FileUpload = require('react-fileupload');
...
render(){
	/*指定参数*/
	var options={
		basUrl:'http://127.0.0.1',
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
		</FIleUpload>
	)	        
}
```

## Download ##
`npm install react-fileupload`

## API ##

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
dataType | string | ``'json'`` | 回应的格式
chooseAndUpload | boolean | ``'false'`` | 是否在用户选择了文件之后立刻上传,如果为true则只需在children传入ref="chooseAndUpload"的DOM就可触发。默认false
paramAddToFile | array[string] | ``'[]'`` | 需要添加到file对象（file API）上作为属性的param的名字数组。默认空
wrapperDisplay | string | ``'inline-block'`` | 包裹chooseBtn或uploadBtn的div的display默认'inline-block'



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

#### doUpload(files,mill) ####
上传动作(xhr send | form submit)执行后(请求发送后)调用

@param file {array[File] | string} 现代浏览器返回包含File对象的数组(File API返回的方式)，IE返回文件名

@param mill {long} 上传动作执行时的时间(毫秒)，如果File对象已有mill属性则返回一样的

@return

#### uploading(progress) ####
在文件上传中的时候，现代浏览器会不断触发此函数

@param progress {Progress} progress对象，里面存有例如上传进度loaded和文件大小total等属性

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

#### filesToUpload ####
{array[File]}

如有要立即上传的文件(File对象)，放入这个数组，然后在beforeUpload或者doUpload外部清除传入file，不支持IE。传入的文件会在componentWillReceiveProps检测到并立刻上传。

#### _withoutFileUpload ####
{boolean}

不带文件上传(不构造FormData对象)，为了给秒传功能使用，不影响IE

### 示例 ###
```
options:{
    baseUrl : './upload',
    param : {
        name:'123',
        category: '1'
    },
    chooseAndUpload : false,
    paramAddToFile : ['category'],
    dataType : 'json',
    wrapperDisplay : 'inline-block',
    beforeChoose : function()[
        return user.isAllowUpload;
    },
    chooseFile : function(files){
        console.log('you choose',typeof files == 'string' ? files : files[0].name);
    },
    beforeUpload : function(files,mill){
        if(typeof files == string) return false;
        if(files[0].size<1024*1024*20){
            files[0].mill = mill;
            return true;
        }
        return false;
    },
    doUpload : function(files,mill){
        var isFile = !(typeof files == 'string');
        var name = isFile? files[0].name : files;
        var tmpFile = {
            name:name,
            mill: isFile? files[0].mill : mill
        }
        /*存入暂存空间*/
        tempSave.push(tmpFile);
        console.log('uploading',name);
    },
    uploading : function(progress){
        console.log('loading...',progress.loaded/progress.total+'%');
    },
    uploadSuccess : function(resp){
        /*通过mill找到对应的文件，删除对应tmpFile*/
        popTmpSave(resp.mill);
        console.log('upload success',resp.data);
    },
    uploadError : function(err){
        alert(err.message);
    },
    uploadFail : function(resp){
        alert(resp);
    },
}
```


## children ##

可以传入两个btn
```
<FileUpload options={options}>
	<button ref="chooseBtn">choose</button>
	<button ref="uploadBtn">upload<button>
</FIleUpload>
```

如果选择chooseAndUpload为true，则需要传入一个，且ref为chooseAndUpload
```
<FileUpload options={options}>
    <button ref="chooseAndUpload">chooseAndUpload</button>
</FIleUpload>
```

当然并不一定是btn
```
<FileUpload options={options}>
    <div ref="chooseBtn">
        <i className="icon icon-upload" />
        <span>do it</span>
    </div>
    <button ref="uploadBtn">upload<button>
</FIleUpload>
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
</FIleUpload>
```
## License ##
MIT	