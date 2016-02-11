/*global define */
/*jslint nomen: true*/

define([
    "jquery",
    "lodash",
    "backbone",
    "backbone_super",
    "handlebars",
    "app",
    "text!templates/abstract/baseTemplate.html"
], function ($, _, Backbone, _super, Handlebars, App, BaseTemplate) {
    'use strict';
    
    var BaseView = Backbone.View.extend({
        
        role : "main",
        
        template : Handlebars.compile(BaseTemplate),
        
        initialize: function () {
            _.bindAll();
            this.on('languageChanged', this.render());
        },
        events: {
            'click #logoutBtn' : 'logout1',
            'click #backBtn' : 'goBackInHistory',
            'click #langBtn' : 'changeLanguage'
        },
        attributes : function () {
            return {
                'data-role' : this.role
            };
        },
        goBackInHistory : function () {
            App.Routers.BackboneRouter.back(-1);
        },
        getHeaderTitle : function () {
            return this.getSpecificTemplateValues().headerTitle;
        },
        logout1 : function () {
            localStorage.setItem("loginFlag", false);
            window.location.replace("#login");
        },
        logout : function () {
            App.loginExist = false;
            App.showLogin = true;
            localStorage.setItem("loginFlag", false);
            App.Routers.BackboneRouter.back(App.urlChangeCount - 1);
        },
        render: function () {
            this.cleanupPossiblePageDuplicationInDOM();
            var templateValues = {'childTemplate' : _.template(this.partialTemplate, this.getSpecificTemplateValues()), 'headerTitle' : this.getHeaderTitle()};
//            $.extend(templateValues, this.getSpecificTemplateValues());
            $(this.el).html(this.template(templateValues));
            if (this.pageId === "login") {
                this.$('#backBtn').hide();
                this.$('#base-header').hide();
            }
            if (this.pageId === "login" || this.pageId === "signup" || this.pageId === "otp") {
                this.$('#logoutBtn').hide();
            }
            this.addPageToDOMAndRenderJQM();
            this.enhanceJQMComponentsAPI();
            this.delegateEvents();
            return this;
        },
        enhanceJQMComponentsAPI : function () {
            $.mobile.changePage("#" + this.pageId, {
                transition : 'none',
                changeHash : false,
                role : this.role
            });
        },
        addPageToDOMAndRenderJQM : function () {
            $("#viewport").html($(this.el)).trigger("create");
            this.delegateEvents();
            $("#" + this.pageId).page();
        },
        cleanupPossiblePageDuplicationInDOM : function () {
            var $previousEl = $("#" + this.pageId),
                isAlreadyInDom = $previousEl.length >= 0;
            if (isAlreadyInDom) {
                $previousEl.detach();
            }
        }
    });
    
    return BaseView;
});