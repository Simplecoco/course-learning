(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["info"],{"08f7":function(t,e,o){},"0a0d":function(t,e,o){t.exports=o("e829")},"0e57":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"homework-upload"},[o("Form",{ref:"uploadForm",attrs:{model:t.uploadForm.data,rules:t.uploadForm.rule,"label-width":80}},[o("FormItem",{attrs:{label:"文件",prop:"file"}},[o("Upload",{attrs:{multiple:"",type:"drag",action:"//localhost:3000/uploadFile","on-success":t.fileSuccess,"on-error":t.fileSuccess,"on-remove":t.removeFile,"default-file-list":t.uploadForm.fileList}},[o("div",{staticStyle:{padding:"20px 0"}},[o("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),o("p",[t._v("点击或拖动上传文件")]),t._t("upload-desc")],2)])],1),o("FormItem",{attrs:{label:"标题",prop:"name"}},[o("Input",{attrs:{placeholder:"Enter your name"},model:{value:t.uploadForm.data.name,callback:function(e){t.$set(t.uploadForm.data,"name",e)},expression:"uploadForm.data.name"}})],1),o("FormItem",{attrs:{label:"描述 or 备注",prop:"desc"}},[o("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"Enter something..."},model:{value:t.uploadForm.data.desc,callback:function(e){t.$set(t.uploadForm.data,"desc",e)},expression:"uploadForm.data.desc"}})],1),t.isSubmitBtn?o("FormItem",[o("Button",{attrs:{type:"success",long:""},nativeOn:{click:function(e){t.asyncOK("uploadForm")}}},[t._v("提交")])],1):t._e()],1)],1)},n=[],i=o("0a0d"),s=o.n(i),l=(o("7f7f"),{props:{isSubmitBtn:{type:Boolean,default:!0},notice:{type:String,default:"作业提交成功"},submitUrl:{type:String,required:!0}},data:function(){return{uploadForm:{data:{file:"",fileType:"",name:"",desc:""},rule:{name:[{required:!0,message:"文件名不能为空",trigger:"blur"}],desc:[{required:!1,message:"请输入描述 or 备注",trigger:"blur"},{type:"string",min:6,message:"Introduce no less than 6 words",trigger:"blur"}]},fileList:[]}}},methods:{asyncOK:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uploadForm";this.$refs[e].validate(function(e){if(e){console.log(t.uploadForm.fileList);var o=t.uploadForm.fileList.map(function(t){return{name:t.name,fileType:t.fileType,url:t.url}});t.$http({method:"post",url:t.submitUrl,data:{uri:s()(),name:t.uploadForm.data.name,content:t.uploadForm.data.desc,desc:t.uploadForm.data.desc,files:o}}).then(function(e){console.log(e),t.$Notice.success({title:t.notice,desc:"可以休息一会儿啦~"}),t.$emit("success",t.uploadForm.data),t.uploadForm.data={file:"",fileType:"",name:"",desc:""}})}else t.$Message.error("Fail!")})},removeFile:function(t,e){this.uploadForm.fileList.splice(this.uploadForm.fileList.indexOf(t),1)},fileSuccess:function(t,e,o){console.log(t,e,o),this.uploadForm.data.file=t.name,this.uploadForm.data.fileType=t.mimetype,this.uploadForm.fileList.push({name:t.name,url:t.path,fileType:t.mimetype,uid:e.uid})}}}),r=l,c=(o("b6bf"),o("2877")),u=Object(c["a"])(r,a,n,!1,null,"5b6adf84",null);u.options.__file="HomeworkUpload.vue";e["a"]=u.exports},"179c":function(t,e,o){"use strict";var a=o("1e9c"),n=o.n(a);n.a},"1e9c":function(t,e,o){},"2f37":function(t,e,o){var a=o("63b6");a(a.S,"Date",{now:function(){return(new Date).getTime()}})},"7f7f":function(t,e,o){var a=o("86cc").f,n=Function.prototype,i=/^\s*function ([^ (]*)/,s="name";s in n||o("9e1e")&&a(n,s,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},b6bf:function(t,e,o){"use strict";var a=o("08f7"),n=o.n(a);n.a},ce1c:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"admin-info content-container"},[o("Card",{attrs:{"dis-hover":""}},[o("p",{staticClass:"container-card-title",attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-megaphone",size:"20"}}),t._v(" 信息发布")],1),o("div",{staticClass:"upload-button-container"},[o("Button",{style:{marginRight:"20px"},attrs:{size:"large",icon:"md-cloud-upload",type:"primary"},on:{click:function(e){t.uploadModal=!0}}},[t._v("\n        发布公告\n      ")])],1),o("div",{staticClass:"admin-info-table"},[o("Table",{attrs:{columns:t.columns12,data:t.data6,stripe:""},scopedSlots:t._u([{key:"name",fn:function(e){var a=e.row;return[o("strong",[t._v(t._s(a.name))])]}},{key:"action",fn:function(e){e.row;var a=e.index;return[o("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){t.show(a)}}},[t._v("查看")]),o("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){t.remove(a)}}},[t._v("删除")])]}}])})],1)]),o("Modal",{attrs:{value:t.uploadModal,title:"发布公告",closable:!1,"mask-closable":!1}},[o("upload-form",{ref:"upload-form",attrs:{isSubmitBtn:!1,notice:"信息提交成功",submitUrl:"/admin/createNotice"},on:{success:t.success}},[o("p",{attrs:{slot:"upload-desc"},slot:"upload-desc"},[t._v("只支持图片文件(jpg, jpeg, png)")])]),o("template",{slot:"footer"},[o("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"default"},on:{click:t.cancelModal}},[t._v("取消")]),o("Button",{attrs:{type:"primary"},on:{click:function(e){t.asyncOK("uploadForm")}}},[t._v("确定")])],1)],2)],1)},n=[],i=(o("7f7f"),o("0e57")),s={data:function(){return{uploadModal:!1,uploadLoading:!0,columns12:[{title:"标题",slot:"name"},{title:"内容",key:"desc"},{title:"Action",slot:"action",width:150,align:"center"}],data6:[]}},components:{UploadForm:i["a"]},mounted:function(){this.getNotices()},methods:{getNotices:function(){var t=this;this.$http.get("/all/notice/list").then(function(e){console.log(e),0===e.code&&(t.data6=e.data.map(function(t){var e=t.name,o=t.date,a=t.uri,n=t.files,i=t.content;return{name:e,date:o,uri:a,files:n,desc:i}}))})},show:function(t){this.$Modal.info({title:"User Info",content:"Name：".concat(this.data6[t].name,"<br>Description：").concat(this.data6[t].desc,'<br><img class="modal-img" src=').concat(this.data6[t].files[0].url,">")})},remove:function(t){this.data6.splice(t,1)},cancelModal:function(){this.uploadModal=!1},asyncOK:function(){this.$refs["upload-form"].asyncOK()},success:function(t){this.uploadModal=!1,this.getNotices()}}},l=s,r=(o("179c"),o("2877")),c=Object(r["a"])(l,a,n,!1,null,null,null);c.options.__file="Info.vue";e["default"]=c.exports},e829:function(t,e,o){o("2f37"),t.exports=o("584a").Date.now}}]);
//# sourceMappingURL=info.26e4c2c3.js.map