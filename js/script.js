(function(){
    var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});
     //Criando variaveis globais para player, teclas, grupo plataforma, grupo estralas
     var plataformas,player,keys,stars,txtScore,score = 0;
     //Criando variáveis para usar teclas A,W,D na movimentação do player
     var keyA,keyW,keyD;
    //Carrega os recursos da execução do jogo. 
    //Ex: imgs, audio etc...
    function preload(){
        //Chamando imagem de fundo
        game.load.image('sky','img/sky.png');
        //Chamando imagem da plataforma
        game.load.image('plataforma','img/platform.png');
        //Chamando imagem da estrela (star)
        game.load.image('star','img/star.png');
        //Chamando imagem do player
        game.load.spritesheet('player','img/dude.png',32,48);
    }
    //Cria elementos no jogo. 
    //Ex: variáveis, array etc...
    function create(){
        //TECLADO
        //Abilitando função para entrada de teclado no direcional
        keys = game.input.keyboard.createCursorKeys();
        //Abilitando função para entrada de teclado nas teclas A,W,D
        keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //FISICA
        //Abilitando sistema de fisica do phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //FUNDO DO CENARIO
        //Criando no jogo o sprite do ceu(sky)
        game.add.sprite(0,0,'sky');

        //PLATAFORMAS
        //Chamando grupos de plataformas
        plataformas = game.add.group();
        //Criando corpo solido para o grupo de plataformas
        plataformas.enableBody = true;
        //Criando no jogo o sprite da plataforma chão
        var plataforma = plataformas.create(0,game.world.height - 64,'plataforma');
        //Mexendo no tamanho da plataforma chão
        plataforma.scale.setTo(2,2);
        //Informando que a plataforma chão e imovel (statica)
        plataforma.body.immovable = true;
        //Criando no jogo o sprite da plataforma right
        plataforma = plataformas.create(400,400,'plataforma');
        //Mexendo no tamanho da plataforma right
        plataforma.scale.setTo(0.7,1);               
        //Informando que a plataforma rigth e imovel (statica)
        plataforma.body.immovable = true;
        //Criando no jogo o sprite da plataforma top
        plataforma = plataformas.create(500,150,'plataforma');
        //Mexendo no tamanho da plataforma top
        plataforma.scale.setTo(0.2,1);               
        //Informando que a plataforma top e imovel (statica)
        plataforma.body.immovable = true;
         //Criando no jogo o sprite da plataforma left
        plataforma = plataformas.create(-150,250,'plataforma');        
        //Informando que a plataforma left e imovel (statica)
        plataforma.body.immovable = true;

        //GRUPO DE ESTRELAS
        //Chamando grupos de estrelas
        stars = game.add.group();
        //Criando corpo solido para o grupo de estrelas
        stars.enableBody = true;
        //Estrutura de repetição para criar estrelas automáticamente
        for(var i = 0; i < 12; i++){
            var star = stars.create(i*70,0,'star');
                star.body.gravity.y = 300;
                star.body.bounce.y = 0.7 + (Math.random()*0.2);
        }
        //PLAYER
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
        //Criando animações para o player andando para esquerda
        player.animations.add('left',[0,1,2,3],10,true);
        //Criando animações para o player andando para direita
        player.animations.add('right',[5,6,7,8],10,true);

        //PONTUAÇÃO
        txtScore = game.add.text(16,16,'SCORE: 0',{fontSize:'32px',fill:'#fff'});
    }
    //Logica do jogo que tem que ser verificada a cada loop do jogo. 
    //Ex: se o player pegou algum elemento, pulo, colisões etc...
    function update(){
        //verificação se o player esta colidindo com as plataformas
        game.physics.arcade.collide(player,plataformas);
        //verificação se a estrelas estão colidindo com as plataformas
        game.physics.arcade.collide(stars,plataformas);
        //verificação se o player colidi com as estrelas
        game.physics.arcade.overlap(player,stars,colherEstrelas);
        //Velocidade do player quando soltar a tecla
        player.body.velocity.x = 0;
        //Verificação se tecla está sendo pressionada ou não
        if(keys.left.isDown || keyA.isDown){
            player.body.velocity.x = -250;
            player.animations.play('left');
        } else 
        if(keys.right.isDown || keyD.isDown){
            player.body.velocity.x = 250;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        //Fazer player pular se estiver collidindo com chão
        if((keys.up.isDown || keyW.isDown) && player.body.touching.down){
            player.body.velocity.y = -350;
        }
    }

    //Função para colher as estrelas
    function colherEstrelas(player, star){
        star.kill();//kill serve para eliminar um sprite do jogo
        //Atualizando pontuação
        score += 10;
        txtScore.text = 'SCORE: '+ score;
    }
}());