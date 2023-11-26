const { Router} = require('express');

const { login  } = require('../../controladores/auth');

const router = Router();

router.post('/login', login);


module.exports = router;
