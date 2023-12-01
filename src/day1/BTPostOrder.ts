function traverse(head: BinaryNode<number> | null, nums: number[]) {
    // base case
    if (!head) {
        return;
    }

    // recurse
    traverse(head.left, nums);
    traverse(head.right, nums);
    nums.push(head.value);
}


export default function post_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    traverse(head, result);

    return result;
}