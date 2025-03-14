<script lang="ts">
    import {NoteType, GetProportion, GetMarginX, GetNoteBBProportion} from "./Note";
    import {onMount} from "svelte";

    export let noteType: NoteType = NoteType.Default;
    export let text: string = "";

    $: backgroundImage = `/images/notes/${noteType}.svg`;
    let proportion : number = GetProportion(noteType);
    let noteWidth = 400;
    let noteHeight = 400;

    $: noteStyle = "width:400px; height:400px";
    $: contentStyle = ""

    let noteRef: HTMLDivElement | null = null;
    let noteContentRef: HTMLDivElement | null = null;

    function recalculateDimensions(): void {
        if (noteRef) {
            let bb = noteRef.getBoundingClientRect()

            noteHeight = bb.height;
            noteWidth = bb.width;
        }

        const [Xo, Yo, Xr, Yr] = GetNoteBBProportion(noteType);
        contentStyle = `left: ${Xo * noteWidth}px; width:${(1-Xo) * noteWidth}px; height: ${(1-Yo) * noteHeight}px; top: ${Yo * noteHeight}px;`;
    }

    onMount(() => {
        recalculateDimensions();
        window.addEventListener('resize', recalculateDimensions);
        return () => {
            window.removeEventListener('resize', recalculateDimensions);
        };
    });

    // const [right, left, top, bottom] = GetMarginX(noteType)
    //$: noteStyle = "width:400px; height:400px"; //`height: ${noteHeight * proportion}px; width: ${noteWidth * proportion}px;`;
    // $: contentStyle = `margin: ${top}px ${right}px ${bottom}px ${left}px;`
    //$: contentStyle = ""
    //background-image: url(${backgroundImage});

</script>

<div class="Note" bind:this={noteRef} style={noteStyle}>
    <div class="Note-Content" bind:this={noteContentRef} style={contentStyle}>
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
      top: 50px;
      display: inline-block;
      //padding: 1rem;
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
