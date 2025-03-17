<script lang="ts">
    import Background from "./lib/Background/Background.svelte";
    import {BackgroundType} from "./lib/Background/Background";
    import Note from "./lib/Note/Note.svelte";
    import {NoteType} from "./lib/Note/Note";
    import Icon from "./lib/Icon/Icon.svelte";
    import AboutMe from "./lib/Pages/AboutMe/AboutMe.svelte";
    import Experience from "./lib/Pages/Experience/Experience.svelte";
    import Projects from "./lib/Pages/Projects/Projects.svelte";

    let aboutMeHeight = 0;
    let experienceHeight = 0;


</script>

<main>
    <AboutMe bind:bottomHeight={aboutMeHeight}></AboutMe>

    <Experience offsetTop={aboutMeHeight} bind:bottomHeight={experienceHeight}></Experience>

    <Projects offsetTop={experienceHeight}></Projects>

</main>
