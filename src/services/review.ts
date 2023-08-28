import type { ReviewForm, ReviewData } from '../types/review';
import baseInstance from './apiClient';

export const submitReview = async (form: ReviewForm): Promise<ReviewData> => {
	try {
		const response = await baseInstance.post<ReviewData>(`/reviews`, form);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const getReviews = async (): Promise<ReviewData[]> => {
	try {
		const response = await baseInstance.get<ReviewData[]>('/reviews');
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
