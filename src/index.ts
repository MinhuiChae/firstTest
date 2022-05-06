import express from "express";
import bodyParser from 'body-parser';
import Inform from "./class";
import IInformReq from "./IInformReq";
import ResponseMessage from "./responseMessage";

const app = express(); // express 객체
const port: string | number = process.env.PORT || 5000;

enum StatusCode {
  "SUCCESS" = 200,
  "DUPLICATE" = 409,
  "WRONGFORMAT" = 403,
  "NOTFOUND" = 404
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let informList: Inform[] = [];

app.get('/user', (req: express.Request, res: express.Response) => {
  res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
})

//add
app.post('/user', (req: express.Request, res: express.Response) => {
  
  const inform:Inform = new Inform(req.body as IInformReq);


  if(inform.isValidation()) {
    const i = informList.find((i:Inform) => i.id === inform.id);

    if(i) {
      res.status(StatusCode.DUPLICATE).send({status: StatusCode.DUPLICATE, msg: ResponseMessage.DUPLICATE_ID, data: []});
    } else {
      informList.push(inform);
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
    }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
})

//get 
app.get('/user/:id', (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const findInform: undefined | Inform = informList.find((i:Inform) => i.id == paramsId); 

  if(findInform) {
    res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: findInform });
  } else {
    res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); //status 코드로 넘기기
  }
})

//delete
app.delete('/:id', (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const idIndex: number = informList.findIndex((i:Inform) => i.id == paramsId);

  if(idIndex === -1) {
    res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
  } else {
    informList.splice(idIndex,1);
    res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
  }
})

//Update
app.put('/user', (req: express.Request, res: express.Response) => {
  const inform:Inform = new Inform(req.body as IInformReq);
  const idIndex = informList.findIndex((i:Inform) => i.id == inform.id);

  if(inform.isValidation()) {
    if(idIndex === -1) {
      res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
    } else {
      informList.splice(idIndex,1);
      informList.push(req.body);
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
    }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
})

app.listen(port, ()=> console.log(`Listen on port ${port}`))