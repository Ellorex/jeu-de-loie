let rollADice = () => {
    let rolls = 2;
    let score = 0;
    let dices = [];

    for (let i = 0; i < rolls; i++) {
        let diceScore = Math.floor(Math.random()*6)+1;
        console.log(diceScore);
        dices.push(diceScore);
        score += diceScore;
    }
    return dices;
}

module.exports = {
    rollADice,
}
