function search(head: BinaryNode<number> | null, needle: number): boolean {
    if (!head) {
        return false;
    }

    if (head.value === needle) {
        return true;
    } else if (head.value < needle) {
        return search(head.right, needle);
    } else {
        return search(head.left, needle);
    }
}


export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}