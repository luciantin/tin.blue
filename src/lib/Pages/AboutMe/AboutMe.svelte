<script lang="ts">
import {BackgroundType} from "../../Background/Background";
import {NoteType} from "../../Note/Note";
import Icon from "../../Icon/Icon.svelte";
import Note from "../../Note/Note.svelte";
import Background from "../../Background/Background.svelte";
import BoardObject from "../../BoardObject/BoardObject.svelte";
import {BoardObjectType} from "../../BoardObject/BoardObject";
</script>

<Background backgroundType={BackgroundType.CorkBoard}>

    <BoardObject type={BoardObjectType.Pinv1Red} left="10px" top="18px" rotation={2}></BoardObject>
    <BoardObject type={BoardObjectType.Pinv1Blue} left="1400px" top="71px" rotation={24}></BoardObject>
    <BoardObject type={BoardObjectType.Pinv1Yellow} left="900px" top="10px" rotation={26}></BoardObject>

    <BoardObject type={BoardObjectType.Pinv1Yellow} left="1450px" top="604px" rotation={21}></BoardObject>
    <BoardObject type={BoardObjectType.Pinv1Green} left="200px" top="574px" rotation={-21}></BoardObject>


    <BoardObject type={BoardObjectType.Pinv1Blue} left="300px" top="77px" rotation={24}></BoardObject>
    <Note left="80px" top="60px" noteType={NoteType.Notev1}>
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

    <BoardObject type={BoardObjectType.Pinv1Green} left="1230px" top="110px" rotation={24}></BoardObject>
    <Note left="200px" top="180px" noteType={NoteType.Paperv1} rotation={-1}>
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



    <BoardObject type={BoardObjectType.Pinv1Red} left="820px" top="190px" rotation={24}></BoardObject>
    <Note left="200px" top="100px" noteType={NoteType.Paperv1} rotation={2}>
        <div style="display: flex;flex-direction: column; line-height: 1.1;">
            <p>🚀 About Me:</p>
            <p>Languages: English, Italian, Croatian</p>
            <p>Bachelor of Informatics</p>
            <p>Based in Pula, Croatia</p>
            <p>Flexible, pragmatic and adaptable</p>
        </div>
    </Note>

</Background>
