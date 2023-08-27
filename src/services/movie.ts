import type { MovieData, MovieForm } from '../types/movie';
import baseInstance from './apiClient';

export const enrollMovie = async (form: MovieForm) => {
	try {
		const response = await baseInstance.post<MovieData>('/movies', form);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getMovies = async (): Promise<MovieData[]> => {
	try {
		const response = await baseInstance.get<MovieData[]>('/movies');
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteMovie = async (id: number) => {
	try {
		await baseInstance.delete(`/movies/${id}`);
	} catch (error) {
		console.error(error);
	}
};

export const getMovie = async (id: number): Promise<MovieData> => {
	try {
		const response = await baseInstance.get<MovieData>(`/movies/${id}`);
		return response.data;
	} catch (error) {
		console.error;
		return Promise.reject(error);
	}
};
