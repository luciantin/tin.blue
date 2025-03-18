export enum ImageFrameType {
    Polaroidv1 = 'Polaroidv1',
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
export function GetNoteBBProportion(imageFrameType: ImageFrameType): [number, number, number, number, number] {
    switch (imageFrameType) {
        case ImageFrameType.Polaroidv1:
            return [0.12, 0.8, 0.6, 0.8, 0];
    }
    return [0, 0, 0, 0, 0];
}


// right left top bottom
export function GetMarginX(imageFrameType: ImageFrameType): [number, number, number, number]{
    switch (imageFrameType) {
        case ImageFrameType.Polaroidv1:
            return [5, 20, 10, 10];
    }
    return [0, 0, 0, 0];
}

export function GetProportion(imageFrameType: ImageFrameType): number {
    switch (imageFrameType) {
        case ImageFrameType.Polaroidv1:
            return 0.8508371385083714;
    }

    return 1;
}

export async function GetProportionAsync(imageFrameType: ImageFrameType): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        const svgImage = new Image();
        svgImage.src = `/images/notes/${imageFrameType}.svg`;

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
