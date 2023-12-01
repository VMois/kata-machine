function traverse(head: BinaryNode<number> | null, nums: number[]) {
    // base case
    if (!head) {
        return;
    }

    // recurse
    traverse(head.left, nums);
    nums.push(head.value);
    traverse(head.right, nums);
}


export default function in_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];
    traverse(head, result);
    return result;
}