import { County } from "./county";
import { Flag } from "./flag";

export interface CountryDto {
  id: string;
  name: string;
  counties: County[];
  flag: Flag;
}
