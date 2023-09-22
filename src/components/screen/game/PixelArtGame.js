class PixelArtGame {

    constructor(map, character, scoreDisplay, timer) {
      // DOM elements
      this.map = map;
      this.character = character;
      this.scoreDisplay = scoreDisplay;
      this.timer = timer;
    
      // Game variables
      this.score = 0;
      this.timeLimit = parseInt(this.timer.textContent);
      this.remainingTime = this.timeLimit;
      this.isGameOver = false;
      this.speed = 4;
  
      // Game boundaries
      this.limits = {
        left: 0 - this.character.clientWidth / 2 + 25,
        right: 1248 - this.character.clientWidth + 25,
        top: 0 - this.character.clientHeight / 2,
        bottom: 1248 -  this.character.clientHeight
      };
  
      // Camera offset to center the character
      this.cameraOffset = {
        left: 240 - this.character.clientWidth / 2,
        top: 240 - this.character.clientHeight / 2
      };
  
      // Direction handling
      this.heldDirections = [];
      this.directionKeys = { 38: "up", 37: "left", 39: "right", 40: "down" };
  
      // Item definition
      this.items = {
        coin: {
          type: 'coin',
          width: 36,
          height: 34
        },
        fish: {
          type: 'fish',
          width: 48,
          height: 48
        }
      }
    }
  
    // Spawn player at a given position
    spawnPlayer(x, y) {
      this.playerX = x;
      this.playerY = y;
      this.character.style.visibility = "visible";
    }
  
    // Generate random item positions that are not too close to each other
    generateRandomItemPositions(numPositions, mapWidth, mapHeight, itemWidth, itemHeight) {
      const positions = [];
      const minDistance = 96;
      const maxTries = 10000;
  
      let tries = 0;
  
      while (positions.length < numPositions && tries < maxTries) {
        const x = Math.floor(Math.random() * (mapWidth - itemWidth));
        const y = Math.floor(Math.random() * (mapHeight - itemHeight));
        const isTooClose = positions.some(
          pos => Math.abs(x - pos.x) < minDistance && Math.abs(y - pos.y) < minDistance
        );
  
        if (!isTooClose) {
          positions.push({ x, y });
        }
  
        tries++;
      }
  
      return positions;
    }
  
    // Clear items of a given type
    clearItems(itemType) {
      document.querySelectorAll(`.item.${itemType}`).forEach(item => item.remove());
    }
  
    // Spawn items of a given type at random positions
    spawnItemsRandomly(item, numItems) {
      this.clearItems(item.type);
      const positions = this.generateRandomItemPositions(
        numItems,
        this.map.clientWidth,
        this.map.clientHeight,
        item.width,
        item.height
      );
      positions.forEach(position => this.spawnItem(item, position));
    }
  
    // Spawn a single item of a given type at a specific position
    spawnItem(item, position) {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item", item.type);
      itemElement.style.left = `${position.x}px`;
      itemElement.style.top = `${position.y}px`;
      this.map.appendChild(itemElement);
    }
  
    // Handle keydown event
    handleKeyDown(event) {
      const direction = this.directionKeys[event.which];
      if (direction && !this.heldDirections.includes(direction)) {
        this.heldDirections.unshift(direction);
      }
    }
  
    // Handle keyup event
    handleKeyUp(event) {
      const direction = this.directionKeys[event.which];
      const index = this.heldDirections.indexOf(direction);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    }
  
    // Handle player movement
    handleMovement() {

      if (this.isGameOver) {
        return;
      }

      const heldDirection = this.heldDirections[0];
      if (heldDirection) {
        const movement = {
          right: [this.speed, 0],
          left: [-this.speed, 0],
          down: [0, this.speed],
          up: [0, -this.speed],
        };
        const [dx, dy] = movement[heldDirection];
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
  
        if (this.isWithinLimits(newX, newY)) {
          this.playerX = newX;
          this.playerY = newY;
        }
        this.character.setAttribute("facing", heldDirection);
      }
  
      this.character.setAttribute("walking", heldDirection ? "true" : "false");
    }
  
    // Check if a position is within game boundaries
    isWithinLimits(x, y) {
      return x >= this.limits.left && x <= this.limits.right && y >= this.limits.top && y <= this.limits.bottom;
    }
  
    // Collect items on collision
    collectItems() {
      const itemElements = document.querySelectorAll(".item");
  
      for (const item of itemElements) {
        if (this.checkCollision(this.character, item)) {
          if (item.classList.contains('coin')) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
          }
  
          if (item.classList.contains('fish')) {
            this.remainingTime += 2;
          }
          
          item.remove();
        }
      }
    }
  
    // Check collision between two elements
    checkCollision(character, item) {
      const { left, right, bottom, top } = character.getBoundingClientRect();
      const { left: il, right: ir, bottom: ib, top: it } = item.getBoundingClientRect();
      return left + 16 < ir && right - 16 > il && bottom - 8 > it && top + 8 < ib;
    }
  
    // Show the start screen
    showStartScreen() {

      if (this.startGameScreen) return;

      this.startGameScreen = document.createElement("div");
      this.startGameScreen.classList.add("start-screen");
      this.startGameScreen.innerHTML = `
        <h2>Otter Game</h2>
        <p>Collect as many fish coins as you can!<br><sub>Raw fish adds 2 seconds to your timer.</sub></p>
        <button id="start-button">Start Game</button>
      `;
      
      this.map.closest('.camera').appendChild(this.startGameScreen);
  
      const startButton = this.startGameScreen.querySelector("#start-button");
      startButton.addEventListener("click", () => {
        this.startGame();
        this.hideStartScreen();
      });
    }
  
    // Show the game over screen
    showGameOverScreen() {

      if (this.gameOverScreen) return;

      this.isGameOver = true;
      this.heldDirections = [];
      this.character.setAttribute("walking", "false");
  
      this.gameOverScreen = document.createElement("div");
      this.gameOverScreen.classList.add("game-over");
      this.gameOverScreen.innerHTML = `
        <h2>Game Over</h2>
        <p>Final Score: ${this.score}</p>
        <button id="restart-button">Restart Game</button>
      `;

      this.map.closest('.camera').appendChild(this.gameOverScreen);
  
      const restartButton = this.gameOverScreen.querySelector("#restart-button");
      restartButton.addEventListener("click", () => {
        this.restartGame();
        this.hideGameOverScreen();
      });
    }
  
    // Hide the start screen
    hideStartScreen() {
      if (this.startGameScreen) {
        this.startGameScreen.remove();
        this.startGameScreen = null;
      }
    }
  
    // Hide the game over screen
    hideGameOverScreen() {
      if (this.gameOverScreen) {
        this.gameOverScreen.remove();
        this.gameOverScreen = null;
      }
    }
  
    // Start the game
    startGame() {
      document.addEventListener("keydown", e => this.handleKeyDown(e));
      document.addEventListener("keyup", e => this.handleKeyUp(e));
  
      this.spawnPlayer(250, 250);
      this.spawnItemsRandomly(this.items.coin, 80);
      this.spawnItemsRandomly(this.items.fish, 5);
      this.startGameLoop();
    }
  
    // Restart the game
    restartGame() {
      this.isGameOver = false;
      this.score = 0;
      this.scoreDisplay.textContent = this.score;
      this.remainingTime = this.timeLimit;
      this.timer.textContent = this.timeLimit;
      this.character.setAttribute("walking", "false");
      this.character.setAttribute("facing", "bottom");
  
      this.startGame();
    }
  
    // Update the game state
    updateGame() {
      this.handleMovement();
      this.collectItems();
  
      this.remainingTime -= 1 / 60;
      this.timer.textContent = Math.max(0, Math.ceil(this.remainingTime));
      if (this.remainingTime <= 0) {
        this.showGameOverScreen();
      }
  
      this.map.style.transform = `translate3d(${-this.playerX + this.cameraOffset.left}px, ${-this.playerY + this.cameraOffset.top}px, 0)`;
      this.character.style.transform = `translate3d(${this.playerX}px, ${this.playerY}px, 0)`;
    }
  
    // Start the game loop
    startGameLoop() {
      if (!this.isGameOver) {
        this.updateGame();
        window.requestAnimationFrame(() => this.startGameLoop());
      }
    }
  }

  export default PixelArtGame;