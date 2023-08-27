import { writable } from "svelte/store";

let initialRevies = [];

const reviewsStore = writable(initialRevies);

// 리뷰 추가
function addReview(review) {
  reviewsStore.update((reviews) => {
      return [...reviews, review];
  });
}

// 리뷰 수정
function editReview(updatedReview) {
  reviewsStore.update((reviews) => {
      return reviews.map((review) => review.id === updatedReview.id ? updatedReview : review);
  });
}

// 리뷰 삭제
function deleteReview(reviewId) {
  reviewsStore.update((reviews) => {
      return reviews.filter((review) => review.id !== reviewId);
  });
}

export default {
  subscribe: reviewsStore.subscribe,
  addReview,
  editReview,
  deleteReview
};