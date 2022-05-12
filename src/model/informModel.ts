
import { IInformReq } from "../interface";
class InformModel {
  id: number = 0;
  name: string = "";
  age: number = 0;
  gender: string = "";

  constructor(req: IInformReq) {
    this.id = req.id ?? 0;
    this.name = req.name ?? "";
    this.age = req.age ?? 0;
    this.gender = req.gender ?? "";
  }

  isValidation(): boolean {
    return this.id !== 0 && this.name !== "" && this.age  !== 0 && this.gender !== "";
  }
}

export default InformModel;