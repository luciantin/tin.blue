<script lang="ts">
import Background from "./lib/Background/Background.svelte";
import {BackgroundType} from "./lib/Background/Background";
import Note from "./lib/Note/Note.svelte";
import {NoteType} from "./lib/Note/Note";
import Icon from "./lib/Icon/Icon.svelte";
import AboutMe from "./lib/Pages/AboutMe/AboutMe.svelte";

</script>

<main>
    <AboutMe></AboutMe>

    <div style="min-height: 5vh"></div>

    <Background backgroundType={BackgroundType.WhiteBoard}>
        <Note noteType={NoteType.PostItv1} left="200px" top="200px"></Note>
    </Background>

</main>
