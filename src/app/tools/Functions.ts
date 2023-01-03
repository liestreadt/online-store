import { FilterKeys } from '../intefaces/types';

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
export default increaseValueInMap;
