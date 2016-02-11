/*global define */
/*jslint nomen: true*/

define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "app",
    "modules/views/abstract/BaseView",
    "modules/views/SlideMenu",
    "modules/views/MainView",
    "modules/views/AllServicesView",
    "modules/views/MyApplicationsView",
    "modules/views/MyStatsView",
    "modules/views/FeedBackView",
    "modules/views/SearchCSCView",
    "modules/views/MyProfileView",
    "modules/views/AboutView",
    "modules/collections/ServiceListCollection",
    "modules/collections/ApplicationCollection",
    "modules/collections/CSCOperatorCollection",
    "modules/models/ServiceListModel",
    "text!templates/abstract/homeHeaderTemplate.html",
    "text!templates/homeTemplate.html"
], function ($, _, Backbone, Handlebars, App, BaseView, SlideMenu, MainView, AllServicesView, MyApplicationsView, MyStatsView, FeedBackView, SearchCSCView, MyProfileView, AboutView, ServiceListCollection, ApplicationCollection, CSCOperatorCollection, ServiceListModel, HomeHeaderTemplate, HomeTemplate) {
    
    'use strict';
    var HomeView = BaseView.extend({
        pageId : 'home',
        template : Handlebars.compile(HomeTemplate),
        initialize : function () {
            _.bindAll();
            BaseView.prototype.render.apply(this, arguments);
            if (!App.Views.SlideMenu) {
                App.Views.SlideMenu = new SlideMenu();
            }
            App.Views.SlideMenu.addToDom();
            this.listenTo(App.Views.SlideMenu, 'navigateTo', this.render);
        },
        events : function () {
            return _.extend({
                'panelbeforeopen #left-panel' : 'beforePanelOpen',
                'panelbeforeclose #left-panel' : 'beforePanelClose',
                'click #menuBtn' : 'toggleMenu',
                'swiperight #main' : 'openDrawer',
                'panelclose #left-panel' : 'onDrawerClosed'
            }, this.constructor.__super__.events);
        },
        render : function (navigateId, headerTitle) {
            if (!App.Views.MainView) {
                App.Views.MainView = new MainView();
            }
            if (!App.Views.AllServicesView) {
                App.Views.AllServicesView = new AllServicesView({
                    collection: ServiceListCollection
                });
            } else {
                App.Views.AllServicesView.remove();
                ServiceListCollection.reset();
                App.Views.AllServicesView = new AllServicesView({
                    collection: ServiceListCollection
                });
            }
            if (!App.Views.MyApplicationsView) {
                App.Views.MyApplicationsView = new MyApplicationsView({
                    collection : ApplicationCollection
                });
            } else {
                App.Views.MyApplicationsView.remove();
                ApplicationCollection.reset();
                App.Views.MyApplicationsView = new MyApplicationsView({
                    collection: ApplicationCollection
                });
            }
            if (!App.Views.MyStatsView) {
                App.Views.MyStatsView = new MyStatsView();
            }
            if (!App.Views.FeedBackView) {
                App.Views.FeedBackView = new FeedBackView();
            } else {
                App.Views.FeedBackView.remove();
                App.Views.FeedBackView = new FeedBackView();
            }
            if (!App.Views.SearchCSCView) {
                App.Views.SearchCSCView = new SearchCSCView({
                    collection : CSCOperatorCollection
                });
            } else {
                App.Views.SearchCSCView.remove();
                App.Views.SearchCSCView = new SearchCSCView({
                    collection : CSCOperatorCollection
                });
            }
            if (!App.Views.MyProfileView) {
                App.Views.MyProfileView = new MyProfileView();
            }
            if (!App.Views.AboutView) {
                App.Views.AboutView = new AboutView();
            } else {
                App.Views.AboutView.remove();
                App.Views.AboutView = new AboutView();
            }
            var tempTemplate = Handlebars.compile(HomeHeaderTemplate);
            $('#main-header').html(tempTemplate({'pageTitle' : headerTitle})).trigger("create");
            this.trigger('homerendered', navigateId);
        },
        getTitle : function () {
            return "Home";
        },
        getSpecificTemplateValues : function () {
            return {
                'pageTitle' : this.getTitle()
            };
        },
        beforePanelOpen : function () {
//            $('#main').addClass("main-fixed");
            App.LastSelected.addClass("selected-list-item");
        },
        beforePanelClose : function () {
//            $('#main').removeClass("main-fixed");
        },
        toggleMenu : function () {
            $('#left-panel').panel("toggle");
        },
        openDrawer : function () {
            if ($('.ui-page-active').jqmData("panel") !== "open") {
                $('#left-panel').panel("open");
            }
        },
        onDrawerClosed : function () {
        }
    });
    _.extend(HomeView, Backbone.Events);
    
    return HomeView;
    
});