$(function () {
    window.App = {
        Models : {},
        Views : {}
    };

    window.template = function (id) {
        return _.template( $(id).html() );
    };

    App.Models.StyleModel = Backbone.Model.extend ({
        defaults : {
            'fontSize' : '14px',
            'color' : '#000000',
            'background' : '#ffffff'
        },
        urlRoot : '/getSettings'
    });

    App.Views.StyleView = Backbone.View.extend ({
        tagName : 'style',

        template : template(styleTemplate),

        render : function (){
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
        }
    });

    var testModel = new App.Models.StyleModel();
    var testView = new App.Views.StyleView({model : testModel});

    $(document.body).append(testView.render().el);

    $('#apply').on('click', function () {
        var fontSize = $( "#fontSize option:selected" ).val();
        testView.model.set({fontSize : fontSize});
        $(document.body).append(testView.render().el);

        var background = $('#background').val();
        testView.model.set({background : background});
        $(document.body).append(testView.render().el);

        var color = $('#color').val();
        testView.model.set({color : color});
        $(document.body).append(testView.render().el);
        console.log(testModel.toJSON());

        var token = sessionStorage.getItem('token');
        var id = sessionStorage.getItem('user_id');
        var settings = testModel.toJSON();

        $.ajax('/postData', {
            method: 'post',
            data: {
                token:token,
                id:id,
                fontSize:settings.fontSize,
                color:settings.color,
                background:settings.background
            }
        }).done(function (data) {
            toastr.info('Налаштування змінено !');
        });
    });

    $('#reset').on('click', function () {
        var fontSize = testModel.fontSize;
        testView.model.set({fontSize : fontSize});
        $(document.body).append(testView.render().el);

        var background = testModel.background;
        testView.model.set({background : background});
        $(document.body).append(testView.render().el);

        var color = testModel.color;
        testView.model.set({color : color});
        $(document.body).append(testView.render().el);
        console.log(testModel.toJSON());

        var token = sessionStorage.getItem('token');
        var id = sessionStorage.getItem('user_id');
        var settings = testModel.toJSON();

        $.ajax('/postData', {
            method: 'post',
            data: {
                token:token,
                id:id,
                fontSize:settings.fontSize,
                color:settings.color,
                background:settings.background
            }
        }).done(function (data) {
            toastr.info('Налаштування скинуто !');
        });
    });

    $('#login_out').on('click', function () {
        var token = sessionStorage.getItem('token');
        $.ajax('/logout', {
            method: 'post',
            data: {
                token:token
            }
        }).done(function (data) {
            if (data) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('id');
                window.location.href = 'index.html';
            }
             {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('id');
                window.location.href = 'index.html';
            }
        });
    });

});
