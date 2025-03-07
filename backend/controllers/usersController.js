const db = require('../firebase.js')
const usersController = {

    //mobile
    getAllUsers: async (req, res) => {
        const { email } = req.params; 
        try{
            const response = await db.collection('users').where('email', '==', email).get();
            if(!response.empty){
                res.status(200).json({message: "User found"});
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

    getUserById: async (req, res) => {
        const { userId } = req.params;
    
        try {
            const response = await db.collection('users').where("userId", "==", userId).get();
    
            if (response.empty) {
                console.log("User not found");
                return res.status(204).json({ message: "User not found" });
            }
    
            // 🔥 Get the first matching document
            const userDoc = response.docs[0];
            // console.log("User found:", userDoc.id, userDoc.data());
            res.status(200).json({ data: userDoc.data() });
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        const { name, phoneNum, block, room } = req.body;
        try {
            const userQuery = await db.collection('users').where("userId", "==", userId).get();
            if (userQuery.empty) {
                return res.status(204).json({ message: "User not found" });
            }

            // Get the first matching document
            const userDoc = userQuery.docs[0];
            await db.collection('users').doc(userDoc.id).set({ name, phoneNum, block, room }, { merge: true });
            res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = usersController;
