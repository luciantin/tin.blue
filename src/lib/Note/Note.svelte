<script lang="ts">
    import {NoteType, GetProportion, GetMarginX, GetNoteBBProportion} from "./Note";
    import {onMount} from "svelte";

    export let noteType: NoteType = NoteType.Notev1;
    export let left: string = "0px";
    export let top: string = "0px";
    export let rotation: number = 0;

    $: backgroundImage = `/images/notes/${noteType}.svg`;
    let proportion : number = GetProportion(noteType);
    let noteWidth = 400;
    let noteHeight = 400;

    $: noteStyle = `width:400px; height:400px; left:${left}; top:${top}; transform: rotate(${rotation}deg); transform-origin: center;`;
    $: contentStyle = ""

    let noteRef: HTMLDivElement | null = null;
    let noteContentRef: HTMLDivElement | null = null;

    function recalculateDimensions(): void {
        if (noteRef) {
            let bb = noteRef.getBoundingClientRect()

            noteHeight = bb.height;
            noteWidth = bb.width;
        }

        const [Xo, Yo, Xr, Yr, R] = GetNoteBBProportion(noteType);
        contentStyle = `left: ${Xo * noteWidth}px; width:${(1-Xo) * noteWidth}px; height: ${(1-Yo) * noteHeight}px; top: ${Yo * noteHeight}px;
        transform: rotate(${R}deg);transform-origin: center;max-width:${Xr * noteWidth}px`;
    }

    onMount(() => {
        recalculateDimensions();
        window.addEventListener('resize', recalculateDimensions);
        return () => {
            window.removeEventListener('resize', recalculateDimensions);
        };
    });

</script>

<div class="Note" bind:this={noteRef} style={noteStyle}>
    <div class="Note-Content font-schoolbell-regular" bind:this={noteContentRef} style={contentStyle}>
        <slot></slot>
    </div>
    <img class="Note-Bg" src="{backgroundImage}" alt="note" />
</div>

<style lang="scss">

    .Note {
      position: relative;
      //left: 50px;
      //top: 50px;
      display: inline-block;
      min-width: 50px;
      min-height: 50px;
      background-size: cover;
      background-position: center;
    }

    .Note-Bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .Note-Content {
      position: relative;
      z-index: 2;
    }

</style>
