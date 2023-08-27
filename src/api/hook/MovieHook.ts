import { useMutation, useQuery } from "react-query";
import { MovieService } from "../service/MovieService";
import { MovieType } from "../../constants/enum";

export const useAddMovie = (
  title: string,
  genre: MovieType,
  releasedAt: Date,
  endAt: Date,
  onSuccess: () => void
) => {
  return useMutation({
    mutationFn: () =>
      MovieService.addMovie(
        title,
        genre,
        releasedAt.toISOString(),
        endAt.toISOString()
      ),
    onSuccess: onSuccess,
    onError: () => alert("영화 등록에 실패했습니다."),
  });
};

export const useFindAllMovies = (options: {
  genre?: string;
  isShowing?: boolean;
}) => {
  return useQuery({
    queryFn: () => MovieService.getAllMovies(options),
    queryKey: ["movies", options],
  });
};

export const useFindMovieById = (id: number) => {
  return useQuery({
    queryFn: () => MovieService.getMovieById(id),
    enabled: !!id,
  });
};

export const useEditMovie = (
  id: number,
  title: string,
  genre: MovieType,
  releasedAt: Date,
  endAt: Date,
  onSuccess: () => void
) => {
  return useMutation({
    mutationFn: () =>
      MovieService.editMovie(
        id,
        title,
        genre,
        releasedAt.toISOString(),
        endAt.toISOString()
      ),
    onSuccess: onSuccess,
    onError: () => alert("영화 수정에 실패했습니다."),
  });
};

export const useDeleteMovie = (id: number, onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => MovieService.deleteMovie(id),
    onSuccess: onSuccess,
    onError: () => alert("영화 삭제에 실패했습니다."),
  });
};
