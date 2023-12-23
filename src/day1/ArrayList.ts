export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private array: Array<T | undefined>;

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.array = new Array<T | undefined>(this.capacity);
    }

    prepend(item: T): void {
        this.shiftRight(0);
        this.array[0] = item;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.length || idx < 0) {
            throw Error('insertAt: idx is out of bounds')
        }

        this.shiftRight(idx);
        this.array[idx] = item;
        this.length++;
    }
    append(item: T): void {
        if (this.length >= this.capacity) {
            this.resize();
        }

        this.length++;
        this.array[this.length - 1] = item;
    }

    private resize(): void {
        let biggerArray = new Array<T | undefined>(this.capacity * 2)

        for (let i = 0; i < this.length; i++) {
            biggerArray[i] = this.array[i];
        }
        this.capacity = this.capacity * 2;
        this.array = biggerArray;
    }

    private shiftLeft(idx: number): void {
        if (idx >= this.length - 1) {
            // this is last element, no need to do anything
            return
        }

        for (let i = idx + 1; i < this.length; i++) {
            this.array[i - 1] = this.array[i];
            this.array[i] = undefined;
        }
    }

    private shiftRight(idx: number): void {
        if (this.length >= this.capacity) {
            this.resize();
        }

        // TODO: check for idx bounds
        let prev = this.array[idx];

        for (let i = idx + 1; i < this.length + 1; i++) {
            let current = this.array[i]
            this.array[i] = prev;
            prev = current;
        }
    }

    remove(item: T): T | undefined {
        let el: T | undefined = undefined;
        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === item) {
                this.shiftLeft(i);
                this.length--;
                el = item;
                break;
            }
        }
        return el;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            throw Error('get: idx is out of bounds')
        }

        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            throw Error('removeAt: idx is out of bounds')
        }
        let item = this.array[idx];
        this.shiftLeft(idx);
        this.length--;
        return item;
    }
}