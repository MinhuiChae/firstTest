import IInformReq from './IInformReq';

class Inform {
  id: number = 0;
  name: string = "";
  age: number = 0;
  gender: string = "";

  constructor(req: IInformReq) {
    this.id = req.id;
    this.name = req.name;
    this.age = req.age;
    this.gender = req.gender;
  }

  inValidation(): boolean {
    return (this.id !== 0 && this.name !== undefined && this.age  !== 0 && this.gender !== undefined );
  }

  checkInform(): boolean | undefined {
    if (this.id && this.name && this.age && this.gender) {
      return true;
    }
  }
}

export default Inform;