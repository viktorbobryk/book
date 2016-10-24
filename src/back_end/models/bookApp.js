var fs = require('fs');
var logger = require('./../services/logger.js');

module.exports = (function (){
    var sessions = [];

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file " + path);
            return [];
        }
    };

    var writeData = function (data, path) {
        try {
            fs.writeFileSync(
                path,
                JSON.stringify(data),
                { flag: 'w+' }
            );
        } catch(e) {
            logger.logError('Failed saving data to file, data: ' +
                JSON.stringify(record));
            return false;
        }
        return true;
    };

    var setingsPath = './data/settings.json';
    var userDataPath = './data/users.json';
    var booksPath = './data/books.json';
    var setings = readData(setingsPath);
    var users = readData(userDataPath);
    var books = readData(booksPath);


    var getSettings = function (id) {
        var result = {};
        for (var i = 0; i < setings.length; i++) {
            if (setings[i].userID == id) {
                result = setings[i];
                delete result.userID;
            }
        }
        return result;
    };

    var registration = function (data) {

        var id = users.length + 1;
        var recordData = {
            id: id,
            login:data.login,
            password:data.password,
            email:data.email,
            usersBooks:[]
        };

        try {
            users.push(recordData);
            writeData(users, userDataPath);
            users = readData(userDataPath);
            return {
                success:true
            };
        } catch(e) {
            return {
                success:false
            };
        }
    };

    var generateToken = function () {
        var letter = "jhtku;uvuyp8ygfvdw35xcjvi987b,kbmhhgfhgjk";
        var token = '';
        for (var i = 0; i < 16; ++i) {
            token += letter[Math.floor(Math.random() * (letter.length)) + 1];
        }
        return token;
    };

    var login = function (data) {
        for(var i = 0; i < users.length; ++i) {
            var result = {};
            var login = data.login;
            if (data.login == users[i].login && data.pw == users[i].password) {
                var token = generateToken();
                sessions.push({
                    userToken : token,
                    userName : users[i].login
                });
                result = {
                    success : true,
                    userToken : token,
                    id : users[i].id,
                    login : login
                };
                return result;
            } else {
                result = {
                    success : false
                }
            }
        }
        return result;
    };

    var getData = function (data) {
        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i].userToken == data.token) {
                return getSettings(data.id);
            }
        }
    };

    var postData = function (data) {
        var settings2 = readData(setingsPath);

        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i].userToken == data.token) {
                var preData = {
                    id: setings.length + 1,
                    userID: data.id,
                    fontSize:data.fontSize,
                    color:data.color,
                    background:data.background
                };

                for (var j = 0; j < settings2.length; j++) {

                    if (settings2[j].userID == data.id) {

                        settings2[j].fontSize = data.fontSize;
                        settings2[j].color = data.color;
                        settings2[j].background = data.background;
                        writeData(setings2, setingsPath);
                        setings = readData(setingsPath);
                        return {
                            success: true
                        };
                    }
                }
                settings2.push(preData);
                writeData(settings2, setingsPath);
                setings = readData(setingsPath);

                return {
                    success: true
                };
            }
        }
        return {
            success: false
        };
    };

    var logout = function (data) {
        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i].userToken == data.token) {
                sessions.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    var prepareBook = function (book) {
        return {
            id      : books.length + 1,
            book    : book
        }
    };

    var saveBook = function (book, userID) {

        var preBook = prepareBook(book);
        for(var i = 0; i < users.length; ++i) {

            if (users[i].id == userID ) {
                users[i].usersBooks.push(preBook.id);
            }
        }
        books.push(preBook);
        writeData(books, booksPath);
        books = readData(booksPath);
        writeData(users, userDataPath);
        users = readData(userDataPath);
    };

    var searchBooks = function (id){
        var userBooks = [];
        for (var j = 0; j < books.length; j++) {
            for (var i = 0; i < id.length; i++) {
                if (books[j].id == id[i]) {
                    userBooks.push(books[j].book);
                }
            }
        }
        return userBooks;
    };

    var showBooks = function (userID) {
        var userBooks = [];
        for(var i = 0; i < users.length; ++i) {

            if (users[i].id == userID ) {
                userBooks = searchBooks(users[i].usersBooks)
            }
        }
        console.log('users[i].id = ' + users[i].id);
        return userBooks;
    };

    var hasSession = function (token, executable) {
       // console.log('executable - ' + executable);
        console.log('token - ' + token);
        var session = null;
        for (var i = 0; i < sessions.length; ++i) {
            if (sessions[i].userToken == token) {
                session = sessions[i];
            }
        }
        if (session) {
            console.log('session = ' + session.userToken);
            executable();
        } else {
            throw { status: 401 };
        }
    };

    var checkUser = function (req, res, executable) {
        // console.log('req - ' + req.headers);
         console.log('req.headers.token - ' + req.headers.token);
        try {
            hasSession(req.headers.token, function () {
                res.send(executable());
            });
        } catch (error) {
            logger.logError("Coudn't authorize user with token: " + req.headers.token);
            console.log("Coudn't authorize user with token: " + req.headers.token);
            res.statusCode = error.status;
            res.send();
        }
    };

    return {
        getSettings:getSettings,
        registration:registration,
        login:login,
        getData:getData,
        postData:postData,
        logout:logout,
        saveBook:saveBook,
        showBooks: showBooks,
        checkUser: checkUser
    }
})();