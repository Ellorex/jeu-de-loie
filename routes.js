const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html');
});

router.get('/jeu-de-loie', (req, res) => {

    res.sendFile(__dirname+'/static/board.html');
});

module.exports = router;
