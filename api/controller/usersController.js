import Users from '../models/Users.js'

// https://stackoverflow.com/questions/27676884/explicitly-specifying-types-for-express-application-request-response
// https://stackoverflow.com/questions/59664670/typescript-async-function-return-type-void-vs-promisevoid
// https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
export const addAdmin = async (req, res) => { // /api/users endpoint
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

export const getAllUsers = async (req, res) => { // GET all users
    try {
        const data = await Users.find({});
        if (!data.length) {
            return res.status(404).json({
                success: false,
                message: `Request made from: ${req.method} - /api/users endpoint > No users found.`
            });
        }

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({
            success: false,
            // error: error
            error
        });
    }
};

export const getUser = async (req, res) => { // GET one user by ID /:id
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Request made from: ${req.method} - /api/users endpoint > User not found.`
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
             error
        });
    }
};

export const addUser = async (req, res) => { // POST (create) new user
    try {
        const { username, role, password } = req.body;
        const existingUser = await Users.findOne({ username });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: `Request made from: ${req.method} - /api/users endpoint > Username already exists.`
            });
        }

        const newUser = new Users({ username, role }); // make a drop down, or auto make user default role as NOT admin.
        newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({
            success: true,
            message: `Request made from: ${req.method} - /api/users endpoint > User created!`,
            data: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error
        });
    }
};

export const updateUser = async (req, res) => { // PUT (update) user by ID /:id
    try {
        const { username, role, password } = req.body;
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false, message:
                'User not found.'
            });
        }

        if (username) user.username = username;
        if (role) user.role = role;
        if (password) user.setPassword(password);

        await user.save();

        res.status(200).json({
            success: true,
            message: `Request made from: ${req.method} - /api/users endpoint > User updated!`,
            data: user
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            error
        });
    }
};

export const removeUser = async (req, res) => { // DELETE user by ID /:id
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Request made from: ${req.method} - /api/users endpoint > User not found.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Request made from: ${req.method} - /api/users endpoint > User deleted!`,
            data: user
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            error
        });
    }
};

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
