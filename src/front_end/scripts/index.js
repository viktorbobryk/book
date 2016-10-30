$(document).ready(function(){

    if (sessionStorage.getItem('token')) {
        $('#reg_btn').css('display','none');
        $('#home').css('display','inline-block');
    }
    else {
        $('#reg_btn').css('display','inline-block');
    }

});


$(function () {
    window.bookApp = (function () {

        window.App = {
            Models : {},
            Views : {}
        };

        window.template = function (id) {
            return _.template( $(id).html() );
        };

         var login = function () {
            var user_login = $('#login_user').val();
            var user_pw = $('#pw_user').val();
            $.ajax('/login', {
                method: 'POST',
                data: {
                    login: user_login,
                    pw: user_pw
                }
            }).done(function (data) {
                if (data.success) {
                    sessionStorage.setItem('login', data.login);
                    sessionStorage.setItem('token', data.userToken);
                    sessionStorage.setItem('user_id', data.id);
                    $('#reg_btn').hide();
                    $('#home').css('display','inline-block');
                    loadSettings(sessionStorage.getItem('token'), sessionStorage.getItem('user_id'));
                    toastr.info('Ви успішно зайшли на свою сторінку');
                }
                else {
                    toastr.error('Логін або пароль не вірний');
                }
            });
        };
        
        var registration = function () {
                var login = $('#login').val();
                var password = $('#password').val();
                var email = $('#email').val();

                $.ajax('/registration', {
                    method: 'POST',
                    data: {
                        login: login,
                        password: password,
                        email: email
                    }
                }).done(function (data) {
                    toastr.info('Ви успішно зареєструвались');
                });
        };
        

        window.loadSettings = function (token, id) {
            $.ajax('/getData', {
                method: 'post',
                data: {
                    token:token,
                    id:id
                }
            }).done(function (data) {
                var userModel = new App.Models.StyleModel({
                    'fontSize' : data.fontSize,
                    'color' : data.color,
                    'background' : data.background
                });
                var styleView = new App.Views.StyleView({model : userModel});
                $(document.body).append(styleView.render().el);
            });
        };

        $('#reload').on('click', loadSettings(sessionStorage.getItem('token'), sessionStorage.getItem('user_id')));
        

        App.Models.StyleModel = Backbone.Model.extend ({
            defaults : {
                'fontSize' : '14px',
                'color' : '#000000',
                'background' : '#ffffff'
            }
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

        return {
            login: login,
            registration: registration,
            loadSettings: loadSettings
        }
    })();
});