import { Cover } from "./cover";
import { Pin } from "./pin";

export interface SpectacleDto {
  id: string;
  cover: Cover;
  coordinates: [];
  name: string;
  pin: Pin;
  lat: number;
  lon: number;
}
