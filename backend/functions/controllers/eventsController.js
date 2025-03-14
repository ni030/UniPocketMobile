const db = require("../firebase.js");
const eventsController = {

  // mobile
  getEventById: async (req, res) => {
    const {eventId} = req.params;

    try {
      const response = await db.collection("events").doc(eventId).get();
      if (response.empty) {
        console.log("Event not found");
        return res.status(204).json({message: "Event not found"});
      }

      // 🔥 Get the first matching document
      const eventDoc = response.docs[0];
      // console.log("Event found:", eventDoc.id, eventDoc.data());
      res.status(200).json({data: eventDoc.data()});
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({error: error.message});
    }
  },

};

module.exports = eventsController;
