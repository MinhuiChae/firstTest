import Inform from "../model/class";
let informList: Inform[] = [];

exports.findInformById =(inform: Inform) => {
  let foundInform: any;
  try {
    foundInform = informList.find((i:Inform) => i.id === inform.id);
  }catch(err: any) {
    console.log(err);
  }

  return foundInform;
}

exports.pushInform = (inform: Inform) => {
  try {
    informList.push(inform);
  }
  catch(err) {
    console.log(err);
  }
  
  return informList;
}

const findIndex = (paramsNumber: number) => {
  let indexNumber: number = 0;
  try {
    indexNumber = informList.findIndex((i:Inform) => i.id == paramsNumber);
  } catch(err) {
    console.log(err);
  }

  return indexNumber;
}

exports.deleteInform = (paramsNumber: number) => {
  let informIndex: number = findIndex(paramsNumber);

  if(informIndex !== -1) {
    informList.splice(informIndex, 1);
  } else {
    console.log("Not Found ID");
  }

  return informIndex;
}

export{informList, findIndex};


