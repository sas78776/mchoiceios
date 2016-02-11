/*global define */
/*global FileReader */
/*jslint nomen: true*/
/*global alert */
define([
    "jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/models/ServiceFormItemModel",
    "modules/views/ServiceFormItemView",
    
    "text!templates/fileUploadTemplate.html",
    "app"
], function ($, jqv, _, Backbone, Handlebars, BaseView, ServiceFormItemModel, ServiceFormItemView, FileUploadTemplate, App) {
    
    'use strict';
    var FileUploadView = BaseView.extend({
        pageId : 'fileupload',
        partialTemplate : FileUploadTemplate,
        fileMandFlag : 'flag0',
        fileNonMandFlag : 'flagNm',
        count : 0,
        i : 0,
        initialize : function () {
            _.bindAll();
            BaseView.prototype.initialize.apply(this, arguments);
            this.listenTo(this, 'addnow', this.addAll);
            this.fetchFileUploadData();
            $("#file-upload").validate({
                focusCleanup: true
            });
        },
        getHeaderTitle : function () {
            return App.lang ? "File Upload" : "फ़ाइल अपलोड";
        },
        getSpecificTemplateValues : function () {
            return {
                'submit' : App.lang ? "Submit" : "जमा करें"
            };
        },
        fetchFileUploadData : function () {
            var envelope,
                serviceFormItemModel,
                response,
                tempModel,
                that = this,
                output,
                jsonResponse;
            this.collection.reset();
            App.anxObject = {};
            envelope = App.envelopeGenerator({
                "lang" : App.retrieveLang(),
                "serviceId" : App.currentServiceId
            }, "getEnclosures");
            output = App.makeAjaxCall1("POST", App.url, envelope);
            output.success(function (data) {
               
                response = App.getJsonObj(data);
                 console.log(response);
                
                jsonResponse = $.parseJSON(response.getEnclosuresReturn);
               // console.log(App.currentServiceId);
                //var str = $('#79').val();
               // localStorage.setItem("str", str);
                
                //var str= localStorage.getItem("testValue");
                var str10=localStorage.getItem("testValue10", str10);
                var str11=localStorage.getItem("testValue11", str11);
                var str12=localStorage.getItem("testValue12", str12);
                var str13=localStorage.getItem("testValue13", str13);
               
                var str21=localStorage.getItem("testValue21", str21);
                var str22=localStorage.getItem("testValue22", str22);
                var str23=localStorage.getItem("testValue23", str23);
                var str20=localStorage.getItem("testValue20", str20);
                var days=localStorage.getItem("days3", days);
                _.each(jsonResponse.ENCLOSURES, function (item, val) {
                    item.POSITION = val;
               
                    var EncId=item.ENC_ID;
                    var enName=item.ENC_NAME;
                
                 //   console.log(EncId);
                    //console.log(enName);
                   //that.collection.reset(); 
  if(str13==="13(3)"  && App.currentServiceId===1 ){
               //  alert('inside case third');   
                   //var enId = EncId;
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                     //console.log(enId);
                          that.collection.add(item);
                }
                    
   else if (str12==="13(2)" && App.currentServiceId===1 &&  EncId!='754'){                                                 
                // alert('inside case second');   
                   //console.log(EncId);
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item);
                }
                  
                       
    else if(str11==="13(1)" && App.currentServiceId===1 && EncId!='754' &&  EncId!='214'){
                // alert('inside case first');   
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item);
                }
                    
                    
   else  if(App.currentServiceId===1 && str10==="12" &&   EncId!='754' &&  EncId!='214'){
                // alert('case 1 is');   
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item); 

                }
    else if(str23==="13(3)"  && App.currentServiceId===2 &&  EncId!='755' && EncId!='2000' && EncId!='2141' ){
                // alert('death case third');   
                   //var enId = EncId;
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                     //console.log(enId);
                          that.collection.add(item); 
                }
     else if (str22==="13(2)" && App.currentServiceId===2 &&  EncId!='754' && EncId!='2028' && EncId!='755'){                                                 
               //  alert('death case second');   
                  // console.log(EncId);
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item);
                }
                   
                    
 else if(str21==="13(1)" && App.currentServiceId===2 &&  EncId!='755' && EncId!='2000' && EncId!='2141' && EncId!='754'  && EncId!='214'){
                 //alert('death case first');   
                   //console.log("inside one");
                    if (item.MANDATORY) {
                        that.count = that.count + 1;     
                    }
                          that.collection.add(item);
                }
                    
         else if (str20==="12" && App.currentServiceId===2 &&  EncId!='754' && EncId!='214' && EncId!='755' && EncId!='2000' && EncId!='2141'){                                                 
                // alert('death case second');   
                 //  console.log(EncId);
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item);
                }
                    
                    
                    
                    else  if(App.currentServiceId===3 && days<30  &&  EncId!='2032'){
                // alert('inside marriage less than month');   
                       // console.log("inside marriage less than month")
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item); 

                }
                    
                    
                    else  if(App.currentServiceId===3 && days>30){
                 //alert('inside marriage greater than month');   
                        //console.log("inside marriage greater than month")
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item); 

                }
                    
                    
                  /*  else  if(App.currentServiceId===3 && days>30  ){
                 //alert('inside marriage less than month');   
                        console.log("inside marriage greater than month")
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item); 

                }*/
                    
                    
                    else  if(App.currentServiceId!=1 && App.currentServiceId!=2 && App.currentServiceId!=3 ){
               // alert('other services');   
                       // console.log("other services")
                   
                    if (item.MANDATORY) {
                        that.count = that.count + 1;
                    }
                          that.collection.add(item); 

                }
                  });
                that.trigger('addnow');
                $.mobile.loading("hide");
				$("body").removeClass('ui-disabled');
            });
            output.error(function (error) {
                App.displayErrorMsg();
            });
           
        },
        events : function () {
            return _.extend({
                'change input' : "onFileChange",
                'click #btn-file-submit' : "onSubmitButtonClick"
            }, this.constructor.__super__.events);
        },
        addAll : function () {
            var that = this;
            this.collection.each(function (fileUploadModel) {
                var view = new ServiceFormItemView({model: fileUploadModel});
                that.$('#file-upload-field-container').append(view.render().$el).trigger('create');
//                if (view.model.get("SPDV_FIELD_REQUIRED") === "required") {
//                    ServiceValidate.addBasicValidation(view.model.get("SPDI_ATTRIBUTE_ID"));
//                }
            });
            
        },
        compress: function(source_img_obj, quality, output_format){
             console.log('compress called!');
             var mime_type = "image/jpeg";
             if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
             }
             var cvs = document.createElement('canvas');
             cvs.width = source_img_obj.naturalWidth;
             cvs.height = source_img_obj.naturalHeight;
             var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
             var newImageData = cvs.toDataURL(mime_type, quality/100);
             var result_image_obj = new Image();
             result_image_obj.src = newImageData;
            
             return result_image_obj;
            },
        onFileChange : function (e) {
            var anx,
                input = e.currentTarget,
                id = e.currentTarget.id,
                FR,
                F,
                actualHeight,
                actualWidth,
                maxHeight,
                maxWidth,
                imgRatio,
                maxRatio,
                compressionQuality,
                cvs,
                ctx,
                newImageData,
                imageData,
                compressedImage,
                that = this,
                quality =  5,
                output_format = "jpg",
                uploadData,
                jic = {
        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} source_img_obj The source Image Object
         * @param {Integer} quality The output quality of Image Object
         * @param {String} output format. Possible values are jpg and png
         * @return {Image} result_image_obj The compressed Image Object
         */
        
             compress: function(source_img_obj, quality, output_format){
             var mime_type = "image/jpeg";
             if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
             }
             

             var cvs = document.createElement('canvas');
             cvs.width = source_img_obj.naturalWidth;
             cvs.height = source_img_obj.naturalHeight;
             var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
             var newImageData = cvs.toDataURL(mime_type, quality/100);
             var result_image_obj = new Image();
             result_image_obj.src = newImageData;
             return result_image_obj;
            },
                };
            
           
            
                
            if (input.files && input.files[0]) {
                FR = new FileReader();
                /*if (input.files[0].size > 2000000) {
                    $("#" + id).val('');
                    alert((function () {
						return App.lang ? "File size greater than 2MB" : "फ़ाइल का आकार २mb से अधिक है";
					}()));
                }*/
                
                if (input.files[0].size > 1000000){
                    //alert("file size  is greater than 256 kb");
                         alert((function () {
	return App.lang ? "You are uploading a file size more than 1MB, we recommend to upload smaller files for faster submission.": "आप 1MB से अधिक आकार की फाइल अपलोड कर रहे हैं, तेजी से जमा करने के लिए छोटे फ़ाइलों को अपलोड करे. ";
				}()));
                         
                         
                }
                    
                    FR.onload = function (e) {
                    var image  = new Image();
                        image.src    = e.target.result;  
                        image.onload = function() {
                        if (input.files[0].size >= 256000) {    
                        compressedImage = jic.compress(image,parseInt(quality),output_format).src;
                        var type = "image/jpeg";
                        uploadData = compressedImage.replace('data:' + type + ';base64,', '');
                        }
                        else{
                        uploadData = e.target.result.split(",")[1];
                        }
                        anx = "&lt;Anx&gt;";
                        anx += "&lt;Anx_Typ&gt;" + $("#manual-select_" + id).val() + "&lt;/Anx_Typ&gt;";
                        anx += "&lt;Encl_ID&gt;" + that.collection.at(id).get("ENC_ID") + "&lt;/Encl_ID&gt;";
                        anx += "&lt;Encl_Doc_ID&gt;" + $("#" + that.collection.at(id).get("ENC_ID")).val() + "&lt;/Encl_Doc_ID&gt;";
                        anx += "&lt;Anx_Cont_Typ&gt;" + input.files[0].type + "&lt;/Anx_Cont_Typ&gt;";
                        anx += "&lt;Anx_Doc_No/&gt;";
                        anx += "&lt;Anx_File&gt;" + uploadData + "&lt;/Anx_File&gt;";
                        anx += "&lt;Anx_flag&gt;" + "N" + "&lt;/Anx_flag&gt;";
                        anx += "&lt;/Anx&gt;";
                        App.anxObject[id] = anx;
                        };
                       };
                    FR.readAsDataURL(input.files[0]);
                    
                     /*if (input.files[0].size > 256000){
                    //alert("file size  is greater than 256 kb");
                         alert((function () {
					return App.lang ? "You are uploading a file size more than 256KB, we recommend to upload smaller files for faster submission." : "आप 256KB से अधिक आकार की फाइल अपलोड कर रहे हैं, तेजी से जमा करने के लिए छोटे फ़ाइलों को अपलोड करे. ";
				}()));
                         
                         
                }*/
                    
                /*} else {
                    $("#" + id).val('');
                    alert((function () {
						return App.lang ? "File size greater than 2MB" : "फ़ाइल का आकार २mb से अधिक है";
					}()));
                }*/
               
            }
        },
        onSubmitButtonClick : function () {
           // alert("inside file");
            var that = this,
                id;
            this.i = 0;
            $('#file-upload *').each(function (i) {
                if (this.tagName === "SELECT") {
                    if ($(this).attr('id').split("_")[0] === "manual-select") {
                        id = $(this).attr('id').split("_")[1];
                        if ($(this).val() === "2") {
                            if (!($("#" + id.toString()).val())) {
                                if (that.collection.at(id).get("MANDATORY")) {
                                    that.i = that.i + 1;
                                    that.fileMandFlag = "flag" + that.i;
                                } else {
                                    that.fileNonMandFlag = "flagNm";
                                }
                            } else {
                            // some code goes here
                            }
                        } else {
                            if (!($("#" + id.toString()).val())) {
                                // some code goes here
                            } else {
                                if (that.collection.at(id).get("MANDATORY")) {
                                    that.i = that.i + 1;
                                    that.fileMandFlag = "flag" + that.i;
                                } else {
                                    that.fileNonMandFlag = "flagNm";
                                }
                            }
                            
                        }
                    }
                }
            });
            
            
            if (this.fileNonMandFlag === "flagNm" && this.fileMandFlag === "flag" + this.count) {
                App.Routers.BackboneRouter.navigate('#confirmation', {trigger : true, replace : true});
            } else {
                alert((function () {
					return App.lang ? "Please upload all mandatory files" : "सभी अनिवार्य फ़ाइलें अपलोड करें";
				}()));
                
            }
            
            
            
            
        }
    });
    _.extend(FileUploadView, Backbone.Events);
    return FileUploadView;
    
});