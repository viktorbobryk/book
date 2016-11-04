$(document).ready(function () {
    $("#user_login_here").text(sessionStorage.getItem('login'));

   var userID = sessionStorage.getItem('user_id');
    $.ajax('/userID', {
        method: 'POST',
        data: {
            userID: userID
        }
    }).done(function (data) {

    });

    window.App = {
        Models : {},
        Views : {},
        Collections: {}
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
        urlRoot : '/settings'
    });

    App.Views.StyleView = Backbone.View.extend ({
        tagName : 'style',

        template: template(styleTemplate),

        render: function (){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });

    var testModel = new App.Models.StyleModel();
    var testView = new App.Views.StyleView({model : testModel});

    $(document.body).append(testView.render().el);

   

    $('#addBook').on('click',function (){
            var user_id = sessionStorage.getItem('user_id');
            var name = $('#name').val();
            var text = $('#text').val();
            $.ajax('/saveBook', {
                method: 'post',
                data: {
                    name: name,
                    text: text,
                    user_id: user_id
                }
            }).done(function (data) {
                toastr.info('Книгу збережено');
            });
        });

    $('#showBook').click(function() {
        location.reload();
    });

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
            }
        });
        $("#user_login_here").text(sessionStorage.getItem('login'));
        window.location.href = 'index.html';

    });

});
