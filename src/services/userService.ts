import Inform from "../model/class";
const informList: Inform[] = [];

exports.findInformById =(inform: Inform) => {
  try {
    informList.find((i:Inform) => i.id === inform.id);

  }catch(err: any) {
    console.log(err);
  }

  return informList.find((i:Inform) => i.id === inform.id);
}

exports.pushInform = (inform: Inform) => {
  informList.push(inform);
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
  informList.splice(paramsNumber, 1);
}


export default informList;


