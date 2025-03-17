<script lang="ts">
    import {BackgroundType} from "../../Background/Background";
    import {NoteType} from "../../Note/Note";
    import Icon from "../../Icon/Icon.svelte";
    import Note from "../../Note/Note.svelte";
    import Background from "../../Background/Background.svelte";
    import BoardObject from "../../BoardObject/BoardObject.svelte";
    import {type BoardObjectProps, BoardObjectType} from "../../BoardObject/BoardObject";
    import {onMount} from "svelte";

    interface Coords {
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;
    }

    interface ElementDivCoords {
        coords: Coords;
        element: HTMLDivElement;
    }

    let introNoteElement: HTMLDivElement | null = null;
    let skillsNoteElement: HTMLDivElement | null = null;
    let aboutMeNoteElement: HTMLDivElement | null = null;

    let boardObjects: Array<BoardObjectProps> = [];

    let backgroundElement: HTMLElement | null = null;
    $: backgroundStyle = "";

    $: introNoteElementTop = "0px";
    $: introNoteElementLeft = "0px";
    $: skillsNoteElementTop = "0px";
    $: skillsNoteElementLeft = "0px";
    $: aboutMeNoteElementTop = "0px";
    $: aboutMeNoteElementLeft = "0px";

    function htmlElemToCoords(element : HTMLElement) : Coords {
        let rect = element.getBoundingClientRect();
        return {
            X1: rect.left,
            Y1: rect.top,
            X2: rect.right,
            Y2: rect.bottom
        }
    }

    function isPointInCoords(pointX: number, pointY: number, coords: Coords) : boolean {
        return !(pointX < coords.X1 || pointX > coords.X2 || pointY < coords.Y1 || pointY > coords.Y2);
    }

    function rePopulate() {
        console.log("rePopulate");
        if (backgroundElement === null) return;

        let backgroundWidth = 0;
        let backgroundHeight = 0;
        let numOfObjects = 16;

        const pinTypes = [
            BoardObjectType.Pinv1Red,
            BoardObjectType.Pinv1Blue,
            BoardObjectType.Pinv1Yellow,
            BoardObjectType.Pinv1Green
        ];

        backgroundWidth = backgroundElement.clientWidth;
        backgroundHeight = backgroundElement.clientHeight;

        let notes: Array<ElementDivCoords> = []

        if(introNoteElement != null) notes.push({element: introNoteElement, coords: htmlElemToCoords(introNoteElement)});
        if(skillsNoteElement != null) notes.push({element: skillsNoteElement, coords: htmlElemToCoords(skillsNoteElement)});
        if(aboutMeNoteElement != null) notes.push({element: aboutMeNoteElement, coords: htmlElemToCoords(aboutMeNoteElement)});;

        // Populate board with notes
        let bkgheight = backgroundHeight;
        let tmpWidth = 0;
        let tmpMaxHeight = 0;
        let tmpMaxElementHeightOnLevel = 0;
        for (let i = 0; i < notes.length; i++) {

            const element = notes[i];
            const elementWidth = element.element.clientWidth;
            const elementHeight = element.element.clientHeight;

            if(tmpMaxElementHeightOnLevel < elementHeight) tmpMaxElementHeightOnLevel = elementHeight;

            if(tmpWidth + elementWidth > backgroundWidth) {
                tmpWidth = 0;
                tmpMaxHeight += tmpMaxElementHeightOnLevel;
                tmpMaxElementHeightOnLevel = 0;
            }

            notes[i].coords.Y1 = tmpMaxHeight/5;
            notes[i].coords.Y2 = tmpMaxHeight + elementHeight;

            notes[i].coords.X1 = tmpWidth;
            notes[i].coords.X2 = tmpWidth + elementWidth;
            tmpWidth += elementWidth;

            notes[i].element.style.left = "0px"//notes[i].coords.X1 + "px";
            notes[i].element.style.top = notes[i].coords.Y1 + "px";

            console.log(notes[i].coords);
            console.log(notes[i].element.style.left);
            console.log(notes[i].element.style.top);

            bkgheight = notes[i].element.clientHeight;
            console.log(bkgheight);
        }

        backgroundStyle = `min-height: ${bkgheight}px;`;

        // Create board objects
        boardObjects = [];
        for (let i = 0; i < numOfObjects; i++) {
            let pinSize = 36;
            let pinType = pinTypes[Math.floor(Math.random() * pinTypes.length)];
            let pinRotation = Math.floor(Math.random() * 20);
            let pinLeft = Math.floor(Math.random() * (backgroundWidth - 100)) + 50;
            let pinTop = Math.floor(Math.random() * (backgroundHeight - 100)) + 50;
            if(!notes.map(q => isPointInCoords(pinLeft+pinSize, pinTop+pinSize, q.coords)).includes(true)) boardObjects.push({
                type: pinType,
                left: pinLeft + "px",
                top: pinTop + "px",
                rotation: pinRotation,
            })
        }

    }

    onMount(() => {
        rePopulate();
        window.addEventListener('resize', rePopulate);
        return () => {
            window.removeEventListener('resize', rePopulate);
        };
    });

