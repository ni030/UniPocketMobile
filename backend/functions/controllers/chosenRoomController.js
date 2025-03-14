const db = require("../firebase.js");
const chosenRoomController = {

  // mobile functions
  createChosenRoom: async (req, res) => {
    const {userId, block, roomNum} = req.body;
    try {
      const response = await db.collection("chosenRooms").add({
        userId,
        block,
        roomNum,
      });
      res.status(200).json({
        message: "Chosen room created successfully",
        id: response.id,
      });
    } catch (error) {
      console.error("Error creating chosen room:", error);
      res.status(500).json({error: error.message});
    }
  },

  getChosenRoomByUserId: async (req, res) => {
    const {userId} = req.params;

    try {
      const response = await db.collection("chosenRooms").where(
          "userId", "==", userId).get();
      if (response.empty) {
        console.log("Chosen room not found by userId");
        return res.status(204).json({message: "Chosen room not found"});
      }

      const chosenRoomDoc = response.docs[0];

      res.status(200).json({data: chosenRoomDoc.data()});
    } catch (error) {
      console.error("Error fetching chosen room:", error);
      res.status(500).json({error: error.message});
    }
  },

  updateChosenRoomByUserId: async (req, res) => {
    const {userId} = req.params;
    const {block, roomNum} = req.body;

    try {
      const chosenRoomQuery = await db.collection("chosenRooms").where(
          "userId", "==", userId).get();
      if (chosenRoomQuery.empty) {
        return res.status(204).json({message: "Chosen room not found"});
      }

      const chosenRoomDoc = chosenRoomQuery.docs[0];
      const chosenRoomId = chosenRoomDoc.id;

      await db.collection("chosenRooms").doc(chosenRoomId).update({
        block,
        roomNum,
      });
      res.status(200).json({message: "Chosen room updated successfully"});
    } catch (error) {
      console.error("Error updating chosen room:", error);
      res.status(500).json({error: error.message});
    }
  },
};

module.exports = chosenRoomController;
