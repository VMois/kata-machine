export default function two_crystal_balls(breaks: boolean[]): number {
    const len = breaks.length;
    const step = Math.floor(Math.sqrt(len));
    let i = step;
    while (i < len) {
        if (breaks[i]) {
            break;
        }
        i += step
    }

    i -= step
    const offset = i
    for (; i < (offset + step) && i < len; i++){
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}