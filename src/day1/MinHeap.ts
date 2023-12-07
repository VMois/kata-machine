export default class MinHeap {
    public length: number;
    private data: number[];
    
    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.length++;
        this.data[this.length - 1] = value;
        this.heapUp(this.length - 1);
    }

    private getParent(idx: number) {
        return Math.floor(Math.max(idx - 1, 0) / 2);
    }

    private getLeftChild(idx: number) {
        return 2 * idx + 1;
    }

    private getRightChild(idx: number) {
        return 2 * idx + 2;
    }

    private swap(a: number, b: number) {
        const tmp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = tmp;
    }
    
    private heapUp(idx: number): void {
        // base condition, root node, no parent
        if (idx === 0) {
            return;
        }

        const parent = this.getParent(idx);

        if (this.data[idx] < this.data[parent]) {
            this.swap(idx, parent);
        }

        this.heapUp(parent);
    }

    private heapDown(idx: number): void {
        const leftChild = this.getLeftChild(idx);
        const rightChild = this.getRightChild(idx);

        if (leftChild >= this.length) {
            return;
        }

        const leftValue = this.data[leftChild];
        const rightValue = this.data[rightChild];
        const value = this.data[idx];

        if (leftValue < rightValue && value > leftValue) {
            this.swap(leftChild, idx);
            this.heapDown(leftChild);
        } else if (rightValue < leftValue && value > rightValue) {
            this.swap(rightChild, idx);
            this.heapDown(rightChild);
        }
    }

    delete(): number {
        if (this.length < 1) {
            throw Error('delete: heap is empty');
        }
        const root = this.data[0];
        
        // put last element on top
        this.swap(0, this.length - 1);
        this.length--;
        this.data.pop()

        this.heapDown(0);
        return root;
    }
}