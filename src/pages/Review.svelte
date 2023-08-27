<script>
    import { navigate } from 'svelte-routing';
    import { callApi } from "../services/api.js";
  
    export let id; // 영화 ID를 prop으로 받아옵니다.
  
    let reviewText = "";
    let rating = 0; // 평점
  
    async function submitReview() {
      if (!reviewText.trim()) {
        alert("리뷰를 입력해주세요.");
        return;
      }
  
      if (rating <= 0 || rating > 5) {
        alert("평점은 1에서 5 사이의 숫자로 입력해주세요.");
        return;
      }
  
      try {
        const movieResponse = await callApi('GET', `/movies/${id}`);
        const movieData = movieResponse.data;

        await callApi('POST', `/reviews`, {
            "movie": movieData,
            "rating": rating,
            "content": reviewText,
            "createdDate": new Date().toISOString()
            });
        alert("리뷰가 성공적으로 등록되었습니다.");
        navigate(`/movies/${id}`);
      } catch (error) {
        console.log({
            "movie": callApi('GET', `/movies/${id}`),
            "rating": rating,
            "content": reviewText,
            "createdDate": new Date().toISOString()
            })
        console.error("Error submitting review:", error);
        alert("리뷰 제출 중 오류가 발생했습니다.");
      }
      navigate(`/movies/detail/${id}`);
    }
  </script>
  
  <div class="review-form">
    <h2>리뷰 작성하기</h2>
    
    <!-- 평점 입력 부분 -->
    <div class="rating-input">
      <label for="rating">평점 (1-5): </label>
      <input type="number" id="rating" bind:value={rating} min="1" max="5" />
    </div>
  
    <textarea bind:value={reviewText} placeholder="리뷰를 작성해주세요."></textarea>
    <button on:click={submitReview}>제출</button>
  </div>
  
  <style>
    .review-form {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
  
    .rating-input {
      margin-bottom: 10px;
    }
  
    .review-form textarea {
      width: 100%;
      height: 150px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
  
    .review-form button {
      padding: 10px 15px;
      background-color: #007BFF;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  