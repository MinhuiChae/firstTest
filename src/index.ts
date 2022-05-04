import express from "express";
import bodyParser from 'body-parser';
import Inform from "./class";
import IInformReq from "./IInformReq";

const app = express(); // express 객체
const port: string | number = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let informList: Inform[] = [];

app.get('', (req: express.Request, res: express.Response) => {
  res.send(informList);
})

//add
app.post('', (req: express.Request, res: express.Response) => {

  const inform:Inform = new Inform(req.body as IInformReq);
  let validIdList: number[] = [];

  if(inform.isInformForm()) {
    informList.find((i:Inform) => {
      if(i.id == inform.id) {
        validIdList.push(i.id);
      }
    })

    if(validIdList.length > 0) {
      res.send("중복된 아이디입니다.");
    } else {
      informList.push(inform);
      res.send(informList);
    }
  } else {
    res.send("올바른 값을 입력하세요");
  }
})

//get 
app.get('/:id', (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const informId = informList.find((i:Inform) => i.id == paramsId);

  if(informId?.inValidation()) {
    res.send(informId);
  } else {
    res.send("존재하지 않는 아이디입니다.");
  }
})

//delete
app.delete('/:id', (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const idIndex = informList.findIndex((i:Inform) => i.id == paramsId);

  if(idIndex === -1) {
    res.send("존재하지 않는 아이디입니다.");
  } else {
    informList.splice(idIndex,1);
    res.send(informList);
  }
})

//Update
app.put('', (req: express.Request, res: express.Response) => {
  const inform:Inform = new Inform(req.body as IInformReq);
  const idIndex = informList.findIndex((i:Inform) => i.id == inform.id);

  if(inform.isInformForm()) {
    if(idIndex === -1) {
      res.send("존재하지 않는 아이디입니다.");
    } else {
      informList.splice(idIndex,1);
      informList.push(req.body);
      res.send(informList);
    }
  } else {
    res.send("올바른 값을 입력하세요");
  }
})

app.listen(port, ()=> console.log(`Listen on port ${port}`))