import Users from '../models/Users'
import { Request, Response } from 'express';

// https://stackoverflow.com/questions/27676884/explicitly-specifying-types-for-express-application-request-response
// https://stackoverflow.com/questions/59664670/typescript-async-function-return-type-void-vs-promisevoid
export const getAllUsers = async (req: Request, res: Response): Promise<void> => { // /api/users endpoint
    try {
        const data = await Users.find({}) // pull back all data from schema 

        if (!data) { // check does not currently work. Still returns status of 200 even if the database has no data.
            res.status(404).json({ // 404 not found
                success: false,
                message: 'No users found.'
            })

            return;
        }

        res.status(200).json({ // 200 success
            success: true,
            data,
            message: `Request made from: ${req.method} - /api/users endpoint`
        })
    } catch (error) {
        console.log('Oh no! Something went wrong. ', error)
        res.status(500).json(error) // 500 internal server error
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => { // /api/users endpoint
    try {
        const data = await Users.find({}) // pull back all data from schema 

        if (!data) { // check does not currently work. Still returns status of 200 even if the database has no data.
            res.status(404).json({ // 404 not found
                success: false,
                message: 'No users found.'
            })

            return;
        }

        res.status(200).json({ // 200 success
            success: true,
            data,
            message: `Request made from: ${req.method} - /api/users endpoint`
        })
    } catch (error) {
        console.log('Oh no! Something went wrong. ', error)
        res.status(500).json(error) // 500 internal server error
    }
}

// https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
export const addUser = async (req: Request, res: Response): Promise<void> => { // /api/users endpoint
    try {
        const findAdmin = await Users.findOne({ username: 'admin' });

        if (!findAdmin) {
            const admin = new Users({ username: 'admin', role: 'admin' });
            admin.setPassword('admin');
            await admin.save();

            res.status(200).json({ // 200 success
                success: true,
                message: `Request made from: ${req.method} - /api/users endpoint > Admin added!`
            })
        }  else {
            res.status(409).json({ // 200 success
                success: false,
                message: `Request made from: ${req.method} - /api/users endpoint > Admin already added!`
            })
        }

        // if (!admin) { // check does not currently work. Still returns status of 200 even if the database has no data.
        //     res.status(404).json({ // 404 not found
        //         success: false,
        //         message: 'No users found.'
        //     })

        //     return;
        // }

        res.status(200).json({ // 200 success
            success: true,
            message: `Request made from: ${req.method} - /api/users endpoint > Admin added!`
        })
    } catch (error) {
        console.log('Oh no! Something went wrong. ', error)
        res.status(500).json(error) // 500 internal server error
    }
}

export const removeUser = async (req: Request, res: Response): Promise<void> => { // /api/users endpoint
    try {
        const data = await Users.find({}) // pull back all data from schema 

        if (!data) { // check does not currently work. Still returns status of 200 even if the database has no data.
            res.status(404).json({ // 404 not found
                success: false,
                message: 'No users found.'
            })

            return;
        }

        res.status(200).json({ // 200 success
            success: true,
            data,
            message: `Request made from: ${req.method} - /api/users endpoint`
        })
    } catch (error) {
        console.log('Oh no! Something went wrong. ', error)
        res.status(500).json(error) // 500 internal server error
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => { // /api/users endpoint
    try {
        const data = await Users.find({}) // pull back all data from schema 

        if (!data) { // check does not currently work. Still returns status of 200 even if the database has no data.
            res.status(404).json({ // 404 not found
                success: false,
                message: 'No users found.'
            })

            return;
        }

        res.status(200).json({ // 200 success
            success: true,
            data,
            message: `Request made from: ${req.method} - /api/users endpoint`
        })
    } catch (error) {
        console.log('Oh no! Something went wrong. ', error)
        res.status(500).json(error) // 500 internal server error
    }
}

// export const authUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const admin = new Users({ username: 'admin', role: 'admin' });
//         admin.setPassword('myawesomepassword');
//         await admin.save();

//         if (!data) { // check does not currently work. Still returns status of 200 even if the database has no data.
//             res.status(404).json({ // 404 not found
//                 success: false,
//                 message: 'No users found.'
//             })

//             return;
//         }

//         res.status(200).json({ // 200 success
//             success: true,
//             data,
//             message: `Request made from: ${req.method} - /api/users endpoint`
//         })
//     } catch (error) {
//         console.log('Oh no! Something went wrong. ', error)
//         res.status(500).json(error) // 500 internal server error
//     }
// }
