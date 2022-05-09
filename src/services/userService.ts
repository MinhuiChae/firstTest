import Inform from "../model/class";
let informList: Inform[] = [];

exports.findInformById =(inform: Inform) => {
  try {
    informList.find((i:Inform) => i.id === inform.id);

  }catch(err: any) {
    console.log(err);
  }

  return informList.find((i:Inform) => i.id === inform.id);
}

exports.pushInform = (inform: Inform) => {
  try {
    informList.push(inform);
  } catch(err: any) {
    console.log(err);
  }

  return informList;
  
}

exports.findIndex = (paramsNumber: number) => {
  let indexNumber: number = 0;
  try {
    indexNumber = informList.findIndex((i:Inform) => i.id == paramsNumber);
  } catch(err: any) {
    console.log(err);
  }

  return indexNumber;
}

exports.spliceOneIndex = (paramsNumber: number) => {
  try {
    informList = informList.splice(paramsNumber, 1);
  } catch(err: any) {
    console.log(err);
  }

  return informList;
}


export default informList;


