import express from "express";
import Inform from "../model/class";
import ResponseMessage from "../model/responseMessage";
import IInformReq from "../model/IInformReq";
import {informList} from "../services/userService";
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
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.pushInform(inform) });
    }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}

exports.delete = (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);

      if(userService.deleteInform(paramsId) === -1) {
        res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
      }else {
        userService.deleteInform(paramsId);
        res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: informList });
      }
        
}

exports.update = (req: express.Request, res: express.Response) => {
  const inform:Inform = new Inform(req.body as IInformReq);

  if(inform.isValidation()) {
     if(userService.deleteInform(inform.id) === -1) {
      res.status(StatusCode.NOTFOUND).send({status: StatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
     } else {
      userService.deleteInform(inform.id);
      res.status(StatusCode.SUCCESS).send({status:StatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.pushInform(inform) });
     }
  } else {
    res.status(StatusCode.WRONGFORMAT).send({status: StatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}

