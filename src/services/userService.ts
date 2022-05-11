import InformModel from "../model/informModel";

// Class형태로 바꾸기 
const userService = () => {
  const informList: InformModel[] = [];
  const getInformList = (): InformModel[] => informList;
  const findIndex = (paramsNumber: number) => informList.findIndex((i:InformModel) => i.id == paramsNumber);
  const findInformById = (reqInform: InformModel) : InformModel | undefined => informList.find((inform:InformModel) => inform.id === reqInform.id);

  const pushInform = (inform: InformModel): InformModel[] => {
    informList.push(inform);  
    return informList;
  }

  const deleteInform = (paramsNumber: number): boolean => {
    const informIndex: number = findIndex(paramsNumber);
    let deleteFlag = false;
    if (informIndex !== -1) {
      informList.splice(informIndex, 1);
      deleteFlag = true;
    } 

    return deleteFlag;
  }

  return {
    getInformList, findIndex, findInformById, pushInform, deleteInform
  }
}

export default userService();
