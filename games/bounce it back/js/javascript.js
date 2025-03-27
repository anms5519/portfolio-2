//we are making some changes
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelRequestAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
  );
})();

// Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"), // Create canvas context
  W = window.innerWidth, // Window's width
  H = window.innerHeight, // Window's height
  particles = [], // Array containing particles
  ball = {}, // Ball object
  paddles = [2], // Array containing two paddles
  mouse = {}, // Mouse object to store it's current position
  points = 0, // Varialbe to store points
  fps = 60, // Max FPS (frames per second)
  particlesCount = 20, // Number of sparks when ball strikes the paddle
  flag = 0, // Flag variable which is changed on collision
  particlePos = {}, // Object to contain the position of collision
  multipler = 1, // Varialbe to control the direction of sparks
  startBtn = {}, // Start button object
  restartBtn = {}, // Restart button object
  over = 0, // flag varialbe, cahnged when the game is over
  init, // variable to initialize animation
  paddleHit;
level = 1;

// Add mousemove and mousedown events to the canvas
canvas.addEventListener("mousemove", trackPosition, true);
canvas.addEventListener("mousedown", btnClick, true);

// Initialise the collision sound
// collision = document.getElementById("collide");
// Create the collision sound element if it doesn't exist
let collision = document.createElement("audio");
collision.id = "collide";
collision.src = "data:audio/wav;base64,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";

// Set the canvas's height and width to full screen
canvas.width = W;
canvas.height = H;

// Function to paint canvas
function MainScreen_canvas() {
  ctx.fillStyle = "antiquewhite";
  ctx.fillRect(0, 0, W, H);
}

// Function for creating paddles
function Paddle(pos) {
  // Height and width
  this.h = 5;
  this.w = 150;

  // Paddle's position
  this.x = W / 2 - this.w / 2;
  this.y = pos == "top" ? 0 : H - this.h;
}

// Push two new paddles into the paddles[] array
paddles.push(new Paddle("bottom"));
paddles.push(new Paddle("top"));

// Ball object
ball = {
  x: W / 2,
  y: H / 2 + 300,
  r: 5,
  c: "black",
  vx: 4,
  vy: 8,

  // Function for drawing ball on canvas
  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fill();
  },
};

// Start Button object
startBtn = {
  w: 100,
  h: 50,
  x: W / 2 - 50,
  y: H / 2 - 25,

  draw: function () {
    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.font = "24px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStlye = "black";
    ctx.fillText("Start", W / 2, H / 2);
  },
};

// Restart Button object
restartBtn = {
  w: 100,
  h: 50,
  x: W / 2 - 50,
  y: H / 2 - 50,

  draw: function () {
    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStlye = "black";
    ctx.fillText("Play Again", W / 2, H / 2 - 25);
  },
};

// Function for creating particles object
function createParticles(x, y, m) {
  this.x = x || 0;
  this.y = y || 0;

  this.radius = 1.2;

  this.vx = -1.5 + Math.random() * 3;
  this.vy = m * Math.random() * 1.5;
}

// Draw everything on canvas
function draw() {
  MainScreen_canvas();
  for (var i = 0; i < paddles.length; i++) {
    p = paddles[i];

    ctx.fillStyle = "red";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }

  ball.draw();
  update();
}

// Function to increase speed after every 8 points
function increaseSpd() {
  console.log(points);
  if (points % 8 == 0) {
    level++;
    window.alert("You are now Level" + level);
    console.log("level is" + level);

    if (Math.abs(ball.vx) < 15) {
      ball.vx += ball.vx < 0 ? -1 : 1;
      ball.vy += ball.vy < 0 ? -2 : 2;
    }
  }
}

// Track the position of mouse cursor
function trackPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

