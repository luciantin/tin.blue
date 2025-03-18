<script lang="ts">
    import {BackgroundType} from "./Background";
    export let node : HTMLElement | null = null;
    export let backgroundType: BackgroundType = BackgroundType.Paper;
    export let style: string = "min-height: 65vh";

</script>

<div class='Background-{backgroundType}' style={style} bind:this={node}>
    <slot></slot>
</div>


<style lang="scss">

    .Background-WhiteBoard{
        background:
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><rect width="30" height="30" rx="8" ry="8" fill="black" /></svg>') top left no-repeat,
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><rect width="30" height="30" rx="8" ry="8" fill="black" /></svg>') top right no-repeat,
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><rect width="30" height="30" rx="8" ry="8" fill="black" /></svg>') bottom left no-repeat,
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><rect width="30" height="30" rx="8" ry="8" fill="black" /></svg>') bottom right no-repeat,
              white;
        background-size: 30px 30px, 30px 30px, 30px 30px, 30px 30px, cover;
        border: 20px solid transparent;
        border-image: linear-gradient(
                      135deg,
                      #aaa 0%,
                      #eee 30%,
                      #ccc 60%,
                      #aaa 100%
        ) 1;
        box-shadow:
              inset 0 0 10px rgba(0,0,0,0.1),
              0 0 30px rgba(0,0,0,0.3);
        border-radius: 5px;
    }

    .Background-CorkBoard{
        background-color: #a67c52;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cdefs%3E%3Cpattern id='corkPattern' patternUnits='userSpaceOnUse' width='50' height='50'%3E%3Crect width='50' height='50' fill='%23a67c52'/%3E%3Ccircle cx='15' cy='15' r='3' fill='%239c7e55' opacity='0.8'/%3E%3Ccircle cx='35' cy='20' r='2' fill='%239c7e55' opacity='0.7'/%3E%3Ccircle cx='10' cy='40' r='2.5' fill='%239c7e55' opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='3.5' fill='%239c7e55' opacity='0.9'/%3E%3Cellipse cx='25' cy='25' rx='4' ry='2' fill='%238a6a48' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23corkPattern)'/%3E%3C/svg%3E");
        background-repeat: repeat;
        border: 20px solid transparent;
        border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3Cpattern id='woodPattern' patternUnits='userSpaceOnUse' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23deb887'/%3E%3Cline x1='0' y1='10' x2='20' y2='10' stroke='%238b4513' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23woodPattern)'/%3E%3C/svg%3E") 30 round;
    }

    .Background-Canvas {
        background-color: #fff1cb;
        background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 10%, rgba(0,0,0,0.15) 90%),
        linear-gradient(45deg, rgba(214, 209, 199, 0.2) 10%, transparent 5%, transparent 90%, rgba(214, 209, 199, 0.2) 90%),
        linear-gradient(45deg, rgba(214, 209, 199, 0.2) 10%, transparent 5%, transparent 90%, rgba(214, 209, 199, 0.2) 90%);
        background-size: 10px 10px, 100% 100%, 100% 100%;
        background-blend-mode: multiply;

        box-shadow: inset 0px 12px 18px rgba(0, 0, 0, 0.2),
        inset 0px -12px 18px rgba(0, 0, 0, 0.2),
        inset 12px 0px 18px rgba(0, 0, 0, 0.2),
        inset -12px 0px 18px rgba(0, 0, 0, 0.2);

        padding-bottom: 20vh;
    }

    .Background-Paper {
      background: linear-gradient(#3f87a6 10%, #ebf8e1a2 10%),
      linear-gradient(
                      to right,
                      #ebf8e100 10%,
                      #c73030 10% 10.2%,
                      #ebf8e100 10.5%
      );
      background-size: 100% 25px,
      100% 100%;
      background-repeat: repeat, no-repeat;
    }

</style>