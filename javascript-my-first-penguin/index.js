import * as Logic from 'logic.js';

const ROTATE_LEFT = "rotate-left";
const ROTATE_RIGHT = "rotate-right";
const ADVANCE = "advance";
const RETREAT = "retreat";
const SHOOT = "shoot";
const PASS = "pass";

// * 
const MOVE_UP = { "top": ADVANCE, "bottom": ROTATE_LEFT, "right": ROTATE_LEFT, "left": ROTATE_RIGHT };
const MOVE_DOWN = { "top": ROTATE_LEFT, "bottom": ADVANCE, "right": ROTATE_RIGHT, "left": ROTATE_LEFT };
const MOVE_RIGHT = { "top": ROTATE_RIGHT, "bottom": ROTATE_LEFT, "right": ADVANCE, "left": ROTATE_LEFT };
const MOVE_LEFT = { "top": ROTATE_LEFT, "bottom": ROTATE_RIGHT, "right": ROTATE_RIGHT, "left": ADVANCE };


// * Calculates the center of the map
function moveTowardsCenterOfMap(body) {
    let centerPointX = Math.floor((body.mapWidth) / 2);
    let centerPointY = Math.floor((body.mapHeight) / 2);
    return moveTowardsPoint(body, centerPointX, centerPointY);
}

function moveTowardsPoint(body, pointX, pointY) {
    let penguinPositionX = body.you.x;
    let penguinPositionY = body.you.y;
    let plannedAction = PASS;

    if (penguinPositionX < pointX) {
        plannedAction = MOVE_RIGHT[body.you.direction];
    } else if (penguinPositionX > pointX) {
        plannedAction = MOVE_LEFT[body.you.direction];
    } else if (penguinPositionY < pointY) {
        plannedAction = MOVE_DOWN[body.you.direction];
    } else if (penguinPositionY > pointY) {
        plannedAction = MOVE_UP[body.you.direction];
    }
    if (plannedAction === ADVANCE && wallInFrontOfPenguin(body)) {
        return SHOOT;
    }
    return plannedAction
}

// * Checks if a specific cell contains a wall
function doesCellContainWall(walls, x, y) {
    if (walls.find(wall => wall.x == x && wall.y == y)) {
        return true;
    }
    return false;
}

// * Checks if it is a wall in front of the penguin
function wallInFrontOfPenguin(body) {
    switch (body.you.direction) {
        case "top":
            return doesCellContainWall(body.walls, body.you.x, --body.you.y);
        case "bottom":
            return doesCellContainWall(body.walls, body.you.x, ++body.you.y);
        case "left":
            return doesCellContainWall(body.walls, --body.you.x, body.you.y);
        case "right":
            return doesCellContainWall(body.walls, ++body.you.x, body.you.y);
        default:
            return true;
    }
}

function commandReceived(body) {
    let response = PASS;
    response = calculateMove(body);

    return { 
        command: response 
    };
}

// ! Kalles av Azure
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let response = action(req);
    context.res = {
        headers: { "Content-Type": 'application/json' },
        body: response
    };
    context.done();
};

function action(req) {
    context.log(req);
    if (req.params.query == "command") {
        return commandReceived(req.body);
    } else if (req.params.query == "info") {
        return infoReceived();
    }
    return {};
}

// Returns penguin name and team name
function infoReceived() {
    let penguinName = "Randyyyy";
    let teamName = "Markus and the bois";

    return { name: penguinName, team: teamName };
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
