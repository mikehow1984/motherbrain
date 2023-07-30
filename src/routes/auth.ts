import { Router } from 'express';
const r = Router();

r.get('/login', (req, res, next) => {
    res.render('login');
});

export default r;
