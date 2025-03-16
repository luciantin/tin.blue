<script lang="ts">
    import {BoardObjectType} from "./BoardObject";

    export let type: BoardObjectType = BoardObjectType.Pinv1;
    export let left: string = "0px";
    export let top: string = "0px";
    export let rotation: number = 0;
    export let sizeMultiplier: number = 1;

    let width: number = 36;
    $: backgroundImage = `/images/boardObjects/${type}.svg`;
</script>

<div class="BoardObject" style="left: {left}; top: {top}; rotate: {rotation}deg;">
    <img src="{backgroundImage}" alt="note" style="width: {width * sizeMultiplier}px;"/>
</div>

<style>
    .BoardObject {
        z-index: 99;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
