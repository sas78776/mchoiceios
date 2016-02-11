/*global define*/
/*global alert*/
/*jslint nomen: true*/
define([
    'jquery',
    'lodash',
    'backbone',
    'modules/collections/DistrictCollection',
    'modules/collections/DistrictCollectionHi'
], function ($, _, Backbone, DistrictCollection, DistrictCollectionHi) {
    'use strict';
    var App = {
        fieldSetItemTitle: {},
        versionName: "1.7.1",
        versionCode: 10701,
        user: {},
     
      url: "http://dashboard.cgstate.gov.in/WebServerWS/services/WebServer", //production
        
       // url: "http://164.100.131.185/WebServerWS/services/WebServer",
        
       //url: "https://edistrict.cgstate.gov.in/WebServerWS/services/WebServer", //testing
        // url : "http://172.16.3.242:8080/WebServerWS_STAGING/services/WebServer", //testing
        currentServiceId: 0,
        currentServiceName: '',
        currentDistId: 0,
        distCollection: DistrictCollection,
        distCollectionHi: DistrictCollectionHi,
        showLanguage: true,
        urlChangeCount: 0,
        showLogin: true,
        loginExist: false,
        showMain: true,
        showSignup: true,
        Models: {},
        Collections: {},
        prevSelctObject: "",
        prevSecSelctObject: "",
        Views: {},
        Routers: {},
        applicationDate: "",
        formItems: null,
        fieldSetObj: null,
        lastSelctFlag: false,
        lang: (function () {
            return (localStorage.getItem("userLang") === "true") ? true : false;
        }()),
        selectObject: {},
        tempOfficeType: "",
        tempDistrict: "",
        officetypeId: 0,
        xml: "",
        xml1: "",
        xml2: "",
        xml3: "",
        xml4: "",
        anxObject: {},
        randomId: 0,
        updateRandomeId: function () {
            this.randomId += 1;
        },
        updateLang: function (lang) {
            this.lang = lang;
            localStorage.setItem("userLang", App.lang);
            this.trigger('languageChanged');
        },
        retrieveLang: function () {
            return this.lang ? "en" : "hi";
        },
        isEmpty: function (obj) {
            var key;
            if (typeof obj === "undefined") {
                return true;
            }
            if (obj === null) {
                return true;
            }
            if (obj.length > 0) {
                return false;
            }
            if (obj.length === 0) {
                return true;
            }
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        },
        envelopeGenerator: function (obj, func) {
            var item,
                envelope = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><';
            envelope += func;
            envelope += ' xmlns="http://server.cmc.com">';
            for (item in obj) {
                if (obj.hasOwnProperty(item)) {
                    envelope += '<';
                    envelope += item;
                    envelope += '>';
                    envelope += obj[item];
                    envelope += '</';
                    envelope += item;
                    envelope += '>';
                }
            }

            envelope += '</';
            envelope += func;
            envelope += '>';
            envelope += '</soap:Body>';
            envelope += '</soap:Envelope>';
            return envelope;

        },
        xmlToJson: function (xml) {
            // Create the return object
            var obj = {},
                j,
                i,
                item,
                nodeName,
                old,
                attribute;
            if (xml.nodeType === 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (j = 0; j < xml.attributes.length; j += 1) {
                        attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.Value;
                    }
                }
            } else if (xml.nodeType === 3) { // text
                obj = xml.nodeValue;
            }

            // do children
            if (xml.hasChildNodes()) {
                for (i = 0; i < xml.childNodes.length; i += 1) {
                    item = xml.childNodes.item(i);
                    nodeName = item.nodeName.substring(item.nodeName.indexOf(":") + 1).replace('#', '');
                    if (typeof (obj[nodeName]) === "undefined") {
                        obj[nodeName] = this.xmlToJson(item);
                    } else {
                        if (typeof (obj[nodeName].push) === "undefined") {
                            old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(this.xmlToJson(item));
                    }
                }
            }
            return obj;
        },
        getJsonObj: function (data) {
            var json = this.xmlToJson(data).Envelope.Body,
                response = {},
                outterKey,
                innerKey,
                temp;
            for (outterKey in json) {
                if (json.hasOwnProperty(outterKey)) {
                    temp = json[outterKey];
                    for (innerKey in temp) {
                        if (temp.hasOwnProperty(innerKey)) {
                            response[innerKey] = temp[innerKey].text;
                        }
                    }
                }
            }

            return response;

        },
        makeAjaxCall: function (methodtype, url, envelope) {
            var response;
            $.ajax({
                type: methodtype,
                contentType: false,
                processData: false,
                dataType: "xml",
                data: envelope,
                async: false,
                beforeSend: function (request) {
                    request.setRequestHeader("SOAPAction", "");
                },
                url: url,
                success: function (data) {
                    //response = data;
                    $.mobile.loading("hide");
                    response = App.getJsonObj(data);
                    //return data;
                },
                error: function (data) {
                    alert(data.statusText);
                    $.mobile.loading("hide");
                    response = false;
                }
            });

            return response;

        },
        makeAjaxCall1: function (methodtype, url, envelope) {
            var response;
            $("body").addClass('ui-disabled');
            $.mobile.loading('show', {
                text: 'communicating with server...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            return $.ajax({
                type: methodtype,
                contentType: false,
                processData: false,
                dataType: "xml",
                data: envelope,
                beforeSend: function (request) {
                    request.setRequestHeader("SOAPAction", "");
                },
                url: url,
                setTimeout: 90000
            });
        },
        userDataXmlGenerator: function (obj1, obj2) {
            var item1,
                item2,
                meta = '&lt;Meta&gt;&lt;Mobile_App&gt;Yes&lt;/Mobile_App&gt;';
            this.xml1 = "";
            for (item1 in obj1) {
                if (obj1.hasOwnProperty(item1)) {
                    meta += '&lt;';
                    meta += item1;
                    meta += '&gt;';
                    meta += obj1[item1];
                    meta += '&lt;/';
                    meta += item1;
                    meta += '&gt;';
                }
            }
            meta += '&lt;App_Ref_No/&gt;';
            meta += '&lt;Locs&gt;';
            for (item2 in obj2) {
                if (obj2.hasOwnProperty(item2)) {
                    meta += '&lt;Loc&gt;';
                    meta += '&lt;Nm&gt;';
                    meta += item2;
                    meta += '&lt;/Nm&gt;';
                    meta += '&lt;Val&gt;';
                    meta += obj2[item2];
                    meta += '&lt;/Val&gt;';
                    meta += '&lt;/Loc&gt;';
                }
            }
            meta += '&lt;/Locs&gt;';
            meta += '&lt;/Meta&gt;';
            this.xml1 = meta;
            return meta;
        },
        formDataXmlGenerator: function (obj) {
            var item,
                form = '&lt;Form&gt;';
            this.xml2 = "";
            for (item in obj) {
                if (obj.hasOwnProperty(item)) {
                    //console.log (obj[item].name.split("~")[0]);
                    form += '&lt;Col&gt;';
                    form += '&lt;A_Id&gt;';
                    form += obj[item].name.split("~")[1];
                    form += '&lt;/A_Id&gt;';
                    form += '&lt;A_Nm&gt;';
                    form += obj[item].name.split("~")[0];
                    form += '&lt;/A_Nm&gt;';
                    form += '&lt;A_Val&gt;';
                    form += obj[item].value;
                    form += '&lt;/A_Val&gt;';
                    form += '&lt;/Col&gt;';
                }
            }
            form += '&lt;/Form&gt;';
            this.xml2 += form;
            return form;
        },
        formDataXmlGenerator1: function (obj) {
            var item,
                form = '&lt;Form&gt;';
            this.xml2 = "";
            for (item in obj) {
                if (obj.hasOwnProperty(item)) {
                    //console.log (obj[item].name.split("~")[0]);
                    form += '&lt;Col&gt;';
                    form += '&lt;A_Id&gt;';
                    form += obj[item].name.split("~")[1];
                    form += '&lt;/A_Id&gt;';
                    form += '&lt;A_Nm&gt;';
                    form += obj[item].name.split("~")[0];
                    form += '&lt;/A_Nm&gt;';
                    form += '&lt;A_Val&gt;';
                    form += obj[item].value;
                    form += '&lt;/A_Val&gt;';
                    form += '&lt;/Col&gt;';
                }
            }
            //form += '&lt;/Form&gt;';
            this.xml2 += form;
            return form;
        },
        fieldSetXmlGenerator: function (obj) {
            var form = "",
                item,
                i,
                temp,
                temp1,
                temp2,
                j;
            for (item in obj) {
                if (obj.hasOwnProperty(item)) {
                    form += '&lt;Col&gt;';
                    form += '&lt;A_Id&gt;';
                    form += obj[item].fieldSetId;
                    form += '&lt;/A_Id&gt;';
                    form += '&lt;A_Nm&gt;';
                    form += obj[item].fieldSetHeading;
                    form += '&lt;/A_Nm&gt;';
                    form += '&lt;A_Val attribute=""&gt;';
                    form += '&lt;Heading&gt;';
                    temp = (obj[item].heading).split("_");
                    for (i = 1; i < temp.length; i += 1) {
                        form += '&lt;Head&gt;';
                        form += '&lt;Nm&gt;';
                        form += temp[i];
                        form += '&lt;/Nm&gt;';
                        form += '&lt;/Head&gt;';
                    }
                    form += '&lt;/Heading&gt;';
                    temp1 = (obj[item].values).split("#");
                    for (i = 1; i < temp1.length; i += 1) {
                        temp2 = temp1[i].split("_");
                        form += '&lt;FieldSet&gt;';
                        for (j = 1; j < temp2.length; j += 1) {
                            form += '&lt;Val&gt;';
                            form += '&lt;Nm&gt;';
                            form += temp2[j];
                            form += '&lt;/Nm&gt;';
                            form += '&lt;/Val&gt;';
                        }
                        form += '&lt;/FieldSet&gt;';
                    }
                    form += '&lt;/A_Val&gt;';
                    form += '&lt;/Col&gt;';
                }
            }
            form += '&lt;/Form&gt;';
            this.xml2 += form;
        },
        submissionXmlGenerator: function (obj) {
            var item,
                subxml = '&lt;Anx_Data&gt;';
            this.xml3 = "";
            for (item in obj) {
                if (obj.hasOwnProperty(item)) {
                    subxml += obj[item];
                }
            }
            subxml += '&lt;/Anx_Data&gt;';
            this.xml3 += subxml;
            //this.xml = '&lt;Appl_Data&gt;' + this.xml1 + this.xml2 + this.xml3 + '&lt;/Appl_Data&gt;'
            return '&lt;Appl_Data&gt;' + this.xml1 + this.xml2 + this.xml3 + '&lt;/Appl_Data&gt;';
        },

        checkValue: function (id, yesORno, fieldnm) {
            var textBoxId = id + "_txt";

            if (yesORno === "Y" || yesORno === "N") {
                if (fieldnm === "text" || fieldnm === "textarea" || fieldnm === "date" || fieldnm === "number" || fieldnm === "Data List") {
                    if (document.getElementById(id).value !== "") {
                        document.getElementById(textBoxId).value = document.getElementById(id).value;
                    } else {
                        document.getElementById(textBoxId).value = "";
                    }
                } else {
                    if (document.getElementById(id).value !== "0") {
                        document.getElementById(textBoxId).value = "filled";
                    } else {
                        document.getElementById(textBoxId).value = "";
                    }
                }
            }
        },
        alfabeticValidation: function (aid, str, value) {
            var msg, flag = true,
                id = aid + "_div_" + str,
                letters, type;
            if (typeof arguments[3] === "undefined") {
                if (this.lang) {
                    letters = /^[A-Za-z ]+$/;
                    msg = "Please use only (A-Z) alphabets";
                } else {
                    letters = /^[\u0900-\u097FA-Za-z ]+$/;
                    msg = "कृपया (अ-अ: या क-ज्ञ) या (A-Z) अक्षर दर्ज करें।";
                }
            } else if (arguments[3] === "E") {
                if (this.lang) {
                    letters = /^[A-Za-z ]+$/;
                    msg = "Please use only (A-Z) alphabets";
                } else {
                    letters = /^[A-Za-z ]+$/;
                    msg = "कृपया (A-Z) अक्षर दर्ज करें।";
                }
            } else {
                if (this.lang) {
                    letters = /^[\u0900-\u097FA-Za-z ]+$/;
                    msg = "Please use (A-Z) or (अ-अ: या क-ज्ञ) alphabets only.";
                } else {
                    letters = /^[\u0900-\u097FA-Za-z ]+$/;
                    msg = "कृपया (अ-अ: या क-ज्ञ) या (A-Z) अक्षर दर्ज करें।";
                }
            }

            if (!(value === "")) {
                if (!value.match(letters)) {
                    //	console.log(value);
                    $("#" + id).css("display", "block");
                    document.getElementById(id).innerHTML = msg;
                    flag = false;
                } else {
                    $("#" + id).css("display", "none");
                    document.getElementById(id).innerHTML = '';
                }

            } else {
                $("#" + id).css("display", "block");
                document.getElementById(id).innerHTML = "";
            }

            return flag;
        },
        alfaNumericValidation: function (aid, str, value) {
            var msg, flag = true,
                letters, letters1,
                id = aid + "_div_" + str;
            if (typeof arguments[3] === "undefined") {
                letters = /^[1-9][0-9]*$/g;
            } else {
                letters = /^[0-9]*$/g;
            }
            if (this.lang) {
                msg = "Please enter a valid number(0-9)";
            } else {
                msg = "एक मान्य नंबर दर्ज करें(0-9)।";
            }
            if (!(value === "")) {

                if (!value.match(letters)) {
                    $("#" + id).css("display", "block");
                    document.getElementById(id).innerHTML = msg;
                    flag = false;
                } else {
                    $("#" + id).css("display", "none");
                    document.getElementById(id).innerHTML = '';
                }

            } else {
                $("#" + id).css("display", "block");
                document.getElementById(id).innerHTML = "";
            }
            return flag;
        },

        makeAttrMand: function (id, newColor, mand) {
            var labelId = "label_" + id,
                label;
            if (mand === 'Y') {
                $("#" + id).attr('required', '');
                //$("#"+id+"_txt").attr('title', id+'_div_Y');
                $("#" + id + "_div_N").attr('id', id + '_div_Y');
                label = $("#label_" + id).text().split("*")[0] + "*";
                //var label =$("#label_"+id).text();
                //<font color="#FFF" size="+1">*</font>
                $("#label_" + id).html("<font style='color: " + newColor + ";' size=4px; >" + label + "</br></font>");
                //checkValue(id,'V','text');
                $("#" + id).show();

                // alert(mand);
            } else {
                $("#" + id).attr('required', false);
                //$("#"+id+"_txt").attr('title', id+'_div_N');
                $("#" + id + "_div_Y").attr('id', id + '_div_N');
                label = $("#label_" + id).text().split("*")[0];
                $("#label_" + id).html("<font style='color: #FFF;' size=4px; >" + label + "</br></font>");
                $("#label_" + id).html(label);
                $("#" + id).val('');
                //$("#"+id).hide();
                // alert(mand);
            }


        },

        alfabeticNumericValidation: function (aid, str, value) {
            var msg, flag = true,
                letters, letters1, letters2,
                id = aid + "_div_" + str;
            letters = /^[a-zA-Z0-9 ]*$/gi;
            letters1 = /^[0-9\u0900-\u0965\u0971-\u097F ]*$/gm;
            letters2 = /^[\u0900-\u097F ]*$/gm;
            if (this.lang) {
                msg = "Field should contain character or numbers only";
            } else {
                msg = "केवल (अ-अ: या क-ज्ञ) अक्षर या नंबर को दर्ज करें";
            }
            if (!(value === "")) {
                if (!(this.lang)) {
                    if (!value.match(letters) && !value.match(letters1) && !value.match(letters2)) {
                        $("#" + id).css("display", "block");
                        document.getElementById(id).innerHTML = msg;
                        flag = false;
                    } else {
                        $("#" + id).css("display", "none");
                        document.getElementById(id).innerHTML = '';
                    }
                } else {
                    if (!value.match(letters)) {
                        $("#" + id).css("display", "block");
                        document.getElementById(id).innerHTML = msg;
                        flag = false;
                    } else {
                        $("#" + id).css("display", "none");
                        document.getElementById(id).innerHTML = '';
                    }
                }
            } else {
                $("#" + id).css("display", "block");
                document.getElementById(id).innerHTML = "";
            }
            return flag;
        },
        decimalValidation: function (aid, str, value) {
            var msg, flag = true,
                letters, letters1,
                id = aid + "_div_" + str;
            letters = /^[0-9]*[.]{0,1}[0-9]+$/g;
            letters1 = /(^[०-९]*[.]{0,1}[०-९]+$)/g;
            if (this.lang) {
                msg = "Please enter a valid decimal number.";
            } else {
                msg = "एक वैध दशमलव संख्या दर्ज करें।";
            }
            if (!(value === "")) {
                if (!(this.lang)) {
                    if (!value.match(letters) && !value.match(letters1)) {
                        $("#" + id).css("display", "block");
                        document.getElementById(id).innerHTML = msg;
                        flag = false;
                    } else {
                        $("#" + id).css("display", "none");
                        document.getElementById(id).innerHTML = '';
                    }
                } else {
                    if (!value.match(letters)) {
                        $("#" + id).css("display", "block");
                        document.getElementById(id).innerHTML = msg;
                        flag = false;
                    } else {
                        $("#" + id).css("display", "none");
                        document.getElementById(id).innerHTML = '';
                    }
                }
            } else {
                $("#" + id).css("display", "block");
                document.getElementById(id).innerHTML = "";
            }
            return flag;
        },
        specialCharactersValidation: function (aid, str, value) {
            var msg, flag = true,
                letters, letters1, letters2,
                id = aid + "_div_" + str;
            letters = /^[0-9a-zA-Z,(/)-\s]*$/gi;
            letters1 = /^[0-9\u0900-\u0965\u0971-\u097F,(/)-\s]*$/gm;
            letters2 = /^[\u0900-\u097F,(/)-\s]*$/gm;
            if (typeof arguments[3] === "undefined") {
                if (this.lang) {
                    letters1 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters2 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    msg = "Only special characters ‘/’, ‘-‘ and ’,’ are allowed.";
                } else {
                    msg = "केवल विशेष वर्ण '/' , '-' और ',' दर्ज करें।";
                }
            } else if (arguments[3] === "E") {
                if (this.lang) {
                    letters = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters1 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters2 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    msg = "Only special characters ‘/’, ‘-‘ , ’,’ and (A-Z) alphabets are allowed.";
                } else {
                    letters = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters1 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters2 = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    msg = "केवल विशेष वर्ण '/' , '-' , ',' और (A-Z) अक्षर दर्ज करें।";
                }
            } else {
                if (this.lang) {
                    letters = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters1 = /^[0-9\u0900-\u0965\u0971-\u097F,(/)-\s]*$/gm;
                    letters2 = /^[\u0900-\u097F,(/)-\s]*$/gm;
                    msg = "Only special characters ‘/’, ‘-‘ , ’,’ and local language is allowed";
                } else {
                    letters = /^[0-9a-zA-Z,(/)-\s]*$/gi;
                    letters1 = /^[0-9\u0900-\u0965\u0971-\u097F,(/)-\s]*$/gm;
                    letters2 = /^[\u0900-\u097F,(/)-\s]*$/gm;
                    msg = "केवल विशेष वर्ण '/' , '-' , ',' और स्थानीय भाषा दर्ज करें।";
                }
            }

            if (!(value === "")) {
                if (!value.match(letters) && !value.match(letters1) && !value.match(letters2)) {
                    $("#" + id).css("display", "block");
                    document.getElementById(id).innerHTML = msg;
                    flag = false;
                } else {
                    $("#" + id).css("display", "none");
                    document.getElementById(id).innerHTML = '';
                }
            } else {
                $("#" + id).css("display", "block");
                document.getElementById(id).innerHTML = "";
            }
            return flag;
        },
        displayErrorMsg: function () {
            $.mobile.loading("hide");
            $("body").removeClass('ui-disabled');
            alert((function () {
                return App.lang ? "error in communication" : "संचार में त्रुटि";
            }()));
        }

    };
    _.extend(App, Backbone.Events);
    return App;
});