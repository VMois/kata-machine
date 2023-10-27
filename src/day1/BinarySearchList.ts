export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0
    let high = haystack.length

    while (low < high) {
        let middle = Math.floor((high - low) / 2 + low)
        let value = haystack[middle]
        if (haystack[middle] == needle) {
            return true;
        } else if (value < needle) {
            low = middle + 1
        } else {
            high = middle
        }    
    }
    return false; 
}