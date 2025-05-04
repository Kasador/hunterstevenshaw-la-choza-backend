import { Request, Response } from 'express';
import Users from '../models/Users';
import jwt  from 'jsonwebtoken'

// https://www.npmjs.com/package/jsonwebtoken
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    // const { username, password } = req.body;
    // const { username, password } = req.query
    // const username = req.query.username as string;
    // const password = req.query.password as string;

    const SECRET_KEY = process.env.JWT_SECRET!;

    const { username, password } = req.body;

    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const user = await Users.findOne({ username }); // has to match whats already in the database. 

        if (!user || !user.validatePassword(password)) {
            res.status(401).json({ // 401 unauthorized! NOPE!
                success: false,
                message: 'Invalid username or password',
            });
            return;
        }

        const data = jwt
        console.log(data)

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        ) // https://stackoverflow.com/questions/64884292/how-to-set-json-web-token-expire-and-validate
        // https://medium.com/@dwivedi.sudhir/how-to-expire-a-jwt-forcefully-7a3f170ffe4c

        res.status(200).json({ // good to go, return the data
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role,
            },
            message: 'Login successful!',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
