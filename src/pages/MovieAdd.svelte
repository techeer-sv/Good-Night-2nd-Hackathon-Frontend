<script>
  import Dropdown from '../components/Dropdown.svelte';
  import { DateInput } from 'date-picker-svelte'
  import { callApi } from "../services/api.js";
  let startDate = new Date()
  let endDate = new Date()
  let movieTitle = '';
  let selectedGenre = '';
  function handleGenreSelect(genre) {
      selectedGenre = genre;
          // 필요한 로직 추가 (예: 선택한 장르에 따라 영화 목록 필터링)
  }   
  function addMovie() {
    const movie = {
      title: movieTitle,  // movieTitle 변수를 사용
      genre: selectedGenre,
      releaseDate: startDate.toISOString(),  // startDate 변수를 사용
      endDate: endDate.toISOString(),  // endDate 변수를 사용
      isShowing: true,
      isDeleted: false
    };
    callApi('POST', '/movies', movie)
    .then(res => {
      console.log("성공!");
    })
    .catch(err => {
      console.log(err);
      console.log(movie);
    });
}
</script>
<div class ="movie-title">
  <h1>영화 추가</h1>
  <input type="text" bind:value={movieTitle} placeholder="영화 제목을 입력하세요.">

</div>

<div id="dropdown">
  <Dropdown 
  bind:selectedGenre={selectedGenre} 
  on:select={event => handleGenreSelect(event.detail)}
  />
</div>

<div id="datepicker">
  <div id="startdate">
    <DateInput bind:value={startDate} format={"yyyy-MM-dd"}/>
    <p class="start">상영시작 날짜 : {startDate.toLocaleDateString()}</p>
  </div>
  <div id="enddate">
    <DateInput bind:value={endDate} format={"yyyy-MM-dd"}/>
    <p class="end">상영종료 날짜 : {endDate.toLocaleDateString()}</p>
  </div>
</div>

<div>
  <!--API호출 함수 추가-->
  <button 
    class = "submit-button"
    on:click={()=>addMovie()}>영화 추가</button>
</div>
<style>
  .submit-button {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #007BFF;
    border-radius: 4px;
    background-color: #007BFF;
    color: #fff;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .movie-title {
    margin-bottom: 20px;
  }

  .movie-title input {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }

  .movie-title input:focus {
    border-color: #007BFF; /* 포커스 시 테두리 색상 변경 */
  }
  #dropdown {
    margin-bottom: 20px;
    /*가운데 정렬*/
    display: flex;
    margin-left:30%;
    
  }
  #datepicker {
    display: flex;
    justify-content: space-between;
  }
  #startdate, #enddate {
    width: 45%;
  }
  #startdate p, #enddate p {
    margin-top: 10px;
  }
</style>
