const db = require('../firebase.js')
const usersController = {
    getAllUsers: async (req, res) => {
        const { userId } = req.params;
        try{
            const response = await db.collection('users').doc(userId).get();
            if(response.exists){
                res.status(200).json(response.data());
            }else{
                res.status(204).json({message: "User not found"});
            }
        }catch(error){
            res.status(500).json({error: error.message});

        }
    },

    createUser: async (req, res) => {
        const { userId, email, name, phoneNum, block, room } = req.body;
        try {
            const response = await db.collection("users").add({ userId, email, name, phoneNum, block, room });
            res.status(201).json({ id: response.id, message: "User created successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        const { name, phoneNum, block, room } = req.body;
        try {
            await db.collection('users').doc(userId).set({name, phoneNum, block, room }, { merge: true });
            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = usersController;
