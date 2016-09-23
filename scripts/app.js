$(function () {
    window.app = {};

    app.bookView = Backbone.View.extend({
        el: $('#wrapper'),

        events: {
            "click .set": "setStyles",
            "click .reset": "resetStyles"
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var template = _.template( $('#input-template').html() );
            this.$el.html(template);
        },

        setStyles: function () {
            var color = $('#color').val();
            var background = $('#background').val();
            var fontSize = $('#fontSize').val() + 'px';
            console.log(fontSize);
            $('#wrapper').css({'color': color});
            $('#wrapper').css({'background-color': background});
            $('#wrapper').css({'font-size': fontSize});
            console.log($('#wrapper').css('font-size'));
        },

        resetStyles: function () {
            $('#wrapper').css({'color': '#000000'});
            $('#wrapper').css({'background-color': '#ffffff'});
            $('#wrapper').css({'font-size': '14px'});
            }
            });

    new app.bookView();

});

