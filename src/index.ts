import express from "express"

const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()// express 객체
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const pool = mysql.createPool({
  connectionLimit:10, //최대 커넥션 갯수
  host: 'localhost',
  user: 'cmh03',
  password: '0330',
  database: 'nodejs'
})

app.get('', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    Connection.query('SELECT * from inform', (err: Error, rows: any) => {
      Connection.release() //pool을 반납

      if(!err){
        res.send(rows)
      }else {
        console.log(err)
      }
    })
  })
})

//get 
app.get('/:id', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    Connection.query('SELECT * from inform WHERE id = ?',[req.params.id], (err: Error, rows: any) => {
      Connection.release()

      if(!err){
        res.send(rows)
      }else {
        console.log(err)
      }
    })
  })
})

//delete
app.delete('/:id', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    Connection.query('DELETE from inform WHERE id = ?',[req.params.id], (err: Error) => {
      Connection.release()

      if(!err){
        res.send(`Record ID: ${[req.params.id]} has been removed`)
      }else {
        console.log(err)
      }
    })
  })
})

//add
app.post('', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    const params = req.body

    Connection.query('INSERT INTO inform SET ?',params, (err: Error) => {
      Connection.release()

      if(!err){
        res.send(`Record ID: ${params.id} has been added`)
      }else {
        console.log(err)
      }
    })

    console.log(req.body)
  })
})

//Update
app.put('', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: any, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    const {id, name, age, gender} = req.body

    Connection.query('UPDATE inform SET name = ?, age = ?, gender = ? WHERE id = ?',[name, age, gender, id], (err: Error) => {
      Connection.release()

      if(!err){
        res.send(`Record ID: ${name} has been added`)
      }else {
        console.log(err)
      }
    })

    console.log(req.body)
  })
})


app.listen(port, ()=> console.log(`Listen on port ${port}`))