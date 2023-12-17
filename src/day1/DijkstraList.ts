type Node<T> = {
    priority: number;
    value: T;
};

// Based on MinHeap
export class PriorityQueue<T> {
    public length: number;
    private data: Node<T>[];
    
    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(priority: number, value: T): void {
        this.length++;
        this.data[this.length - 1] = {priority, value} as Node<T>;
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

        const parentIdx = this.getParent(idx);

        if (this.data[idx].priority < this.data[parentIdx].priority) {
            this.swap(idx, parentIdx);
        }

        this.heapUp(parentIdx);
    }

    private heapDown(idx: number): void {
        const leftChildIdx = this.getLeftChild(idx);
        const rightChildIdx = this.getRightChild(idx);

        // We are already out of bound.
        // Because heap is always complete from left to right
        // If left child doesn't exist, right doesn't exist as well
        if (idx >= this.length || leftChildIdx >= this.length) {
            return;
        }

        const leftValue = this.data[leftChildIdx].priority;

        let rightValue = Infinity;
        if (rightChildIdx < this.length) {
            rightValue = this.data[rightChildIdx].priority;
        }
        const value = this.data[idx].priority;

        if (leftValue > rightValue && value > rightValue) {
            this.swap(rightChildIdx, idx);
            this.heapDown(rightChildIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.swap(leftChildIdx, idx);
            this.heapDown(leftChildIdx);
        }
    }

    delete(): T | undefined {
        // empty heap
        if (this.length < 1) {
            return undefined;
        }

        const root = this.data[0];
        
        // put last element on top
        this.swap(0, this.length - 1);
        this.length--;
        this.data.pop()

        this.heapDown(0);
        return root.value;
    }
}


export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    let seen: boolean[] = new Array(arr.length).fill(false);
    let prev: number[] = new Array(arr.length).fill(-1);
    let dists: number[] = new Array(arr.length).fill(Infinity);

    dists[source] = 0;

    const Q = new PriorityQueue<number>();
    Q.insert(0, source);

    while (Q.length !== 0) {
        let curr = Q.delete() as number;
        seen[curr] = true;

        for (let i = 0; i < arr[curr].length; i++) {
            const edge = arr[curr][i];
            if (seen[edge.to]) {
                continue;
            }
            const dist = dists[curr] + edge.weight;
            Q.insert(dist, edge.to);
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = curr;
            }
        }
    }

    let curr = sink;
    let path: number[] = [];

    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }

    if (path.length) {
        path.push(source);
        return path.reverse();
    }

    return path;
}