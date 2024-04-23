function escapeLabyrinth(map) {
  const height = map.length;
  const width = map[0].length;

  // Define movements: up(dx[0], dy[0]), down(dx[1], dy[1]), left(dx[2], dy[2]), right(dx[3], dy[3])
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // Create a visited array to mark visited cells with and without wall removal - cell[0] without removal / cell[1] with removal
  const visited = new Array(height).fill(null).map(() => new Array(width).fill(null).map(() => new Array(2).fill(false)));

  // Queue for BFS: each item contains coordinates (x, y), steps taken, and whether wall has been removed
  const queue = [];
  queue.push({ x: height - 1, y: width - 1, steps: 1, wallRemoved: false });

  while (queue.length > 0) {
    const { x, y, steps, wallRemoved } = queue.shift();

    if (x === 0 && y === 0) {
      return steps; // Reached the exit
    }

    // Explore neighbors
    for (let i = 0; i < 4; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      // Check if new position is within bounds
      if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
        // If the new position has a wall and we haven't removed a wall yet
        if (map[newX][newY] === 1 && !wallRemoved) {
          visited[newX][newY][1] = true;
          queue.push({ x: newX, y: newY, steps: steps + 1, wallRemoved: true });
        }
        // If the new position is passable and not visited
        else if (map[newX][newY] === 0 && !visited[newX][newY][wallRemoved ? 1 : 0]) {
          visited[newX][newY][wallRemoved ? 1 : 0] = true;
          queue.push({ x: newX, y: newY, steps: steps + 1, wallRemoved });
        }
      }
    }
  }

  // If the exit is not reachable
  return -1;
}


console.log(escapeLabyrinth([
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0]
]));

// console.log(escapeLabyrinth([
//   [0, 1, 1, 0],
//   [0, 0, 0, 1],
//   [1, 1, 0, 0],
//   [1, 1, 1, 0]
// ]));

// console.log(escapeLabyrinth([
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 0, 1, 1, 1, 0],
//   [0, 1, 0, 1, 1, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 1, 1, 0, 1],
//   [0, 1, 1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0]
// ]));

// console.log(escapeLabyrinth([
//   [0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 0, 1, 1, 1],
//   [1, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 0],
//   [1, 1, 1, 1, 1, 1, 0],
//   [1, 1, 1, 1, 1, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0]
// ]));

