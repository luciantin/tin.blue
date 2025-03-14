<script lang="ts">

import BoardItem from "./BoardItem.svelte";
</script>

<div class="Board">
    <BoardItem></BoardItem>
</div>

<style lang="scss">
    .Board {
      width: 40vw;
      height: 20vw;
      background-color: bisque;
      position: absolute;
      left: 20vw;
      top: 20vh;
      border-radius: 2px;
      border: 5px solid darkgoldenrod;
    }
</style>