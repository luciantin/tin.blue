<script lang="ts">
    import Note from "../Note/Note.svelte";
</script>

<div class="Paper">
    <Note text="Halllloooo Halllloooo Halllloooo Halllloooo Halllloooo"></Note>
</div>

<style lang="scss">
    .Paper {
        width: 100%;
        min-height: 100vh;
        background: linear-gradient(#3f87a6 10%, #ebf8e1a2 10%),
            linear-gradient(
                to right,
                #ebf8e100 10%,
                #c73030 10% 10.2%,
                #ebf8e100 10.5%
            );
        background-size:
            100% 25px,
            100% 100%;
        background-repeat: repeat, no-repeat;
    }
</style>
