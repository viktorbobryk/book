var fs = require('fs');
var logger = require('./../services/logger.js');

module.exports = (function () {

    var session = [];

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
    var dataArr = readData(setingsPath);
    var users = readData(userDataPath);
    var books = readData(booksPath);

    var getSettings = function (id) {
        var result = {};
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].userID == id) {
                result = dataArr[i];
                delete result.userID;
            }
        }
        return result;
    };

    var saveBook = function (data) {
        console.log('bookApp/saveBook');
        var id = books.length + 1;
        var recordData = {
            id: id,
            name:data.name,
            text:data.text
        };

        try {
            books.push(recordData);
            writeData(books, booksPath);
            books = readData(booksPath);
            return {
                succsess:true
            };
        } catch(e) {
            return {
                succsess:false
            };
        }
    };
    
    var registration = function (data) {

        var id = users.length + 1;
        var recordData = {
            id: id,
            login:data.login,
            password:data.password,
            email:data.email
        };

        try {
            users.push(recordData);
            writeData(users, userDataPath);
            users = readData(userDataPath);
            return {
                succsess:true,
            };
        } catch(e) {
            return {
                succsess:false,
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
                session.push({
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
        for (var i = 0; i < session.length; i++) {
            if (session[i].userToken == data.token) {
                return getSettings(data.id);
            }
        }
    };

    var postData = function (data) {
        var dataArr2 = readData(setingsPath);

        for (var i = 0; i < session.length; i++) {
            if (session[i].userToken == data.token) {
                var preData = {
                    id: dataArr.length + 1,
                    userID: data.id,
                    fontSize:data.fontSize,
                    color:data.color,
                    background:data.background
                };

                for (var j = 0; j < dataArr2.length; j++) {

                    if (dataArr2[j].userID == data.id) {

                        dataArr2[j].fontSize = data.fontSize;
                        dataArr2[j].color = data.color;
                        dataArr2[j].background = data.background;
                        writeData(dataArr2, setingsPath);
                        dataArr = readData(setingsPath);
                        return {
                            success: true,
                        };
                    }
                }
                dataArr2.push(preData);
                writeData(dataArr2, setingsPath);
                dataArr = readData(setingsPath);

                return {
                    success: true,
                };
            }
        }
        return {
            success: false,
        };
    };

    var logout = function (data) {
        for (var i = 0; i < session.length; i++) {
            if (session[i].userToken == data.token) {
                session.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    return {
        getSettings:getSettings,
        registration:registration,
        login:login,
        getData:getData,
        postData:postData,
        logout:logout,
        saveBook:saveBook

    }
})();