// Function to update positions, score and everything.
// Basically, the main game logic is defined here
function update() {
  // Update scores
  updateScore();

  // Move the paddles on mouse move
  if (mouse.x && mouse.y) {
    for (var i = 1; i < paddles.length; i++) {
      p = paddles[i];
      p.x = mouse.x - p.w / 2;
    }
  }

  // Move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Collision with paddles
  p1 = paddles[1];
  p2 = paddles[2];

  // If the ball strikes with paddles,
  // invert the y-velocity vector of ball,
  // increment the points, play the collision sound,
  // save collision's position so that sparks can be
  // emitted from that position, set the flag variable,
  // and change the multiplier
  if (collides(ball, p1)) {
    collideAction(ball, p1);
  } else if (collides(ball, p2)) {
    collideAction(ball, p2);
  } else {
    // Collide with walls, If the ball hits the top/bottom,
    // walls, run gameOver() function
    if (ball.y + ball.r > H) {
      ball.y = H - ball.r;
      var snd = new Audio("sounds/lost.mp3");
      snd.play();
      gameOver();
    } else if (ball.y < 0) {
      ball.y = ball.r;
      var snd = new Audio("sounds/lost.mp3");
      snd.play();
      gameOver();
    }

    // If ball strikes the vertical walls, invert the
    // x-velocity vector of ball
    if (ball.x + ball.r > W) {
      ball.vx = -ball.vx;
      ball.x = W - ball.r;

      var snd = new Audio("sounds/wall.mp3");
      snd.play();
    } else if (ball.x - ball.r < 0) {
      ball.vx = -ball.vx;
      ball.x = ball.r;

      var snd = new Audio("sounds/wall.mp3");
      snd.play();
    }
  }

  // If flag is set, push the particles
  if (flag == 1) {
    for (var k = 0; k < particlesCount; k++) {
      particles.push(
        new createParticles(particlePos.x, particlePos.y, multiplier)
      );
    }
  }

  // Emit particles/sparks
  OntouchSpark();

  // reset flag
  flag = 0;
}

//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
  if (b.x + ball.r >= p.x && b.x - ball.r <= p.x + p.w) {
    if (b.y >= p.y - p.h && p.y > 0) {
      paddleHit = 1;
      return true;
    } else if (b.y <= p.h && p.y == 0) {
      paddleHit = 2;
      return true;
    } else return false;
  }
}

//Do this when collides == true
function collideAction(ball, p) {
  ball.vy = -ball.vy;

  if (paddleHit == 1) {
    ball.y = p.y - p.h;
    particlePos.y = ball.y + ball.r;
    multiplier = -1;

    var snd = new Audio("sounds/bounce.mp3");
    snd.play();
  } else if (paddleHit == 2) {
    ball.y = p.h + ball.r;
    particlePos.y = ball.y - ball.r;
    multiplier = 1;

    var snd = new Audio("sounds/bounce.mp3");
    snd.play();
  }

  points++;
  increaseSpd();

  if (collision) {
    if (points > 0) collision.pause();

    collision.currentTime = 0;
    collision.play();
  }

  particlePos.x = ball.x;
  flag = 1;
}

// Function for emitting particles
function OntouchSpark() {
  for (var j = 0; j < particles.length; j++) {
    par = particles[j];

    ctx.beginPath();
    ctx.fillStyle = "#036";
    if (par.radius > 0) {
      ctx.arc(par.x, par.y, par.radius, 0, Math.PI * 2, false);
    }
    ctx.fill();

    par.x += par.vx;
    par.y += par.vy;

    // Reduce radius so that the particles die after a few seconds
    par.radius = Math.max(par.radius - 0.05, 0.0);
  }
}

// Function for updating score
function updateScore() {
  ctx.fillStlye = "white";
  ctx.font = "16px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Your Score : " + points, 20, 20);
  ctx.fillText("Your Level : " + level, 20, 40);
}

// Function to run when the game overs
function gameOver() {
  ctx.fillStlye = "white";
  ctx.font = "20px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Stop the Animation
  cancelRequestAnimFrame(init);
  //set the level to 1 again
  level = 1;
  // Set the over flag
  over = 1;

  // Show the restart button
  restartBtn.draw();
}

// Function for running the whole animation
function animloop() {
  init = requestAnimFrame(animloop);
  draw();
}

// Function to execute at startup
function startScreen() {
  draw();
  startBtn.draw();

  ctx.fillText("Bounce it Back", W / 2, 115);
  ctx.fillText("", W / 2 + 5, H / 2 + 90);
}

// On button click (Restart and start)
function btnClick(e) {
  // Variables for storing mouse position on click
  var mx = e.pageX,
    my = e.pageY;

  // Click start button
  if (mx >= startBtn.x && mx <= startBtn.x + startBtn.w) {
    animloop();

    // Delete the start button after clicking it
    startBtn = {};
  }
  // If the game is over, and the restart button is clicked
  if (over == 1) {
    if (mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w) {
      ball.x = W / 2;
      ball.y = H / 2 + 300;
      points = 0;
      ball.vx = 4;
      ball.vy = 8;
      animloop();
      over = 0;
    }
  }
}
// Show the start screen
startScreen();
