// -----------------------------------------------------------------------------
// Inicializa o jogo
// -----------------------------------------------------------------------------

import './style.css';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';
import TelaInicial from './scenes/TelaInicial.js';

// Configuração do jogo
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  backgroundColor: '#3498db',
  parent: 'game',
  scene: [TelaInicial, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

// Inicializa o jogo
new Phaser.Game(config);
