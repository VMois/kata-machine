type Node<T> = {
    value: T;
    next: Node<T> | undefined;
    prev: Node<T> | undefined;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value: item} as Node<T>;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }

        this.length++;
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.length) {
            throw Error("insertAt: idx is out of range");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        const curr = this.getNode(idx) as Node<T>;
        const node = {value: item} as Node<T>;
        this.length++;

        node.prev = curr.prev;
        node.next = curr;
        if (curr.prev) {
            curr.prev.next = node;
        }
        curr.prev = node;
    }

    private getNode(idx: number): Node<T> | undefined {
        let curr = this.head as Node<T> | undefined;
        let i = 0;
        while (curr && i < idx) {
            curr = curr.next;
            i++;
        }
        return curr;
    }

    append(item: T): void {
        const node = {value: item} as Node<T>;

        if (!this.tail) {
            this.prepend(item);
            return;
        }

        this.length++;
        node.prev = this.tail;
        this.tail.next = node;

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head as Node<T> | undefined;
        for (let idx = 0; idx < this.length && curr; idx++) {
            if (curr?.value === item) {
                return this.removeAt(idx);
            }
            idx++;
            curr = curr?.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            throw Error("get: out of bound idx");
        }

        const node = this.getNode(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            throw Error("removeAt: out of bound idx");
        }

        const curr = this.getNode(idx);
        
        if (curr && curr.prev) {
            curr.prev.next = curr.next; 
        }

        if (curr && curr.next) {
            curr.next.prev = curr.prev;
        }

        if (idx === this.length - 1) {
            this.tail = curr?.prev;
        }

        if (idx === 0) {
            this.head = curr?.next;
        }

        this.length--;
        return curr?.value;
    }
}