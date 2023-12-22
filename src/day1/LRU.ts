import MyMap from '@code/Map';

type Node<K, V> = {
    key: K,
    value: V,
    next: Node<K, V> | undefined,
    prev: Node<K, V> | undefined,
}


export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private map: MyMap<string, Node<K, V>>;
    private head: Node<K, V> | undefined;
    private tail: Node<K, V> | undefined;
    

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.map = new MyMap<string, Node<K, V>>(this.capacity);
        this.head = undefined;
        this.tail = undefined;
    }

    update(key: K, value: V): void {
        const v = this.get(key);

        // not found, we need to create and insert in front
        if (v === undefined) {
            const newNode = {key, value, next: undefined, prev: undefined} as Node<K, V>;
            
            // check if need to evict least recently used (tail)
            if (this.length >= this.capacity) {
                if (this.tail) {
                    // Delete tail from map
                    this.map.delete(String(this.tail.key));
                    this.tail.next = undefined;

                    if (this.tail.prev) {
                        this.tail.prev.next = undefined;
                        this.tail = this.tail.prev;
                        this.map.set(String(this.tail.key), this.tail);
                    } else {
                        this.head = undefined;
                        this.tail = undefined;
                    }
                    this.length--;
                }
            }

            // add new node in front
            newNode.next = this.head;
            if (this.head) {
                this.head.prev = newNode;
                this.map.set(String(this.head.key), this.head);
            }
            this.head = newNode;
            this.length++;
            this.map.set(String(newNode.key), newNode);

            if (!this.tail) {
                this.tail = newNode;
            }
        } else {
            // found a node, need to update the value
            // no need to put it in front as we already used get() before
            const node = this.map.get(String(key)) as Node<K, V>;
            node.value = value;
            this.map.set(String(key), node);
        }
    }

    get(key: K): V | undefined {
        // check if key exists
        const node = this.map.get(String(key));
        if (node === undefined) {
            return undefined;
        }

        // if only one key exist, no need to update anything, return it
        if (this.length === 1) {
            return node.value;
        }

        // if node is already a head, no need to update anything, return it
        if (this.head && this.head.key === node.key) {
            return node.value;
        }

        // if many keys exist, put the current key in front
        if (node.prev) {
            node.prev.next = node.next;
            this.map.set(String(node.prev.key), node.prev);
        }

        if (node.next) {
            node.next.prev = node.prev;
            this.map.set(String(node.next.key), node.next);
        }

        // if node is tail, we need to update tail
        if (this.tail && this.tail.key === node.key) {
            this.tail = node.prev;
        }

        node.prev = undefined;
        node.next = this.head;

        // put the node in front
        if (this.head) {
            this.head.prev = node;
            this.map.set(String(this.head.key), this.head);

            this.map.set(String(node.key), node);
            this.head = node;
        }
        return node.value;
    }
}