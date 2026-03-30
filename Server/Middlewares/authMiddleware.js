const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    console.log('authMiddleware req.cookies:', req.cookies)
    const cookieToken = req.cookies?.token
    const bearerToken = req.headers?.authorization?.split(' ')[1]
    const token = cookieToken || bearerToken

    if (!token) {
        return res.status(401).json({ message: 'No token, provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id: decoded.id};
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token is not valid'})
    }
}



module.exports = verifyToken