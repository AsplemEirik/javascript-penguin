
function calculateMove(body) {
    return 
}

// * Return X and Y position of the player
function getEnemyPosition() {
    return [json.enemies[0].x, json.enemies[0].y]
}

// * Return X and Y position of the player
function getPlayerPos() {
  return [json.you.x, json.you.y]
}

// * Check if players is less than or equal to range betweeen eachother in X and Y direction
function checkIfEnemyNearby(range) {
  playerPos = getPlayerPos()
  enemyPos = getEnemyPosition()

  if (abs(playerPos[0] - enemyPos[0]) <= range) {
    return true
  }

  else if (abs(playerPos[1] - enemyPos[1]) <= range) {
    return true
  }

  return false
}

function getBonusTiles() {
    allPowerups = []
    for (const powerup in json.bonusTiles) {
        powe
    }
}