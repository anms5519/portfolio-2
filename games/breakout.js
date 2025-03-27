document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const canvas = document.getElementById('breakoutCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 500;
    
    // Game variables
    let score = 0;
    let lives = 3;
    let level = 1;
    let gameRunning = false;
    let gamePaused = false;
    let animationId;
    
    // Ball properties
    const ball = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        radius: 10,
        speed: 5,
        dx: 5,
        dy: -5,
        color: '#00c9ff'
    };
    
    // Paddle properties
    const paddle = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 30,
        width: 100,
        height: 15,
        speed: 8,
        dx: 0,
        color: '#6200ea'
    };
    
    // Brick properties
    const brickRowCount = 5;
    const brickColumnCount = 9;
    const brickWidth = 80;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 60;
    const brickOffsetLeft = 35;
    const bricks = [];
    
    // Create bricks
    function createBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                // Calculate brick position
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                
                // Set colors based on row
                let brickColor;
                switch(r) {
                    case 0: brickColor = '#ff5e5e'; break; // Red
                    case 1: brickColor = '#ffb75e'; break; // Orange
                    case 2: brickColor = '#ffff5e'; break; // Yellow
                    case 3: brickColor = '#5eff5e'; break; // Green
                    case 4: brickColor = '#5e5eff'; break; // Blue
                    default: brickColor = '#ff5ee2'; break; // Pink
                }
                
                // Create brick object
                bricks[c][r] = { 
                    x: brickX, 
                    y: brickY, 
                    width: brickWidth, 
                    height: brickHeight, 
                    status: 1, // 1 = active, 0 = broken
                    color: brickColor
                };
            }
        }
    }
    
    // Draw ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = ball.color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }
    
    // Draw paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
        ctx.fillStyle = paddle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = paddle.color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }
    
    // Draw bricks
    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const brick = bricks[c][r];
                // Only draw active bricks
                if (brick.status === 1) {
                    ctx.beginPath();
                    ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 5);
                    ctx.fillStyle = brick.color;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = brick.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
        ctx.shadowBlur = 0;
    }
    
    // Draw score
    function drawScore() {
        document.getElementById('scoreValue').textContent = score;
    }
    
    // Draw lives
    function drawLives() {
        document.getElementById('livesValue').textContent = lives;
    }
    
    // Draw level
    function drawLevel() {
        document.getElementById('levelValue').textContent = level;
    }
    
    // Move paddle
    function movePaddle() {
        paddle.x += paddle.dx;
        
        // Wall collision detection
        if (paddle.x < 0) {
            paddle.x = 0;
        } else if (paddle.x + paddle.width > canvas.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }
    
    // Move ball
    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Wall collision detection (right/left)
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
            playSound('wall');
        }
        
        // Wall collision detection (top)
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
            playSound('wall');
        }
        
        // Wall collision detection (bottom - lose life)
        if (ball.y + ball.radius > canvas.height) {
            lives--;
            playSound('life-lost');
            
            if (lives <= 0) {
                gameOver();
                return;
            } else {
                resetBall();
            }
        }
        
        // Paddle collision detection
        if (
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
        ) {
            // Calculate ball hit position on paddle (0 to 1)
            const hitPosition = (ball.x - paddle.x) / paddle.width;
            
            // Calculate angle (-60 to 60 degrees)
            const angle = -60 + hitPosition * 120;
            
            // Convert angle to radians and calculate new velocity
            const radians = angle * Math.PI / 180;
            const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
            
            ball.dx = speed * Math.sin(radians);
            ball.dy = -speed * Math.cos(radians);
            
            playSound('paddle');
        }
        
        // Brick collision detection
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const brick = bricks[c][r];
                
                if (brick.status === 1) {
                    if (
                        ball.x > brick.x &&
                        ball.x < brick.x + brick.width &&
                        ball.y > brick.y &&
                        ball.y < brick.y + brick.height
                    ) {
                        ball.dy = -ball.dy;
                        brick.status = 0;
                        score += 10;
                        playSound('brick');
                        
                        // Check if level complete
                        if (isLevelComplete()) {
                            levelComplete();
                            return;
                        }
                    }
                }
            }
        }
    }
    
    // Check if level is complete
    function isLevelComplete() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Reset ball
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 50;
        ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = -5;
    }
    
    // Reset game
    function resetGame() {
        score = 0;
        lives = 3;
        level = 1;
        ball.speed = 5;
        paddle.width = 100;
        
        // Hide game over and level complete screens
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('levelComplete').style.display = 'none';
        document.getElementById('gameStart').style.display = 'none';
        
        resetBall();
        createBricks();
        gameRunning = true;
        
        // Update UI
        drawScore();
        drawLives();
        drawLevel();
        
        // Start game loop
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        gameLoop();
    }
    
    // Game over
    function gameOver() {
        gameRunning = false;
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('finalScore').textContent = score;
        cancelAnimationFrame(animationId);
        playSound('game-over');
    }
    
    // Level complete
    function levelComplete() {
        gameRunning = false;
        document.getElementById('levelComplete').style.display = 'block';
        document.getElementById('levelScore').textContent = score;
        document.getElementById('nextLevel').textContent = level + 1;
        cancelAnimationFrame(animationId);
        playSound('level-complete');
    }
    
    // Next level
    function nextLevel() {
        level++;
        ball.speed += 0.5;
        paddle.width = Math.max(60, paddle.width - 10);
        
        document.getElementById('levelComplete').style.display = 'none';
        
        resetBall();
        createBricks();
        gameRunning = true;
        
        // Update UI
        drawLevel();
        
        // Start game loop
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        gameLoop();
    }
    
    // Game loop
    function gameLoop() {
        if (!gameRunning || gamePaused) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw game elements
        drawBricks();
        drawBall();
        drawPaddle();
        
        // Update UI
        drawScore();
        drawLives();
        
        // Move game elements
        movePaddle();
        moveBall();
        
        // Continue game loop
        animationId = requestAnimationFrame(gameLoop);
    }
    
    // Keyboard event handlers
    function keyDown(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            paddle.dx = paddle.speed;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            paddle.dx = -paddle.speed;
        } else if (e.key === 'p' || e.key === 'P') {
            togglePause();
        }
    }
    
    function keyUp(e) {
        if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
            paddle.dx = 0;
        }
    }
    
    // Touch controls
    function touchHandler(e) {
        const touchX = e.touches[0].clientX;
        const canvasRect = canvas.getBoundingClientRect();
        const canvasCenterX = canvasRect.left + canvasRect.width / 2;
        
        if (touchX < canvasCenterX) {
            paddle.dx = -paddle.speed;
        } else {
            paddle.dx = paddle.speed;
        }
        
        // Prevent scrolling
        e.preventDefault();
    }
    
    function touchEndHandler() {
        paddle.dx = 0;
    }
    
    // Toggle pause
    function togglePause() {
        gamePaused = !gamePaused;
        if (!gamePaused) {
            gameLoop();
        }
    }
    
    // Play sounds
    function playSound(type) {
        // Sound implementation (can be added later)
    }
    
    // Event listeners
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    canvas.addEventListener('touchstart', touchHandler, { passive: false });
    canvas.addEventListener('touchmove', touchHandler, { passive: false });
    canvas.addEventListener('touchend', touchEndHandler);
    
    // Buttons event listeners
    document.getElementById('restartBtn').addEventListener('click', resetGame);
    document.getElementById('restartBtnGameOver').addEventListener('click', resetGame);
    document.getElementById('nextLevelBtn').addEventListener('click', nextLevel);
    document.getElementById('startBtn').addEventListener('click', resetGame);
    
    // Initialize game
    createBricks();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawLevel();
    
    // Show start screen
    document.getElementById('gameStart').style.display = 'block';
}); 