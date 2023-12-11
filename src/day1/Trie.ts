type Node = {
    isWord: boolean,
    children: Map<string, Node>,
};

export default class Trie {
    private head: Node;

    constructor() {
        this.head = {isWord: false, children: new Map<string, Node>()} as Node;
    }

    insert(item: string): void {
        let curr = this.head;

        for (let i = 0; i < item.length; i++) {
            const c = item[i];
            if (curr.children.has(c)) {
                curr = curr.children.get(c) as Node;
            } else {
                const node = {isWord: false, children: new Map<string, Node>()} as Node;
                curr.children.set(c, node);
                curr = node;
            }
        }
        curr.isWord = true;
    }

    delete(item: string): void {
        this.deleteWord(this.head, item, 0);
    }

    private deleteWord(node: Node, item: string, idx: number): void {
        if (idx === item.length) {
            node.isWord = false;
            return;
        } 
        
        const nextNode = node.children.get(item[idx]);

        if (nextNode) {
            this.deleteWord(nextNode, item, idx + 1);
        }
    }

    find(partial: string): string[] {
        let curr = this.head;
        const words: string[] = [];

        for (let c of partial) {
            if (curr.children.has(c)) {
                curr = curr.children.get(c) as Node;
            } else {
                return words;
            }
        }

        this.buildSuggestions(curr, partial, words);
        return words;
    }

    private buildSuggestions(node: Node, prefix: string, words: string[]): void {
        for (let [c, n] of node.children) {
            this.buildSuggestions(n, prefix.concat(c), words);
        }

        if (node.isWord) {
            words.push(prefix);
        }
    }
}