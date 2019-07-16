const router = require('express').Router();

router.get('/jeu-de-loie', (req, res) => {
    res.sendFile(__dirname+'/static/board.html');
});

module.exports = router;
