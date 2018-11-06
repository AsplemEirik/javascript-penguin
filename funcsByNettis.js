/* Returns true if there is a wall between you and enemy. **ONLY IF WALL IS WITHIN VIEW DISTANCE** */
function wallBetweenYouAndEnemy (body) {
    const youPos = getPlayerPos();
    const enemyPos = getEnemyPosition();
    const wall = body.walls;

    if (youPos.x > wall.x > enemyPos.x || enemyPos.x > wall.x > enemyPos.x) {return true;}
    else if (youPos.y > wall.y > enemyPos.y || enemyPos.y > wall.y > enemyPos.y) {return true;}
    return false;
}

function execute (body) {
    const youPos = getPlayerPos(body);
    const enemyPos = getEnemyPosition(body);
    const viewPos = body.you.direction;

    if (youPos.y - enemyPos.y <= range || enemyPos.y - youPos.y <= range) {     /* If you are within range */
        if (youPos.y > enemyPos.y && youPos.x === enemyPos.x) {                 /* The enemy is to your top, and you are on the same x-value */
            if (viewPos === left) {/* Move right */}
            else if (viewPos === right) {/* Move left */}
            else if (viewPos === bottom) {/* Move left (or something else?) */}
            else if (viewPos === top) {return "shoot";}
        }
    }
    if (youPos.y - enemyPos.y > range || enemyPos.y - youPos.y > range) {       /* If you are within range */
        if (youPos.y < enemyPos.y && youPos.x === enemyPos.x) {                 /* The enemy is to your bottom, and you are on the same x-value */
            if (viewPos === left) {/* Move left */}
            else if (viewPos === right) {/* Move right */}
            else if (viewPos === top) { /* Move right (or something else?) */}
            else if (viewPos === bottom) {return "shoot";}
        }
    }
    if (youPos.x - enemyPos.x <= range || enemyPos.x - youPos.x <= range) {     /* If you are within range */
        if (youPos.x > enemyPos.x && youPos.y === enemyPos.y) {                 /* If the enemy is to your left */
            if (viewPos === top) {/* Move left */}
            else if (viewPos === bottom) {/* Move right */}
            else if (viewPos === right) {/* Move right (or something else?) */}
            else if (viewPos === left) {return "shoot";}
        }
    }
    if (youPos.x - enemyPos.x <= range || enemyPos.x - youPos.x <= range) {     /* If you are within range */
        if (youPos.x < enemyPos.x && youPos.y === enemyPos.y) {                 /* If the enemy is to your right */
            if (viewPos === top) {/* Move right */}
            else if (viewPos === bottom) {/* Move left */}
            else if (viewPos === left) {/* Move right (or something else?) */}
            else if (viewPos === right) {return "shoot";}
        }
    }
}