window.HomeView = Backbone.View.extend({
    
    template:_.template($('#home').html()),

    events: {
        "hover #introOverlay"   : "hideBubbles",
        "click .home-link"      : "home_click"
    },

    hideBubbles: function() {
        $(".bubble_fade").fadeToggle(600);
    },

    home_click: function(e){
        e.preventDefault();
        window.history.pushState()
        $(window).scrollTop($(e.currentTarget.hash).offset().top-150);
    },

    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});

window.FaqView = Backbone.View.extend({
    
    template:_.template($('#faq').html()),

    events: {
        "click .faq-link": "faq_click"
    },

    faq_click: function(e){
        e.preventDefault();
        window.history.pushState()
        $(window).scrollTop($(e.currentTarget.hash).offset().top-50);
    },

    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});

window.TeamView = Backbone.View.extend({

    template:_.template($('#team').html()),
    
    events: {
        "click .person": "team_click"
    },

    team_click: function(e){
        e.preventDefault();
        window.history.pushState()
        $(window).scrollTop($(e.currentTarget.hash).offset().top-50);
    },
    
    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});

window.VisionView = Backbone.View.extend({

    template:_.template($('#vision').html()),
 
    events: {
        "click .vision-link": "vis_click"
    },

    vis_click: function(e){
        e.preventDefault();
        window.history.pushState()
        $(window).scrollTop($(e.currentTarget.hash).offset().top-50);
    },
   
    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});

window.PrinciplesView = Backbone.View.extend({

    template:_.template($('#principles').html()),
    
    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});

window.ContactView = Backbone.View.extend({

    template:_.template($('#contact').html()),
    
    render:function (e) {
        $(this.el).html(this.template());
        $('body').scrollTop(0);
        return this;
    }
});


function homeSwitch() { 

    var $win = $(window);
    var $nav = $('.subnav');
    var navTop = $('.subnav').length && $('.subnav').offset().top - 38;
    var isFixed = 0;

    processScroll();

    $win.on('scroll', processScroll);

    function processScroll() {
        var i, scrollTop = $win.scrollTop();
        if (scrollTop >= navTop && !isFixed) {
            isFixed = 1;
            $nav.addClass('subnav-fixed');
        } else if (scrollTop <= navTop && isFixed) {
            isFixed = 0;
            $nav.removeClass('subnav-fixed');
        }
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh')
        });
    };

    $().scrollspy();
};

var AppRouter = Backbone.Router.extend({

    routes:{
        ""              : "home",
        "faq"           : "faq",
        "team"          : "team",
        "vision"        : "vision",
        "principles"    : "principles",
        "contact"       : "contact",
        ".*"             : "home"
    },

    initialize:function () {
        $('.back').live('click', function(e){
            window.history.back();
            return false;
        });
        this.initPage = true;
    },

    home:function () {
        var view = new HomeView();
        $("#content").html(view.render().el);
        homeSwitch();
    },


    faq:function () {
        var view = new FaqView();
        $("#content").html(view.render().el);
    },

    team:function () {
        var view = new TeamView();
        $("#content").html(view.render().el);
    },

    vision:function () {
        var view = new VisionView();
        $("#content").html(view.render().el);
    },
    
    principles:function () {
        var view = new PrinciplesView();
        $("#content").html(view.render().el);
    },
    
    contact:function () {
        var view = new ContactView();
        $("#content").html(view.render().el);
    }
});

$(document).ready(function () {
    app = new AppRouter();
    Backbone.history.start();
});



