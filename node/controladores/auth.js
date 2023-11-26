const jwt = require('jsonwebtoken');
const passport = require("passport");
require('dotenv').config();

const login = async (req, res) => {
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
        if (err || !usuario) {
            return res.status(400).json({estado:'FALLO', msj:info});
        }

        req.login(usuario, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            
            const token = jwt.sign(usuario, process.env.JWT_SECRET);
            return res.json({ usuario, token });
        });
    })(req, res);
};

module.exports = { login };