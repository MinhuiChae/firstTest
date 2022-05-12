import express from "express";
import InformModel from "../model/informModel";
import ResponseMessage from "../common/responseMessage";
import { IInformReq } from "../interface";
import { EStatusCode } from "../enum";
import UserService from "../services/userService";
const informList: InformModel[] = [];

// 클래스화하기

class UserResponse {
  res: express.Response;
  constructor(res: express.Response) {
    this.res = res;
  }

  response(status: number, msg: string, data: InformModel[]) {
    this.res.status(status).send({status:status, msg: msg, data: data })
  }
}

class UserController {  
  req: express.Request;
  res: express.Response;
  userService: UserService;
  userResponse: UserResponse;

  constructor(req: express.Request, res: express.Response) {
    this.req = req;
    this.res = res;
    
    this.userResponse = new UserResponse(this.res);
    this.userService = new UserService(informList);
    
  }

  getUser() {
    this.userResponse.response(EStatusCode.SUCCESS, ResponseMessage.SUCCESS, this.userService.getInformList());
  }

  postUser() {
    const inform:InformModel = new InformModel(this.req.body as IInformReq);
    if(inform.isValidation()) {
      if(this.userService.findInformById(inform)) {
        this.userResponse.response(EStatusCode.DUPLICATE, ResponseMessage.DUPLICATE_ID, []);
      } else {
        this.userResponse.response(EStatusCode.SUCCESS, ResponseMessage.SUCCESS, this.userService.pushInform(inform));
      }
    } else {
      this.userResponse.response(EStatusCode.WRONGFORMAT, ResponseMessage.WRONG_FORMAT, []);
    }
  }
  
  deleteUser() {
    const paramsId: number = Number(this.req.params.id);
    if (this.userService.deleteInform(paramsId) === true) {
      this.userService.deleteInform(paramsId);
      this.userResponse.response(EStatusCode.SUCCESS, ResponseMessage.SUCCESS, this.userService.getInformList());
    } else {
      this.userResponse.response(EStatusCode.NOTFOUND, ResponseMessage.NOT_FOUNT_ID, []);
    } 
  }
  
  //  업데이트는 삭제 추가 가 아니라 , 수정으로변경 
  updateUser() {
    const inform:InformModel = new InformModel(this.req.body as IInformReq);
    if(inform.isValidation()) {
      const foundInform: InformModel | undefined = this.userService.findInformById(inform);
      if(foundInform) {
        this.userService.updateInform(foundInform, inform);
        this.userResponse.response(EStatusCode.SUCCESS, ResponseMessage.SUCCESS, this.userService.getInformList());
      } else {
        this.userResponse.response(EStatusCode.NOTFOUND, ResponseMessage.NOT_FOUNT_ID, []);
      }
    } else {
      this.userResponse.response(EStatusCode.WRONGFORMAT, ResponseMessage.WRONG_FORMAT, []);
    }
  }
}

export default UserController;
