// -----------------------------------------------------------------------------
// Configuração da tela inicial
// -----------------------------------------------------------------------------

export default class TelaInicial extends Phaser.Scene {
  
  constructor() {
    super('TelaInicial');
  }

  // ---------------------------------------------------------------------------

  preload() {
    // Carrega a imagem de fundo, se necessário
    //this.load.image('background', 'assets/images/background.jpg');
  }

  // ---------------------------------------------------------------------------

  create() {

    // Adiciona um fundo
    //this.add.image(400, 300, 'background');

    // ---

    // Adiciona título
    //let style = { font: '30px Arial', fill: '#fff' };
    //this.add.text(200, 100, 'PB: O Catador de Calangos', style);

    // ---

    // Adiciona um botão
    const startButton = this.add.text(
      this.game.config.width / 2 - 200, 
      this.game.config.height / 2, 
      'Clique para Começar', 
      {
        font: '40px Arial',
        fill: '#fff',
        backgroundColor: '#3498db',
        padding: { x: 10, y: 5 }
      }
    )
    .setInteractive()
    .on('pointerdown', () => {
      this.scene.start('GameScene');
    });

  }

}
