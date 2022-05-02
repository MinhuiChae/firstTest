import express from "express";
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express(); // express 객체
const port: string | number = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit:10, //최대 커넥션 갯수
  host: 'localhost',
  user: 'cmh03',
  password: '0330',
  database: 'nodejs'
})

class Inform {
  id: number = 0;
  name: string = "";
  age: number = 0;
  gender: string = "";

  constructor(id: number, name: string, age: number, gender: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}


let informList: Inform[] = [];

app.get('', (req: express.Request, res: express.Response) => {
  res.send(informList);
})

//add
app.post('', (req: express.Request, res: express.Response) => {

  const a:Inform = req.body;

  if(a.id && a.name && a.age && a.gender) {
    informList.push(a);
    res.send(informList);
    console.log(informList);
      
  } else {
    res.send("올바른 값을 입력하세요");
  }
  
})

//get 
app.get('/:id', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    Connection.query('SELECT * from inform WHERE id = ?',[req.params.id], (err: Error, rows: express.Request) => {
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



//Update
app.put('', (req: express.Request, res: express.Response) => {
  pool.getConnection((err: Error, Connection: any) => {
    if(err) throw err
    console.log(`connected as id ${Connection.threadId}`)

    Connection.query('UPDATE inform SET name = ?, age = ?, gender = ? WHERE id = ?',[req.body.name, req.body.age, req.body.gender, req.body.id], (err: Error) => {
      Connection.release()

      if(!err){
        res.send(`Record ID: ${req.body.name} has been added`)
      }else {
        console.log(err)
      }
    })

    console.log(req.body)
  })
})


app.listen(port, ()=> console.log(`Listen on port ${port}`))