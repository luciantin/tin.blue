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
        //background: linear-gradient(#3f87a6 10%, #ebf8e1a2 10%),
        //    linear-gradient(
        //        to right,
        //        #ebf8e100 10%,
        //        #c73030 10% 10.2%,
        //        #ebf8e100 10.5%
        //    );
        //background-size:
        //    100% 25px,
        //    100% 100%;
        //background-repeat: repeat, no-repeat;

      background-color: #a67c52;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cpattern id='corkPattern' patternUnits='userSpaceOnUse' width='50' height='50'%3E%3Crect width='50' height='50' fill='%23a67c52'/%3E%3Ccircle cx='15' cy='15' r='3' fill='%239c7e55' opacity='0.8'/%3E%3Ccircle cx='35' cy='20' r='2' fill='%239c7e55' opacity='0.7'/%3E%3Ccircle cx='10' cy='40' r='2.5' fill='%239c7e55' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='3.5' fill='%239c7e55' opacity='0.9'/%3E%3Cellipse cx='25' cy='25' rx='4' ry='2' fill='%238a6a48' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23corkPattern)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      border: 20px solid transparent;
      border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cpattern id='woodPattern' patternUnits='userSpaceOnUse' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23deb887'/%3E%3Cline x1='0' y1='10' x2='20' y2='10' stroke='%238b4513' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23woodPattern)'/%3E%3C/svg%3E") 30 round;
    }
</style>
