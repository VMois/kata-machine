type Node<T>= {
    value: T,
    next: Node<T> | undefined,
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value: item, next: undefined} as Node<T>;
        this.length++;
        if (this.head === undefined) {
            this.head = node;
            this.tail = node;
            return;
        }
        node.next = this.head;
        this.head = node;
    }
    
    insertAt(item: T, idx: number): void {
        if (idx == 0) {
            this.prepend(item);
            return;
        }

        if (idx > this.length - 1) {
            throw Error("idx out of bound")
        }

        const prevNode = this.getAt(idx - 1) as Node<T>;
        const node = {value: item, next: undefined} as Node<T>;
        node.next = prevNode.next;
        prevNode.next = node;
        this.length++;
    }

    append(item: T): void {
        if (this.head === undefined || this.tail === undefined) {
            this.prepend(item);
            return;
        }
        const node = {value: item, next: undefined} as Node<T>;
        this.tail.next = node;
        this.tail = node;
        this.length++;
    }

    remove(item: T): T | undefined {
        var curr = this.head;

        for (var i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                // still need to traverse in removeAt, so not efficient
                return this.removeAt(i);
            }
            curr = curr.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        const node = this.getAt(idx);
        return node?.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx > this.length - 1) {
            throw Error("idx is out of bound");
        }
        var curr = this.head;
        for (var i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }
        return curr;
    }

    removeAt(idx: number): T | undefined {
        if (this.length === 0) {
            throw Error("List is empty");
        }

        if (idx === 0) {
            const node = this.head;
            this.head = this.head?.next;
            this.length = Math.max(this.length - 1, 0);
            return node?.value;
        }

        const prevNode = this.getAt(idx - 1) as Node<T>;
        const node = prevNode?.next;
        prevNode.next = node?.next;

        if (idx === this.length - 1) {
            this.tail = prevNode;
        }

        this.length--;
        return node?.value;
    }
}