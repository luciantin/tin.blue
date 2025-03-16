<script>
    export let url = "#";
    export let icon;
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="clickable-icon" aria-label="...">
    <i class="{icon}"></i>
</a>

<style>
    .clickable-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #333;
        text-decoration: none;
        transition: color 0.3s;
    }

    .clickable-icon:hover {
        color: #0073b1;
    }

    .clickable-icon svg,
    .clickable-icon i {
        pointer-events: none;
    }
</style>