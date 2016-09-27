$(function () {

    window.App = {
        Models : {},
        Views : {},
        Collections : {}
    };
    window.template = function (id) {
        return _.template( $(id).html() );
    };

    App.Models.BookStyle = Backbone.Model.extend({
        defaults: {
            fontSize: '14px',
            color: '#000000',
            background: '#ffffff'
        }
    });
    App.Views.BookView = Backbone.View.extend({
        tagName: 'style',
        template: template(styleTemplate),


        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        },

    });

    var bookStyle = new App.Models.BookStyle();
    var bookView = new App.Views.BookView({model: bookStyle});
    $(document.body).append(bookView.render().el);


    (function () {
        $('#background').change(function () {
            background = $('#background').val();
            bookView.model.set({background: background});
        });
        $('#color').change(function () {
            color = $('#color').val();
            bookView.model.set({color : color});
        });
        $('#fontSize').change(function () {
            fontSize = $('#fontSize').val() + 'px';
            bookView.model.set({fontSize : fontSize});
        });
        $('#reset').on('click', function () {
            bookView.model.set({color : '#000000'});
            bookView.model.set({background: '#ffffff'});
            bookView.model.set({fontSize : '14px'});
            $(document.body).append(bookView.render().el);
        });
        $('#apply').on('click', function () {
            bookView.model.set({color : color});
            bookView.model.set({background: background});
            bookView.model.set({fontSize : fontSize});
            $(document.body).append(bookView.render().el);
        });
        var background;
        var color;
        var fontSize;
    }());

});



