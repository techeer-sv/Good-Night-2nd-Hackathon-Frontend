<script>
    import { createEventDispatcher } from 'svelte';
    
    
    const dispatch = createEventDispatcher();
  
    let genres = ['THRILLER', 'ROMANCE', 'COMIC', 'ACTION'];
    let isOpen = false;
  
    export let selectedGenre = '';
  
    function toggleDropdown() {
      isOpen = !isOpen;
    }
  
    function selectGenre(genre) {
      selectedGenre = genre;
      isOpen = !isOpen;
      dispatch('select', genre); // 선택된 장르를 'select' 이벤트로 전달
      
    }
</script>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="dropdown" on:click={toggleDropdown}>
    <button>{selectedGenre || '장르 선택'}</button>
    {#if isOpen}
    <div class="dropdown-menu">
      {#each genres as genre}
        <button class="dropdown-item" on:click={() => 
        selectGenre(genre)}>
          {genre}
        </button>
      {/each}
    </div>
    {/if}
  </div>
  
  
  <style>
    .dropdown {
      position: relative;
      width:200px;
      display: inline-block;
      font-family: 'Arial', sans-serif;
    }
  
    .dropdown button {
      padding: 10px 15px;
      font-size: 16px;
      background-color: #f7f7f7;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .dropdown button:hover {
      background-color: #e0e0e0;
    }
  
    .dropdown-menu {
      width:200px;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-top: 5px;
      z-index: 1000;
    }
  
    .dropdown-item {
      padding: 10px 15px;
      font-size: 16px;
      color: #333;
      background-color: #fff;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .dropdown-item:hover {
      background-color: #f7f7f7;
    }
  </style>
  