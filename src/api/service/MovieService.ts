import { api } from "../api";

export class MovieService {
  public static addMovie = async (
    title: string,
    genre: string,
    releasedAt: string,
    endAt: string
  ): Promise<void> => {
    await api.post("/movies", {
      title,
      genre,
      releasedAt,
      endAt,
    });
  };

  public static getAllMovies = async () => {
    return api.get("/movies");
  };
}
