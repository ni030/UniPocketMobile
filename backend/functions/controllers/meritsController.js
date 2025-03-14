const db = require("../firebase.js");
const meritsController = {

  // mobile
  getMeritByUserId: async (req, res) => {
    const {userId} = req.params;

    try {
      const response = await db.collection("merits").where(
          "userId", "==", userId).get();
      if (response.empty) {
        console.log("Merit not found by userId");
        return res.status(204).json({message: "Merit not found"});
      }

      const meritDoc = response.docs[0];

      res.status(200).json({data: meritDoc.data()});
    } catch (error) {
      console.error("Error fetching merit:", error);
      res.status(500).json({error: error.message});
    }
  },

  getAllMerits: async (req, res) => {
    try {
      const response = await db.collection("merits").orderBy(
          "totalMerits", "desc").get();
      const merits = [];
      response.forEach((doc) => {
        merits.push(doc.data());
      });
      res.status(200).json({data: merits});
    } catch (error) {
      console.error("Error fetching all merits:", error);
      res.status(500).json({error: error.message});
    }
  },

  createMerit: async (req, res) => {
    const {userId, event, totalMerits, ranking} = req.body;
    const events = [event]; // Save the event as the first element in the array

    try {
      const response = await db.collection("merits").add({
        userId, events, totalMerits, ranking,
      });
      res.status(200).json({message: "Merit created successfully",
        id: response.id});
    } catch (error) {
      console.error("Error creating merit:", error);
      res.status(500).json({error: error.message});
    }
  },

  updateMeritByUserId: async (req, res) => {
    const {userId} = req.params;
    const {events, totalMerits, ranking} = req.body;

    try {
      const meritQuery = await db.collection("merits").where(
          "userId", "==", userId).get();
      if (meritQuery.empty) {
        return res.status(204).json({message: "Merit not found"});
      }
      const meritDoc = meritQuery.docs[0];

      await db.collection("merits").doc(meritDoc.id).update({
        events, totalMerits, ranking});
      res.status(200).json({message: "Merit updated successfully"});
    } catch (error) {
      console.error("Error updating merit:", error);
      res.status(500).json({error: error.message});
    }
  },

};

module.exports = meritsController;
