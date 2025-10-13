import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            });
        }

        const dtoken = authHeader.split(" ")[1];
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
        req.params.docId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authDoctor;
