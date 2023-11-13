function recurse(arr: number[], lo: number, hi: number) {
    if (lo >= hi) {
        return;
    }
    let insert_ptr = lo - 1;
    const p_el = arr[hi];

    for (let i = lo; i <= hi; i++) {
        if (arr[i] <= p_el) {
            insert_ptr++;
            const tmp = arr[insert_ptr];
            arr[insert_ptr] = arr[i];
            arr[i] = tmp;
        }
    }
    recurse(arr, lo, insert_ptr - 1);
    recurse(arr, insert_ptr + 1, hi);
}  

export default function quick_sort(arr: number[]): void {
   recurse(arr, 0, arr.length - 1); 
}