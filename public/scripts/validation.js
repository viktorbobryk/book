$(document).ready(function(){
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    var login = $('#login');
    var password = $('#password');
    var email = $('#email');


    login.blur(function(){
        if(login.val() == ''){
            $('#l_valid').text('Заповніть поле "Логін" !');
            login.addClass('error');
            $('#submit').attr('disabled', true);
            return false;
        }
        else{
            password.blur(function(){
                if(password.val() == ''){
                    $('#p_valid').text('Заповніть поле "Пароль" !');
                    password.addClass('error');
                    $('#submit').attr('disabled', true);
                    return false;
                }
                else{
                    email.blur(function(){
                        if(email.val() != ''){
                            if(email.val().search(pattern) == 0){
                                $('#e_valid').text('Коректний email');
                                $('#submit').attr('disabled', false);
                                email.removeClass('error').addClass('ok');
                            }
                            else{
                                $('#e_valid').text('Не коректний email');
                                $('#submit').attr('disabled', 'true');
                                email.addClass('ok');
                                return false;
                            }
                        }
                        else{
                            $('#e_valid').text('Заповніть поле email !');
                            email.addClass('error');
                            $('#submit').attr('disabled', true);
                            return false;
                        }
                    });
                }
            });
        }
    });




});