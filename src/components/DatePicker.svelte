<script>
  import { DateInput } from 'date-picker-svelte'
  let date = new Date()
</script>
<DateInput bind:value={date} />
<style>
  /* 필요한 스타일링 추가 */
</style>
