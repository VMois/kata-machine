export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: BinaryNode<number>[] = [];
    q.push(head);

    while (q.length != 0) {
        const node = q.shift() as BinaryNode<number>;
        if (node.value === needle) {
            return true;
        }
          
        if (node.left) {
            q.push(node.left);
        }

        if (node.right) {
            q.push(node.right);
        }
    }

    return false;
}