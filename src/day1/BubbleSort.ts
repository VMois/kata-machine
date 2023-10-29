export default function bubble_sort(arr: number[]): void {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        for (let k = 0; k < len - i; k++) {
            if (arr[k] > arr[k + 1]) {
                const tmp = arr[k + 1]
                arr[k + 1] = arr[k]
                arr[k] = tmp
            }
        }
    }
}