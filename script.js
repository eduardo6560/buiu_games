const player = document.getElementById('player');
const healthBar = document.getElementById('healthBar');
let playerPositionX = 135; // Posição horizontal (eixo X)
let playerPositionY = 450; // Posição vertical (eixo Y)
let playerHealth = 100; // Vida do jogador (inicialmente 100)

const maxObstacles = 6; // Limite máximo de obstáculos na tela
let activeObstacles = 0; // Contador de obstáculos ativos na tela

// Função para criar obstáculos normais
function createObstacle() {
    if (activeObstacles >= maxObstacles) {
        return;
    }

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

            if (
                obstaclePosition >= 470 && 
                obstaclePosition <= 500 &&
                playerPositionX >= randomX - 50 &&
                playerPositionX <= randomX + 50
            ) {
                // Diminui a vida do jogador ao colidir com um obstáculo normal
                playerHealth -= 34;
                healthBar.style.width = playerHealth + '%';

                if (playerHealth <= 0) {
                    alert('Game Over!');  // Exibe o alerta de Game Over
                    clearInterval(interval); // Interrompe o intervalo
                    playerHealth = 100; // Restaura a saúde do jogador
                    healthBar.style.width = '100%'; // Restaura a barra de saúde
                    location.reload(); // Recarrega a página para reiniciar o jogo
                }
                
                clearInterval(interval);
                activeObstacles--;
            }
        }
    }, 20);
}

// Função para criar obstáculos "cachorro quente" (que cura)
function createHotDogObstacle() {
    if (activeObstacles >= maxObstacles) {
        return;
    }

    const cachoro_quente = document.createElement('div');
    cachoro_quente.classList.add('cachoro_quente');
    document.getElementById('gameArea').appendChild(cachoro_quente);

    const randomX = Math.floor(Math.random() * 250);
    cachoro_quente.style.left = randomX + 'px';

    activeObstacles++;

    let obstaclePosition = 0;
    const interval = setInterval(() => {
        if (obstaclePosition > 500) {
            cachoro_quente.remove();
            clearInterval(interval);
            activeObstacles--;
        } else {
            obstaclePosition += 3;
            cachoro_quente.style.top = obstaclePosition + 'px';

            if (
                obstaclePosition >= 470 && 
                obstaclePosition <= 500 &&
                playerPositionX >= randomX - 50 &&
                playerPositionX <= randomX + 50
            ) {
                // Aumenta a vida do jogador ao colidir com um "cachorro quente"
                playerHealth += 15;

                // Evita que a vida ultrapasse 100%
                if (playerHealth > 100) {
                    playerHealth = 100;
                }

                // Atualiza a barra de vida
                healthBar.style.width = playerHealth + '%';

                // Verifica se a vida acabou
                if (playerHealth <= 0) {
                    alert('Game Over!');
                    clearInterval(interval);
                    playerHealth = 100;
                    healthBar.style.width = '100%';
                }
                clearInterval(interval);
                activeObstacles--;
            }
        }
    }, 20);
}

// Criar obstáculos normais a cada 2 segundos
setInterval(createObstacle, 2000);

// Criar obstáculos "cachorro quente" a cada 45 segundos
setInterval(createHotDogObstacle, 45000);

// Movimento do jogador
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPositionX > 0) {
        playerPositionX -= 15;
    } else if (e.key === 'ArrowRight' && playerPositionX < 250) {
        playerPositionX += 15;
    } else if (e.key === 'ArrowDown' && playerPositionY > 0) {
        playerPositionY -= 15;
    } else if (e.key === 'ArrowUp' && playerPositionY < 450) {
        playerPositionY += 15;
    }
    else if (e.key === 'a' && playerPositionX > 0) {
        playerPositionX -= 10;  // Move o jogador para a esquerda
    } else if (e.key === 'd' && playerPositionX < 250) {
        playerPositionX += 10;  // Move o jogador para a direita
    } else if (e.key === 's' && playerPositionY > 0) {
        playerPositionY -= 10;  // Move o jogador para cima
    } else if (e.key === 'w' && playerPositionY < 450) {
        playerPositionY += 10;  // Move o jogador para baixo
    }

    player.style.left = playerPositionX + 'px';
    player.style.bottom = playerPositionY + 'px';
});




let gameTime = 0; // Tempo do jogo em segundos

// Função para atualizar o tempo
function updateTime() {
    gameTime++; // Incrementa 1 segundo a cada chamada

    // Calcula minutos e segundos
    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;

    // Formatação do tempo para o formato 00:00
    if (seconds < 10) {
        seconds = '0' + seconds; // Adiciona zero à esquerda dos segundos, se necessário
    }

    // Exibe o tempo formatado no console
    console.clear(); // Limpa o console a cada atualização para manter a tela limpa
    console.log(`Tempo: ${minutes}:${seconds}`);
}

// Atualiza o tempo a cada 1 segundo (1000 milissegundos)
setInterval(updateTime, 1000);

