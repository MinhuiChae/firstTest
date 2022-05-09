import express from "express";
import Inform from "../model/class";
import ResponseMessage from "../model/responseMessage";
import IInformReq from "../model/IInformReq";
import informList from "../services/userService";
const userService = require("../services/userService");

enum StatusCode {
  "SUCCESS" = 200,
  "DUPLICATE" = 409,
  "WRONGFORMAT" = 403,
  "NOTFOUND" = 404
}

exports.get =(req: express.Request, res: express.Response) => {
  res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
}

exports.post =(req: express.Request, res: express.Response) => {
  const inform:Inform = new Inform(req.body as IInformReq);
  if(inform.isValidation()) {
    if(userService.findInformById(inform)) {
      res.status(StatusCode.DUPLICATE).send({status: StatusCode.DUPLICATE, msg: ResponseMessage.DUPLICATE_ID, data: []});
    } else {
      userService.pushInform(inform);
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
    }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}

exports.delete = (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);
  const foundIndex: number = userService.findIndex(paramsId);

  if(foundIndex === -1) {
    res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
  } else {
    userService.spliceOneIndex(foundIndex);
    res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
  }
}

exports.update = (req: express.Request, res: express.Response) => {
  const inform:Inform = new Inform(req.body as IInformReq);
  const foundIndex: number = userService.findIndex(inform.id);

  if(inform.isValidation()) {
    if(foundIndex === -1) {
      res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
    } else {
      userService.spliceOneIndex(userService.findIndex(foundIndex));
      userService.pushInform(inform);
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
    }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}

