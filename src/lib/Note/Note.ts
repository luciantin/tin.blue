export enum NoteType {
    Default = "Note1",
    PostItv1 = "PostItv1",
}


// Y/X
// ┌──────────┬────────────┐
// │          │Yo          │
// │          │            │
// │  Xo      ▼  Xr        │
// ├─────────►┌───────┐    │
// │          │       │    │
// │       Yr │       │    │
// │          │       │    │
// │          │       │    │
// │          │       │    │
// │          │       │    │
// │          │       │    │
// │          └───────┘    │
// └───────────────────────┘

// [ Xo, Yo, Xr, Yr ]
export function GetNoteBBProportion(noteType: NoteType): [number, number, number, number] {
    switch (noteType) {
        case NoteType.Default:
            return [0.18, 0.01, 0.4, 0.4];
        case NoteType.PostItv1:
            return [0.2, 0.3, 0.4, 0.4];
    }
    return [0, 0, 0, 0];
}


// right left top bottom
export function GetMarginX(noteType: NoteType): [number, number, number, number]{
    switch (noteType) {
        case NoteType.Default:
            return [5, 30, 10, 10];
        case NoteType.PostItv1:
            return [5, 20, 10, 10];
    }
    return [0, 0, 0, 0];
}

export function GetProportion(noteType: NoteType): number {
    switch (noteType) {
        case NoteType.Default:
            return 0.8508371385083714;
        case NoteType.PostItv1:
            return 1;
    }
}

export async function GetProportionAsync(noteType: NoteType): Promise<number> {
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
