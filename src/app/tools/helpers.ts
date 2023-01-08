import { FilterKeys, ProductDetails } from '../intefaces/types';

export function increaseValueInMap(myMap: Map<string, number>, value: string): void {
    if (!myMap.has(value)) {
        myMap.set(value, 1);
    } else {
        const previousValue = myMap.get(value) as number;
        myMap.set(value, previousValue + 1);
    }
}
export function checkSearchFocused(): boolean {
    if (history.state) {
        const lastEventType: FilterKeys = history.state.key;
        return lastEventType === 'searching';
    }
    return false;
}

export async function calculateImages(product: ProductDetails) {
    const duplicateImages: (string | null)[] = [];
    for (let i = 0; i < product.images.length; i++) {
        const imgResponse = await fetch(product.images[i], { method: 'HEAD' });
        const imgSize = imgResponse.headers.get('content-length');
        if (duplicateImages.includes(imgSize)) {
            delete product.images[i];
        } else {
            duplicateImages.push(imgSize);
        }
    }
    if (!product.isImagesUnique) {
        product.isImagesUnique = true;
    }
    return product.images;
}

export default increaseValueInMap;
