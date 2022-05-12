import InformModel from "../model/informModel";


// Class형태로 바꾸기 
const update = <InformModel , K extends keyof InformModel>(updateModel: InformModel, reqModel: InformModel, key: K) => {
  if (reqModel[key]) { 
    updateModel[key] = reqModel[key];
  }
}

class userService {
  informList: InformModel[] = [];
  constructor(informList: InformModel[]) {
    this.informList = informList;
  }

  getInformList(): InformModel[] {
    return this.informList;
  } 
  
  findIndex(paramsNumber: number): number {
    return this.informList.findIndex((i:InformModel) => i.id == paramsNumber);
  }
    
  findInformById (reqInform: InformModel) : InformModel | undefined {
    return this.informList.find((inform:InformModel) => inform.id === reqInform.id);
  } 

  pushInform (inform: InformModel): InformModel[] {
    this.informList.push(inform); 
    return this.informList;
  }

  deleteInform (paramsNumber: number): boolean {
    const informIndex: number = this.findIndex(paramsNumber);
    let deleteFlag = false;
    if (informIndex !== -1) {
      this.informList.splice(informIndex, 1);
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
