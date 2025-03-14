<script lang="ts">
    import {NoteType, GetProportion, GetMarginX} from "./Note";
    import {onMount} from "svelte";

    export let noteType: NoteType = NoteType.Default;
    export let text: string = "";

    $: backgroundImage = `/images/notes/${noteType}.svg`;
    let proportion : number = 1;
    let noteWidth = 0;

    let elementRef: HTMLDivElement | null = null;
    $: {
        if (elementRef) {
            noteWidth = elementRef.offsetWidth;
        }
    }

    GetProportion(noteType).then(_proportion => {
        console.log(`Proportion : ${_proportion}`)
        proportion = _proportion;
        recalculateDimensions();
    });

    function recalculateDimensions(): void {
        if (elementRef) {
            noteWidth = elementRef.offsetWidth;
        }
    }

    onMount(() => {
        recalculateDimensions();
        window.addEventListener('resize', recalculateDimensions);
        return () => {
            window.removeEventListener('resize', recalculateDimensions);
        };
    });

    const [right, left, top, bottom] = GetMarginX(noteType)
    $: noteStyle = `height: ${noteWidth * proportion}px`;
    $: contentStyle = `margin: ${top}px ${right}px ${bottom}px ${left}px;`
    //background-image: url(${backgroundImage});

</script>

<div class="Note" bind:this={elementRef} style={noteStyle}>
    <div class="Note-Content" style={contentStyle}>
        <p>{text} {text}</p>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
    </div>
    <img class="Note-Bg" src="{backgroundImage}" alt="note" />
</div>

<style lang="scss">

    .Note {
      position: relative;
      left: 50px;
      display: inline-block;
      //padding: 1rem;
      min-width: 50px;
      min-height: 50px;
      background-size: cover;
      background-position: center;
    }

    .Note-Bg {
      color:red;
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
