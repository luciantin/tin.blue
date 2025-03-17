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

    let introNoteElement: HTMLDivElement | null = null;
    let skillsNoteElement: HTMLDivElement | null = null;
    let aboutMeNoteElement: HTMLDivElement | null = null;

    let boardObjects: Array<BoardObjectProps> = [];

    let backgroundElement: HTMLElement | null = null;
    let backgroundStyle = "";

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

        if(introNoteElement != null) notes.push({element: introNoteElement, coords: htmlElemToCoords(introNoteElement)});
        if(skillsNoteElement != null) notes.push({element: skillsNoteElement, coords: htmlElemToCoords(skillsNoteElement)});
        if(aboutMeNoteElement != null) notes.push({element: aboutMeNoteElement, coords: htmlElemToCoords(aboutMeNoteElement)});

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

    <!--    <BoardObject type={BoardObjectType.Pinv1Blue} left="300px" top="77px" rotation={24}></BoardObject>-->
    <Note left={introNoteElementLeft} top={introNoteElementTop} noteType={NoteType.PostItv1} bind:noteRef={introNoteElement}>
        <div style="display: flex;flex-direction: column;justify-content: space-evenly">
            <p>👋 Hey, I'm Tin,</p>
            <p>Available to chat anytime.</p>
        </div>
    </Note>

    <!--    <BoardObject type={BoardObjectType.Pinv1Green} left="1230px" top="110px" rotation={24}></BoardObject>-->
    <Note left={skillsNoteElementLeft} top={skillsNoteElementTop} noteType={NoteType.PostItv1} rotation={(-10+Math.random() * 20)} bind:noteRef={skillsNoteElement}>
        <div style="display: flex;flex-direction: column; line-height: 1.13;">
            <p>🛠️ Skills:</p>
            <p>.NET Core, Golang, Python, C, C++</p>
            <p>Flutter, React, Blazor</p>
        </div>
    </Note>



<!--    &lt;!&ndash;    <BoardObject type={BoardObjectType.Pinv1Red} left="820px" top="190px" rotation={24}></BoardObject>&ndash;&gt;-->
<!--    <Note left={aboutMeNoteElementLeft} top={aboutMeNoteElementTop} noteType={NoteType.PostItv1} rotation={2} bind:noteRef={aboutMeNoteElement}>-->
<!--        <div style="display: flex;flex-direction: column; line-height: 1.1;">-->
<!--            <p>🚀 About Me:</p>-->
<!--            <p>Languages: English, Italian, Croatian</p>-->
<!--            <p>Bachelor of Informatics</p>-->
<!--            <p>Based in Pula, Croatia</p>-->
<!--            <p>Flexible, pragmatic and adaptable</p>-->
<!--        </div>-->
<!--    </Note>-->

</Background>
