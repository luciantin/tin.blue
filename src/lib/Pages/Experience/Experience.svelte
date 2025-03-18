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

    export let bottomHeight: number = 0;
    export let offsetTop: number = 0;

    let pentaNoteElement: HTMLDivElement | null = null;
    let amandoNoteElement: HTMLDivElement | null = null;
    let paperANoteElement: HTMLDivElement | null = null;
    let paperBNoteElement: HTMLDivElement | null = null;

    let boardObjects: Array<BoardObjectProps> = [];

    let backgroundElement: HTMLElement | null = null;
    let backgroundStyle = "";

    function htmlElemToCoords(element : HTMLElement) : Coords {
        let rect = element.getBoundingClientRect();
        return {
            X1: rect.left,
            Y1: rect.top,
            X2: rect.right,
            Y2: rect.bottom
        }
    }

    function isPointInCoords(pointXTop: number, pointYTop: number, pointXBottom : number, pointYBottom : number, coords: Coords) : boolean {
        // return !(pointX < coords.X1 || pointX > coords.X2 || pointY < coords.Y1 || pointY > coords.Y2);
        return !((pointXTop < coords.X1 || pointXTop > coords.X2 || pointYTop < coords.Y1 || pointYTop > coords.Y2) &&
            (pointXBottom < coords.X1 || pointXBottom > coords.X2 || pointYBottom < coords.Y1 || pointYBottom > coords.Y2))
    }

    function rePopulate() {
        console.log("rePopulate");
        if (backgroundElement === null) return;

        let backgroundWidth = 0;
        let backgroundHeight = 0;

        const pinTypes = [
            BoardObjectType.Pinv1Red,
            BoardObjectType.Pinv1Blue,
            BoardObjectType.Pinv1Yellow,
            BoardObjectType.Pinv1Green
        ];

        backgroundWidth = backgroundElement.clientWidth;
        backgroundHeight = backgroundElement.clientHeight;

        let notes: Array<ElementDivCoords> = []

        if(pentaNoteElement != null) notes.push({element: pentaNoteElement, coords: htmlElemToCoords(pentaNoteElement)});
        if(amandoNoteElement != null) notes.push({element: amandoNoteElement, coords: htmlElemToCoords(amandoNoteElement)});
        if(paperBNoteElement != null) notes.push({element: paperBNoteElement, coords: htmlElemToCoords(paperBNoteElement)});
        if(paperANoteElement != null) notes.push({element: paperANoteElement, coords: htmlElemToCoords(paperANoteElement)});

        // Populate board with notes

        // console.log(backgroundHeight);
        let bkgheight = backgroundHeight;
        let tmpWidth = 0;
        let tmpMaxHeight = 100//backgroundElement.getBoundingClientRect().top + 20;
        let tmpMaxElementHeightOnLevel = 0;

        let row = []

        for (let i = 0; i < notes.length; i++) {
            let heghtDeviation = 10 + Math.floor(Math.random() * 50);

            const element = notes[i];
            const elementWidth = element.element.clientWidth;
            const elementHeight = element.element.clientHeight;

            tmpMaxElementHeightOnLevel += heghtDeviation;
            if(tmpMaxElementHeightOnLevel < elementHeight) tmpMaxElementHeightOnLevel = elementHeight;

            if(tmpWidth + elementWidth > backgroundWidth) {
                tmpWidth = 0;
                tmpMaxHeight += tmpMaxElementHeightOnLevel + heghtDeviation;
                tmpMaxElementHeightOnLevel = 0;

                let sumLen = row.reduce((acc, cur) => acc + cur.element.clientWidth, 0);
                let margin = (backgroundWidth - sumLen) / (row.length + 1);
                row.forEach((el, idx) => {
                    // console.log(idx);
                    el.coords.X1 += margin;
                    el.coords.X2 += margin;

                    el.element.style.left = el.coords.X1 + "px";
                    el.element.style.top = el.coords.Y1 + "px";
                })
                row = [];
            }

            row.push(notes[i]);

            notes[i].coords.Y1 = tmpMaxHeight + heghtDeviation + offsetTop;
            notes[i].coords.Y2 = tmpMaxHeight + elementHeight + heghtDeviation + offsetTop;

            notes[i].coords.X1 = tmpWidth;
            notes[i].coords.X2 = tmpWidth + elementWidth;
            tmpWidth += elementWidth;

            bkgheight = notes[i].coords.Y2 + 20;
        }

        if(row.length > 0) {

            let sumLen = row.reduce((acc, cur) => acc + cur.element.clientWidth, 0);
            let margin = (backgroundWidth - sumLen) / (row.length + 1);

            // console.log(margin);

            row.forEach((el, idx) => {

                el.coords.X1 += margin*(idx+1);
                el.coords.X2 += margin*(idx+1);

                // console.log(`X1: ${el.coords.X1}, X2: ${el.coords.X2}, margin: ${margin}, idx: ${idx}`);

                el.element.style.left = el.coords.X1 + "px";
                el.element.style.top = el.coords.Y1 + "px";
            })
        }

        bottomHeight = bkgheight;
        backgroundHeight = bkgheight
        backgroundStyle = `min-height: ${bkgheight - offsetTop}px;`;

        // Create board objects
        boardObjects = [];
        let numOfObjects = 0;
        while(boardObjects.length < numOfObjects) {
            let pinSize = 32;
            let pinType = pinTypes[Math.floor(Math.random() * pinTypes.length)];
            let pinRotation = 3 + Math.floor(Math.random() * 20);
            let pinLeft = Math.floor(Math.random() * (backgroundWidth - 20)) + 20;
            let pinTop = Math.floor(Math.random() * (backgroundHeight - 20)) + 20 + offsetTop;

            if(!notes.map(q => isPointInCoords(pinLeft, pinTop, pinLeft+pinSize, pinTop+pinSize, q.coords)).includes(true)) {
                if(pinTop + pinSize > backgroundHeight - 20) pinTop = pinTop - 12;
                boardObjects.push({
                    type: pinType,
                    left: pinLeft + "px",
                    top: pinTop + "px",
                    rotation: pinRotation,
                })
            }
        }

        //Note pins
        // for(let i = 0; i < notes.length; i++) {
        //     let pinTop = notes[i].coords.Y1 ;
        //     let pinLeft = notes[i].coords.X1 + (notes[i].element.clientWidth / 2);
        //     boardObjects.push({
        //         type: i == 0 ? BoardObjectType.Pinv1Blue : pinTypes[Math.floor(Math.random() * pinTypes.length)],
        //         left: pinLeft + "px",
        //         top: pinTop + "px",
        //         rotation: Math.floor(Math.random() * 20),
        //     })
        // }
    }

    onMount(() => {
        rePopulate();
        window.addEventListener('resize', rePopulate);
        return () => {
            window.removeEventListener('resize', rePopulate);
        };
    });

