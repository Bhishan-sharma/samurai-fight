function winner({ player, enemy, timerID }) {
    clearTimeout(timerID);
    document.querySelector("#displayText").style.display = 'flex'
    if (enemy.health === player.health) {
        document.querySelector("#displayText").innerHTML = 'Tie'
        player.dead = true
        enemy.dead = true
    } else if (player.health < enemy.health) {
        document.querySelector("#displayText").innerHTML = 'kenji won'
        player.dead = true
    } else if (player.health > enemy.health) {
        document.querySelector("#displayText").innerHTML = 'samuraiMack won'
        enemy.dead = true
    }
};

let time = 30
let timerID
function decreaseTimer() {
    if (time > 0) {
        timerID = setTimeout(decreaseTimer, 1000);
        time--
        document.querySelector("#timer").innerHTML = time
    }
    if (time === 0) {
        winner({ player, enemy, timerID });
    }
};

function rectangularCollision({
    rectangle1, rectangle2
}) {
    return (
        rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.attackbox.position.x &&
        rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y &&
        rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
    )
};