/*global define,alert */
/*jslint nomen: true*/
define(["jquery",
    "jquery.validate",
    "lodash",
    "backbone",
    "handlebars",
    "modules/views/abstract/BaseView",
    "modules/views/InnerView",
    "modules/views/SelectMenuView",
    "modules/models/DistrictModel",
    "modules/models/OfficeTypeModel",
    "modules/models/OfficeTypeLabelModel",
    "modules/models/UserDataPageModel",
    "modules/collections/OfficeTypeCollection",
    "modules/collections/OfficeTypeLabelCollection",
    "text!templates/userDataTemplate.html",
    "app"], function ($, jqv, _, Backbone, Handlebars, BaseView, InnerView, SelectMenuView, DistrictModel, OfficeTypeModel, OfficeTypeLabelModel, UserDataPageModel, OfficeTypeCollection, OfficeTypeLabelCollection, UserDataTemplate, App) {


    'use strict';
    var UserDataView = BaseView.extend({
        pageId: 'userdata',
        partialTemplate: UserDataTemplate,
       // distCollection: App.lang ? App.distCollectionEn : App.distCollectionHi,
        offTypeCollection: OfficeTypeCollection,
        offTypeLabelCollection: OfficeTypeLabelCollection,
        model: new UserDataPageModel(),
        initialize: function () {
            this.inner = new InnerView();
            this.selectmenu = new SelectMenuView();
            BaseView.prototype.initialize.apply(this, arguments);
            this.setDate();
            $("#userdataform").validate({
                focusCleanup: true,
                rules: {
                    Phone_No: {
                        minlength: 10,
                        maxlength: 10,
                        mobile : true
                    },
                    Init_By_UNm : {
                        alpha : true
                    },

                    BENI_NAME : {
                        alpha : true
                    },
                    Aadhar_No : {
                        minlength : 12,
                        maxlength : 12,
                        adhaar : true
                    },
                    applicantAddress : {
                        specialcharacters : true
                    }
                },
                messages: {
                    Init_By_UNm: {
                        required: this.model.error1(App.lang),
                        alpha: this.model.error6(App.lang)
                    },
                    BENI_NAME: {
                        required: this.model.error1(App.lang),
                        alpha: this.model.error6(App.lang)
                    },
                    ADDRS: {
                        required: this.model.error1(App.lang)
                    },
                    Email_Id: {
                        required: this.model.error1(App.lang),
                        email: this.model.error2(App.lang)
                    },
                    Phone_No: {
                        mobile : this.model.error7(App.lang),
                        required : this.model.error1(App.lang),
                        number : this.model.error3(App.lang),
                        minlength : this.model.error4(App.lang),
                        maxlength : this.model.error4(App.lang)
                    },

                    Aadhar_No : {
                        minlength : this.model.error5(App.lang),
                        maxlength : this.model.error5(App.lang),
                        adhaar : this.model.error5(App.lang)
                    },
					applicantAddress : {
						specialcharacters: App.lang ? "Only special characters ‘/’, ‘-‘ and ’,’ are Allowed." : "केवल विशेष वर्ण '/' , '-' और ',' अनुमति दी जाती है ।"
				    }
                }
            });
            //            this.distCollection.on('all', this.addAll(), this);
        },
        events: function () {
            return _.extend({
                'click #btn-submit-user-data': 'submit',
                'change select': 'onSelectMenuSelected',
                'change input[type="checkbox"]': 'onChecked'
            }, this.constructor.__super__.events);
        },
        //        render : function () {
        //        },
        addAll: function () {
            BaseView.prototype.render.apply(this, arguments);
        },
        getHeaderTitle: function () {
            return this.model.headerTitle(App.lang);
        },
        onChecked: function (e) {
            var nm;
            if (e.target.checked) {
                nm = $("#ud-name").val();
                $("#ud-beneficary-name").val(nm);
				$("#ud-name").prop( "disabled", true );
				$("#ud-beneficary-name").prop( "disabled", true );
            } else {
                $("#ud-beneficary-name").val(null);
				$("#ud-name").prop( "disabled", false );
				$("#ud-beneficary-name").prop( "disabled", false );
            }

        },
        setDate: function () {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear(),
				hour = today.getHours(),
				getHours = hour >= 12 ? (hour -12) : hour, 
				time = hour +':'+today.getMinutes()+':'+today.getSeconds()+'.'+today.getMilliseconds();
			if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = dd + '-' + mm + '-' + yyyy;
            $("#ud-application-date").val(today+' '+time);
            $("#ud-mobile-number").val(App.user.mobileNo);
            $("#ud-name").val(App.user.fName + " " + App.user.lName);
            $("#ud-email").val(App.user.emailId);
        },
        getSpecificTemplateValues: function () {
            var distCollection = App.distCollection;
            return {
                'distCollection': distCollection.toJSON(),
                'pageTitle': this.model.pageTitle(App.lang),
                'label1': this.model.label1(App.lang),
                'label2': this.model.label2(App.lang),
                'label3': this.model.label3(App.lang),
                'label4': this.model.label4(App.lang),
                'label5': this.model.label5(App.lang),
                'label6': this.model.label6(App.lang),
                'label7': this.model.label7(App.lang),
                'label8': this.model.label8(App.lang),
                'label9': this.model.label9(App.lang),
                'submit': this.model.submit(App.lang),
                'selectLabel': this.model.selectLabel(App.lang),
                'placeOfEvent' : this.model.placeOfEvent(App.lang)
            };
        },
        submit: function () {
            var str = $("#ud-application-date").val(),
                parts,
                dd,
                mm,
                yearAndTime,
                yy,
                year,
                time,
                meta,
                date;
            parts = str.split("-");
            dd = parts[0];
            mm = parts[1];
            yearAndTime = parts[2];
            year = yearAndTime.split(" ");
            yy = year[0];
            time = year[1];
            date = yy + '-' + mm + '-' + dd;
            App.applicationDate = date;
            if (App.lastSelctFlag) {
                if ($("#userdataform").valid()) {
                    meta = App.userDataXmlGenerator((function () {
                        return {
                            "Serv_Id": App.currentServiceId,
                            "Appl_Dt": App.applicationDate + " "+time,
                            "Email_Id": $("#ud-email").val(),
                            "Phone_No": $("#ud-mobile-number").val(),
                            "Aadhar_No": $("#ud-aadhar").val(),
                            "Dist_Id": App.currentDistId,
                            "ADDRS": $("#ud-applicant-address").val(),
                            "BENI_NAME": $("#ud-beneficary-name").val(),
                            "Init_By_UNm": App.user.mobileNo,
                            "Appl_Nm": $("#ud-name").val(),
                            "Proc_Ofc_Id": App.officetypeId,
                            "Cor_Id": "",
                            "Init_By": "5"

                        };
                    }()), App.selectObject);
                    App.Routers.BackboneRouter.navigate('#serviceform', {
                        trigger: true,
                        replace: false
                    });
                    App.lastSelctFlag = false;
                }
                //                window.location.replace("#serviceform");
            } else {
                //please enter all the mandatory fields
                alert((function () {
                    return App.lang ? "Please enter all the mandatory fields" : "सभी अनिवार्य क्षेत्रों दर्ज करें";
                }()));
            }
            return false;
            //BackboneRouter.navigate('main',{trigger:false, replace: false});
        },
        onSelectMenuSelected: function (e) {
            var envelope,
                item,
                offTypeModel,
                offTypeLabelModel,
                selectModel,
                json,
                output,
                obj,
                temp,
                value = e.currentTarget.value,
                position,
                that = this;
            switch (e.currentTarget.id) {
            case 'districts':
                App.tempDistrict = $("#" + e.currentTarget.id).find('option:selected').text();
                App.currentDistId = e.currentTarget.value;
                envelope = App.envelopeGenerator((function () {
                    return {
                        "lang": App.retrieveLang(),
                        "serviceId": App.currentServiceId
                    };
                }()), "getOfficeTypeList");

                /*	envelope = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"                               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">                                       <soap:Body><getOfficeTypeList xmlns="http://server.cmc.com"><lang>' + App.retrieveLang() + '</lang>         <serviceId>1</serviceId></getOfficeTypeList></soap:Body></soap:Envelope>';*/
                output = App.makeAjaxCall1('POST', App.url, envelope);
                output.success(function (data) {
                    json = App.getJsonObj(data);
                    if (!json) {
                        alert((function () {
							return App.lang ? "Server is down!" : "सर्वर डाउन है";
						}()));
                        return this;
                    } else {
                        obj = $.parseJSON(json.getOfficeTypeListReturn);
                    }
                    that.offTypeCollection.reset();
                    for (item in obj) {
                        if (obj.hasOwnProperty(item)) {
                            offTypeModel = new OfficeTypeModel({
                                officeTypeId: item,
                                officeTypeName: obj[item]
                            });
                            that.offTypeCollection.add(offTypeModel);
                        }
                    }
                    that.$('#selectfields').append(that.inner.$el);
                    that.inner.render({
                        offTypeCollection: that.offTypeCollection.toJSON()
                    });
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                });
                //json = App.makeAjaxCall('POST', App.url, envelope);
                output.error(function () {
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                    alert((function () {
                        return App.lang ? "error in communication" : "संचार में त्रुटि";
                    }()));
                });
                break;
            case 'officetype':
                App.tempOfficeType = $("#" + e.currentTarget.id).find('option:selected').text();
                envelope = App.envelopeGenerator((function () {
                    return {
                        "lang": App.retrieveLang(),
                        "officeType": value
                    };
                }()), "getOfficeTypeLables");
                // console.log(envelope);
                /*envelope = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"                              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>                            <getOfficeTypeLables xmlns="http://server.cmc.com"><lang>' + App.retrieveLang() + '</lang><officeType>' + value + '</officeType>                                  </getOfficeTypeLables></soap:Body></soap:Envelope>';*/
                output = App.makeAjaxCall1('POST', App.url, envelope);
                output.success(function (data) {
                    json = App.getJsonObj(data);
                    that.offTypeLabelCollection.reset();
                    
                    if (!json) {
                        alert((function () {
							return App.lang ? "Server is down!" : "सर्वर डाउन है";
						}()));
                        return this;
                    } else {
                        obj = $.parseJSON(json.getOfficeTypeLablesReturn);
                    }
                    if (!App.isEmpty(obj)) {
                        for (item in obj) {
                            if (obj.hasOwnProperty(item)) {
                                offTypeLabelModel = new OfficeTypeLabelModel({
                                    labelName: item,
                                    labelId: parseInt(obj[item], 10)
                                });

                                that.offTypeLabelCollection.add(offTypeLabelModel);
                            }
                        }
                        that.offTypeLabelCollection.sort();
                        envelope = App.envelopeGenerator((function () {
                            return {
                                "lang": App.retrieveLang(),
                                "parentId": App.currentDistId,
                                "locTypeId": value
                            };
                        }()), "getSubList");
                /*		envelope = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"                              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body>                            <getSubList xmlns="http://server.cmc.com"><lang>' + App.retrieveLang() + '</lang><parentId>2</parentId><locTypeId>' + value + '</locTypeId></getSubList></soap:Body></soap:Envelope>';*/
                        output = App.makeAjaxCall1('POST', App.url, envelope);
                        output.success(function (data) {
                            json = App.getJsonObj(data);
                            if (!json) {
                                alert((function () {
				                    return App.lang ? "Server is down!" : "सर्वर डाउन है";
						        }()));
                                return this;
                            } else {
                                obj = $.parseJSON(json.getSubListReturn);
                            }
                            console.log(obj);
                            if (!App.isEmpty(obj)) {
                                that.$('#' + that.offTypeLabelCollection.at(0).get("labelId")).remove();
                                that.$('#selofficetype').append(that.selectmenu.$el);
                                that.selectmenu.render({
                                    label: that.offTypeLabelCollection.at(0).get("labelName"),
                                    myid: that.offTypeLabelCollection.at(0).get("labelId"),
                                    obj: obj,
                                    value: value
                                });
                            } else {
                                alert((function () {
							        return App.lang ? "Current selection has no further values, please change your selection" : "मौजूदा चयन आगे नहीं मान है ,कृपया अपने चयन को बदल दें";
						        }()));
                                that.$('#deleteselect').remove();
                            }
                            $.mobile.loading("hide");
					        $("body").removeClass('ui-disabled');
                        });
                    } else {
                                alert((function () {
							        return App.lang ? "Current selection has no further values, please change your selection" : "मौजूदा चयन आगे नहीं मान है ,कृपया अपने चयन को बदल दें";
						        }()));
                                that.$('#deleteselect').remove();
                            }
                    
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                     
                });
                output.error(function () {
                    $.mobile.loading("hide");
					$("body").removeClass('ui-disabled');
                    alert((function () {
                        return App.lang ? "error in communication" : "संचार में त्रुटि";
                    }()));
                });
              
                break;
            default:
                that = this;
                _.each(this.offTypeLabelCollection.models, function (item, i) {
                    if (parseInt(e.currentTarget.id, 10) === parseInt(item.get("labelId"), 10)) {
                        position = i;
                        if (position === 0) {
                            App.officetypeId = value;
                            App.selectObject.District = App.tempDistrict;
                            App.selectObject[App.tempOfficeType] = $("#" + e.currentTarget.id).find('option:selected').html();
                        } else {
                            App.selectObject[that.offTypeLabelCollection.at(position).get("labelName")] = $("#" + e.currentTarget.id).find('option:selected').html();
                        }
                        if (position < that.offTypeLabelCollection.length - 1) {
                            var cId = that.offTypeLabelCollection.at(i + 1).get("labelId");
                            envelope = App.envelopeGenerator((function () {
                                return {
                                    "lang": App.retrieveLang(),
                                    "parentId": value,
                                    "locTypeId": cId
                                };
                            }()), "getSubList");
                            /*envelope = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><getSubList xmlns="http://server.cmc.com"><lang>' + App.retrieveLang() + '</lang><parentId>' + value + '</parentId><locTypeId>' + cId + '</locTypeId></getSubList></soap:Body></soap:Envelope>';*/
                        }
                    }
                });
                if (position < this.offTypeLabelCollection.length - 1) {
                    output = App.makeAjaxCall1('POST', App.url, envelope);
                    output.success(function (data) {
                        json = App.getJsonObj(data);
                        if (!json) {
                            alert((function () {
								return App.lang ? "Server is down!" : "सर्वर डाउन है";
							}()));
                            return this;
                        } else {
                            obj = $.parseJSON(json.getSubListReturn);
                        }
                        if (!App.isEmpty(obj)) {
                            that.select = new SelectMenuView();
                            that.$('#' + that.offTypeLabelCollection.at(position + 1).get("labelId")).remove();
                            that.$('#' + e.currentTarget.id).append(that.select.$el);
                            that.select.render({
                                label: that.offTypeLabelCollection.at(position + 1).get("labelName"),
                                myid: that.offTypeLabelCollection.at(position + 1).get("labelId"),
                                obj: obj,
                                value: value
                            });

                        }
                        $.mobile.loading("hide");
						$("body").removeClass('ui-disabled');
                    });
                    output.error(function () {
                        alert((function () {
                            return App.lang ? "error in communication" : "संचार में त्रुटि";
                        }()));
                    });
                    //json = App.makeAjaxCall('POST', App.url, envelope);
                    
                } else {
                    App.lastSelctFlag = true;
                    $("#btn-submit-user-data").attr('type', 'visible');
                }
                break;
            }
        }
    });
    return UserDataView;
});