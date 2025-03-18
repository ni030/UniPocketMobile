const db = require("../firebase.js");
const FormData = require("form-data");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const IMAGEKIT_PRIVATE_KEY = "private_qqQ8XN4ZWucmdxheR+qUOJK2WDo=";
const IMAGEKIT_URL = "https://upload.imagekit.io/api/v1/files/upload";

const complaintsController = {
  createComplaint: async (req, res) => {
    const {userId, date, type, description, image} = req.body;
    const status = "Received";
    const rating = 0;

    try {
      let imageUrl = null;

      if (image) {
        // Validate Base64 format
        if (!image.startsWith("data:image")) {
          throw new Error("Invalid image format.");
        }

        // Create FormData
        const formData = new FormData();
        formData.append("file", image); // Base64 string
        formData.append("fileName", `complaint_${Date.now()}.jpg`);
        formData.append("folder", "/complaints");

        // Upload image to ImageKit
        const responseIK = await axios.post(IMAGEKIT_URL, formData, {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Basic ${Buffer.from(
                IMAGEKIT_PRIVATE_KEY + ":").toString("base64")}`,
          },
        });

        imageUrl = responseIK.data.url;
        console.log("✅ Image uploaded to ImageKit:", imageUrl);
      }

      // Save complaint in Firestore
      const response = await db.collection("complaints").add({
        userId,
        date,
        type,
        description,
        image: imageUrl,
        status,
        rating,
      });

      res.status(201).json({
        id: response.id,
        message: "Complaint created successfully",
      });
    } catch (error) {
      console.error("❌ Error creating complaint:");
      res.status(500).json({error: error.response.data || error.message});
    }
  },

  getAllComplaints: async (req, res) => {
    const {userId} = req.params;
    try {
      const response = await db.collection("complaints").where(
          "userId", "==", userId).orderBy("date", "desc").get();
      if (!response.empty) {
        res.status(200).json({data: response.docs.map((doc) => ({
          id: doc.id, ...doc.data()})),
        });
      } else {
        res.status(204).json({message: "Complaint not found"});
      }
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  getComplaintById: async (req, res) => {
    const {complaintId} = req.params;

    try {
      const response = await db.collection("complaints").doc(complaintId).get();

      if (!response.exists) {
        console.log("Complaint not found");
        return res.status(204).json({message: "Complaint not found"});
      }

      const complaintDoc = response.data();
      res.status(200).json({data: complaintDoc});
    } catch (error) {
      console.error("Error fetching complaint:", error);
      res.status(500).json({error: error.message});
    }
  },

  updateRatingById: async (req, res) => {
    const {complaintId} = req.params;
    const {rating} = req.body;
    try {
      const complaintQuery = await db.collection("complaints").doc(
          complaintId).get();
      if (!complaintQuery.exists) {
        return res.status(204).json({message: "Complaint not found"});
      }

      await db.collection("complaints").doc(
          complaintId).set({rating}, {merge: true});
      res.status(200).json({message: "Complaint updated successfully"});
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({error: error.message});
    }
  },

  updateStatusById: async (req, res) => {
    const {complaintId} = req.params;
    const {status} = req.body;
    // console.log("Complaint ID:", complaintId);
    // console.log("Status:", status);
    try {
      const complaintQuery = await db.collection("complaints").doc(
          complaintId).get();
      if (!complaintQuery.exists) {
        console.log("Complaint not found");
        return res.status(204).json({message: "Complaint not found"});
      }

      await db.collection("complaints").doc(
          complaintId).set({status}, {merge: true});
      res.status(200).json({message: "Complaint updated successfully"});
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({error: error.message});
    }
  },
};

module.exports = complaintsController;
