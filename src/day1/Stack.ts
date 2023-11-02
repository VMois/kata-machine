type Node<T> = {
    value: T,
    next: Node<T> | undefined,
}

export default class Stack<T> {
    public length: number;
    private head: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        this.length++;
        const node = {value: item} as Node<T>;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        this.length = Math.max(this.length - 1, 0);
        const node = this.head;
        this.head = this.head?.next;
        return node?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}