
function walk(maze: string[], wall: string, end: Point, seen: boolean[][], path: Point[]): boolean {
    
    let point = path[path.length - 1];

    // 1. Did we hit a wall?
    if (maze[point.y][point.x] === wall) {
        path.pop()
        return false;
    }

    // 2. Are we off the grid?
    if (point.x >= maze[0].length || point.y >= maze.length) {
        path.pop()
        return false;
    }

    // 3. Did we find an exit?
    if (point.x === end.x && point.y === end.y) {
        return true;
    }

    // 4. Have we seen this cell before?
    if (seen[point.y][point.x]) {
        path.pop()
        return false;
    }

    seen[point.y][point.x] = true;

    // Go up
    path.push({x: point.x, y: point.y + 1})
    if (walk(maze, wall, end, seen, path)) {
        return true
    }

    // Go right
    path.push({x: point.x + 1, y: point.y})
    if (walk(maze, wall, end, seen, path)) {
        return true
    }

    // Go down
    path.push({x: point.x, y: point.y - 1})
    if (walk(maze, wall, end, seen, path)) {
        return true
    }

    // Go left
    path.push({x: point.x - 1, y: point.y})
    if (walk(maze, wall, end, seen, path)) {
        return true
    }

    return false;
} 

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    let path: Point[] = [start];
    let seen: boolean[][] = Array(maze.length);
    for (let i = 0; i < seen.length; i++) {
        seen[i] = Array(maze[0].length).fill(false);
    }
    walk(maze, wall, end, seen, path);
    return path;
}