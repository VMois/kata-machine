const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function walk(maze: string[], wall: string, end: Point, point: Point, seen: boolean[][], path: Point[]): boolean {
    // 1. Did we hit a wall?
    if (maze[point.y][point.x] === wall) {
        return false;
    }

    // 2. Are we off the grid?
    if (point.x >= maze[0].length || point.y >= maze.length) {
        return false;
    }

    // 3. Did we find an exit?
    if (point.x === end.x && point.y === end.y) {
        path.push({x: point.x, y: point.y});
        return true;
    }

    // 4. Have we seen this cell before?
    if (seen[point.y][point.x]) {
        return false;
    }

    // pre recursion
    seen[point.y][point.x] = true;
    path.push({x: point.x, y: point.y});

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        const nextPoint = {x: point.x + x, y: point.y + y};
        if (walk(maze, wall, end, nextPoint, seen, path)) {
            return true;
        }
    }

    // post recursion
    path.pop();

    return false;
} 

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    let path: Point[] = [];
    let seen: boolean[][] = Array(maze.length);
    for (let i = 0; i < seen.length; i++) {
        seen[i] = Array(maze[0].length).fill(false);
    }
    walk(maze, wall, end, start, seen, path);
    return path;
}