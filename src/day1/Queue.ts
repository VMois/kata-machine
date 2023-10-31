type Node<T> = {
    value: T,
    next: Node<T> | undefined,
}

export default class Queue<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined; 

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = {value: item} as Node<T>;
        this.length++;
        if (this.tail == undefined) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }
    deque(): T | undefined {
        const node = this.head;
        this.head = this.head?.next;
        this.length = Math.max(this.length - 1, 0);
        return node?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}