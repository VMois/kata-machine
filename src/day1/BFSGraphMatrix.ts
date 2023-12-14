export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    let seen: boolean[] = new Array(graph.length).fill(true, 0, 1).fill(false, 1);
    let prev: number[] = new Array(graph.length).fill(-1);
    let Q: number[] = [source];

    while (Q.length) {
        let curr = Q.shift() as number;
        seen[curr] = true;
        if (curr === needle) {
            break;
        }
        
        for (let i = 0; i < graph[0].length; i++) {
            let w = graph[curr][i];
            if (!seen[i] && w > 0) {
                Q.push(i);
                prev[i] = curr;
            }
        }
    }

    let path: number[] = [];
    let i = needle;
    while (seen[i] && prev[i] != -1) {
        path.unshift(i);
        i = prev[i];
    }
    
    if (path.length) {
        path.unshift(source);
        return path;
    }
    return null;
}