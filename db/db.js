const mysql = require('mysql');
let connecttion = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: '1705d',
    port: '3306'
})
connecttion.connect((error) => {
    if (error) {
        console.log('数据库链接失败');
    } else {
        console.log('数据库链接成功');
    }
})
module.exports = connecttion;