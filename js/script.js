(function(){
    var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});
     //Criando grupo de plataformas
     var plataformas,player;
    //Carrega os recursos da execução do jogo. 
    //Ex: imgs, audio etc...
    function preload(){
        //Chamando imagem de fundo
        game.load.image('ceu','img/sky.png');
        //Chamando imagem da plataforma
        game.load.image('plataforma','img/platform.png');
        //Chamando imagem do player
        game.load.spritesheet('player','img/dude.png',32,48);
    }
    //Cria elementos no jogo. 
    //Ex: variáveis, array etc...
    function create(){
        //Abilitando sistema de fisica do phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //Criando no jogo o sprite do ceu(sky)
        game.add.sprite(0,0,'ceu');
        //Chamando grupos de plataformas
        plataformas = game.add.group();
        //Criando corpo solido para o grupo de plataformas
        plataformas.enableBody = true;
        //Criando no jogo o sprite da plataforma chão
        var plataforma = plataformas.create(0,game.world.height - 64,'plataforma');
        //aumentando tamanho da plataforma chão
        plataforma.scale.setTo(2,2);
        //Informando que a plataforma chão e imovel (statica)
        plataforma.body.immovable = true;
        //Criando no jogo o sprite da plataforma left
        plataforma = plataformas.create(400,400,'plataforma');
        //Criando no jogo o sprite da plataforma right
        plataforma = plataformas.create(-150,250,'plataforma');
        //Criando no jogo o sprite do player
        player = game.add.sprite(50,game.world.height - 150,'player');
        //Informar que o player tera um sistema de fisica solido
        game.physics.arcade.enable(player);
        //Informar quais simulaçõs fisica estará no player
        player.body.gravity.y = 300;
        //Faz o player kicar no chão
        player.body.bounce.y = 0.2;
        //Manter o player nos limites do jogo.
        player.body.collideWorldBounds = true;
    }
    //Logica do jogo que tem que ser verificada a cada loop do jogo. 
    //Ex: se o player pegou algum elemento, pulo, colisões etc...
    function update(){
        //verificação a cada interação do loop se dois obj estão colidindo
        game.physics.arcade.collide(player,plataformas);
    }
}());