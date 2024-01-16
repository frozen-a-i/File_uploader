import mysql from 'mysql2'
import dotenv from 'dotenv'
import { query } from 'express'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUser(email) {
    const [rows] = await pool.query(`
    SELECT * FROM users
    WHERE email=?`, [email])

    return rows[0]
}
export async function findFile(file_name) {
    const [result] = await pool.query(`
    SELECT files.user_id, users.username, 
    files.file_name=? FROM files INNER JOIN users 
    ON files.user_id=users.id;
    
    `, [file_name])
    // SELECT * FROM files
    // // WHERE file_name=?
    return result[0]
}

export async function createUser(username, email) {
    const [result] = await pool.query(`
    INSERT INTO users (username, email)
    VALUES (?,?)
    `, [username, email])

    return getUser(email)
}

export async function uploadFile(user_id, file_name) {
    const [result] = await pool.query(`
    INSERT INTO files (user_id, file_name)
    VALUES (?,?)
    `, [user_id, file_name])

    return result[0]
}


const result = await createUser('shahina', 'shuxratova@gmail.com');

console.log(result);

// const createUser = async (req, res, next) => {
//     try {
//         var data = {
//             id: req.body.id,
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             img: req.body.filename,
//         }
//         console.log(data)
//         let results = await db.query("Insert into dataset?", [data], function (err, rows) {
//             if (err) {
//                 res.send(err)
//             }
//             else {
//                 res.send({ message: "Successfuly created user with id:" + id })
//             }
//         })

//     }
// };