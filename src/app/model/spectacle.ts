import { County } from "./county";
import { Cover } from "./cover";
import { Images } from "./images";
import { Others } from "./others";
import { Pin } from "./pin";
import { Sources } from "./sources";

export class Spectacle {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  description: string;
  history: string;
  county: County;
  images: Images[];
  covers: Cover;
  sources: Sources[];
  others: Others[];
  pin: Pin;
}
