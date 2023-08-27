import { MovieType } from "./enum";

export type MovieAddInputs = {
  genre: MovieType;
  startAt: Date;
  endAt: Date;
};
