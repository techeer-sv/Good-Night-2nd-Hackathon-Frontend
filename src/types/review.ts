export type ReviewForm = {
	comment: string;
	movieID: number;
	score: number;
};

export type ReviewData = {
	comment: string;
	createdAt: string;
	id: number;
	movieId: number;
	score: number;
	updatedAt: string;
};
