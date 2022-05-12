import InformModel from "../model/informModel";
const informList: InformModel[] = [];

// Class형태로 바꾸기 
const update = <InformModel , K extends keyof InformModel>(updateModel: InformModel, reqModel: InformModel, key: K) => {
  if (reqModel[key]) { 
    updateModel[key] = reqModel[key];
  }
}

class userService {
  
  getInformList(): InformModel[] {
    return informList;
  } 
  
  findIndex(paramsNumber: number): number {
    return informList.findIndex((i:InformModel) => i.id == paramsNumber);
  }
    
  findInformById (reqInform: InformModel) : InformModel | undefined {
    return informList.find((inform:InformModel) => inform.id === reqInform.id);
  } 

  pushInform (inform: InformModel): InformModel[] {
    informList.push(inform); 
    return informList;
  }

  deleteInform (paramsNumber: number): boolean {
    const informIndex: number = this.findIndex(paramsNumber);
    let deleteFlag = false;
    if (informIndex !== -1) {
      informList.splice(informIndex, 1);
      deleteFlag = true;
    } 

    return deleteFlag;
  }

  updateInform(updateModel: InformModel, reqModel: InformModel) {
    Object.keys(updateModel).forEach((key) => {
      update(updateModel, reqModel, key as keyof InformModel);
    })
  }
}

export default userService;
