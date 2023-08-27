<script>
  import Dropdown from '../components/Dropdown.svelte';
  import { DateInput } from 'date-picker-svelte'

  let startDate = new Date()
  let endDate = new Date()

  let selectedGenre = '';


  function handleGenreSelect(genre) {
    selectedGenre = genre;
    // 필요한 로직 추가 (예: 선택한 장르에 따라 영화 목록 필터링)
  }
</script>
  
<Dropdown bind:selectedGenre={selectedGenre} on:select={event => handleGenreSelect(event.detail)} />
<div>
  <div>
    <DateInput bind:value={startDate} format={"yyyy-MM-dd"}/>
    <p>상영시작 날짜 : {startDate.toLocaleDateString()}</p>
  </div>
  <div>
    <DateInput bind:value={endDate} format={"yyyy-MM-dd"}/>
    <p>상영종료 날짜 : {endDate.toLocaleDateString()}</p>
  </div>
</div>
