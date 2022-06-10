const express = require("express")
//const { append } = require('express/lib/response')  //?? tiba2 muncul??
const mysql = require("mysql")
const BodyParser = require("body-parser")

// setelah itu buka new terminal, lalu... 
// install "npm i express mysql" buat install express dan mysql

const app = express();

//konfigurasi template
app.use(BodyParser.urlencoded({ extended: true}))
app.set("view engine", "ejs")
app.set("views", "views") //Memberitahu bahwa templatenya/views ada di folder "views"


//konfigurasi database
const db = mysql.createConnection({
    host: "localhost",
    database: "db_kelas",
    user: "root",
    password: ""
})

//menkoneksi database
db.connect((err) => {
    if (err) throw err
    console.log("database connected...")

    //untuk get data
    app.get("/", (req,res) => {
        const sql = "SELECT * FROM mahasiswa"
        db.query(sql, (err,result) => {
            const users = JSON.parse(JSON.stringify(result))  //users var baru
            //console.log("hasil database -> ", users)
            //res.send("OK ROUTE OPEN") //mengecek apakah dah muncul di browser Localhost:8000 SETELAH SERVER JALAN
            //res.send(users)
            res.render("index", {users: users, title: "DAFTAR MURID KELAS D"}) //dibuat setelah template sudah dikonfigurasi
        })
    })

    //untuk insert data
    app.post("/tambah", (req,res) => {
        // pake tanda ` bukan tanda '
        const insertSql = `INSERT INTO mahasiswa(nama, kelas) VALUES('${req.body.nama}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        }) 
    })

    //untuk delete data
    app.post("/hapus", (req,res) => {
        const deleteSql = `DELETE FROM mahasiswa(id, nama, kelas) WHERE mahasiswa.id ='${req.body.id}';`
        db.query(deleteSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })
})

app.listen(8000, () => {
    console.log("server ready...") //mengecek server jalan atau belum di CMD
}) 