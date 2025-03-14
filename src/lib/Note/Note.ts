export enum NoteType {
    Default = "Note1",
    PostItv1 = "PostItv1",
}

// right left top bottom
export function GetMarginX(noteType:NoteType): [number, number, number, number]{
    switch (noteType) {
        case NoteType.Default:
            return [5, 30, 10, 10];
        case NoteType.PostItv1:
            return [5, 20, 10, 10];
    }
    return [0, 0, 0, 0];
}

export async function GetProportion(noteType: NoteType): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        const svgImage = new Image();
        svgImage.src = `/images/notes/${noteType}.svg`;

        svgImage.onload = () => {
            const width = svgImage.naturalWidth;
            const height = svgImage.naturalHeight;

            console.log(`Width: ${width}, Height: ${height}`);
            resolve(width / height);
        };

        svgImage.onerror = (error) => {
            reject(new Error(`Unable to load image: ${svgImage.src}`));
        };
    });
}
