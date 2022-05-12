import express from "express";
import InformModel from "../model/informModel";
import ResponseMessage from "../common/responseMessage";
import { IInformReq } from "../interface";
import userService from "../services/userService";
import { EStatusCode } from "../enum";

// 클래스화하기
exports.get =(req: express.Request, res: express.Response) => {
  res.status(EStatusCode.SUCCESS).send({status:EStatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.getInformList() });
}

exports.post =(req: express.Request, res: express.Response) => {
  
  const inform:InformModel = new InformModel(req.body as IInformReq);
  if(inform.isValidation()) {
    if(userService.findInformById(inform)) {
      res.status(EStatusCode.DUPLICATE).send({status: EStatusCode.DUPLICATE, msg: ResponseMessage.DUPLICATE_ID, data: []});
    } else {
      res.status(EStatusCode.SUCCESS).send({status:EStatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.pushInform(inform) });
    }
  } else {
    res.status(EStatusCode.WRONGFORMAT).send({status: EStatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}

exports.delete = (req: express.Request, res: express.Response) => {
  const paramsId: number = Number(req.params.id);

  if (userService.deleteInform(paramsId) === true) {
    userService.deleteInform(paramsId);
    res.status(EStatusCode.SUCCESS).send({status:EStatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.getInformList() });
  } else {
    res.status(EStatusCode.NOTFOUND).send({status: EStatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
    
  } 
}

//  업데이트는 삭제 추가 가 아니라 , 수정으로변경 
exports.update = (req: express.Request, res: express.Response) => {
  const inform:InformModel = new InformModel(req.body as IInformReq);
  if(inform.isValidation()) {
    const foundInform: InformModel | undefined = userService.findInformById(inform);
    if(foundInform) {
      userService.updateInform(foundInform, inform);
      res.status(EStatusCode.SUCCESS).send({status:EStatusCode.SUCCESS, msg: ResponseMessage.SUCCESS, data: userService.getInformList() });
    } else {
      res.status(EStatusCode.NOTFOUND).send({status: EStatusCode.NOTFOUND, msg: ResponseMessage.NOT_FOUNT_ID, data: []}); 
    }
    
  } else {
    res.status(EStatusCode.WRONGFORMAT).send({status: EStatusCode.WRONGFORMAT, msg: ResponseMessage.WRONG_FORMAT, data: []});
  }
}
