
var mysql = require("mysql");
var pool = mysql.createPool({
    host: '127.0.0.1', //主机
    user: 'root',//数据库用户名
    password: 'freedev',//数据库密码
    port: '3306',//数据库端口      
    database: 'cloudknow',//数据库名称
    charset: 'UTF8_GENERAL_CI'//数据库编码
});

function query(sql,webData,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,webData, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;