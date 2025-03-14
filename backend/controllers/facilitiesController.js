const db = require("../firebase")

const facilitiesController = {

    getAllFacilities: async (req, res) => {
        try {
            const response = await db.collection("facilities").get();
            if (response.empty) {
                console.log("No facilities found");
                return res.status(204).json({ message: "No facilities found" });
            }

            const facilities = response.docs.map(doc => doc.data());

            res.status(200).json({ data: facilities });
        } catch (error) {
            console.error("Error fetching facilities:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = facilitiesController;