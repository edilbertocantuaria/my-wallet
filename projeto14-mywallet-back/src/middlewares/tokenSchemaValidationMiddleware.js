import db from "../db.js";
export async function tokenValidation(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')
    
    console.log('Cabeçalho Authorization:', authorization);

    if (!token) {
        console.log('Token não presente');
        return res.sendStatus(401)
    }

    const session = await db.collection('sessions').findOne({ token: token });
    console.log('Sessão:', session);
    if (!session) {
        console.log('Token inválido');
        return res.sendStatus(401)
    }

    const user = await db.collection('users').findOne({ _id: session.userId });
    console.log('Usuário:', user);
    if (!user) {
        console.log('Usuário:', user);
        return res.sendStatus(401);
    }

    res.locals.user = user;
    next();
}