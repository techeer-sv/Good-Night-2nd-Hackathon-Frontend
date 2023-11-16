export interface Review {
    id: number;
    movieId: number;
    rating: number;
    content: string;
}
export interface ReviewAdd {
    movie_id: number;
    rating: number;
    content: string;
}