</script>


<Background backgroundType={BackgroundType.CorkBoard} style={backgroundStyle} bind:node={backgroundElement}>

    {#each boardObjects as obj}
        <BoardObject
                type={obj.type}
                left={obj.left}
                top={obj.top}
                rotation={obj.rotation}
        />
    {/each}

<!--    <BoardObject type={BoardObjectType.Pinv1Blue} left="300px" top="77px" rotation={24}></BoardObject>-->
    <Note left={introNoteElementLeft} top={introNoteElementTop} noteType={NoteType.Notev1} bind:noteRef={introNoteElement}>
        <div style="display: flex;flex-direction: column;justify-content: space-evenly">
            <p>👋 Hey, I'm Tin, </p>
            <p>a full-stack developer passionate about real-time systems, microservices, and embedded platforms.</p>
            <p>Available to chat anytime.</p>
            <p>Let's build something amazing!</p>
            <div style="height: 10px"></div>
            <div style="display: flex;flex-direction: row;justify-content: space-evenly;flex-grow: 2">
                <Icon
                        url="https://www.github.com/luciantin"
                        icon="fab fa-github"
                />
                <Icon
                        url="mailto:luciantin@gmail.com"
                        icon="fa-solid fa-envelope"
                />
                <Icon
                        url="https://www.linkedin.com/in/lucian-tin/"
                        icon="fab fa-linkedin"
                />
            </div>
        </div>
    </Note>

<!--    <BoardObject type={BoardObjectType.Pinv1Green} left="1230px" top="110px" rotation={24}></BoardObject>-->
    <Note left={skillsNoteElementLeft} top={skillsNoteElementTop} noteType={NoteType.Paperv1} rotation={-1} bind:noteRef={skillsNoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.13;">
            <p>🛠️ Skills:</p>
            <p>.NET Core, Golang, Python, C, C++</p>
            <p>Flutter, React, Blazor</p>
            <p>PostgreSQL, MariaDB, SQL Server</p>
            <p>Docker, Docker Compose, CI/CD Pipelines, Git, Bash</p>
            <p>Espressif, Particle</p>
            <p>ARM Firmware Development</p>
        </div>
    </Note>



<!--    <BoardObject type={BoardObjectType.Pinv1Red} left="820px" top="190px" rotation={24}></BoardObject>-->
    <Note left={aboutMeNoteElementLeft} top={aboutMeNoteElementTop} noteType={NoteType.Paperv1} rotation={2} bind:noteRef={aboutMeNoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.1;">
            <p>🚀 About Me:</p>
            <p>Languages: English, Italian, Croatian</p>
            <p>Bachelor of Informatics</p>
            <p>Based in Pula, Croatia</p>
            <p>Flexible, pragmatic and adaptable</p>
        </div>
    </Note>

</Background>
