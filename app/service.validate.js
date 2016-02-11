/*global define*/
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "app"
], function ($, _, Backbone, App) {
    'use strict';
    var ServiceValidate = {
        serviceFlag: true,

        "service1": function () {
            var validatePOB, getDate, fatherAadhar, show, motherAadhar, validateAOM, validateAOMD, weightofchild,
                chekCaseDate, applDate, flag = true,
                that = this;
            validatePOB = function () {
                if ($('#2 option:selected').attr('value') !== '') {
                    $("#4").prop('disabled', false);
                    $("#5").prop('disabled', false);
                    if ($('#2 option:selected').attr('id') === 'opt_706') {
                        $("#3").prop('disabled', false);
                        $('#3').val('');
                        $('#4').val('-');
                        $('#5').val('-');
                        $("#13").val('');
                        $("#12").val('');
                        $("#4").prop('disabled', true);
                        $("#5").prop('disabled', true);
                        $("#12").prop('readonly', true);
                        $("#13").prop('disabled', true);
                    } else {
                        $("#12").prop('readonly', false);
                        $("#13").prop('disabled', false);
                        $('#4').val('');
                        $('#5').val('');
                        $('#3').val('');
                        $("#3").trigger('change');
                        $("#3").prop('disabled', true);
                    }
                    that.serviceFlag = true;
                } else {
                    $('#3').val('');
                    $("#3").trigger('change');
                    $("#3").prop('disabled', true);
                    $('#4').val('');
                    $('#5').val('');
                    that.serviceFlag = false;
                }
                return true;
            };

            show = function () {
                $("#label_12").show();
                $("#12").show();
                $("#label_13").show();
                $("#13").show();
            };

            getDate = function () {
                var str = $('#7').val();
                if (str !== '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var birthdayDate = new Date(DOB);
                    //alert(birthdayDate);
                    var DateMetaForm = App.applicationDate;
                  //  alert(DateMetaForm);
                    var str10;
                    var str11;
                    var str12;
                    var str13;
                    var lang = App.retrieveLang();
                    localStorage.setItem("testValue13",'0');
                    localStorage.setItem("testValue12",'0');
                    localStorage.setItem("testValue11",'0');
                    localStorage.setItem("testValue10",'0');
                    /*str11.clear();
                    str12.clear();
                    str13.clear();*/
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        $('#11').val(' ');
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350;&#32;&#2325;&#2368;&#32;&#2340;&#2367;&#2341;&#2367;&#32;&#32;&#2310;&#2332;&#32;&#2325;&#2368;&#32;&#2342;&#2367;&#2344;&#2366;&#2306;&#2325;&#32;&#2360;&#2375;&#32;&#2325;&#2350;&#32;&#2361;&#2379;&#2327;&#2368;&#2404;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else if (days < 21) {
                        $('#11').val("12");
                        document.getElementById("7_div_Y").style.display = "none";
                        document.getElementById("13_div_N").style.display = "none";
                        $("#12").prop('readonly', false);
                        str10= $('#11').val();
                            console.log(str10);
                            localStorage.setItem("testValue10", str10);
                        that.serviceFlag = true;
                    } else if (days >= 21 && days < 30) {
                        $('#11').val('13(1)');
                        document.getElementById("7_div_Y").style.display = "none";
                        document.getElementById("13_div_N").style.display = "none";
                        $("#12").prop('readonly', false);
                          str11= $('#11').val();
                            console.log(str11);
                            localStorage.setItem("testValue11", str11);
                        that.serviceFlag = true;
                    } else if (days >= 30 && days <= 365) {
                        $('#11').val('13(2)');
                        $("#12").prop('readonly', false);
                        document.getElementById("7_div_Y").style.display = "none";
                        if ($('#2 option:selected').attr('id') == 'opt_707' || $('#2 option:selected').attr('id') == 'opt_708') {
                            show();
                            document.getElementById("7_div_Y").style.display = "none";
                            document.getElementById("13_div_N").style.display = "none";
                        }
                          str12= $('#11').val();
                            console.log(str12);
                            localStorage.setItem("testValue12", str12);
                        
                        that.serviceFlag = true;
                    } else {
                        $('#11').val('13(3)');
                        $('#criteria1').val('3');
                        $("#12").prop('readonly', false);
                        document.getElementById("7_div_Y").style.display = "none";
                        if ($('#2 option:selected').attr('id') == 'opt_707' || $('#2 option:selected').attr('id') == 'opt_708') {
                            show();
                            document.getElementById("7_div_Y").style.display = "none";
                            document.getElementById("13_div_N").style.display = "none";
                        }
                             str13= $('#11').val();
                            console.log(str13);
                        
                            localStorage.setItem("testValue13", str13);
                        that.serviceFlag = true;
                    }
                }
               console.log(str11+'-----'+str12+'-----'+str13);
            };

            fatherAadhar = function () {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#955').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध आधार कार्ड संख्या दर्ज करें";
                } else {
                    msg = "please enter valid aadhar card number";
                }
                if (!sls.match(letters)) {
                    $('#955').val('');
                    document.getElementById("955_div_N").style.display = "block";
                    document.getElementById("955_div_N").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("955_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            motherAadhar = function () {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#956').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध आधार कार्ड संख्या दर्ज करें";
                } else {
                    msg = "please enter valid aadhar card  number";
                }
                if (!sls.match(letters)) {
                    $('#956').val('');
                    document.getElementById("956_div_N").style.display = "block";
                    document.getElementById("956_div_N").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("956_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            validateAOM = function () {
                if (parseInt($("#40").val()) < 18) {
                    $('#40').val('');
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "??? ?? ???? 18 ?? ???? ?? ???? ???? ?????";
                    else
                        msg = "Age of Mother must be greater then 18";
                    document.getElementById("40_div_Y").style.display = "block";
                    document.getElementById("40_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    return false;
                } else {
                    document.getElementById("40_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
                if ($("#39").val() != '') {
                    return validateAOMD();
                }
                return true;
            };
            validateAOMD = function () {
                if ($("#39").val() != '' && $("#40").val() != '') {
                    if (parseInt($("#40").val()) > parseInt($("#39").val())) {
                        $('#39').val('');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2346;&#2381;&#2352;&#2360;&#2357; &#2325;&#2375; &#2360;&#2350;&#2351; &#2350;&#2366;&#2340;&#2366; &#2325;&#2368; &#2310;&#2351;&#2369;, &#2357;&#2367;&#2357;&#2366;&#2361; &#2325;&#2375; &#2360;&#2350;&#2351; &#2325;&#2368; &#2310;&#2351;&#2369; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319; ";
                        else
                            msg = "Age of Mother at the time delivery must be greater then Age of Mother at the time of marriage";
                        document.getElementById("39_div_Y").style.display = "block";
                        document.getElementById("39_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("39_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            weightofchild = function () {
                if ($("#44").val() != '') {
                    var val = $('#44').val();
                    if (val.indexOf(',') > -1) {
                        val = val.replace(',', '.');
                    }
                    if (val.indexOf('.') > 1 || val.indexOf('.') == -1) {
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2348;&#2330;&#2381;&#2330;&#2375; &#2325;&#2366; &#2357;&#2332;&#2344; &#2360;&#2361;&#2368; &#2360;&#2375; &#2354;&#2367;&#2326;&#2375; &#2332;&#2376;&#2360;&#2375; 1.23";
                        else
                            msg = "Please fill weight of child in correct format like '1.23'";
                        document.getElementById("44_div_Y").style.display = "block";
                        document.getElementById("44_div_Y").innerHTML = msg;
                        $('#44').val('');
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("44_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                    var num = parseFloat(val);
                    num = num.toFixed(2);
                    if (isNaN(num)) {
                        num = '';
                    }
                    $('#44').val(num);
                }
            };

            chekCaseDate = function () {
                if ($("#7").val() != '' && $("#13").val() != '') {
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var DOB = new Date($('#7').val());
                    var caseDate = new Date($('#13').val());
                    var days = Math.ceil((caseDate - DOB) / (1000 * 60 * 60 * 24));
                    var checkFuturedate = Math.ceil((applDate - caseDate) / (1000 * 60 * 60 * 24));

                    if (checkFuturedate < 0) {
                        $('#13').val(' ');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2325;&#2375;&#2360; &#2340;&#2367;&#2341;&#2367; , &#2310;&#2357;&#2375;&#2342;&#2344; &#2340;&#2367;&#2341;&#2367; &#2325;&#2375; &#2346;&#2361;&#2354;&#2375; &#2325;&#2366; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Case Date cant be greater Date then Application Date";
                        document.getElementById("13_div_N").style.display = "block";
                        document.getElementById("13_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("13_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                    if (days < 0) {
                        $('#13').val(' ');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2325;&#2375;&#2360; &#2340;&#2367;&#2341;&#2367; , &#2332;&#2344;&#2381;&#2350; &#2340;&#2367;&#2341;&#2367; &#2325;&#2375; &#2346;&#2361;&#2354;&#2375; &#2325;&#2366; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319; ";
                        else
                            msg = "Case Date cant be before Date then Date of Birth";
                        document.getElementById("13_div_N").style.display = "block";
                        document.getElementById("13_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("13_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                } else {
                    that.serviceFlag = false;
                    return false;
                }
                return true;
            };
            $('#13').blur(function () {
                if ($('#7').val() != '') {
                    chekCaseDate();
                } else {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi") {
                        $('#13').val('');
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2346;&#2361;&#2354;&#2375; &#2354;&#2367;&#2326;&#2375;&#2306;";
                    } else {
                        $('#13').val('');
                        msg = "Please select DOB First";
                    }
                    document.getElementById("13_div_N").style.display = "block";
                    document.getElementById("13_div_N").innerHTML = msg;
                    document.getElementById("7_div_Y").style.display = "none";
                    that.serviceFlag = false;
                    return false;
                }
            });
            $("#39").prop('maxlength', 2);
            $("#40").prop('maxlength', 2);
            $("#44").prop('maxlength', 4);
            $("#12").prop('maxlength', 10);
            $("#11").prop('readonly', true);
            $("#3").prop('disabled', true);
            $("#12").prop('readonly', true);
            $("#955").prop('maxlength', 12);
            $("#956").prop('maxlength', 12);
            $('#7').blur(function () {
                getDate();
            });
            $('#955').blur(function () {
                fatherAadhar();
            });
            $('#956').blur(function () {
                motherAadhar();
            });
            $('#2').change(function () {
                validatePOB();
            });
            $('#40').blur(function () {
                validateAOM();
            });
            $('#39').blur(function () {
                validateAOMD();
            });
            $('#44').blur(function () {
                weightofchild();
            });
        },

        "service1CheckValidation": function () {
            var flag = true,
                flag1 = true;
            if ($('#2 option:selected').attr('id') === 'opt_706') {
                if ($('#3').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2360;&#2370;&#2330;&#2367; &#2360;&#2375; &#2309;&#2360;&#2381;&#2346;&#2340;&#2366;&#2354; &#2325;&#2366; &#2330;&#2351;&#2344; &#2325;&#2352;&#2375;";
                    else
                        msg = "please select hospital from the list";
                    document.getElementById("3_div_N").style.display = "block";
                    document.getElementById("3_div_N").innerHTML = msg;
                    document.getElementById("4_div_N").style.display = "none";
                    flag = false;
                    return flag;
                }
            } else if ($('#2 option:selected').attr('id') == 'opt_707' || $('#2 option:selected').attr('id') == 'opt_708') {
                if ($('#4').val() == '') {
                    document.getElementById("3_div_N").style.display = "none";
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2332;&#2344;&#2381;&#2350; &#2325;&#2366; &#2360;&#2381;&#2341;&#2366;&#2344; &#2360;&#2381;&#2341;&#2366;&#2344;&#2367;&#2351; &#2349;&#2366;&#2359;&#2366; &#2350;&#2375;&#2306; &#2354;&#2367;&#2326;&#2375; ";
                    else
                        msg = "please select Place of Birth Address in Local Lang";
                    document.getElementById("4_div_N").innerHTML = msg;
                    document.getElementById("4_div_N").style.display = "block";
                    document.getElementById("2_div_Y").style.display = "none";
                    flag = false;
                    return flag;
                } else
                    document.getElementById("4_div_N").style.display = "none";
                if ($('#5').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2332;&#2344;&#2381;&#2350; &#2325;&#2366; &#2360;&#2381;&#2341;&#2366;&#2344; &#2309;&#2306;&#2327;&#2381;&#2352;&#2375;&#2332;&#2368; &#2350;&#2375;&#2306; &#2354;&#2367;&#2326;&#2375; ";
                    else
                        msg = "Please select Place of Birth Address in English";
                    document.getElementById("5_div_N").style.display = "block";
                    document.getElementById("5_div_N").innerHTML = msg;
                    flag = false;
                    return flag;
                } else
                    document.getElementById("5_div_N").style.display = "none";
            }
            if ($('#11').val() == '13(2)' || $('#11').val() == '13(3)') {

                if ($('#12').val() == '' || $('#13').val() == '') {
                    if ($('#2 option:selected').attr('id') == 'opt_707' || $('#2 option:selected').attr('id') == 'opt_708') {
                        var lang = App.retrieveLang();
                        var msg = null;
                        if ($('#12').val() == '') {
                            if (lang == "hi") {
                                msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2325;&#2375;&#2360; &#2360;&#2306;&#2326;&#2381;&#2351;&#2366; &#2354;&#2367;&#2326;&#2375;&#2306;";
                            } else {
                                msg = "please Enter the case No ";
                            }
                            document.getElementById("12_div_N").style.display = "block";
                            document.getElementById("12_div_N").innerHTML = msg;
                        } else
                            document.getElementById("12_div_N").style.display = "none";
                        if ($('#13').val() == '') {
                            if (lang == "hi") {
                                msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2325;&#2375;&#2360; &#2340;&#2367;&#2341;&#2367; &#2354;&#2367;&#2326;&#2375;&#2306;";
                            } else {
                                msg = "please Enter the case Date ";
                            }
                            document.getElementById("13_div_N").style.display = "block";
                            document.getElementById("13_div_N").innerHTML = msg;
                        } else
                            document.getElementById("13_div_N").style.display = "none";
                        $('#18').val(' ');
                        flag = false;
                        return flag;
                    } else {
                        document.getElementById("13_div_N").style.display = "none";
                        document.getElementById("12_div_N").style.display = "none";
                    }
                }
            }
            var flag2 = App.alfabeticValidation("24", "Y", $('#24').val(), "E"),
                flag3 = App.alfabeticValidation("26", "Y", $('#26').val()),
                flag4 = App.alfaNumericValidation("40", "Y", $('#40').val()),
                flag5 = App.alfaNumericValidation("39", "Y", $('#39').val()),
                flag6 = App.alfabeticValidation("10", "N", $('#10').val(), "E"),
                flag7 = App.alfabeticValidation("16", "N", $('#16').val(), "E"),
                flag8 = App.alfabeticValidation("9", "N", $('#9').val(), "B"),
                flag9 = App.alfabeticValidation("15", "N", $('#15').val(), "B"),
                flag10 = App.alfabeticValidation("23", "Y", $('#23').val(), "B"),
                flag11 = App.alfabeticValidation("30", "Y", $('#30').val()),
                flag12 = App.alfabeticValidation("31", "Y", $('#31').val()),
                flag13 = App.alfabeticValidation("15", "N", $('#15').val(), "B"),
                flag14 = App.alfabeticValidation("16", "N", $('#16').val(), "E"),
                flag15 = App.alfaNumericValidation("955", "N", $('#955').val()),
                flag16 = App.alfaNumericValidation("956", "N", $('#956').val()),
                flag17 = App.specialCharactersValidation("5", "N", $('#5').val(), "E"),
                flag18 = App.specialCharactersValidation("19", "Y", $('#19').val(), "E"),
                flag19 = App.specialCharactersValidation("21", "Y", $('#21').val(), "E"),
                flag20 = App.decimalValidation("44", "Y", $('#44').val()),
                flag21 = App.specialCharactersValidation("4", "N", $('#4').val(), "B"),
                flag22 = App.specialCharactersValidation("18", "Y", $('#18').val(), "B"),
                flag23 = App.specialCharactersValidation("20", "Y", $('#20').val(), "B"),
                flag24 = App.specialCharactersValidation("27", "Y", $('#27').val());


            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14 && flag15 && flag16 && flag17 && flag18 && flag19 && flag20 && flag21 && flag22 && flag23 && flag24;
            // ---------------------------------End -------------------
            return (flag && flag1 && this.serviceFlag);
        },

        "service2": function () {
            var validatePOD, chekCaseDate, getDate, validatePOB, applDate, adhaarOnly, flag = true,
                that = this;

            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {

                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            validatePOD = function () {
                if ($('#60 option:selected').attr('value') != '') {
                    $("#62").prop('disabled', false);
                    $("#63").prop('disabled', false);
                    if ($('#60 option:selected').attr('id') == 'opt_706') {
                        $("#3").prop('disabled', false);
                        $('#3').val('');
                        $('#62').val('-');
                        $('#63').val('-');
                        $("#13").val('');
                        $("#62").prop('disabled', true);
                        $("#63").prop('disabled', true);
                    } else {
                        $("#search_3").hide();
                        $('#62').val('');
                        $('#63').val('');
                        $('#3').val('');
                        $("#3").trigger('change');
                        $("#3").prop('disabled', true);
                    }
                    that.serviceFlag = true;
                } else {
                    $('#3').val('');
                    $("#3").trigger('change');
                    $("#3").prop('disabled', true);
                    $('#62').val('');
                    $('#63').val('');
                    that.serviceFlag = false;
                    return false;
                }
                return true;
            };

            chekCaseDate = function () {
                if ($("#47").val() != '' && $("#13").val() != '') {
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var DOD = new Date($('#47').val());
                    var caseDate = new Date($('#13').val());
                    var days = Math.ceil((caseDate - DOD) / (1000 * 60 * 60 * 24));
                    var checkFuturedate = Math.ceil((applDate - caseDate) / (1000 * 60 * 60 * 24));
                    if (checkFuturedate < 0) {
                        $('#13').val(' ');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2325;&#2375;&#2360; &#2340;&#2367;&#2341;&#2367; , &#2310;&#2357;&#2375;&#2342;&#2344; &#2340;&#2367;&#2341;&#2367; &#2325;&#2375; &#2346;&#2361;&#2354;&#2375; &#2325;&#2366; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Case Date cant be greater Date then Application Date";
                        document.getElementById("13_div_N").style.display = "block";
                        document.getElementById("13_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("13_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                    if (days < 0) {
                        $('#13').val(' ');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2325;&#2375;&#2360; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2350;&#2371;&#2340;&#2381;&#2351;&#2369; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2325;&#2375; &#2346;&#2361;&#2354;&#2375; &#2325;&#2366; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Case Date cant be before Date then Date of Death";
                        document.getElementById("13_div_N").style.display = "block";
                        document.getElementById("13_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        that.serviceFlag = true;
                    }
                } else {
                    that.serviceFlag = false;
                    return false;
                }
                return true;
            };

            getDate = function () {
                var str = $('#47').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOD = month + '/' + dd + '/' + yy;

                    var DeathDate = new Date(DOD);
                    
                    var str20; 
                    var str21;
                    var str22;
                    var str23;
                    
                    localStorage.setItem("testValue23",'0');
                    localStorage.setItem("testValue22",'0');
                    localStorage.setItem("testValue21",'0');
                    localStorage.setItem("testValue20",'0');
                    
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#47').val(' ');
                    
                        
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2350;&#2371;&#2340;&#2381;&#2351;&#2369; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2349;&#2357;&#2367;&#2359;&#2381;&#2351; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379; &#2360;&#2325;&#2340;&#2368; ";
                        else
                            msg = "Date Of Death Can't Be Future Date.";
                        document.getElementById("47_div_Y").style.display = "block";
                        document.getElementById("47_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else if (days < 21) {
                        $('#11').val("12");
                        hide();
                        document.getElementById("47_div_Y").style.display = "none";
                        $("#12").prop('readonly', false);
                        $("#13").prop('disabled', false);
                        
                        str20= $('#11').val();
                            console.log(str20);
                            localStorage.setItem("testValue20", str20);
                        
                        that.serviceFlag = true;
                    } else if (days >= 21 && days < 30) {
                        $('#11').val('13(1)');
                       
                        hide();
                        document.getElementById("47_div_Y").style.display = "none";
                        document.getElementById("13_div_N").style.display = "none";
                        $("#12").prop('readonly', false);
                        $("#13").prop('disabled', false);
                        
                            str21= $('#11').val();
                            console.log(str21);
                            localStorage.setItem("testValue21", str21);
                        
                        that.serviceFlag = true;
                    } else if (days >= 30 && days <= 365) {
                        $('#11').val('13(2)');
                        show();
                        document.getElementById("47_div_Y").style.display = "none";
                        document.getElementById("13_div_N").style.display = "none";
                        $("#12").prop('readonly', false);
                        $("#13").prop('disabled', false);
                        
                        str22= $('#11').val();
                            console.log(str22);
                            localStorage.setItem("testValue22", str22);
                        
                        that.serviceFlag = true;
                    } else {
                        $('#11').val('13(3)');
                        show();
                        document.getElementById("47_div_Y").style.display = "none";
                        document.getElementById("13_div_N").style.display = "none";
                        $("#12").prop('readonly', false);
                        $("#13").prop('disabled', false);
                        
                        str23= $('#11').val();
                            console.log(str23);
                            localStorage.setItem("testValue23", str23);
                        that.serviceFlag = true;
                    }
                }
            };
            

            function show() {
                $("#12").show();
                $("#13").show();
            }

            function hide() {
                $("#12").val(' ');
                $("#13").val(' ');
            }
            $("#12").prop('maxlength', 12);
            $("#49").prop('maxlength', 50);
            $("#53").prop('maxlength', 3);
            $("#16").prop('maxlength', 50);
            $("#24").prop('maxlength', 50);
            $("#59").prop('maxlength', 50);

            $("#72").prop('maxlength', 2);
            $("#73").prop('maxlength', 2);
            $("#74").prop('maxlength', 2);
            $("#75").prop('maxlength', 2);
            $("#1074").prop('maxlength', 12);
            $("#955").prop('maxlength', 12);
            $("#956").prop('maxlength', 12);
            $("#12").prop('readonly', true);
            $("#11").prop('readonly', true);
            $("#3").prop('disabled', true);

            $('#60').change(function () {
                validatePOD();
            });
            $('#1074').blur(function () {
                adhaarOnly(1074);

            });
            $('#955').blur(function () {
                adhaarOnly(955);

            });
            $('#956').blur(function () {
                adhaarOnly(956);

            });

            $('#13').blur(function () {
                if ($('#47').val() != '') {
                    chekCaseDate();
                } else {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi") {
                        $('#13').val('');
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2350;&#2371;&#2340;&#2381;&#2351;&#2369; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2346;&#2361;&#2354;&#2375; &#2354;&#2367;&#2326;&#2375;&#2306;";
                    } else
                        msg = "Please select DOD First";
                    document.getElementById("13_div_N").style.display = "block";
                    document.getElementById("13_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    return false;
                }
            });
            $('#47').blur(function () {
                getDate();
            });
            $('#105').change(function () {
                validatePOB();
            });
        },

        "service2CheckValidation": function () {
            var flag = true,
                flag1 = true;
            if ($('#60 option:selected').attr('id') == 'opt_706') {
                if ($('#3').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2360;&#2370;&#2330;&#2367; &#2360;&#2375; &#2309;&#2360;&#2381;&#2346;&#2340;&#2366;&#2354; &#2325;&#2366; &#2330;&#2351;&#2344; &#2325;&#2352;&#2375; ";
                    else
                        msg = "please select hospital from the list";
                    document.getElementById("3_div_N").innerHTML = msg;
                    document.getElementById("3_div_N").style.display = "block";
                    document.getElementById("63_div_N").style.display = "none";
                    document.getElementById("62_div_N").style.display = "none";
                    flag = false;
                    return flag;
                } else {
                    document.getElementById("3_div_N").innerHTML = '';
                    document.getElementById("3_div_N").style.display = "none";
                }
            } else if ($('#60 option:selected').attr('id') == 'opt_707' || $('#60 option:selected').attr('id') == 'opt_708') {
                if ($('#62').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2350;&#2371;&#2340;&#2381;&#2351;&#2369; &#2325;&#2366;  &#2360;&#2381;&#2341;&#2366;&#2344; &#2360;&#2381;&#2341;&#2366;&#2344;&#2367;&#2351; &#2349;&#2366;&#2359;&#2366; &#2350;&#2375;&#2306; &#2354;&#2367;&#2326;&#2375;  ";
                    else
                        msg = "please select Place of Death Address in Local Lang ";
                    document.getElementById("60_div_Y").style.display = "none";
                    document.getElementById("62_div_N").style.display = "block";
                    document.getElementById("62_div_N").innerHTML = msg;
                    document.getElementById("3_div_N").style.display = "none";
                    flag = false;
                    return flag;
                } else
                    document.getElementById("62_div_N").style.display = "none";
                if ($('#63').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2350;&#2371;&#2340;&#2381;&#2351;&#2369; &#2325;&#2366; &#2360;&#2381;&#2341;&#2366;&#2344; &#2360;&#2381;&#2341;&#2366;&#2344;&#2367;&#2351; &#2349;&#2366;&#2359;&#2366; &#2350;&#2375;&#2306; &#2354;&#2367;&#2326;&#2375;  ";
                    else
                        msg = "please select Place of Death Address in English ";
                    document.getElementById("63_div_N").style.display = "block";
                    document.getElementById("63_div_N").innerHTML = msg;
                    flag = false;
                    return flag;
                } else
                    document.getElementById("63_div_N").style.display = "none";
            }
            if ($('#11').val() == '13(2)' || $('#11').val() == '13(3)') {
                if ($('#12').val() == '' || $('#13').val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if ($('#12').val() == '') {
                        if (lang == "hi") {
                            msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2325;&#2375;&#2360; &#2360;&#2306;&#2326;&#2381;&#2351;&#2366; &#2354;&#2367;&#2326;&#2375;&#2306;";
                        } else {
                            msg = "please Enter the case No ";
                        }
                        document.getElementById("12_div_N").style.display = "block";
                        document.getElementById("12_div_N").innerHTML = msg;
                    } else
                        document.getElementById("12_div_N").style.display = "none";
                    if ($('#13').val() == '') {
                        if (lang == "hi") {
                            msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2325;&#2375;&#2360; &#2340;&#2367;&#2341;&#2367; &#2354;&#2367;&#2326;&#2375;&#2306;";
                        } else {
                            msg = "please Enter the case Date ";
                        }
                        document.getElementById("13_div_N").style.display = "block";
                        document.getElementById("13_div_N").innerHTML = msg;
                    } else
                        document.getElementById("13_div_N").style.display = "none";
                    $('#18').val(' ');
                    flag = false;
                    return flag;
                } else {
                    document.getElementById("13_div_N").style.display = "none";
                    document.getElementById("12_div_N").style.display = "none";
                }
            }

            var flag2 = App.alfabeticValidation("48", "Y", $('#48').val(), "B"),
                flag3 = App.alfabeticValidation("49", "Y", $('#49').val(), "E"),
                flag4 = App.alfabeticValidation("23", "Y", $('#23').val(), "B"),
                flag5 = App.alfabeticValidation("24", "Y", $('#24').val(), "E"),
                flag6 = App.alfaNumericValidation("53", "Y", $('#53').val()),
                flag7 = App.alfabeticValidation("15", "Y", $('#15').val(), "B"),
                flag8 = App.alfabeticValidation("16", "Y", $('#16').val(), "E"),
                flag9 = App.alfabeticValidation("26", "Y", $('#26').val()),
                flag10 = App.alfabeticValidation("30", "Y", $('#30').val()),
                flag11 = App.alfabeticValidation("31", "Y", $('#31').val()),
                flag12 = App.alfaNumericValidation("72", "Y", $('#72').val(), "Y"),
                flag13 = App.alfaNumericValidation("73", "Y", $('#73').val(), "Y"),
                flag14 = App.alfaNumericValidation("74", "Y", $('#74').val(), "Y"),
                flag15 = App.alfaNumericValidation("75", "Y", $('#75').val(), "Y"),
                flag16 = App.alfabeticValidation("58", "N", $('#58').val(), "B"),
                flag17 = App.alfabeticValidation("59", "N", $('#59').val(), "E"),
                flag18 = App.alfaNumericValidation("1074", "N", $('#1074').val()),
                flag19 = App.alfaNumericValidation("955", "N", $('#955').val()),
                flag20 = App.alfaNumericValidation("956", "N", $('#956').val()),
                flag21 = App.specialCharactersValidation("51", "Y", $('#51').val(), "E"),
                flag22 = App.specialCharactersValidation("63", "N", $('#63').val(), "E"),
                flag23 = App.specialCharactersValidation("67", "Y", $('#67').val(), "E"),
                flag24 = App.specialCharactersValidation("27", "Y", $('#27').val()),
                flag25 = App.specialCharactersValidation("50", "Y", $('#50').val(), "B"),
                flag26 = App.specialCharactersValidation("62", "N", $('#62').val(), "B"),
                flag27 = App.specialCharactersValidation("66", "Y", $('#66').val(), "B");


            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14 && flag15 && flag16 && flag17 && flag18 && flag19 && flag20 && flag21 && flag22 && flag23 && flag24 && flag25 && flag26 && flag27;
            return (flag && flag1 && this.serviceFlag);
        },

        "service3": function () {
            var calculateGroomAge, calculateBrideAge, calculateRegnTime, regnNo, applDate, that = this;
               var days;
                    
                    localStorage.setItem("days3",'0');

            regnNo = function () {
                if ($('#135 option:selected').attr('id') == 'opt_760') {
                    $("#136").prop('disabled', true);
                    $("#136").val('');
                } else {
                    $("#136").prop('disabled', false);
                }
            };
            calculateRegnTime = function () {
                var Marraigedate = $('#132').val();
                Marraigedate = new Date(Marraigedate);
                var DateMetaForm = App.applicationDate;
                applDate = new Date(DateMetaForm);
                 days = Math.ceil((applDate - Marraigedate) / (1000 * 60 * 60 * 24));
                alert(days);
             localStorage.setItem("days3",days);
                
                
                
              if (days < 0) {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi") {
                        msg = "शादी की तारीख भविष्य की नहीं हो सकती";
                    } else {
                        msg = "Marriage date can't be future date";
                    }
                    //$('#132').val('');
                    document.getElementById("132_div_Y").style.display = "block";
                    document.getElementById("132_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    return false;
                } else {
                    document.getElementById("132_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            calculateGroomAge = function () {
                var Marraigedate = $('#132').val();
                Marraigedate = new Date(Marraigedate);
                var DOBG = $('#141').val();
                DOBG = new Date(DOBG);
                var years = Marraigedate.getFullYear() - DOBG.getFullYear();
                if (years < 21) {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2357;&#2352; &#2325;&#2368; &#2313;&#2350;&#2381;&#2352; &#2408;&#2407; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Groom Age must be greater then 21 Years";
                    document.getElementById("141_div_Y").style.display = "block";
                    document.getElementById("141_div_Y").innerHTML = msg;
                    $('#142').val('');
                    that.serviceFlag = false;
                    return false;
                } else {
                    document.getElementById("141_div_Y").style.display = "none";
                    $('#142').val(years);
                    that.serviceFlag = true;
                    //App.checkValue(142, 'Y', 'text');
                }
            };
            calculateBrideAge = function () {
                var Marraigedate = $('#132').val();
                Marraigedate = new Date(Marraigedate);
                var DOBG = $('#160').val();
                DOBG = new Date(DOBG);
                var years = Marraigedate.getFullYear() - DOBG.getFullYear();
                if (years < 18) {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi")
                        msg = "&#2357;&#2343;&#2369; &#2325;&#2368; &#2313;&#2350;&#2381;&#2352; &#2407;&#2414; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Bride Age must be greater then 18 Years";
                    document.getElementById("160_div_Y").style.display = "block";
                    document.getElementById("160_div_Y").innerHTML = msg;
                    $('#176').val('');
                    that.serviceFlag = false;
                    return false;
                } else {
                    document.getElementById("160_div_Y").style.display = "none";
                    $('#176').val(years);
                    that.serviceFlag = true;
                    //App.checkValue(176, 'Y', 'text');
                }
            };
            $("#136").prop('maxlength', 6);
            $("#142").prop('readonly', true);
            $("#176").prop('readonly', true);
            $("#142").prop('maxlength', 2);
            $("#176").prop('maxlength', 2);
            $("#133").prop('maxlength', 300);
            $("#231").prop('maxlength', 12);
            $('#132').blur(function () {
                calculateRegnTime();
                calculateGroomAge();
                calculateBrideAge();

            });
            $('#135').change(function () {
                regnNo();
            });
            $('#141').blur(function () {
                calculateGroomAge();
            });
            $('#160').blur(function () {
                calculateBrideAge();
            });
        },

        "service3FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "41") {
                var flag1 = true,
                    flag2 = App.specialCharactersValidation("154", "N", $('#154').val()),
                    flag3 = App.alfabeticValidation("153", "N", $('#153').val()),
                    flag4 = App.alfabeticValidation("156", "N", $('#156').val());
                if (!flag1 && flag2 && flag3 && flag4) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4;
            }
            if (fieldsetid === "42") {
                var flag1 = true,
                    flag2 = App.specialCharactersValidation("279", "N", $('#279').val()),
                    flag3 = App.alfabeticValidation("278", "N", $('#278').val()),
                    flag4 = App.alfabeticValidation("280", "N", $('#280').val());
                if (!flag1 && flag2 && flag3 && flag4) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4;
            }
            return true;
        },
        "service3CheckValidation": function () {
            var calculateRegnTime,
                flag = true,
                flag1 = true,
                flag2 = App.alfabeticValidation("139", "Y", $('#139').val(), "B"),
                flag3 = App.alfabeticValidation("140", "Y", $('#140').val(), "E"),
                flag4 = App.alfabeticValidation("54", "Y", $('#54').val(), "B"),
                flag5 = App.alfabeticValidation("55", "Y", $('#55').val(), "E"),
                flag6 = App.alfabeticValidation("158", "Y", $('#158').val(), "B"),
                flag7 = App.alfabeticValidation("159", "Y", $('#159').val(), "E"),
                flag8 = App.alfabeticValidation("177", "Y", $('#177').val(), "B"),
                flag9 = App.alfabeticValidation("178", "Y", $('#178').val(), "E"),
                flag10 = App.alfaNumericValidation("136", "N", $('#136').val()),
                flag11 = App.specialCharactersValidation("146", "Y", $('#146').val(), "E"),
                flag12 = App.specialCharactersValidation("149", "Y", $('#149').val(), "E"),
                flag13 = App.specialCharactersValidation("201", "Y", $('#201').val(), "E"),
                flag14 = App.specialCharactersValidation("204", "Y", $('#204').val(), "E"),
                flag15 = App.specialCharactersValidation("145", "Y", $('#145').val(), "B"),
                flag16 = App.specialCharactersValidation("147", "Y", $('#147').val(), "B"),
                flag17 = App.specialCharactersValidation("200", "Y", $('#200').val(), "B"),
                flag18 = App.specialCharactersValidation("203", "Y", $('#203').val(), "B");

            calculateRegnTime = function () {
                var Marraigedate = $('#132').val();
                console.log()
                Marraigedate = new Date(Marraigedate);
                var DateMetaForm = App.applicationDate;
                var applDate = new Date(DateMetaForm);
                var days = Math.ceil((applDate - Marraigedate) / (1000 * 60 * 60 * 24));
                if (days < 0) {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == "hi") {
                        msg = "शादी की तारीख भविष्य की नहीं हो सकती";
                    } else {
                        msg = "Marriage date can't be future date";
                    }
                    //$('#132').val('');
                    document.getElementById("132_div_Y").style.display = "block";
                    document.getElementById("132_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("132_div_Y").style.display = "none";
                }
            };

            calculateRegnTime();

            flag1 = flag10 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag11 && flag12 && flag13 && flag14 && flag15 && flag16 && flag17 && flag18;

            return (flag && flag1 && this.serviceFlag);
        },

        "service4": function () {
            var flag = true,
                that = this,
                swap = "1950",
                msg = "",
                yearfrom, yearto, getDate, fillMinYear, fillAddressDetails, checkVal, checkValues, fillCasteDetails,
                birthdayDate, applDate, msg1,
                currentyear = App.applicationDate.substr(6, 10);

            yearfrom = function () {
                var beforevalue = $('#244').val();
                var aftervalue = swap;

                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2360;&#2375;&#32;," + aftervalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "please Fill From Year Value greater or equal to:" + aftervalue;
                }
                if (beforevalue < aftervalue) {
                    $('#244').val('');
                    document.getElementById("244_div_Y").style.display = "block";
                    document.getElementById("244_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("244_div_Y").style.display = "none";
                    that.serviceFlag = true;
                    yearto();
                }
            };

            yearto = function () {
                var beforevalue = $('#244').val();
                var aftervalue = $('#245').val();
                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2340;&#2325;&#32;," + beforevalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "Please Fill To Year Value greater or equal to:" + beforevalue;
                }
                if (aftervalue < beforevalue) {
                    $('#245').val('');
                    document.getElementById("245_div_Y").style.display = "block";
                    document.getElementById("245_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    if (swap != "" && aftervalue != "") {
                        swap = aftervalue;
                    }
                    document.getElementById("245_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350;&#32;&#2325;&#2368;&#32;&#2340;&#2367;&#2341;&#2367;&#32;&#32;&#2310;&#2332;&#32;&#2325;&#2368;&#32;&#2342;&#2367;&#2344;&#2366;&#2306;&#2325;&#32;&#2360;&#2375;&#32;&#2325;&#2350;&#32;&#2361;&#2379;&#2327;&#2368;&#2404;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            fillAddressDetails = function () {
                if ($('#678 option:selected').attr('id') != '0') {
                    var addr = $('#104').val();
                    var pincode = $('#82').val();
                    var postboxno = $('#107').val();
                   // var policethana = $('#127').val();
                    var District = $('#196').val();
                    if ($('#678 option:selected').attr('id') == 'opt_759') {
                        $('#198').val(addr);
                        $('#202').val(pincode);
                        $('#206').val(postboxno);
                        //$('#207').val(policethana);
                        $('#197').val(District);
                       // $('#207').trigger('change');
                        $('#197').trigger('change');
                        $("#198").prop('disabled', true);
                        $("#202").prop('disabled', true);
                        $("#206").prop('disabled', true);
                        //$("#207").prop('disabled', true);
                        $("#197").prop('disabled', true);
                    } else {
                        $('#198').val("");
                        $('#202').val("");
                        $('#206').val("");
                        $('#207').val('Select');
                        $('#197').val('Select');
                       // $('#207').trigger('change');
                        $('#197').trigger('change');
                        $("#198").prop('disabled', false);
                        $("#202").prop('disabled', false);
                        $("#206").prop('disabled', false);
                        //$("#207").prop('disabled', false);
                        $("#197").prop('disabled', false);
                    }
                }
            };
            checkVal = function () {
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#82').val();
                if (str.substring(0, 1) == '0') {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            checkValues = function () {
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#202').val();
                if (str.substring(0, 1) == '0') {
                    $('#202').val('');
                    document.getElementById("202_div_Y").style.display = "block";
                    document.getElementById("202_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#202').val('');
                    document.getElementById("202_div_Y").style.display = "block";
                    document.getElementById("202_div_Y").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("202_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            fillCasteDetails = function () {
                var caste = $('#436 option:selected').attr('id');
                var castes = caste.split("~");
                $('#98').val(castes[0].split("_")[1]);
                $('#100').val(castes[1]);
            };
            $("#98").prop('readonly', true);
            $("#100").prop('readonly', true);
            $("#436").prop('readonly', true);
            $("#107").prop('maxlength', 4);
            $("#82").prop('maxlength', 6);
            $("#206").prop('maxlength', 4);
            $("#202").prop('maxlength', 6);
            $("#127").prop('disabled', false);
            $("#207").prop('disabled', false);
            $("#244").prop('min', 1950);
            $("#244").prop('max', currentyear);
            $("#245").prop('min', 1950);
            $("#245").prop('max', currentyear);
            $('#436').blur(function () {
                fillCasteDetails();
            });
            $('#678').change(function () {
                fillAddressDetails();
            });
            $('#7').blur(function () {
                getDate();
            });
            $('#82').blur(function () {
                checkVal();
            });
            $('#202').blur(function () {
                checkValues();
            });
            $('#244').blur(function () {
                yearfrom();
            });
            $('#245').blur(function () {
                yearto();
            });
        },
        "service4FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "21") {
                var flag1 = true,
                    flag2 = App.alfaNumericValidation("244", "Y", $('#244').val()),
                    flag3 = App.alfaNumericValidation("245", "Y", $('#245').val()),
                    flag4 = App.specialCharactersValidation("122", "Y", $('#122').val());
                if ($('#122').val() === "" || $('#244').val() === "" || $('#245').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3 && flag4) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4;
            }

            return true;
        },
        "service4CheckValidation": function () {
            var fillMinYear, flag = true;
            fillMinYear = function () {
                var DOB = $('#7').val();
                if (DOB != '') {
                    var parts = DOB.split(" ");
                    var year = parts[2];
                    flag = true;
                } else {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u092A\u0939\u0932\u0947 \u091C\u0928\u094D\u092E \u0924\u093F\u0925\u093F \u092D\u0930\u0947\u0902;";
                    } else {
                        msg = "please fill Date of Birth first";
                    }
                    document.getElementById("7_div_Y").style.display = "block";
                    document.getElementById("7_div_Y").innerHTML = msg;
                    flag = false;
                }
                if ($("#7").val() != '') {
                    document.getElementById("7_div_Y").style.display = "none";
                }
            };
            fillMinYear();
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_21").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }

            var flag1,
                flag2 = App.alfabeticValidation("79", "Y", $('#79').val()),
                flag3 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag4 = App.alfaNumericValidation("202", "Y", $('#202').val()),
                flag5 = App.alfaNumericValidation("113", "N", $('#113').val()),
                flag6 = App.alfabeticValidation("114", "N", $('#114').val()),
                flag7 = App.alfabeticValidation("111", "N", $('#111').val()),
                flag8 = App.alfabeticValidation("115", "N", $('#115').val()),
                flag9 = App.alfabeticNumericValidation("107", "N", $('#107').val()),
                flag10 = App.alfabeticNumericValidation("206", "N", $('#206').val()),
                flag11 = App.specialCharactersValidation("104", "Y", $('#104').val()),
                flag12 = App.specialCharactersValidation("198", "Y", $('#198').val());

            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12;
            return (flag && flag1 && this.serviceFlag);
        },
        "service5": function () {
            var flag = true,
                swap = "1950",
                that = this,
                msg = "",
                yearfrom, yearto, getDate, fillMinYear, fillAddressDetails, checkVal, checkValues, fillCasteDetails,
                birthdayDate, applDate, msg1,
                currentyear = App.applicationDate.substr(6, 10);

            yearfrom = function () {
                var beforevalue = $('#244').val();
                var aftervalue = swap;

                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2360;&#2375;&#32;," + aftervalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "Please fill From Year value greater or equal to:" + aftervalue;
                }
                if (beforevalue < aftervalue) {
                    $('#244').val('');
                    document.getElementById("244_div_Y").style.display = "block";
                    document.getElementById("244_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("244_div_Y").style.display = "none";
                    that.serviceFlag = true;
                    yearto();
                }
            };

            yearto = function () {
                var beforevalue = $('#244').val();
                var aftervalue = $('#245').val();
                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2340;&#2325;&#32;," + beforevalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "Please fill To Year value greater or equal to:" + beforevalue;
                }
                if (aftervalue < beforevalue) {
                    $('#245').val('');
                    document.getElementById("245_div_Y").style.display = "block";
                    document.getElementById("245_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    if (swap != "" && aftervalue != "") {
                        swap = aftervalue;
                    }
                    document.getElementById("245_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350;&#32;&#2325;&#2368;&#32;&#2340;&#2367;&#2341;&#2367;&#32;&#32;&#2310;&#2332;&#32;&#2325;&#2368;&#32;&#2342;&#2367;&#2344;&#2366;&#2306;&#2325;&#32;&#2360;&#2375;&#32;&#2325;&#2350;&#32;&#2361;&#2379;&#2327;&#2368;&#2404;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            fillAddressDetails = function () {
                if ($('#678 option:selected').attr('id') != '0') {
                    var addr = $('#104').val();
                    var pincode = $('#82').val();
                    var postboxno = $('#107').val();
                    var policethana = $('#127').val();
                    var District = $('#196').val();
                    if ($('#678 option:selected').attr('id') == 'opt_759') {
                        $('#198').val(addr);
                        $('#202').val(pincode);
                        $('#206').val(postboxno);
                        $('#207').val(policethana);
                        $('#197').val(District);
                        $('#207').trigger('change');
                        $('#197').trigger('change');
                        $("#198").prop('disabled', true);
                        $("#202").prop('disabled', true);
                        $("#206").prop('disabled', true);
                        $("#207").prop('disabled', true);
                        $("#197").prop('disabled', true);
                    } else {
                        $('#198').val("");
                        $('#202').val("");
                        $('#206').val("");
                        $('#207').val('Select');
                        $('#197').val('Select');
                        $('#207').trigger('change');
                        $('#197').trigger('change');
                        $("#198").prop('disabled', false);
                        $("#202").prop('disabled', false);
                        $("#206").prop('disabled', false);
                        $("#207").prop('disabled', false);
                        $("#197").prop('disabled', false);
                    }
                }
            };
            checkVal = function () {
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#82').val();
                if (str.substring(0, 1) == '0') {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            checkValues = function () {
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#202').val();
                if (str.substring(0, 1) == '0') {
                    $('#202').val('');
                    document.getElementById("202_div_N").style.display = "block";
                    document.getElementById("202_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#202').val('');
                    document.getElementById("202_div_N").style.display = "block";
                    document.getElementById("202_div_N").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("202_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            fillCasteDetails = function () {
                var caste = $('#437 option:selected').attr('id');
                var castes = caste.split("~");
                $('#98').val(castes[0].split("_")[1]);
                $('#100').val(castes[1]);
            };
            $("#98").prop('readonly', true);
            $("#100").prop('readonly', true);
            $("#437").prop('readonly', true);
            $("#107").prop('maxlength', 4);
            $("#82").prop('maxlength', 6);
            $("#206").prop('maxlength', 4);
            $("#202").prop('maxlength', 6);
            $("#127").prop('disabled', false);
            $("#207").prop('disabled', false);
            $("#244").prop('min', 1950);
            $("#244").prop('max', currentyear);
            $("#245").prop('min', 1950);
            $("#245").prop('max', currentyear);
            $('#437').blur(function () {
                fillCasteDetails();
            });
            $('#678').change(function () {
                console.log("asdasd");
                fillAddressDetails();
            });
            $('#7').blur(function () {
                getDate();
            });
            $('#82').blur(function () {
                checkVal();
            });
            $('#202').blur(function () {
                checkValues();
            });
            $('#244').blur(function () {
                yearfrom();
            });
            $('#245').blur(function () {
                yearto();
            });
        },
        "service5FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "21") {
                var flag1 = true,
                    flag2 = App.alfaNumericValidation("244", "Y", $('#244').val()),
                    flag3 = App.alfaNumericValidation("245", "Y", $('#245').val());
                if ($('#122').val() === "" || $('#244').val() === "" || $('#245').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3;
            }
            return true;
        },
        "service5CheckValidation": function () {
            var fillMinYear, flag = true;
            fillMinYear = function () {
                var DOB = $('#7').val();
                console.log(DOB);
                if (DOB != '') {
                    console.log(flag);
                    var parts = DOB.split(" ");
                    var year = parts[2];
                    flag = true;
                } else {
                    console.log(flag);
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u092A\u0939\u0932\u0947 \u091C\u0928\u094D\u092E \u0924\u093F\u0925\u093F \u092D\u0930\u0947\u0902;";
                    } else {
                        msg = "please fill Date of Birth first";
                    }
                    document.getElementById("7_div_Y").style.display = "block";
                    document.getElementById("7_div_Y").innerHTML = msg;
                    flag = false;
                }
                if ($("#7").val() != '') {
                    document.getElementById("7_div_Y").style.display = "none";
                }
            };
            
            fillMinYear();
            
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_21").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }

            var flag1,
                flag2 = App.alfabeticValidation("79", "Y", $('#79').val()),
                flag3 = App.alfaNumericValidation("82", "N", $('#82').val()),
                flag4 = App.alfaNumericValidation("202", "N", $('#202').val()),
                flag5 = App.alfaNumericValidation("113", "Y", $('#113').val()),
                flag6 = App.alfabeticValidation("114", "Y", $('#114').val()),
                flag7 = App.alfabeticValidation("111", "Y", $('#111').val()),
                flag8 = App.alfabeticValidation("115", "Y", $('#115').val()),
                flag9 = App.alfabeticNumericValidation("107", "N", $('#107').val()),
                flag10 = App.alfabeticNumericValidation("206", "N", $('#206').val()),
                flag11 = App.alfabeticValidation("31", "Y", $('#31').val());

            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11;

            return flag && flag1 && this.serviceFlag;
        },
        "service6": function () {
            var fillCasteDetails,relationDetails,
                that = this,
                disableIncomeDetailFields;

            fillCasteDetails = function () {
               
                var caste = $('#116 option:selected').attr('id'),
                    castes = caste.split("~");
                $('#117').val(castes[0].split("_")[1]);
                $('#118').val(castes[1]);
                
            };
            
            relationDetails=function(){
                var fVal = $('#1085 option:selected').attr('id');
                   
                if (fVal === 'opt_697') {
                        $("#112").prop('disabled', true); 
                     var msg = App.lang ? "Son or Daughter or Wife Name of Beneficiary" : "हितग्राही के पुत्र या पुत्री या पत्नी नाम"
                     $("#label_112").html("<font style='color: ;' size=4px; >"+msg+"</br></font>");
                }
                else{
                    $("#112").prop('disabled', false);
                    //$("#112").trigger('create');
                    $("#112").attr('required', '');
                    var msg = App.lang ? "Son or Daughter or Wife Name of Beneficiary" : "हितग्राही के पुत्र या पुत्री या पत्नी नाम"
				$("#label_112").html("<font style='color: ;' size=2px; >"+msg+"*</br></font>");
				}
        };

            disableIncomeDetailFields = function (datavalue) {
                if (datavalue === 'FOR CASTE CERTIFICATE') {
                    if ($('#130').val() === '') {
                        $("#130").prop('disabled', false);
                        $("#128").val('');
                        $("#128").prop('disabled', true);
                        $("#128").rules("remove");
                        $("#130").rules("add", {
                            required: true,
                            messages: {
                                required: App.lang ? "This field is required." : "यह फ़ील्ड आवश्यक है।"
                            }
                        });
                    }
                } else {
                    $("#128").prop('disabled', false);
                    $("#130").val('');
                    if ($('#128').val() === '' && $('#105').val() !== '') {
                        $("#130").val('');
                        $("#130").prop('disabled', true);
                        $("#130").rules("remove");
                        $("#128").rules("add", {
                            required: true,
                            messages: {
                                required: App.lang ? "This field is required." : "यह फ़ील्ड आवश्यक है।"
                            }
                        });
                    }
                }
            };

            $("#128").prop('disabled', true);
            $("#130").prop('disabled', true);
            $("#117").prop('disabled', true);
            $("#118").prop('disabled', true);
            $("#82").rules("add", {
                minlength: 6,
                maxlength: 6,
                messages: {
                    maxlength: App.lang ? "Enter 6 Digit Valid Pincode No." : "6 अंकों मान्य पिन कोड नंबर दर्ज",
                    minlength: App.lang ? "Enter 6 Digit Valid Pincode No." : "6 अंकों मान्य पिन कोड नंबर दर्ज"
                }
            });
            $("#109").rules("add", {
                minlength: 1,
                maxlength: 2,
                messages: {
                    maxlength: App.lang ? "Enter Maximum of two digits " : "दो अंकों की अधिकतम दर्ज",
                    minlength: App.lang ? "Enter Maximum of two digits." : "दो अंकों की अधिकतम दर्ज"
                }
            });
            $('#109').blur(function () {
                var msg = App.lang ? "Age should be greater than 18." : " आयु 18 साल की उम्र से अधिक होना चाहिए।"
                 
                if (parseInt($('#109').val()) < 18) {
                    $('#109').val('');
                    //localStorage.setItem("str", $('#109').val());
                    document.getElementById("109_div_Y").style.display = "block";
                    document.getElementById("109_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("109_div_Y").style.display = "none";
                }

            });
            $('#116').blur(function () {
                fillCasteDetails();
            });
             
            
            $('#1085').blur(function () {
                relationDetails();
            });
            
            $('#105').change(function (e) {
                disableIncomeDetailFields($('#105').val());
            });
        },
        "service6CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfabeticValidation("79", "Y", $('#79').val()),
                flag3 = App.alfaNumericValidation("128", "N", $('#128').val()),
                flag4 = App.alfabeticValidation("112", "N", $('#112').val()),
                flag5 = App.alfaNumericValidation("82", "N", $('#82').val()),
                flag6 = App.alfaNumericValidation("109", "Y", $('#109').val()),
                flag7 = App.specialCharactersValidation("104", "Y", $('#104').val());

            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7;
            return (flag && flag1 && this.serviceFlag);
        },
        "service7": function () {
            var getDate, checkVal, yearfrom, yearto, yearfromServDetails, yeartoServDetails, fillMinYear, flag = true,
                that = this,
                swap = "1970",
                swapservdetails = "1970",
                msg = "",
                fromYear = "",
                toYear = "",
                beforevalue = "",
                aftervalue = "",
                birthdayDate, applDate,
                currentyear = App.applicationDate.substr(6, 10);

            yearfrom = function () {
                if (swap == 1970)
                    fillMinYear();
                if (flag) {
                    fromYear = $('#256').val();
                    toYear = swap;
                    var lang = App.retrieveLang();
                    if (lang == "hi") {
                        msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2360;&#2375;&#32;," + toYear + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                    } else {
                        msg = "Please fill From Year value greater or equal to:" + toYear;
                    }
                    if (fromYear < toYear) {
                        $('#256').val('');
                        document.getElementById("256_div_Y").style.display = "block";
                        document.getElementById("256_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("256_div_Y").style.display = "none";
                        that.serviceFlag = true;
                        yearto();
                    }
                } else {
                    $('#256').val('');
                    $('#257').val('');
                }
            };

            yearto = function () {
                fromYear = $('#256').val();
                toYear = $('#257').val();
                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2340;&#2325;&#32;," + fromYear + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "Please fill To Year value greater or equal to:" + fromYear;
                }
                if (toYear < fromYear || fromYear < swap) {
                    $('#257').val('');
                    document.getElementById("257_div_Y").style.display = "block";
                    document.getElementById("257_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    if (swap != "" && toYear != "") {
                        swap = toYear;
                    }
                    document.getElementById("257_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            yearfromServDetails = function () {
                if (swapservdetails == 1970)
                    fillMinYear();
                if (flag) {
                    beforevalue = $('#244').val();
                    aftervalue = swapservdetails;
                    var lang = App.retrieveLang();
                    if (lang == "hi") {
                        msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2360;&#2375;&#32;," + aftervalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                    } else {
                        msg = "Please fill From Year value greater or equal to:" + aftervalue;
                    }
                    if (beforevalue < aftervalue) {
                        $('#244').val('');
                        document.getElementById("244_div_N").style.display = "block";
                        document.getElementById("244_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("244_div_N").style.display = "none";
                        that.serviceFlag = true;
                        yeartoServDetails();
                    }
                } else {
                    $('#244').val('');
                    $('#245').val('');
                }
            };

            yeartoServDetails = function () {
                beforevalue = $('#244').val();
                aftervalue = $('#245').val();
                var lang = App.retrieveLang();
                if (lang == "hi") {
                    msg = "&#2357;&#2352;&#2381;&#2359;&#32;&#2340;&#2325;&#32;," + beforevalue + "&#32;&#2360;&#2375;&#32;&#2309;&#2343;&#2367;&#2325;&#32;&#2351;&#2366;&#32;&#2348;&#2352;&#2366;&#2348;&#2352;&#32;&#2349;&#2352;&#2375;&#2306;&#46;";
                } else {
                    msg = "Please fill To Year value greater or equal to:" + beforevalue;
                }
                if (aftervalue < beforevalue || beforevalue < swapservdetails) {
                    $('#245').val('');
                    document.getElementById("245_div_N").style.display = "block";
                    document.getElementById("245_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                } else {
                    if (swapservdetails != "" && aftervalue != "") {
                        swapservdetails = aftervalue;
                    }
                    document.getElementById("245_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    flag = true;
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];

                    $("#244").prop('min', yy);
                    $("#245").prop('min', yy);
                    $("#256").prop('min', yy);
                    $("#257").prop('min', yy);
                    $("#103").prop('min', yy);

                    swapservdetails = swap = yy;
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;

                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350;&#32;&#2325;&#2368;&#32;&#2340;&#2367;&#2341;&#2367;&#32;&#32;&#2310;&#2332;&#32;&#2325;&#2368;&#32;&#2342;&#2367;&#2344;&#2366;&#2306;&#2325;&#32;&#2360;&#2375;&#32;&#2325;&#2350;&#32;&#2361;&#2379;&#2327;&#2368;&#2404;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };

            fillMinYear = function () {
                flag = true;
                var DOB = $('#7').val();
                if (DOB != '') {
                    var parts = DOB.split("-");
                    var year = parts[0];
                    $("#244").prop('min', year);
                    $("#245").prop('min', year);
                    $("#256").prop('min', year);
                    $("#257").prop('min', year);
                    $("#103").prop('min', year);
                    swap = year;
                    swapservdetails = year;
                    flag = true;
                    that.serviceFlag = true;
                } else {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u092A\u0939\u0932\u0947 \u091C\u0928\u094D\u092E \u0924\u093F\u0925\u093F \u092D\u0930\u0947\u0902;";
                    } else {
                        msg = "Please fill Date of Birth first";
                    }
                    document.getElementById("7_div_Y").style.display = "block";
                    document.getElementById("7_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                }

                if ($("#7").val() != '') {
                    document.getElementById("7_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            checkVal = function () {
                var lang = App.retrieveLang();
                var msg = null,
                    msg1 = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#82').val();
                if (str.substring(0, 1) == '0') {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            $("#244").prop('min', 1970);
            $("#244").prop('max', currentyear);
            $("#245").prop('min', 1970);
            $("#245").prop('max', currentyear);
            $("#256").prop('min', 1970);
            $("#256").prop('max', currentyear);
            $("#257").prop('min', 1970);
            $("#257").prop('max', currentyear);
            $("#103").prop('min', 1970);
            $("#103").prop('max', currentyear);
            $("#82").prop('maxlength', 6);
            //            $("#80").prop('disabled', true);

            $('#7').blur(function () {
                getDate();
            });

            $('#82').blur(function () {
                checkVal();
            });

            $('#256').blur(function () {
                yearfrom();
            });

            $('#257').blur(function () {
                yearto();
            });

            $('#244').blur(function () {
                yearfromServDetails();
            });

            $('#245').blur(function () {
                yeartoServDetails();
            });
        },

        "service7FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "27") {
                var flag1 = true,
                    flag2 = App.alfaNumericValidation("244", "N", $('#244').val()),
                    flag3 = App.alfaNumericValidation("245", "N", $('#245').val()),
                    flag4 = App.alfabeticValidation("246", "N", $('#246').val()),
                    flag5 = App.alfabeticValidation("247", "N", $('#247').val());
                if (!flag1 && flag2 && flag3 && flag4 && flag5) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4 && flag5;
            } else if (fieldsetid === "26") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("248", "N", $('#248').val()),
                    flag3 = App.alfabeticValidation("249", "N", $('#249').val());
                if (!flag1 && flag2 && flag3) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3;
            } else if (fieldsetid === "25") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("258", "Y", $('#258').val()),
                    flag3 = App.alfaNumericValidation("256", "Y", $('#256').val()),
                    flag4 = App.alfaNumericValidation("257", "Y", $('#257').val());
                if ($('#256').val() === "" || $('#257').val() === "" || $('#258').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3 && flag4) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4;
            }
            return true;
        },
        "service7CheckValidation": function () {
            var flag = true,
                swap = "1970",
                swapservdetails = "1970",
                fillMinYear;

            fillMinYear = function () {
                flag = true;
                var DOB = $('#7').val();
                if (DOB != '') {
                    var parts = DOB.split("-");
                    var year = parts[0];
                    $("#244").prop('min', year);
                    $("#245").prop('min', year);
                    $("#256").prop('min', year);
                    $("#257").prop('min', year);
                    $("#103").prop('min', year);
                    swap = year;
                    swapservdetails = year;
                    flag = true;
                } else {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u092A\u0939\u0932\u0947 \u091C\u0928\u094D\u092E \u0924\u093F\u0925\u093F \u092D\u0930\u0947\u0902;";
                    } else {
                        msg = "please fill Date of Birth first";
                    }
                    document.getElementById("7_div_Y").style.display = "block";
                    document.getElementById("7_div_Y").innerHTML = msg;
                    flag = false;
                }

                if ($("#7").val() != '') {
                    document.getElementById("7_div_Y").style.display = "none";
                }
            };
            fillMinYear();
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_25").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }
            var flag1 = true,
                flag2 = App.alfabeticValidation("79", "Y", $('#79').val()),
                flag3 = App.alfabeticValidation("81", "Y", $('#81').val()),
                flag4 = App.alfabeticValidation("253", "Y", $('#253').val()),
                flag5 = App.specialCharactersValidation("104", "Y", $('#104').val());
            flag1 = flag2 && flag3 && flag4 && flag5;

            return flag && flag1 && this.serviceFlag;
        },
        "service15": function () {

            var checkVals, numbersOnly, checkVal, pinOnly, calcAge, getDate, getDate1, givenDate, applDate, DeathDate, year, flag = true,
                adhaarOnly, that = this;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {

                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#231').blur(function () {
                adhaarOnly(231);
            });
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    that.serviceFlag = false;
//                    flag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                    that.serviceFlag = true;
//                }
            };
            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("237_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            checkVal = function () {
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#82').val();
                if (str.substring(0, 1) == '0') {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            calcAge = function () {
                $('#53').val('');
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy; // DOB is variable
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    givenDate = new Date(DateMetaForm);
                    var dt1 = DeathDate;
                    var birthDate = new Date(dt1);
                    var years = (givenDate.getFullYear() - birthDate.getFullYear());
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; 41 &#2357;&#2352;&#2381;&#2359; &#2319;&#2357;&#2306; 79 &#2357;&#2352;&#2381;&#2359; &#2325;&#2375; &#2348;&#2367;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    } else {
                        msg = "Date of Birth should be between 41 year to 79 year";
                    }
                    if (givenDate.getMonth() < birthDate.getMonth() ||
                        givenDate.getMonth() == birthDate.getMonth() && givenDate.getDate() < birthDate.getDate()) {
                        year = 0;
                    }
                    if (years > 40 && years < 80) {
                        $('#53').val(years);
                        that.serviceFlag = true;
                        //  App.checkValue('53','Y','text');
                    } else {
                        $('#7').val('');
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    }
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy; // DOB is variable
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        //alert("Date Of Birth Can't Be Future Date.");
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            getDate1 = function () {
                var str = $('#215').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy; // DOB is variable
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = " &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Can't Be Future Date.";
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#215').val('');
                        document.getElementById("215_div_N").style.display = "block";
                        document.getElementById("215_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("215_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#53").prop('maxlength', 2);
            $("#82").prop('maxlength', 6);
            $("#237").prop('maxlength', 18);
            $("#128").prop('maxlength', 8);
            $("#218").prop('maxlength', 18);
            $("#217").prop('maxlength', 18);
            $("#238").prop('maxlength', 11);
            $("#230").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $("#232").prop('maxlength', 25);
            $("#237").prop('maxlength', 18);
            $("#53").prop('readonly', true);
            $('#238').keyup(function () {
                this.value = this.value.toUpperCase();
            });
            $('#238').blur(function () {
                checkVals();
            });
            $('#215').blur(function () {
                getDate1();
            });
            $('#237').blur(function () {
                numbersOnly();
            });
            $('#82').blur(function () {
                pinOnly();
            });
            $('#7').blur(function () {
                getDate();
                calcAge();
            });
        },
        "service15CheckValidation": function () {
            var pinOnly, numbersOnly, checkVals, flag = true;
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                //alert(str);
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };
            numbersOnly = function () {
                flag = true;
                //var letters =/^\d+\d/; 
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                //alert(str);
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("237_div_Y").style.display = "none";
            };
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                //alert(str);
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                } else
//                    document.getElementById("238_div_N").style.display = "none";
            };
            pinOnly();
            if (flag) {
                numbersOnly();
            }
            if (flag) {
                checkVals();
            }
            var flag2 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag3 = App.alfaNumericValidation("237", "Y", $('#237').val()),
                flag4 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag5 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag6 = App.alfaNumericValidation("231", "N", $('#231').val()),
                flag7 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag8 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag9 = App.specialCharactersValidation("376", "Y", $('#376').val()),
                flag10 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag11 = App.specialCharactersValidation("212", "Y", $('#212').val()),
                flag12 = App.specialCharactersValidation("213", "Y", $('#213').val()),
                flag14 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag15 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag16 = App.specialCharactersValidation("216", "N", $('#216').val()),
                flag17 = App.specialCharactersValidation("217", "N", $('#217').val()),
                flag18 = App.specialCharactersValidation("218", "N", $('#218').val()),
                flag19 = App.specialCharactersValidation("230", "N", $('#230').val());
            var flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag14 && flag15 && flag16 && flag17 && flag18 && flag19;
            return (flag && flag1 && this.serviceFlag);
        },
        "service16": function () {
            var showDate, getDate, getVal, heiringDate1, beforeDate, beforeDate2, applDate, birthdayDate, flag = true,
                that = this;
            getVal = function () {

                var str1 = $('#1078').val();
                var str2 = $('#1079').val();
                var str3 = str1 + "/" + str2;
                $('#12').val(str3);
            };
            showDate = function () {
                if ($('#1083 option:selected').attr('id') === 'opt_759') {
                    $("#1084").prop('disabled', false);
                    console.log("1a");
                    App.makeAttrMand(1084, 'red', 'Y');
                } else {
                    $("#1084").prop('disabled', true);
                    App.makeAttrMand(1084, 'red', 'N');
                }
            };
            beforeDate = function () {
                flag = true;
                var lang = App.retrieveLang();
                var D1 = $('#1082').val();
                var D2 = $('#1081').val();
                var msg = null;
                if (D2 <= D1) {
                    document.getElementById("1082_div_Y").style.display = "none";
                    that.serviceFlag = true;
                    flag = true;
                } else {
                    if (lang == "hi")
                        msg = "\u0938\u0941\u0928\u0935\u093E\u0908 \u0915\u0940 \u092A\u0939\u0932\u0940 \u0924\u093E\u0930\u0940\u0916 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                    else
                        msg = "Can't Be before date of hearing first date.";
                    document.getElementById("1082_div_Y").style.display = "block";
                    document.getElementById("1082_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                }
            };
            beforeDate2 = function () {
                flag = true;
                var lang = App.retrieveLang();
                var D1 = $('#1084').val();
                var D2 = $('#1082').val();
                var msg = null;
                if (D2 <= D1) {
                    document.getElementById("1084_div_Y").style.display = "none";
                    that.serviceFlag = true;
                    flag = true;
                } else {
                    if (lang == "hi")
                        msg = "\u0938\u0941\u0928\u0935\u093E\u0908 \u0915\u0940 \u0905\u0917\u0932\u0940 \u0924\u093E\u0930\u0940\u0916 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                    else
                        msg = "Can't Be before date of hearing last date.";
                    document.getElementById("1084_div_Y").style.display = "block";
                    document.getElementById("1084_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                }
            };
            getDate = function () {
                var str = $('#1076').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#1076').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Can't Be Future Date.";
                        document.getElementById("1076_div_N").style.display = "block";
                        document.getElementById("1076_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("1076_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };

            function heiringDate1() {
                var str = $('#1081').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days > 0) {
                        $('#1081').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u0924\u093F\u0925\u093F \u0938\u0947 \u092A\u0939\u0932\u0947 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Can't Be before Date.";
                        document.getElementById("1081_div_Y").style.display = "block";
                        document.getElementById("1081_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("1081_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#517").prop('maxlength', 20);
            $("#853").prop('maxlength', 30);
            $("#53").prop('maxlength', 3);
            $("#1075").prop('maxlength', 15);
            $("#12").prop('readonly', true);
            $("#1077").prop('readonly', true);
            $("#1084").prop('disabled', true);
            $("#1077").prop('disabled', true);
            $("#div-1077").hide();
            $('#1079').blur(function () {
                getVal();
            });
            $('#1083').change(function () {
                showDate();
            });
            $('#1076').blur(function () {
                getDate();
            });
            $('#1078').blur(function () {
                getVal();
            });
            $('#1081').blur(function () {
                heiringDate1();
            });
            $('#1082').blur(function () {
                beforeDate();
                beforeDate2();
            });
            $('#1084').blur(function () {
                beforeDate2();
            });
        },
        "service16FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "165") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                    flag3 = App.alfabeticValidation("556", "Y", $('#556').val());
                if ($('#104').val() === "" || $('#209').val() === "" || $('#556').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3;
            }
            if (fieldsetid === "166") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("372", "Y", $('#372').val()),
                    flag3 = App.alfabeticValidation("588", "Y", $('#588').val());
                if ($('#372').val() === "" || $('#541').val() === "" || $('#588').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3;
            }
            return true;
        },
        "service16CheckValidation": function () {
            var flag0 = true,
                flag = true,
                flag00 = true,
                flag1 = true;
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_165").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
                if (document.getElementById("fieldSetMasterValues_166").value.trim() == "") {
                    flag00 = false;
                } else {
                    flag00 = true;
                }
            }
            var beforeDate2 = function () {
                flag0 = true;
                var lang = App.retrieveLang();
                var D1 = $('#1084').val();
                var D2 = $('#1082').val();
                var msg = null;
                if (D2 <= D1) {
                    document.getElementById("1084_div_Y").style.display = "none";
                    flag0 = true;
                } else {
                    if (lang == "hi")
                        msg = "\u0938\u0941\u0928\u0935\u093E\u0908 \u0915\u0940 \u0905\u0917\u0932\u0940 \u0924\u093E\u0930\u0940\u0916 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                    else
                        msg = "Can't Be before date of hearing last date.";
                    document.getElementById("1084_div_Y").style.display = "block";
                    document.getElementById("1084_div_Y").innerHTML = msg;
                    flag0 = false;
                }
            };
            beforeDate2();
            var flag2 = App.alfaNumericValidation("1075", "Y", $('#1075').val()),
                flag3 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag4 = App.alfabeticValidation("556", "Y", $('#556').val()),
                flag5 = App.alfabeticValidation("372", "Y", $('#372').val()),
                flag6 = App.alfabeticValidation("588", "Y", $('#588').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6;
            return (flag00 && flag && flag1 && flag0 && this.serviceFlag);
        },
        "service17": function () {
            var calcAge, givenDate, applDate, DeathDate, year, flag = true,
                that = this;
            calcAge = function () {
                var str = $('#896').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#896').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u0905\u0926\u093E\u0932\u0924 \u0915\u0947 \u0906\u0926\u0947\u0936 \u0915\u0940 \u0924\u093F\u0925\u093F \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Date Of court order Can't Be Future Date.";
                        document.getElementById("896_div_Y").style.display = "block";
                        document.getElementById("896_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("896_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#614").prop('maxlength', 100);
            $('#896').blur(function () {
                calcAge();
            });
            return flag;
        },

        "service17CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfabeticValidation("614", "Y", $('#614').val()),
                flag3 = App.alfabeticValidation("897", "Y", $('#897').val()),
                flag4 = App.specialCharactersValidation("12", "Y", $('#12').val());
            flag1 = flag2 && flag3 && flag4;
            return (flag && flag1 && this.serviceFlag);

        },
        "service18": function () {
            var getDate, setFieldSetVal, maxAge, mobNumber, pinOnly, fieldSelected, flag = true,
                that = this,
                applDate;
            getDate = function () {
                var str = $('#911').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));

                    if (days < 0) {
                        $('#911').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u092E\u0941\u0926\u094D\u0926\u0947 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Issue Date Can't Be Future Date.";
                        document.getElementById("911_div_N").style.display = "block";
                        document.getElementById("911_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("911_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            maxAge = function () {
                flag = true;
                var letters = /^[0-9]{2}$/i;
                var str = $('#53').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u0909\u092E\u094D\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid age";
                }
                if (!sls.match(letters)) {
                    $('#53').val('');
                    document.getElementById("53_div_Y").style.display = "block";
                    document.getElementById("53_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("53_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            mobNumber = function () {
                flag = true;
                var letters = /^([7-9][0-9]{9})$/;
                var str = $('#914').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "Please enter valid mobile number";
                }
                if (!sls.match(letters)) {
                    $('#914').val('');
                    document.getElementById("914_div_N").style.display = "block";
                    document.getElementById("914_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("914_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "Please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_N").style.display = "block";
                    document.getElementById("82_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };

            $("#900").prop('maxlength', 25);
            $("#82").prop('maxlength', 6);
            $("#901").prop('maxlength', 100);
            $("#903").prop('maxlength', 50);
            $("#372").prop('maxlength', 100);
            $("#798").prop('maxlength', 50);
            $("#53").prop('maxlength', 3);
            $("#904").prop('maxlength', 50);
            $("#906").prop('maxlength', 30);
            $("#907").prop('maxlength', 10);
            $("#82").prop('maxlength', 6);
            $("#922").prop('maxlength', 2);
            $("#914").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $('#927').val('');
            $('#82').blur(function () {
                pinOnly();
            });
            $('#911').blur(function () {
                getDate();
            });
            $('#914').blur(function () {
                mobNumber();
            });
            $('#116').change(function () {
                var caste = $('#116 option:selected').attr('id'),
                    castes = caste.split("~");
                $('#98').val(castes[0].split("_")[1]);
            });
            $('#dropDown1').blur(function () {
                fieldSelected();
            });
            $("#dropDown1").change(function () {
                $("#dropDown2").val('');
            });

            $('#53').blur(function () {
                maxAge();
            });
            $("#98").prop('disabled', true);
        },

        "service18FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "141") {
                var flag1 = true,
                    flag4 = true,
                    adhaarOnly;
                adhaarOnly = function (id) {
                    flag4 = true;
                    var letters = /^\d{12}$/;
                    var str = $('#' + id).val();
                    var sls = str;
                    var lang = App.retrieveLang();
                    var msg = null;

                    if (lang == 'hi') {
                        msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";

                    } else {
                        msg = "Please enter 12 digit valid adhaar number";

                    }

                    if (!(sls === "") && !sls.match(letters)) {

                        document.getElementById(id + "_div_N").style.display = "block";
                        document.getElementById(id + "_div_N").innerHTML = msg;
                        flag4 = false;

                    } else {
                        document.getElementById(id + "_div_N").style.display = "none";
                    }
                };
                $('#231').blur(function () {
                    adhaarOnly(231);
                });
                var flag2 = App.alfaNumericValidation("53", "Y", $('#53').val()),
                    flag3 = App.alfaNumericValidation("231", "N", $('#231').val()),
                    flag5 = App.alfabeticValidation("556", "Y", $('#556').val());
                if ($('#53').val() === "" || $('#556').val() === "" || $('#8').val() === "" || $('#923').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3 && flag4 && flag5) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2 && flag3 && flag4 && flag5;
            }

            return true;
        },

        "service18CheckValidation": function () {
            var flag = true,
                flag1 = true;
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_141").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }
            var flag2 = App.alfaNumericValidation("900", "Y", $("#900").val()),
                flag3 = App.alfabeticValidation("901", "Y", $("#901").val()),
                flag4 = App.alfabeticValidation("372", "N", $("#372").val()),
                flag5 = App.alfabeticValidation("911", "N", $("#911").val()),
                flag6 = App.alfabeticValidation("921", "N", $("#921").val()),
                flag7 = App.alfaNumericValidation("82", "N", $("#82").val()),
                flag8 = App.specialCharactersValidation("798", "N", $('#798').val()),
                flag9 = App.specialCharactersValidation("903", "N", $('#903').val()),
                flag10 = App.specialCharactersValidation("904", "N", $('#904').val()),
                flag11 = App.specialCharactersValidation("906", "N", $('#906').val()),
                flag12 = App.alfabeticNumericValidation("232", "N", $('#232').val()),
                flag13 = App.specialCharactersValidation("950", "N", $('#950').val()),
                flag14 = App.specialCharactersValidation("952", "N", $('#952').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14;
            return flag && flag1 && this.serviceFlag;
        },
        "service12": function () {
            var checkVals, numbersOnly, pinOnly, getDate, calcAge, flag = true,
                that = this,
                DeathDate, givenDate, applDate, year, adhaarOnly;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {
                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                    that.serviceFlag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                    that.serviceFlag = true;
//                }
            };
            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("237_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            calcAge = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    givenDate = new Date(DateMetaForm);
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; 60 &#2357;&#2352;&#2381;&#2359; &#2351;&#2366; &#2309;&#2343;&#2367;&#2325; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    } else {
                        msg = "Date of Birth should be 60 or greater than 60 year ";
                    }
                    var dt1 = DeathDate;
                    var birthDate = new Date(dt1);
                    var years = (givenDate.getFullYear() - birthDate.getFullYear());
                    if (givenDate.getMonth() < birthDate.getMonth() ||
                        givenDate.getMonth() == birthDate.getMonth() && givenDate.getDate() < birthDate.getDate()) {
                        year = 0;
                    }
                    if (years >= 60) {
                        $('#53').val(years);
                        that.serviceFlag = true;
                    } else {
                        $('#7').val('');
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    }
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#53").prop('maxlength', 2);
            $("#82").prop('maxlength', 6);
            $("#237").prop('maxlength', 18);
            $("#128").prop('maxlength', 8);
            $("#218").prop('maxlength', 18);
            $("#217").prop('maxlength', 18);
            $("#238").prop('maxlength', 11);
            $("#230").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $("#232").prop('maxlength', 25);
            $("#53").prop('readonly', true);
            $('#238').keyup(function () {
                this.value = this.value.toUpperCase();
            });
            $('#238').blur(function () {
                checkVals();
            });
            $('#237').blur(function () {
                numbersOnly();
            });
            $('#82').blur(function () {
                pinOnly();
            });
            $('#7').blur(function () {
                getDate();
                calcAge();
            });
            $('#231').blur(function () {
                adhaarOnly(231);
            });


        },
        "service12CheckValidation": function () {
            var pinOnly, numbersOnly, checkVals, flag = true,
                flag1 = true;
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";

                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };

            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";

                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("237_div_Y").style.display = "none";
            };

            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                } else
//                    document.getElementById("238_div_N").style.display = "none";
            };
            pinOnly();
            if (flag) {
                numbersOnly();
            }
            if (flag) {
                checkVals();
            }
            var flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag3 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag4 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag5 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag6 = App.alfaNumericValidation("237", "Y", $('#237').val()),
                flag7 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag8 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag9 = App.alfaNumericValidation("231", "N", $('#231').val()),
                flag10 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag11 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag12 = App.specialCharactersValidation("376", "Y", $('#376').val()),
                flag13 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag14 = App.specialCharactersValidation("212", "Y", $('#212').val()),
                flag15 = App.specialCharactersValidation("213", "Y", $('#213').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14 && flag15;
            return (flag && flag1 && this.serviceFlag);
        },
        "service13": function () {
            var getDate, getDate1, calcAge, getVal, getper1, numbersOnly, getper2, pinOnly, checkVals, flag = true,
                that = this,
                DeathDate, givenDate, applDate, year, adhaarOnly;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {
                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                    that.serviceFlag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                    that.serviceFlag = true;
//                }
            };
            getper1 = function () {
                var str = $('#53').val();
                var str1 = $('#227').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2344;&#2367;&#2307;&#2358;&#2325;&#2381;&#2340;&#2340;&#2366; &#2325;&#2366; &#2346;&#2381;&#2352;&#2340;&#2367;&#2358;&#2340; 41 &#2360;&#2375; 79 &#2325;&#2375; &#2348;&#2368;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                } else {
                    msg = "Disability Percentage Should be between 41 to 79 ";
                }
                if ((str < 6 || str > 17) && str != '') {
                    if (str1 < 41 || str1 > 79) {
                        $('#227').val('');
                        document.getElementById("227_div_N").style.display = "block";
                        document.getElementById("227_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("227_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("237_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getper2 = function () {
                var str = $('#53').val();
                var str1 = $('#380').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2344;&#2367;&#2307;&#2358;&#2325;&#2381;&#2340;&#2340;&#2366; &#2325;&#2366; &#2346;&#2381;&#2352;&#2340;&#2367;&#2358;&#2340; 41 &#2360;&#2375; 79 &#2325;&#2375; &#2348;&#2368;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                } else {
                    msg = "Disability Percentage Should be between 41 to 79 ";
                }
                if ((str < 6 || str > 17) && str != '') {
                    if (str1 < 41 || str1 > 79) {
                        $('#380').val('');
                        document.getElementById("380_div_N").style.display = "block";
                        document.getElementById("380_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("380_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            getVal = function () {
                $('#53').val('');
                $('#7').val('');
            };
            calcAge = function () {
                $('#53').val('');
                $('#227').val('');
                $('#380').val('');
                document.getElementById("227_div_N").style.display = "none";
                document.getElementById("380_div_N").style.display = "none";
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    givenDate = new Date(DateMetaForm);
                    var lang = App.retrieveLang();
                    var msg = null;
                    var msg1 = null;
                    if (lang == 'hi') {
                        msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2412; &#2357;&#2352;&#2381;&#2359; &#2319;&#2357;&#2306; &#2411;&#2415; &#2357;&#2352;&#2381;&#2359; &#2325;&#2375; &#2348;&#2367;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        msg1 = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2412;&#2406; &#2357;&#2352;&#2381;&#2359; &#2360;&#2375; &#2325;&#2350; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    } else {
                        msg = "Date of Birth should be between 6 year to 59 year";
                        msg1 = "Date of Birth should be less than 60 year ";
                    }
                    var dt1 = DeathDate;
                    var birthDate = new Date(dt1);
                    var years = (givenDate.getFullYear() - birthDate.getFullYear());
                    if (givenDate.getMonth() < birthDate.getMonth() ||
                        givenDate.getMonth() == birthDate.getMonth() && givenDate.getDate() < birthDate.getDate()) {
                        year = 0;
                    }
                    if ($('#737 option:selected').attr('id') == 'opt_2004') {
                        if (years >= 6 && years < 60) {
                            $('#53').val(years);
                            that.serviceFlag = true;
                            //  App.checkValue('53','Y','text');
                        } else {
                            $('#7').val('');
                            document.getElementById("7_div_Y").style.display = "block";
                            document.getElementById("7_div_Y").innerHTML = msg;
                            that.serviceFlag = false;
                        }
                    } else {
                        if (years < 60) {
                            $('#53').val(years);
                            that.serviceFlag = true;
                            //   App.checkValue('53','Y','text');
                        } else {
                            $('#7').val('');
                            document.getElementById("7_div_Y").style.display = "block";
                            document.getElementById("7_div_Y").innerHTML = msg1;
                            that.serviceFlag = false;
                            return false;
                        }
                    }
                    var age = $('#53').val();
                    if (age == '') {
                        $("#227").prop('min', 1);
                        $("#227").prop('max', 99);
                        $("#380").prop('min', 1);
                        $("#380").prop('max', 99);
                    } else if (age < 6 || age > 17) {
                        $("#227").prop('min', 41);
                        $("#227").prop('max', 79);
                        $("#380").prop('min', 41);
                        $("#380").prop('max', 79);
                    } else {
                        $("#227").prop('min', 1);
                        $("#227").prop('max', 99);
                        $("#380").prop('min', 1);
                        $("#380").prop('max', 99);
                    }
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Date of Birth Can't Be Future Date.";
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return flag;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            getDate1 = function () {
                var str = $('#215').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = " &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Can't Be Future Date.";
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#215').val('');
                        document.getElementById("215_div_N").style.display = "block";
                        document.getElementById("215_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return flag;
                    } else {
                        document.getElementById("215_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#53").prop('maxlength', 2);
            $("#82").prop('maxlength', 6);
            $("#237").prop('maxlength', 18);
            $("#128").prop('maxlength', 8);
            $("#218").prop('maxlength', 18);
            $("#217").prop('maxlength', 18);
            $("#238").prop('maxlength', 11);
            $("#230").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $("#232").prop('maxlength', 25);
            $("#53").prop('readonly', true);
            $("#227").prop('min', 1);
            $("#227").prop('max', 99);
            $('#215').blur(function () {
                getDate1();
            });

            $('#238').keyup(function () {
                this.value = this.value.toUpperCase();
            });

            $('#7').blur(function () {
                getDate();
                calcAge();
            });

            $('#737').blur(function () {
                getVal();

            });
            $('#227').blur(function () {
                getper1();

            });

            $('#237').blur(function () {
                numbersOnly();

            });

            $('#380').blur(function () {
                getper2();

            });

            $('#82').blur(function () {
                pinOnly();

            });

            $('#238').blur(function () {
                checkVals();

            });
            $('#231').blur(function () {
                adhaarOnly(231);

            });
        },
        "service13CheckValidation": function () {
            var pinOnly, numbersOnly, checkVals, flag = true,
                flag1 = true;
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };

            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("237_div_Y").style.display = "none";
            };

            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                } else
//                    document.getElementById("238_div_N").style.display = "none";
            };
            pinOnly();
            if (flag) {
                numbersOnly();
            }
            if (flag) {
                checkVals();
            }
            var flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag3 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag4 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag5 = App.alfaNumericValidation("237", "Y", $('#237').val()),
                flag6 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag7 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag8 = App.alfaNumericValidation("231", "N", $('#231').val()),
                flag9 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag10 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag11 = App.specialCharactersValidation("376", "Y", $('#376').val()),
                flag12 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag13 = App.specialCharactersValidation("212", "Y", $('#212').val()),
                flag14 = App.specialCharactersValidation("213", "Y", $('#213').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag8 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14;
            return (flag && flag1 && this.serviceFlag);
        },
        "service14": function () {
            var checkVal, getDate1, checkVals, numbersOnly, clearVals, getDate, calcAge, flag = true,
                that = this,
                DeathDate, givenDate, applDate, msg1, year, adhaarOnly;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                //alert(str);
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {
                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#231').blur(function () {
                adhaarOnly(231);
            });
            clearVals = function () {
                $('#53').val(' ');
                $('#7').val(' ');
            };
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters) && $('#237').val() != '') {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    that.serviceFlag = false;
//                    flag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                    that.serviceFlag = true;
//                }
            };
            checkVal = function () {
                var lang = App.retrieveLang();
                var msg = null;
                var msg1 = null;
                if (lang == 'hi') {
                    msg = "&#2346;&#2367;&#2344; &#2325;&#2379;&#2337; 0 &#2360;&#2375; &#2358;&#2369;&#2352;&#2369;&#2357;&#2366;&#2340; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    msg1 = "&#2325;&#2371;&#2346;&#2351;&#2366; 6 &#2309;&#2306;&#2325; &#2357;&#2376;&#2343; &#2346;&#2367;&#2344;&#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Pincode Shoul not Start With 0 ";
                    msg1 = "Enter 6 Digit Valid Pincode No.";
                }
                var str = $('#82').val();
                if (str.substring(0, 1) == '0') {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                } else if (str.length != 6) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg1;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            numbersOnly = function () {
                var letters = /^\d+/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "??? ???? ?????? ???? ????";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters) && $('#236').val() != '') {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("237_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            calcAge = function () {
                $('#53').val('');
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    givenDate = new Date(DateMetaForm);
                    var dt1 = DeathDate;
                    var birthDate = new Date(dt1);
                    var years = (givenDate.getFullYear() - birthDate.getFullYear());
                    if (givenDate.getMonth() < birthDate.getMonth() ||
                        givenDate.getMonth() == birthDate.getMonth() && givenDate.getDate() < birthDate.getDate()) {
                        year = 0;
                    }
                    var lang = App.retrieveLang();
                    var msg = null;
                    var msg1 = null;
                    if (lang == 'hi') {
                        msg = "&#2310;&#2351;&#2369; &#2407;&#2414; &#2357;&#2352;&#2381;&#2359; &#2319;&#2357;&#2306; &#2409;&#2415; &#2357;&#2352;&#2381;&#2359; &#2325;&#2375; &#2348;&#2367;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319; ( &#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2367;&#2343;&#2357;&#2366; &#2346;&#2375;&#2306;&#2358;&#2344; &#2351;&#2379;&#2332;&#2344;&#2366; &#2350;&#2375;&#2306; &#2310;&#2357;&#2375;&#2342;&#2344; &#2325;&#2352;&#2375;&#2306;)";
                        msg1 = "&#2310;&#2351;&#2369; 18 &#2357;&#2352;&#2381;&#2359; &#2319;&#2357;&#2306; 59  &#2357;&#2352;&#2381;&#2359; &#2325;&#2375; &#2348;&#2367;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319; ";
                    } else {
                        msg = "Age should be between 18 year to 39 year(Please Apply in Application for inclusion in Widow Pension)";
                        msg1 = "Age should be between 18 year to 59 year ";
                    }
                    if ($('#224 option:selected').attr('id') == 'opt_88') {
                        if (years >= 18 && years < 40) {
                            $('#53').val(years);
                            that.serviceFlag = true;
                        } else {
                            $('#7').val('');
                            document.getElementById("7_div_Y").style.display = "block";
                            document.getElementById("7_div_Y").innerHTML = msg;
                            that.serviceFlag = false;
                        }
                    } else {
                        if (years >= 18 && years < 60) {
                            $('#53').val(years);
                            that.serviceFlag = true;
                        } else {
                            $('#7').val('');
                            document.getElementById("7_div_Y").style.display = "block";
                            document.getElementById("7_div_Y").innerHTML = msg1;
                            that.serviceFlag = false;
                            return flag;
                        }
                    }
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Date of Birth Can't Be Future Date.";
                    if (days < 0) {
                        $('#7').val('');
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return flag;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            getDate1 = function () {
                var str = $('#215').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = " &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Can't Be Future Date.";
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#215').val('');
                        document.getElementById("215_div_N").style.display = "block";
                        document.getElementById("215_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return flag;
                    } else {
                        document.getElementById("215_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };

            $("#53").prop('maxlength', 2);
            $("#82").prop('maxlength', 6);
            $("#237").prop('maxlength', 18);
            $("#128").prop('maxlength', 8);
            $("#218").prop('maxlength', 18);
            $("#217").prop('maxlength', 18);
            $("#238").prop('maxlength', 11);
            $("#230").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $("#232").prop('maxlength', 25);
            $("#53").prop('readonly', true);
            $('#238').keyup(function () {
                this.value = this.value.toUpperCase();
            });
            $('#82').blur(function () {
                checkVal();
            });
            $('#215').blur(function () {
                getDate1();
            });
            $('#238').blur(function () {
                checkVals();
            });
            $('#237').blur(function () {
                numbersOnly();
            });
            $('#224').blur(function () {
                clearVals();
            });
            $('#7').blur(function () {
                getDate();
                calcAge();
            });
        },
        "service14CheckValidation": function () {
            var checkVals, numbersOnly, flag = true,
                flag1 = true;
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters) && $('#237').val() != '') {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                } else
//                    document.getElementById("238_div_N").style.display = "none";
            };
            numbersOnly = function () {
                var letters = /^\d+/;
                var str = $('#237').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!sls.match(letters) && $('#236').val() != '') {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("237_div_Y").style.display = "none";
            };
            checkVals();
            numbersOnly();
            var flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag3 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag4 = App.alfabeticValidation("376", "Y", $('#376').val()),
                flag5 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag6 = App.alfaNumericValidation("237", "Y", $('#237').val()),
                flag7 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag8 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag9 = App.alfaNumericValidation("231", "N", $('#231').val()),
                flag10 = App.specialCharactersValidation("376", "Y", $('#376').val()),
                flag11 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag12 = App.specialCharactersValidation("212", "Y", $('#212').val()),
                flag13 = App.specialCharactersValidation("213", "Y", $('#213').val()),
                flag14 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag15 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag16 = App.specialCharactersValidation("216", "N", $('#216').val()),
                flag17 = App.specialCharactersValidation("217", "N", $('#217').val()),
                flag18 = App.specialCharactersValidation("218", "N", $('#218').val()),
                flag19 = App.specialCharactersValidation("230", "N", $('#230').val());

            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13 && flag14 && flag15 && flag16 && flag17 && flag18 && flag19;

            return (flag && flag1 && this.serviceFlag);

        },
        "service21": function () {
            var mandVal, getDate, pinOnly, getDate612, givenDate, applDate, DeathDate, flag = true,
                that = this;
            getDate = function () {
                var str = $('#603').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = "\u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                    else
                        msg = "Can't Be Future Date.";
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#603').val('');
                        document.getElementById("603_div_Y").style.display = "block";
                        document.getElementById("603_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("603_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getDate612 = function () {
                document.getElementById("612_div_Y").style.display = "none";
                var str = $('#612').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = "\u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                    else
                        msg = "Can't Be Future Date.";
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#612').val('');
                        document.getElementById("612_div_Y").style.display = "block";
                        document.getElementById("612_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("612_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#601").prop('disabled', true);
            $("#602").prop('disabled', true);
            $("#603").prop('disabled', true);
            $("#601").prop('maxlength', 15);
            $("#82").prop('maxlength', 6);
            $("#602").prop('maxlength', 15);
            $("#611").prop('maxlength', 4);
            $("#604").prop('maxlength', 300);
            $("#605").prop('maxlength', 300);
            $("#606").prop('maxlength', 300);
            $("#608").prop('maxlength', 300);
            $("#609").prop('maxlength', 300);
            $("#598").prop('maxlength', 17);
            $('#603').blur(function () {
                getDate();
            });
            $('#1073').on('change', function () {
                if ($('#1073 option:selected').attr('id') == 'opt_759') {
                    App.makeAttrMand(601, 'red', 'Y');
                    App.makeAttrMand(602, 'red', 'Y');
                    App.makeAttrMand(603, 'red', 'Y');
                    $("#601").prop('disabled', false);
                    $("#602").prop('disabled', false);
                    $("#603").prop('disabled', false);
                } else {
                    App.makeAttrMand(601, 'red', 'N');
                    App.makeAttrMand(602, 'red', 'N');
                    App.makeAttrMand(603, 'red', 'N');
                    $("#601").prop('disabled', true);
                    $("#602").prop('disabled', true);
                    $("#603").prop('disabled', true);
                }
            });
            $('#82').blur(function () {
                pinOnly();
            });
        },
        "service21CheckValidation": function () {
            var pinOnly, flag = true,
                flag1 = true;
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };
            pinOnly();
            var flag2 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag3 = App.specialCharactersValidation("904", "Y", $('#904').val()),
                flag4 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag5 = App.specialCharactersValidation("608", "Y", $('#608').val()),
                flag6 = App.alfabeticValidation("609", "Y", $('#609').val()),
                flag7 = App.alfabeticValidation("604", "Y", $('#604').val()),
                flag8 = App.alfabeticValidation("605", "Y", $('#605').val()),
                flag9 = App.alfaNumericValidation("611", "Y", $('#611').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9;
            return (flag && flag1 && this.serviceFlag);
        },
        "service11": function () {
            var showSubSection, validate, that = this;
            $('#657').val('');
            $('#876').change(function () {
                showSubSection();
            });
            showSubSection = function () {
                var sectionId = $('#876 option:selected').attr('id');
                var parentId = sectionId.substring(4, 8);
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2330;&#2369;&#2344;&#2375;&#2306;";
                } else {
                    msg = "Select";
                }
                var url = App.url,
                    envelope, response, jsonResponse, output;
                envelope = App.envelopeGenerator({
                    "lang": App.retrieveLang(),
                    "refDataId": parentId
                }, "getSubSection");
                output = App.makeAjaxCall1("POST", url, envelope);
                output.success(function (data) {
                    response = App.getJsonObj(data);
                    console.log(response);
                    jsonResponse = $.parseJSON(response.getSubSectionReturn);
                    var optionsValues = '<option value="">' + msg + ' </option>';
                    _.each(jsonResponse.SUBSECTION, function (item, val) {
                        console.log(item + "," + val);
                        optionsValues += '<option value="' + item + '">' + item + '</option>';
                    });
                    var options = $('#877');
                    options.html(optionsValues);
                    $.mobile.loading("hide");
                    $("body").removeClass('ui-disabled');
                });
            };
            validate = function () {
                flag = true;
                if ($("#877").val() == '') {
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0938\u0947 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902";
                    } else {
                        msg = "please select values from the list";
                    }
                    document.getElementById("877_div_Y").style.display = "block";
                    document.getElementById("877_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                    return flag;
                } else {
                    document.getElementById("877_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
        },
        "service11CheckValidation": function () {
            var flag = true,
                validate, flag1 = true;
            validate = function () {
                flag = true;
                if ($("#877").val() == '') {
                    //alert("select");
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0938\u0947 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902";
                    } else {
                        msg = "please select values from the list";
                    }
                    //flag=false;
                    document.getElementById("877_div_Y").style.display = "block";
                    document.getElementById("877_div_Y").innerHTML = msg;
                    flag = false;
                    return flag;
                } else
                    document.getElementById("877_div_Y").style.display = "none";
            };
            //validate();

            var flag2 = App.alfabeticValidation("657", "Y", $('#657').val());
                //flag3 = App.specialCharactersValidation("1087", "N", $('#1087').val());
            flag1 = flag2;
            return (flag && flag1 && this.serviceFlag);
        },
        "service10": function () {
            var showSubSection, validate, that = this;

            $('#657').val('');
            $('#876').change(function () {
                showSubSection();
            });
            showSubSection = function () {
                var sectionId = $('#876 option:selected').attr('id');
                var parentId = sectionId.substring(4, 8);
                var lang = App.retrieveLang();
                var msg = null;

                if (lang == 'hi') {
                    msg = "&#2330;&#2369;&#2344;&#2375;&#2306;";
                } else {
                    msg = "Select";
                }

                var url = App.url,
                    envelope, response, jsonResponse, output;
                envelope = App.envelopeGenerator({
                    "lang": App.retrieveLang(),
                    "refDataId": parentId
                }, "getSubSection");
                output = App.makeAjaxCall1("POST", url, envelope);
                output.success(function (data) {
                    response = App.getJsonObj(data);
                    console.log(response);
                    jsonResponse = $.parseJSON(response.getSubSectionReturn);
                    var optionsValues = '<option value="">' + msg + ' </option>';
                    _.each(jsonResponse.SUBSECTION, function (item, val) {
                        console.log(item + "," + val);
                        optionsValues += '<option value="' + item + '">' + item + '</option>';
                    });
                    var options = $('#877');
                    options.html(optionsValues);
                    $.mobile.loading("hide");
                    $("body").removeClass('ui-disabled');
                });
            };
            validate = function () {
                flag = true;
                if ($("#877").val() == '') {
                    //alert("select");

                    var lang = App.retrieveLang();
                    var msg = null;


                    if (lang == 'hi') {
                        msg = "\u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0938\u0947 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902";
                    } else {
                        msg = "please select values from the list";
                    }
                    //flag=false;		
                    document.getElementById("877_div_Y").style.display = "block";
                    document.getElementById("877_div_Y").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                    return flag;
                } else {
                    document.getElementById("877_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
        },
        "service10CheckValidation": function () {
            var flag = true,
                validate, flag1 = true;
            validate = function () {
                flag = true;
                if ($("#877").val() == '') {
                    //alert("select");
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0938\u0947 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0915\u093E \u091A\u092F\u0928 \u0915\u0930\u0947\u0902";
                    } else {
                        msg = "please select values from the list";
                    }
                    //flag=false;
                    document.getElementById("877_div_Y").style.display = "block";
                    document.getElementById("877_div_Y").innerHTML = msg;
                    flag = false;
                    return flag;
                } else
                    document.getElementById("877_div_Y").style.display = "none";
            };
            validate();

            var flag2 = App.alfabeticValidation("657", "Y", $('#657').val());
            flag1 = flag2;
            return (flag && flag1 && this.serviceFlag);
        },
        "service26": function () {
            var calcAge, givenDate, applDate, DeathDate, year, flag = true,
                that = this;
            calcAge = function () {
                var str = $('#990').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#990').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u0905\u0926\u093E\u0932\u0924 \u0915\u0947 \u0906\u0926\u0947\u0936 \u0915\u0940 \u0924\u093F\u0925\u093F \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Date Of court order Can't Be Future Date.";
                        document.getElementById("990_div_Y").style.display = "block";
                        document.getElementById("990_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("990_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $('#990').blur(function () {
                calcAge();
            });
        },
        "service26CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfaNumericValidation("989", "Y", $('#989').val()),
                flag3 = App.alfabeticValidation("577", "Y", $('#577').val()),
                flag4 = App.alfabeticValidation("993", "Y", $('#993').val()),
                flag5 = App.alfabeticValidation("588", "Y", $('#588').val()),
                flag6 = App.alfabeticValidation("556", "Y", $('#556').val()),
                flag7 = App.alfabeticValidation("991", "N", $('#991').val()),
                flag8 = App.alfabeticValidation("992", "N", $('#992').val()),
                flag9 = App.alfabeticValidation("1006", "N", $('#1006').val()),
                flag10 = App.specialCharactersValidation("104", "Y", $('#104').val()),
                flag11 = App.specialCharactersValidation("541", "Y", $('#541').val()),
                flag12 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                flag13 = App.specialCharactersValidation("994", "N", $('#994').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11 && flag12 && flag13;
            return (flag && flag1 && this.serviceFlag);
        },

        "service19": function () {
            var digits17Only, flag = true,
                that = this;
            digits17Only = function () {
                flag = true;
                var letters = /^[1-9][0-9]{16}$/i;
                var str = $('#841').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध नंबर दर्ज करें";
                } else {
                    msg = "please enter valid  number";
                }
                if (!sls.match(letters)) {
                    $('#841').val('');
                    document.getElementById("841_div_N").style.display = "block";
                    document.getElementById("841_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("841_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $("#841").prop('maxlength', 17);
            $('#841').blur(function () {
                digits17Only();
            });
        },
        "service19CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfabeticValidation("836", "Y", $('#836').val()),
                flag3 = App.alfaNumericValidation("841", "N", $('#841').val());
            flag1 = flag2 && flag3;
            return (flag && flag1 && this.serviceFlag);
        },
        "service31": function () {
            var flag = true;
            return flag;
        },
        "service31CheckValidation": function () {
            var flag = true,
                flag1;
            var flag2 = App.specialCharactersValidation("977", "N", $('#977').val());
            flag1 = flag2;
            return flag && flag1;
        },
        "service30": function () {
            var getDate, givenDate, applDate, DeathDate, birthdayDate, flag = true,
                that = this;
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350;&#32;&#2325;&#2368;&#32;&#2340;&#2367;&#2341;&#2367;&#32;&#32;&#2310;&#2332;&#32;&#2325;&#2368;&#32;&#2342;&#2367;&#2344;&#2366;&#2306;&#2325;&#32;&#2360;&#2375;&#32;&#2325;&#2350;&#32;&#2361;&#2379;&#2327;&#2368;&#2404;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#795").prop('maxlength', 100);
            $("#112").prop('maxlength', 100);
            $('#7').blur(function () {
                getDate();
            });
            $('#876').change(function () {
                showSubSection();
            });
            return flag;
        },
        "service30CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfabeticValidation("915", "Y", $('#915').val()),
                flag3 = App.alfabeticValidation("857", "N", $('#857').val()),
                flag4 = App.alfabeticValidation("858", "N", $('#858').val()),
                flag5 = App.alfabeticValidation("795", "Y", $('#795').val()),
                flag6 = App.alfabeticValidation("209", "Y", $('#209').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6;
            return (flag && flag1 && this.serviceFlag);
        },

        "service32": function () {
            var getper1, getper2, checkVals, numbersOnly, pinOnly, getPerc, calcAge, getDate, getDate1, flag = true,
                that = this;
            var givenDate, applDate, DeathDate, adhaarOnly;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {
                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#231').blur(function () {
                adhaarOnly(231);
            });
            getper1 = function () {
                document.getElementById("227_div_Y").style.display = "none";
                var str1 = $('#227').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2344;&#2367;&#2307;&#2358;&#2325;&#2381;&#2340;&#2340;&#2366; &#2325;&#2366; &#2346;&#2381;&#2352;&#2340;&#2367;&#2358;&#2340; 80 &#2360;&#2375; 99 &#2325;&#2375; &#2348;&#2368;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                } else {
                    msg = "Disability Percentage Should be between 80 to 99 ";
                }
                if ($('#220 option:selected').attr('id') == 'opt_2008') {
                    if (str1 < 80 || str1 > 99) {
                        $('#227').val('');
                        document.getElementById("227_div_Y").style.display = "block";
                        document.getElementById("227_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("227_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };

            getper2 = function () {
                document.getElementById("380_div_Y").style.display = "none";
                var str1 = $('#380').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2344;&#2367;&#2307;&#2358;&#2325;&#2381;&#2340;&#2340;&#2366; &#2325;&#2366; &#2346;&#2381;&#2352;&#2340;&#2367;&#2358;&#2340; 80 &#2360;&#2375; 99 &#2325;&#2375; &#2348;&#2368;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319;";
                } else {
                    msg = "Disability Percentage Should be between 80 to 99 ";
                }
                if ($('#220 option:selected').attr('id') == 'opt_2008') {
                    if (str1 < 80 || str1 > 99) {
                        $('#380').val('');
                        document.getElementById("380_div_Y").style.display = "block";
                        document.getElementById("380_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("380_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    that.serviceFlag = false;
//                    flag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                    that.serviceFlag = true;
//                }
            };

            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!str.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("237_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            getPerc = function () {
                $('#227').val('');
                $('#380').val('');
                document.getElementById("227_div_Y").style.display = "none";
                document.getElementById("380_div_Y").style.display = "none";
                if ($('#220 option:selected').attr('id') == 'opt_2008') {
                    $("#227").prop('min', 80);
                    $("#227").prop('max', 99);
                    $("#380").prop('min', 80);
                    $("#380").prop('max', 99);
                } else {
                    $("#227").prop('min', 1);
                    $("#227").prop('max', 99);
                    $("#380").prop('min', 1);
                    $("#380").prop('max', 99);
                    $('#227').val('');
                    document.getElementById("227_div_Y").style.display = "none";
                    $('#380').val('');
                    document.getElementById("380_div_Y").style.display = "none";
                }
            };
            calcAge = function () {
                $('#53').val('');
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    givenDate = new Date(DateMetaForm);
                    var dt1 = DeathDate;
                    var birthDate = new Date(dt1);
                    var years = (givenDate.getFullYear() - birthDate.getFullYear());
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = " &#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; 18 &#2357;&#2352;&#2381;&#2359; &#2319;&#2357;&#2306; 79  &#2357;&#2352;&#2381;&#2359; &#2325;&#2375; &#2348;&#2367;&#2330; &#2361;&#2379;&#2344;&#2366; &#2330;&#2366;&#2361;&#2367;&#2319; ";
                    } else {
                        msg = "Date of Birth should be between 18 year to 79 year ";
                    }
                    if (years >= 18 && years < 80) {
                        $('#53').val(years);
                        //App.checkValue('53', 'Y', 'text');
                        that.serviceFlag = true;
                    } else {
                        $('#7').val('');
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    }
                }
            };
            getDate = function () {
                var str = $('#7').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#7').val('');
                        var lang = App.retrieveLang();
                        var msg = null;
                        if (lang == "hi")
                            msg = "&#2332;&#2344;&#2381;&#2350; &#2325;&#2368; &#2340;&#2367;&#2341;&#2367; &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                        else
                            msg = "Date Of Birth Can't Be Future Date.";
                        document.getElementById("7_div_Y").style.display = "block";
                        document.getElementById("7_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("7_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            getDate1 = function () {
                var str = $('#215').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi')
                        msg = " &#2357;&#2352;&#2381;&#2340;&#2350;&#2366;&#2344; &#2340;&#2367;&#2341;&#2367; &#2360;&#2375; &#2309;&#2343;&#2367;&#2325; &#2344;&#2361;&#2368;&#2306; &#2361;&#2379;&#2344;&#2368; &#2330;&#2366;&#2361;&#2367;&#2319;";
                    else
                        msg = "Can't Be Future Date.";
                    DeathDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - DeathDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#215').val('');
                        document.getElementById("215_div_N").style.display = "block";
                        document.getElementById("215_div_N").innerHTML = msg;
                        that.serviceFlag = false;
                        return false;
                    } else {
                        document.getElementById("215_div_N").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            $("#53").prop('maxlength', 2);
            $("#82").prop('maxlength', 6);
            $("#237").prop('maxlength', 18);
            $("#128").prop('maxlength', 8);
            $("#218").prop('maxlength', 18);
            $("#217").prop('maxlength', 18);
            $("#238").prop('maxlength', 11);
            $("#230").prop('maxlength', 10);
            $("#231").prop('maxlength', 12);
            $("#232").prop('maxlength', 25);
            $("#53").prop('readonly', true);
            $('#238').keyup(function () {
                this.value = this.value.toUpperCase();
            });
            $('#215').blur(function () {
                getDate1();
            });
            $('#238').blur(function () {
                checkVals();
            });
            $('#7').blur(function () {
                getDate();
                calcAge();
            });
            $('#220').blur(function () {
                getPerc();
            });
            $('#227').blur(function () {
                getper1();
            });
            $('#237').blur(function () {
                numbersOnly();
            });
            $('#380').blur(function () {
                getper2();

            });
            $('#82').blur(function () {
                pinOnly();
            });
        },

        "service32CheckValidation": function () {
            var pinOnly, numbersOnly, checkVals, flag = true,
                flag1 = true, flag0 = true;
            var givenDate, applDate, DeathDate, adhaarOnly;
            adhaarOnly = function (id) {
                flag = true;
                var letters = /^\d{12}$/;
                var str = $('#' + id).val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "कृपया 12 अंको का वैध आधार नम्बर दर्ज करे";
                } else {
                    msg = "please enter 12 digit valid adhaar number";
                }
                if (!(sls === "") && !sls.match(letters)) {
                    document.getElementById(id + "_div_N").style.display = "block";
                    document.getElementById(id + "_div_N").innerHTML = msg;
                    flag0 = false;
                } else {
                    document.getElementById(id + "_div_N").style.display = "none";
                    flag0 = true;
                }
            };
            adhaarOnly(231);
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध पिन नंबर दर्ज करें";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("82_div_Y").style.display = "none";
            };
            numbersOnly = function () {
                flag = true;
                var letters = /^ *[0-9]+ *$/;
                var str = $('#237').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "वैध खाता संख्या दर्ज करें";
                } else {
                    msg = "please enter valid account number";
                }
                if (!str.match(letters)) {
                    $('#237').val('');
                    document.getElementById("237_div_Y").style.display = "block";
                    document.getElementById("237_div_Y").innerHTML = msg;
                    flag = false;
                } else
                    document.getElementById("237_div_Y").style.display = "none";
            };

            checkVals = function () {
                flag = true;
                var letters = /[A-Z|a-z]{4}[0][\d]{6}$/;
                var str = $('#238').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2310;&#2312;.&#2319;&#2347;.&#2319;&#2360;.&#2360;&#2368;. &#2325;&#2379;&#2337; &#2354;&#2367;&#2326;&#2375;&#2306;";
                } else {
                    msg = "Please Enter Valid IFSC Code ";
                }
//                if (!str.match(letters)) {
//                    $('#238').val('');
//                    document.getElementById("238_div_N").style.display = "block";
//                    document.getElementById("238_div_N").innerHTML = msg;
//                    flag = false;
//                } else {
//                    document.getElementById("238_div_N").style.display = "none";
//                }
            };
            pinOnly();
            if (flag) {
                numbersOnly();
            }
            if (flag) {
                checkVals();
            }
            var flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag3 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag4 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag5 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag6 = App.alfaNumericValidation("237", "Y", $('#237').val()),
                flag7 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag8 = App.alfabeticValidation("210", "N", $('#210').val()),
                flag9 = App.alfabeticValidation("376", "N", $('#376').val()),
//                flag10 = App.alfaNumericValidation("231", "N", $('#231').val()),
                flag11 = App.alfabeticValidation("235", "Y", $('#235').val()),
                flag12 = App.alfabeticValidation("236", "Y", $('#236').val()),
                flag13 = App.specialCharactersValidation("230", "N", $('#230').val()),
                flag14 = App.specialCharactersValidation("218", "N", $('#218').val()),
                flag15 = App.specialCharactersValidation("217", "N", $('#217').val()),
                flag16 = App.specialCharactersValidation("216", "N", $('#216').val()),
                flag17 = App.specialCharactersValidation("213", "Y", $('#213').val()),
                flag18 = App.specialCharactersValidation("212", "Y", $('#212').val()),
                flag19 = App.specialCharactersValidation("984", "N", $('#984').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag11 && flag12 && flag13 && flag14 && flag15 && flag16 && flag17 && flag18 && flag19;
            return (flag0 && flag && flag1 && this.serviceFlag);
        },
        "service33": function () {
            $("#614").prop('maxlength', 300);
            $("#618").prop('maxlength', 300);
        },
        "service33CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfabeticValidation("614", "Y", $('#614').val());
            flag1 = flag2;
            return (flag && flag1);
        },
        "service20": function () {
            var flag = true,
                amount, calcAmount;
            $("#826").prop('disabled', true);
            $("#819").blur(function () {
                calcAmount();
            });
            $("#824").blur(function () {
                calcAmount();
            });
            $("#825").blur(function () {
                calcAmount();
            });
            $("#823").blur(function () {
                calcAmount();
            });
            calcAmount = function () {
                var total;
                amount = (($("#819").val() / 100) + ($("#824").val() / 100));
                $("#823").val(amount);
                console.log(amount);
                total = (parseInt((amount * 100), 10) + (parseInt($("#825").val(), 10)));
                $("#826").val(total);
            };
        },
        "service20CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfaNumericValidation("819", "Y", $('#819').val()),
                flag3 = App.alfaNumericValidation("826", "Y", $('#826').val()),
                flag4 = App.specialCharactersValidation("104", "N", $('#104').val());
            flag1 = flag2 && flag3 && flag4;
            return (flag && flag1);
        },
        "service24": function () {
            var flag = true,
                validateTap;
            validateTap = function () {
                console.log($('#786 option:selected').attr('value'));
                if ($('#786 option:selected').attr('value') === 'No') {
                    console.log($('#786 option:selected').attr('value'));
                    $("#787").prop('disabled', true);
                } else if ($('#786 option:selected').attr('value') === 'Yes') {
                    console.log($('#786 option:selected').attr('value'));
                    $("#787").prop('disabled', false);
                }
                return true;
            };
            $('#786').change(function () {
                validateTap();
            });
            $("#799").prop('maxlength', 15);
        },
        "service24CheckValidation": function () {
            var flag = true,
                flag1 = true;
            var flag2 = App.alfaNumericValidation("799", "N", $('#799').val()),
                flag3 = App.alfabeticValidation("577", "N", $('#577').val()),
                flag4 = App.alfabeticValidation("777", "Y", $('#777').val()),
                flag5 = App.alfabeticValidation("778", "Y", $('#778').val()),
                flag6 = App.alfabeticValidation("787", "N", $('#787').val()),
                flag7 = App.alfabeticValidation("788", "N", $('#788').val()),
                flag8 = App.specialCharactersValidation("104", "Y", $('#104').val()),
                flag9 = App.specialCharactersValidation("798", "N", $('#798').val()),
                flag10 = App.specialCharactersValidation("776", "N", $('#776').val()),
                flag11 = App.specialCharactersValidation("779", "N", $('#779').val()),
               // flag12 = App.decimalValidation("780", "Y", $('#780').val());
            flag1 = flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11;
            return flag && flag1;
        },
        "service22": function () {
            var getDate, pinOnly, totalSum, fieldSelected, maxAge, applDate, flag = true,
                that = this;
            $("#538").prop('maxlength', 30);
            $("#540").prop('maxlength', 10);
            $("#82").prop('maxlength', 6);
            $("#541").prop('maxlength', 300);
            $("#107").prop('maxlength', 10);
            $("#542").prop('maxlength', 300);
            $("#543").prop('maxlength', 400);
            $("#544").prop('maxlength', 300);
            $("#545").prop('maxlength', 300);
            $("#546").prop('maxlength', 300);
            $("#556").prop('maxlength', 300);
            $("#576").prop('maxlength', 300);
            $("#577").prop('maxlength', 300);
            $("#578").prop('maxlength', 40);
            $("#588").prop('maxlength', 300);
            $("#53").prop('maxlength', 3);
            $("#584").prop('maxlength', 2);
            $("#585").prop('maxlength', 2);
            //            $("#586").prop('maxlength', 2);
            $("#598").prop('maxlength', 20);
            $("#586").prop('readonly', true);
            getDate = function () {
                var str = $('#536').val();
                if (str != '') {
                    var parts = str.split("-");
                    var dd = parts[2];
                    var mm = parts[1];
                    var yy = parts[0];
                    var month = mm;
                    var DOB = month + '/' + dd + '/' + yy;
                    var birthdayDate = new Date(DOB);
                    var DateMetaForm = App.applicationDate;
                    var lang = App.retrieveLang();
                    applDate = new Date(DateMetaForm);
                    var days = Math.ceil((applDate - birthdayDate) / (1000 * 60 * 60 * 24));
                    if (days < 0) {
                        $('#536').val('');
                        var msg = null;
                        if (lang == "hi")
                            msg = "\u0938\u094D\u0925\u093E\u092A\u0928\u093E \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E";
                        else
                            msg = "Date of Establishment Can't Be Future Date.";
                        document.getElementById("536_div_Y").style.display = "block";
                        document.getElementById("536_div_Y").innerHTML = msg;
                        that.serviceFlag = false;
                    } else {
                        document.getElementById("536_div_Y").style.display = "none";
                        that.serviceFlag = true;
                    }
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            maxAge = function () {
                flag = true;
                var letters = /^[0-9]{2}$/i;
                var str = $('#53').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u0909\u092E\u094D\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid age";
                }
                if (!sls.match(letters)) {
                    $('#53').val('');
                    document.getElementById("53_div_Y").style.display = "block";
                    document.getElementById("53_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("53_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            totalSum = function () {
                var str = $('#584').val();
                var str1 = $('#585').val();
                var str3 = parseInt(str) + parseInt(str1);
                $('#586').val(str3);
            };
            $('#536').blur(function () {
                getDate();
            });
            $('#82').blur(function () {
                pinOnly();
            });
            $('#585').blur(function () {
                totalSum();
            });
            $('#584').blur(function () {
                totalSum();
            });
            $('#dropDown1').blur(function () {
                fieldSelected();
            });
            $('#53').blur(function () {
                maxAge();
            });
        },
        "service22FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "81") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("556", "Y", $('#556').val()),
                    flag4 = App.alfabeticValidation("577", "Y", $('#577').val()),
                    flag5 = App.alfabeticValidation("578", "Y", $('#578').val()),
                    flag6 = App.alfabeticValidation("579", "Y", $('#579').val()),
                    flag7 = App.specialCharactersValidation("576", "Y", $('#576').val());
                if ($('#556').val() === "" || $('#576').val() === "" || $('#577').val() === "" || $('#578').val() === "" || $('#579').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag4 && flag5 && flag6 && flag7) {
                    alert((function () {
                        return App.lang ? "Please fill correct details" : "सही जानकारी भरें";
                    }()));
                }
                return flag1 && flag2 && flag4 && flag5 && flag6 && flag7;
            } else if (fieldsetid === "82") {
                var maxAge = function () {
                    var letters = /^[0-9]{2}$/i;
                    var str = $('#53').val();
                    var sls = str;
                    var lang = App.retrieveLang();
                    var msg = null;
                    if (lang == 'hi') {
                        msg = "\u0935\u0948\u0927 \u0909\u092E\u094D\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                    } else {
                        msg = "please enter valid age";
                    }
                    if (!sls.match(letters)) {
                        $('#53').val('');
                        document.getElementById("53_div_Y").style.display = "block";
                        document.getElementById("53_div_Y").innerHTML = msg;
                    } else {
                        document.getElementById("53_div_Y").style.display = "none";
                    }
                };
                maxAge();
                var flag1 = true,
                    flag2 = App.alfaNumericValidation("53", "Y", $('#53').val()),
                    flag3 = App.alfabeticValidation("588", "Y", $('#588').val());
                if ($('#53').val() === "" || $('#588').val() === "" || $('#8').val() === "" || $('#582').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    alert("fill correct details");
                }
                return flag1 && flag2 && flag3;
            }
            return true;
        },
        "service22CheckValidation": function () {
            var flag = true,
                flag0 = true,
                flag1 = App.alfabeticValidation("542", "Y", $('#542').val()),
                flag2 = App.alfabeticValidation("544", "Y", $('#544').val()),
                flag3 = App.alfaNumericValidation("584", "Y", $('#584').val()),
                flag7 = App.alfaNumericValidation("585", "Y", $('#585').val()),
                flag8 = App.alfabeticValidation("538", "Y", $('#538').val()),
                flag9 = App.specialCharactersValidation("541", "Y", $('#541').val()),
                flag10 = App.specialCharactersValidation("545", "N", $('#545').val()),
                flag11 = App.specialCharactersValidation("540", "Y", $('#540').val());
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_81").value.trim() == "") {
                    //---------user coloum as first parameter and fields set position for second parameter
                    flag = false;
                } else {
                    flag = true;
                }
                if (document.getElementById("fieldSetMasterValues_82").value.trim() == "") {
                    //---------user coloum as first parameter and fields set position for second parameter
                    flag0 = false;
                } else {
                    flag0 = true;
                }
            }
            return flag0 && flag && flag1 && flag2 && flag3 && flag7 && flag8 && flag9 && flag10 && flag11 && this.serviceFlag;
        },
        "service23": function () {
            var getFunction, pinOnly, flag = true,
                that = this;
            $("#614").prop('maxlength', 100);
            $("#618").prop('maxlength', 300);
            $("#626").prop('maxlength', 4);
            $("#82").prop('maxlength', 6);
            $("#621").prop('maxlength', 3);
            $("#598").prop('maxlength', 20);
            $("#626").hide();
            getFunction = function () {
                if ($('#625 option:selected').attr('id') == 'opt_759') {
                    $("#626").show();
                } else {
                    $("#626").hide();
                }
            };
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                //alert(str);
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#625').change(function () {
                getFunction();
            });
            $('#82').blur(function () {
                pinOnly();
            });
        },
        "service23FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "121") {
                var flag1 = true,
                    flag2 = App.alfabeticValidation("620", "Y", $('#620').val()),
                    flag3 = App.alfaNumericValidation("621", "Y", $('#621').val());
                if ($('#620').val() === "" || $('#621').val() === "" || $('#1072').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    alert("fill correct details");
                }
                return flag1 && flag2 && flag3;
            }
            return true;
        },
        "service23CheckValidation": function () {
            var pinOnly, flag = true,
                flag1 = App.alfabeticValidation("614", "Y", $('#614').val());
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                //alert(str);
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };
            pinOnly();
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_121").value.trim() == "") {
                    //---------user coloum as first parameter and fields set position for second parameter
                    flag = false;
                } else {
                    flag = true;
                }
                var flag2 = App.specialCharactersValidation("904", "Y", $('#904').val()),
                    flag3 = App.specialCharactersValidation("984", "Y", $('#984').val()),
                    flag4 = App.alfabeticValidation("614", "Y", $('#614').val()),
                    flag5 = App.specialCharactersValidation("618", "Y", $('#618').val());
                flag1 = flag2 && flag3 && flag4 && flag5;
                return flag && flag1 && this.serviceFlag;
            }
        },
        "service25": function () {
            var flag;
        },
        "service25FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "161") {
                var flag1 = true,
                    flag2 = App.alfaNumericValidation("1036", "Y", $('#1036').val()),
                    flag3 = App.alfaNumericValidation("1037", "Y", $('#1037').val());
                if ($('#1035').val() === "" || $('#1036').val() === "" || $('#1037').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2 && flag3) {
                    alert((function () {
                        return App.lang ? "Please fill correct details" : "सही जानकारी भरें";
                    }()));
                }
                return flag1 && flag2 && flag3
            }
            return true;
        },

        "service25CheckValidation": function () {
            var flag = true,
                flag1 = App.alfaNumericValidation("1038", "Y", $('#1038').val()),
                flag2 = App.alfabeticValidation("556", "Y", $('#556').val()),
                flag3 = App.alfabeticValidation("577", "N", $('#577').val()),
                flag4 = App.specialCharactersValidation("576", "Y", $('#576').val()),
                flag5 = App.specialCharactersValidation("906", "N", $('#906').val()),
                flag6 = App.specialCharactersValidation("1043", "N", $('#1043').val()),
                flag7 = App.specialCharactersValidation("798", "N", $('#798').val()),
                flag8 = App.decimalValidation("1019", "Y", $('#1019').val()),
                flag9 = App.decimalValidation("1020", "Y", $('#1020').val()),
                flag10 = App.decimalValidation("1021", "Y", $('#1021').val()),
                flag11 = App.alfaNumericValidation("1039", "N", $('#1039').val());
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_161").value.trim() == "") {
                    //---------user coloum as first parameter and fields set position for second parameter
                    flag = false;
                } else {
                    flag = true;
                }
                return flag && flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8 && flag9 && flag10 && flag11;
            }
        },

        "service28": function () {
            var flag = true;
            //return flag;
        },
        "service28CheckValidation": function () {
            var flag = true;
            return flag;
        },
        "service29": function () {
            var flag = true;
            //return flag;
        },
        "service29FieldSetValidation": function (fieldsetid) {
            return true;
        },
        "service29CheckValidation": function () {
            var flag = true,
                flag1;
            var flag2 = App.specialCharactersValidation("797", "N", $('#797').val()),
                flag3 = App.specialCharactersValidation("905", "N", $('#905').val());
            flag1 = flag2 && flag3;
            return flag && flag1;
        },
        "service34": function () {
            var flag = true;
            //return flag;
        },
        "service34CheckValidation": function () {
            var flag = true;
            return flag;
        },
        "service8": function () {
            var flag = true;
            //return flag;
        },
        "service8CheckValidation": function () {
            var flag = true;
            return flag;
        },
        "service9": function () {
            var flag = true;
            //return flag;
        },
        "service9CheckValidation": function () {
            var flag = true;
            return flag;
        },
        "service35": function () {
            var pinOnly, getVal, flag = true,
                that = this;
            //return flag;
            getVal = function () {
                var flag = true;
                var letters = /[0-9]{5}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}$/;
                var str = $('#1062').val();
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2326;&#2360;&#2352;&#2366; &#2325;&#2381;&#2352;&#2350;&#2366;&#2306;&#2325; &#2354;&#2367;&#2326;&#2375; &#2332;&#2376;&#2360;&#2375;&#2307; </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                } else {
                    msg = "Please Enter Valid Khasara No. like </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                }
                if (!str.match(letters)) {
                    $('#1062').val('');
                    document.getElementById("1062_div_Y").style.display = "block";
                    document.getElementById("1062_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("1062_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#1062').blur(function () {
                getVal();
            });
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "Please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                    that.serviceFlag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                    that.serviceFlag = true;
                }
            };
            $('#82').blur(function () {
                pinOnly();
            });
        },
        "service35FieldSetValidation": function (fieldsetid) {
            if (fieldsetid === "164") {
                var flag1 = true;
                var flag2 = App.alfabeticValidation("1066", "Y", $('#1066').val());
                //flag3 = App.specialCharactersValidation("994", "Y", $('#994').val());
                // flag3 = App.alfabeticValidation("209","Y",$('#209').val());
                if ($('#1065').val() === "" || $('#1064').val() === "" || $('#1066').val() === "") {
                    flag1 = false;
                }
                if (!flag1 && flag2) {
                    App.lang ? alert("Fill correct details") : alert("कृपया सही जानकारी भरें");
                }
                return flag1 && flag2;
            }
            return true;
        },
        "service35CheckValidation": function () {
            var pinOnly, getVal, flag = true,
                flag1 = true;
            pinOnly = function () {
                flag = true;
                var letters = /^[1-9][0-9]{5}$/i;
                var str = $('#82').val();
                var sls = str;
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "\u0935\u0948\u0927 \u092A\u093F\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902";
                } else {
                    msg = "Please enter valid pin number";
                }
                if (!sls.match(letters)) {
                    $('#82').val('');
                    document.getElementById("82_div_Y").style.display = "block";
                    document.getElementById("82_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("82_div_Y").style.display = "none";
                }
            };
            getVal = function () {
                var flag = true;
                var letters = /[0-9]{5}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}$/;
                var str = $('#1062').val();
                //alert(str);
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2326;&#2360;&#2352;&#2366; &#2325;&#2381;&#2352;&#2350;&#2366;&#2306;&#2325; &#2354;&#2367;&#2326;&#2375; &#2332;&#2376;&#2360;&#2375;&#2307; </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                } else {
                    msg = "Please Enter Valid Khasara No. like </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                }
                if (!str.match(letters)) {
                    $('#1062').val('');
                    document.getElementById("1062_div_Y").style.display = "block";
                    document.getElementById("1062_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("1062_div_Y").style.display = "none";
                }
            };
            getVal();
            if (flag) {
                if (document.getElementById("fieldSetMasterValues_164").value.trim() == "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }
            var flag2 = App.alfabeticValidation("209", "Y", $('#209').val()),
                flag3 = App.alfaNumericValidation("82", "Y", $('#82').val()),
                flag4 = App.alfaNumericValidation("31", "Y", $('#31').val()),
                flag5 = App.specialCharactersValidation("1054", "Y", $('#1054').val());
            flag1 = flag2 && flag3 && flag4 && flag5;
            return flag && flag1 && this.serviceFlag;
        },
        "service36": function () {
            var flag = true;
            //return flag;
        },
        "service36CheckValidation": function () {
            var flag = true,
                flag1;
            var flag2 = App.specialCharactersValidation("994", "Y", $('#994').val()),
                flag3 = App.specialCharactersValidation("1052", "Y", $('#1052').val()),
                flag4 = App.specialCharactersValidation("1053", "Y", $('#1053').val());
            flag1 = flag2 && flag3 && flag4;
            return flag && flag1;
        },
        "service27": function () {
            var flag = true,
                getVal,
                that = this;
            getVal = function () {
                var flag = true;
                var letters = /[0-9]{5}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}$/;
                var str = $('#517').val();
                //alert(str);
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2326;&#2360;&#2352;&#2366; &#2325;&#2381;&#2352;&#2350;&#2366;&#2306;&#2325; &#2354;&#2367;&#2326;&#2375; &#2332;&#2376;&#2360;&#2375;&#2307; </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                } else {
                    msg = "Please Enter Valid Khasara No. like </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                }
                if (!str.match(letters)) {
                    $('#517').val('');
                    document.getElementById("517_div_Y").style.display = "block";
                    document.getElementById("517_div_Y").innerHTML = msg;
                    that.serviceFlag = false;
                    flag = false;
                } else {
                    document.getElementById("517_div_Y").style.display = "none";
					that.serviceFlag = true;
                }
            };
            $('#517').blur(function () {
                getVal();
            });
            //return flag;
        },
        "service27CheckValidation": function () {
            var flag = true,
                getVal;
            getVal = function () {
                var flag = true;
                var letters = /[0-9]{5}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}$/;
                var str = $('#517').val();
                //alert(str);
                var lang = App.retrieveLang();
                var msg = null;
                if (lang == 'hi') {
                    msg = "&#2325;&#2371;&#2346;&#2351;&#2366; &#2357;&#2376;&#2343; &#2326;&#2360;&#2352;&#2366; &#2325;&#2381;&#2352;&#2350;&#2366;&#2306;&#2325; &#2354;&#2367;&#2326;&#2375; &#2332;&#2376;&#2360;&#2375;&#2307; </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                } else {
                    msg = "Please Enter Valid Khasara No. like </br> 1 -> 00001-0000-0000-0000 | </br> 42 -> 00042-0000-0000-0000 |</br> 985/2 -> 00985-0002-0000-0000 |</br> 482/1/2 -> 00482-0001-0002-0000 |";
                }
                if (!str.match(letters)) {
                    $('#517').val('');
                    document.getElementById("517_div_Y").style.display = "block";
                    document.getElementById("517_div_Y").innerHTML = msg;
                    flag = false;
                } else {
                    document.getElementById("517_div_Y").style.display = "none";
                }
            };
            getVal();
            return flag && this.serviceFlag;
        }
    };
    return ServiceValidate;
});