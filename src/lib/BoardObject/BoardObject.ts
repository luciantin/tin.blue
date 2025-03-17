export enum BoardObjectType {
    Pinv1 = "Pinv1",
    Pinv1Red = "Pinv1Red",
    Pinv1Yellow = "Pinv1Yellow",
    Pinv1Green = "Pinv1Green",
    Pinv1Blue = "Pinv1Blue",
    Clipv1 = "Clipv1",
    Tapev1 = "Tapev1",
}

export interface BoardObjectProps {
    type: BoardObjectType;
    left: string;
    top: string;
    rotation: number;
    sizeMultiplier?: number;
}
