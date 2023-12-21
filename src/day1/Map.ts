type KvPair<V> = {
    key: string | number,
    value: V,
}


// Hash function take from https://stackoverflow.com/a/52171480/7450581
// Nice because JS has only allows 53 bits for numbers
const cyrb53 = (str: string, seed: number = 0): number => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


// Simple Map, no resizing
export default class Map<T extends (string | number), V> {
    private data: KvPair<V>[][];
    private capacity: number;
    private length: number;
    

    constructor() {
        this.data = [];
        this.capacity = 3;
        this.length = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.data[i] = [];
        }
    }

    private hashToPosition(key: T): number {
        const data = String(key);
        const hash = cyrb53(data);
        return hash % this.capacity;
    }

    get(key: T): V | undefined {
        const position = this.hashToPosition(key);
        const pairs = this.data[position];

        if (!pairs) {
            return undefined;
        }

        if (pairs.length === 1) {
            return pairs[0].value;
        }

        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].key === key) {
                return pairs[i].value;
            }
        }
        return undefined;
    }

    set(key: T, value: V): void {
        const position = this.hashToPosition(key);
        const pairs = this.data[position];

        // item updated if necessary
        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].key === key) {
                pairs[i].value = value;
                return;
            }
        }

        // new item is inserted
        this.data[position].push({key, value} as KvPair<V>);
        this.length++;
        return;
    }

    delete(key: T): V | undefined {
        const position = this.hashToPosition(key);
        const pairs = this.data[position];

        if (!pairs) {
            return undefined;
        }

        if (pairs.length === 1 && pairs[0].key === key) {
            const value = pairs[0].value;
            this.data[position] = [];
            this.length--;
            return value;
        }

        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].key === key) {
                const value = pairs[i].value;
                pairs.splice(i, 1);
                this.length--;
                return value;
            }
        }
        return undefined;
    }

    size(): number {
        return this.length;
    }
}