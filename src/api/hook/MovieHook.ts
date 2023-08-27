import { useMutation } from "react-query";
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
