import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      // Google sign-in
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // Google id
    }

    next();
  } catch (err) {
    console.error(err.message);
  }
};

export default auth;
