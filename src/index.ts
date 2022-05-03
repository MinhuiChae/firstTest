import express from "express";
import bodyParser from 'body-parser';

const app = express(); // express 객체
const port: string | number = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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
  let postList: number[] = [];

  if(a.id && a.name && a.age && a.gender) {
    for(let i = 0; i<informList.length; i++) {
      if(informList[i].id == a.id) {
        postList.push(i);
      } 
    }
    if(postList.length > 0) {
      res.send("중복된 아이디입니다.");
    } else {
      informList.push(a);
      res.send(informList);
    }
      
  } else {
    res.send("올바른 값을 입력하세요");
  }
  
})

//get 
app.get('/:id', (req: express.Request, res: express.Response) => {

  let getList: Inform[] = [];
  for(let i = 0; i < informList.length; i++) {
    const aa: number = Number(req.params.id);
    let a:number = informList[i].id;
    if(a == aa) {
      getList.push(informList[i])
    }
  }
  res.send(getList);
})

//delete
app.delete('/:id', (req: express.Request, res: express.Response) => {
  for(let i = 0; i < informList.length; i++) {
    const aa: number = Number(req.params.id);
    if(informList[i].id == aa) {
      informList.splice(i,1);
      i--;
    }
  }
  res.send(informList);
})

//Update
app.put('', (req: express.Request, res: express.Response) => {
  const a:Inform = req.body;
  const b = informList.findIndex((i:Inform) => i.id == a.id);

  if(a.id && a.name && a.age && a.gender) {
  informList.splice(b,1);
  informList.push(req.body);

  res.send(informList);
  } else {
    res.send("올바른 값을 입력하세요");
  }
})


app.listen(port, ()=> console.log(`Listen on port ${port}`))