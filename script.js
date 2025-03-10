const player = document.getElementById('player');
const healthBar = document.getElementById('healthBar');
const contador = document.getElementById('contador');

let playerPositionX = 135;
let playerPositionY = 450;
let playerHealth = 100;
let gameTime = 0;
let activeObstacles = 0;
const maxObstacles = 6;

// Função para atualizar o tempo
function updateTime() {
    gameTime++;

    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    contador.innerText = `${minutes}:${seconds}`;
}

// Função para criar obstáculos normais
function createObstacle() {
    if (activeObstacles >= maxObstacles) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    document.getElementById('gameArea').appendChild(obstacle);

    const randomX = Math.floor(Math.random() * 250);
    obstacle.style.left = randomX + 'px';

    activeObstacles++;

    let obstaclePosition = 0;
    const interval = setInterval(() => {
        if (obstaclePosition > 500) {
            obstacle.remove();
            clearInterval(interval);
            activeObstacles--;
        } else {
            obstaclePosition += 5;
            obstacle.style.top = obstaclePosition + 'px';

            if (obstaclePosition >= 470 && obstaclePosition <= 500 &&
                playerPositionX >= randomX - 50 && playerPositionX <= randomX + 50) {
                playerHealth -= 34;
                healthBar.style.width = playerHealth + '%';

                if (playerHealth <= 0) {
                    alert('Game Over!');
                    resetGame();
                }

                clearInterval(interval);
                activeObstacles--;
            }
        }
    }, 20);
}

// Função para criar obstáculos de "cachorro quente"
function createHotDogObstacle() {
    if (activeObstacles >= maxObstacles) return;

    const hotDog = document.createElement('div');
    hotDog.classList.add('cachoro_quente');
    document.getElementById('gameArea').appendChild(hotDog);

    const randomX = Math.floor(Math.random() * 250);
    hotDog.style.left = randomX + 'px';

    activeObstacles++;

    let obstaclePosition = 0;
    const interval = setInterval(() => {
        if (obstaclePosition > 500) {
            hotDog.remove();
            clearInterval(interval);
            activeObstacles--;
        } else {
            obstaclePosition += 3;
            hotDog.style.top = obstaclePosition + 'px';

            if (obstaclePosition >= 470 && obstaclePosition <= 500 &&
                playerPositionX >= randomX - 50 && playerPositionX <= randomX + 50) {
                playerHealth += 15;
                if (playerHealth > 100) playerHealth = 100;
                healthBar.style.width = playerHealth + '%';

                clearInterval(interval);
                activeObstacles--;
            }
        }
    }, 20);
}

// Função para resetar o jogo
function resetGame() {
    playerHealth = 100;
    healthBar.style.width = '100%';
    location.reload();
}

// Criar obstáculos normais e "cachorros quentes" periodicamente
setInterval(createObstacle, 2000);
setInterval(createHotDogObstacle, 45000);

// Movimento do jogador
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        if (playerPositionX > 0) playerPositionX -= 10;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        if (playerPositionX < 250) playerPositionX += 10;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        if (playerPositionY < 450) playerPositionY += 10;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        if (playerPositionY > 0) playerPositionY -= 10;
    }

    player.style.left = playerPositionX + 'px';
    player.style.bottom = playerPositionY + 'px';
});

// Atualiza o tempo a cada 1 segundo
setInterval(updateTime, 1000);

// Função para colocar o jogo em tela cheia
function toggleFullScreen(event) {
    // Verifica se as teclas Ctrl e Enter estão pressionadas
    if (event.ctrlKey && event.key === 'Enter') {
        // Verifica se o navegador suporta o método de tela cheia
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }

    }
}

// Adiciona o evento de teclado para escutar a combinação Ctrl + Enter
document.addEventListener('keydown', toggleFullScreen);
