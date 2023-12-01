function traverse(head: BinaryNode<number> | null, nums: number[]) {
    // base case
    if (!head) {
        return;
    }

    // recurse
    nums.push(head.value);
    traverse(head.left, nums);
    traverse(head.right, nums);
}


export default function pre_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];
    traverse(head, result);
    return result;
}