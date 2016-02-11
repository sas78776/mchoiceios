/*global define */
/*jslint nomen: true*/
define([
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "modules/models/SlideMenuPageModel",
    "app",
    "text!templates/slideMenuTemplate.html"
], function ($, _, Backbone, Handlebars, SlideMenuPageModel, App, SlideMenuTemplate) {
    
    'use strict';
    var SlideMenu = Backbone.View.extend({
        template : Handlebars.compile(SlideMenuTemplate),
        model : new SlideMenuPageModel(),
        events : {
            'click .side-menu-item' : 'onListItemClick'
        },
        initialize : function () {
            //this.render();
        },
        render : function () {
            this.$el.html(this.template({
                'listItem1' : this.model.listItem1(App.lang),
                'listItem2' : this.model.listItem2(App.lang),
                'listItem3' : this.model.listItem3(App.lang),
                'listItem4' : this.model.listItem4(App.lang),
                'listItem5' : this.model.listItem5(App.lang),
                'listItem6' : this.model.listItem6(App.lang),
                'listItem7' : this.model.listItem7(App.lang),
                'listItem8' : this.model.listItem8(App.lang)
            }));
            return this;
        },
        addToDom : function () {
            _.bindAll();
            $('#left-panel').html(App.Views.SlideMenu.render().el).trigger("create");
            if (!App.LastSelected) {
                App.LastSelected = this.$("#allservices");
            }
            App.LastSelected.addClass("selected-list-item");
            $("#" + App.LastSelected.data("itemid")).addClass("selected-list-item");
            this.delegateEvents();
        },
        onListItemClick : function (e) {
            var navigateId = $(e.currentTarget).data("itemid"),
                headerTitle = $(e.currentTarget).data("headertitle");
            App.showMain = false;
            if (navigateId !== App.LastSelected.data("itemid")) {
                this.trigger('navigateTo', navigateId, headerTitle);
            }
            $("#" + App.LastSelected.data("itemid")).removeClass("selected-list-item");
            App.LastSelected.removeClass("selected-list-item");
            $(e.currentTarget).addClass("selected-list-item");
            App.LastSelected = $(e.currentTarget);
            $('#left-panel').panel('close');
        }
    });
    
    _.extend(SlideMenu, Backbone.Events);
    //object.trigger("alert", "an event");
    return SlideMenu;
});