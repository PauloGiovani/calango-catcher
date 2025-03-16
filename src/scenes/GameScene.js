// -----------------------------------------------------------------------------
// Configuração da cena do jogo
// -----------------------------------------------------------------------------

export default class GameScene extends Phaser.Scene {

  constructor() {
      super('GameScene');
  }

  // ---------------------------------------------------------------------------

  // Carrega os recursos necessários para esta cena
  preload() {

      // Carrega a imagem do jogador
      this.load.image('player', 'assets/images/paraiba.png');

      // Carrega as imagens dos calangos
      this.load.image('calango1', 'assets/images/calango01.png');
      this.load.image('calango2', 'assets/images/calango02.png');
      this.load.image('calango3', 'assets/images/calango03.png');
      this.load.image('calango4', 'assets/images/calango04.png');
      this.load.image('calango5', 'assets/images/calango05.png');

      // Carrega a música de fundo
      this.load.audio('backgroundMusic', 'assets/music/forro.mp3');

      // Carrega o som de pegar calango
      this.load.audio('collectSound', 'assets/sounds/hit.mp3');

  }

  // ---------------------------------------------------------------------------

  // Inicializa os elementos da cena
  create() {

      // Adiciona a imagem do jogador
      this.player = this.physics.add.image(
        this.game.config.width / 2, 
        this.game.config.height - 50, 
        'player'
      );

      // Pontuação do jogador
      this.score = 0;

      // Estilo do texto da pontuação
      let style = { 
        font: '20px Arial', 
        fill: '#fff' 
      };

      // Exibe a pontuação
      this.scoreText = this.add.text(20, 20, 'Contador de Calango: ' + this.score, style);

      // ---

      // Array de texturas dos calangos
      this.calangoTextures = [
        'calango1', 
        'calango2', 
        'calango3',
        'calango4',
        'calango5'
        ];

      // Gera o primeiro calango
      this.spawnCalango();

      // Verifica a colisão entre o jogador e o calango
      this.physics.add.overlap(
        this.player, 
        this.calango, 
        this.collectCalango, 
        null, 
        this
      );

      // ---

      // Adiciona o teclado
      this.arrow = this.input.keyboard.createCursorKeys();

      // ---

      // Toca a música de fundo em loop
      this.backgroundMusic = this.sound.add('backgroundMusic');
      this.backgroundMusic.setVolume(0.2);
      this.backgroundMusic.play({ loop: true });

      // ---

       // Som de coleta
      this.collectSound = this.sound.add('collectSound');

  }

  // ---------------------------------------------------------------------------

  // Atualiza a lógica do jogo
  update() {

    // => Movimentação do jogador
      
    // Direita
    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } 
    // Esquerda
    else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    } 

    // Para baixo
    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } 
    // Para cima
    else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    } 

    // ---

    // => Verifica as colisões com os limites da tela

    // Padding
    const paddingX = 45, paddingY = 55;

    // Limites horizontais
    this.player.x = Phaser.Math.Clamp(
      this.player.x, 
      paddingX, 
      this.game.config.width - paddingX
    );
    
    // Limites verticais
    this.player.y = Phaser.Math.Clamp(
      this.player.y, 
      paddingY, 
      this.game.config.height - paddingY
    );

  }

  // ---------------------------------------------------------------------------

  // Gera um único calango com imagem aleatória
  spawnCalango() {

    // Posição aleatória
    const x = Phaser.Math.Between(100, this.game.config.width - 100);
    const y = Phaser.Math.Between(100, this.game.config.height - 100);

    // Textura aleatória
    const randomTexture = Phaser.Utils.Array.GetRandom(this.calangoTextures);

    // Se ainda existir um calango
    if (this.calango) {
      // Destroi o calango anterior
      this.calango.destroy();
    }

    // Cria o novo calango
    this.calango = this.physics.add.sprite(x, y, randomTexture);
    this.calango.setCollideWorldBounds(true);

    // Atualizar colisão com o player (já que o objeto mudou)
    this.physics.add.overlap(
      this.player, 
      this.calango, 
      this.collectCalango, 
      null, 
      this
    );

  }

  // ---------------------------------------------------------------------------

  // Quando o jogador pega o calango
  collectCalango(player, calango) {

    // Toca o som de coleta
    this.collectSound.play();

    // Aumenta a pontuação
    this.score += 1;
    this.scoreText.setText('Contador de Calango: ' + this.score);

    // Animação de aumento de tamanho do jogador
    this.tweens.add({
      targets: player,
      duration: 200,
      scaleX: 1.5,
      scaleY: 1.5,
      yoyo: true
    });

    // Gera novo calango em outro local com imagem diferente
    this.spawnCalango();

  }

}
