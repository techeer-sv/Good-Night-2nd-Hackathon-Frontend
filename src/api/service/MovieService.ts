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

  public static editMovie = async (
    id: number,
    title: string,
    genre: string,
    releasedAt: string,
    endAt: string
  ): Promise<void> => {
    await api.put(`/movies/${id}`, {
      title,
      genre,
      releasedAt,
      endAt,
    });
  };

  public static deleteMovie = async (id: number): Promise<void> => {
    await api.delete(`/movies/${id}`);
  };

  public static getAllMovies = async () => {
    return api.get("/movies");
  };

  public static getMovieById = async (id: number) => {
    return api.get(`/movies/${id}`);
  };
}
