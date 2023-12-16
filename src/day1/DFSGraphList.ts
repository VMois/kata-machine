function dfsRecurse(graph: WeightedAdjacencyList, node: number, needle: number, path: number[], seen: boolean[]): boolean {
    if (seen[node]) {
        return false;
    }

    seen[node] = true;
    path.push(node);

    if (node === needle) {
        return true;
    }

    for (let i = 0; i < graph[node].length; i++) {
        let edge = graph[node][i];
        if (dfsRecurse(graph, edge.to, needle, path, seen)) {
            return true;
        }
    }

    path.pop()
    return false;
}


export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    let path: number[] = [];
    let seen: boolean[] = new Array(graph.length).fill(false);
    dfsRecurse(graph, source, needle, path, seen);

    if (path.length) {
        return path;
    }

    return null;
}