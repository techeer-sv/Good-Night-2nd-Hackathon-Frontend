<script>
    import { createEventDispatcher } from 'svelte';
    
    
    const dispatch = createEventDispatcher();
  
    let genres = ['스릴러', '로맨스', '코믹', '액션'];
    let isOpen = false;
  
    export let selectedGenre = '';
  
    function toggleDropdown() {
      isOpen = !isOpen;
    }
  
    function selectGenre(genre) {
      selectedGenre = genre;
      isOpen = false;
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
        <button class="dropdown-item" on:click={() => selectGenre(genre)}>
          {genre}
        </button>
      {/each}
    </div>
    {/if}
  </div>
  
  
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid #ccc;
      background-color: #fff;
    }
    .dropdown-item {
      padding: 8px 12px;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f5f5f5;
    }
  </style>
  