import express from "express";
import Inform from "../model/class";
import ResponseMessage from "../model/responseMessage";
import IInformReq from "../model/IInformReq";

const informList: Inform[] = [];

enum StatusCode {
  "SUCCESS" = 200,
  "DUPLICATE" = 409,
  "WRONGFORMAT" = 403,
  "NOTFOUND" = 404
}

exports.getView =(req: express.Request, res: express.Response) => {
  res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
}

exports.postView =(req: express.Request, res: express.Response) => {
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
}

exports.deleteView = (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const idIndex: number = informList.findIndex((i:Inform) => i.id == paramsId);

  if(idIndex === -1) {
    res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
  } else {
    informList.splice(idIndex,1);
    res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
  }
}

exports.updateView = (req: express.Request, res: express.Response) => {
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
}

