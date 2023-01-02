function increaseValueInMap(myMap: Map<string, number>, value: string): void {
    if (!myMap.has(value)) {
        myMap.set(value, 1);
    } else {
        const previousValue = myMap.get(value) as number;
        myMap.set(value, previousValue + 1);
    }
}

export default increaseValueInMap;