</script>


<Background backgroundType={BackgroundType.WhiteBoard} bind:style={backgroundStyle} bind:node={backgroundElement}>

    {#each boardObjects as obj}
        <BoardObject
                type={obj.type}
                left={obj.left}
                top={obj.top}
                rotation={obj.rotation}
        />
    {/each}

    <Note noteType={NoteType.PostItv1} bind:noteRef={pentaNoteElement}>
        <div style="display: flex;flex-direction: column;justify-content: space-evenly ; line-height: 1.1;">
            <p>🛠️ Penta - Software Engineer (2022 - Present)</p>
            <p>Designed and implemented real-time microservices in C#, deployed with Docker.</p>
            <p>Built multiple smart signage React applications with real-time updates over MQTT.</p>
            <p>Developed Go/Python/C services for embedded devices</p>
            <p>Maintained, enhanced and deployed legacy C# applications critical to business operations.</p>
        </div>
    </Note>

    <Note noteType={NoteType.PostItv1} rotation={(-2+Math.random() * 4)} bind:noteRef={amandoNoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.13;">
            <p>🛠️ Software Developer (2022)</p>
            <p>Collaborated with an external API provider to develop a React plugin for an existing WordPress website</p>
            <p>Integrated API data combining Wordpress PHP with React components for smooth functionality</p>
        </div>
    </Note>

    <Note noteType={NoteType.PostItv1} rotation={2} bind:noteRef={paperBNoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.1;">
            <p>📑 Published "Dew‑based Service Orchestration Model For Systems Spanning
                Multiple Computing Layers"</p>
            <p>Proposed a functionality graph model for orchestrating services across multi-layered systems, leveraging Python, React, C#, and Kubernetes for distributed service management.</p>
            <a href="https://ieeexplore.ieee.org/document/9596638" style="text-decoration: none">📘 Published in IEEE</a>
        </div>
    </Note>

    <Note noteType={NoteType.PostItv1} rotation={(-2+Math.random() * 4)} bind:noteRef={paperANoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.13;">
            <p>📄 Published "Orchestration Of Distributed Web Applications On Integrated Systems"</p>
            <p>Developed a framework abstracting microcontroller architectures to enable hardware-independent software development and orchestration.</p>
            <p>WebAssembly "Docker" for microcontrollers.</p>
        </div>
    </Note>


</Background>
