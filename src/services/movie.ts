import type { MoiveData, MovieForm } from '../types/movie';
import baseInstance from './apiClient';

export const enrollMovie = async (form: MovieForm) => {
	try {
		const response = await baseInstance.post<MoiveData>('/movies', form);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getMovies = async (): Promise<MoiveData[]> => {
	try {
		const response = await baseInstance.get<MoiveData[]>('/movies');
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
