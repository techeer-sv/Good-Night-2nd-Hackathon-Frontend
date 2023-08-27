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
