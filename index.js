const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1050;
canvas.height = 613;

/////////////////Creating force that pull players down///////////
const gravity = 2;
////////////////////****************************////////////////
var hurt = new Audio('./sounds/hurt.mp3');
var run = new Audio('./sounds/run.mp3');
/////////////////////////////////**Creation of player from the mother(class Sprite)**/////////////////////////////////////////////////
const Background = new Sprite({
    position: {
        x: -55,
        y: 0
    },
    imageSrc: './img/background.png',
    scale: 1.09,
    framesMax: 1
});
const shop = new Sprite({
    position: {
        x: 664,
        y: 171
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
});
const player = new Fighter({
    position: {
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 150
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/TakeHitwhite.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackbox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
});

const enemy = new Fighter({
    position: {
        x: 600,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 166
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Takehit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    },
    attackbox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    }
});
/////////////////////////////////******************/////////////////////////////////////////////////

decreaseTimer();

///////////////////////////////////Event Listener///////////////////////////////////////////////////
const keys = {

    //boolean for checking key pressed or not for player
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    //boolean for checking key pressed or not for player
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
};

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            //keydown for player
            case 'a':
                keys.a.pressed = true;
                player.lastkey = 'a';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastkey = 'd';
                break;
            case 'w':
                //Strength for going up
                player.velocity.y = -20;
                break;
            case 's':
                player.attack()
                break;
        }
    }
    //keydown for enemy
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastkey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastkey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    //Keyup for player
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }

    //keyup for enemy
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
////////////////////////////////////////////******************////////////////////////////////////////////////////


/////////////////////////////////////////////movement of player and enemy///////////////////////////////////////
function animate() {
    window.requestAnimationFrame(animate);

    //Background for canvas
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    Background.update();
    shop.update();

    c.fillStyle = 'rgba(255, 255, 255,0.17)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -10;
        player.switchSprite('run');
        run.play();
    } else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = 10;
        player.switchSprite('run');
        run.play();
    } else {
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }

    enemy.velocity.x = 0;
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -10;
        enemy.switchSprite('run');
        run.play();
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 10;
        enemy.switchSprite('run');
        run.play();
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }


    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
        enemy.takeHit();
        hurt.play();
        gsap.to('#enemyHealth', {
            width: enemy.health + '%',
        })
        console.log('player hitted');
    };

    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
        player.takeHit();
        hurt.play();
        gsap.to('#playerHealth', {
            width: player.health + '%',
        })
        console.log('enemy hitted');
    };

    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    if (enemy.health <= 0 || player.health <= 0) {
        winner({ player, enemy, timerID });
    };
};
animate();