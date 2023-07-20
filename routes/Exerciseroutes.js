const express = require("express")
const route = express.Router()
const { authMiddleware } = require("../middleware/auth.middleware")
const Gymmodal = require("../models/Gymmodal")


route.get("/exercise", authMiddleware, async (req, res) => {

   

    const { category, type } = req.query

    try {
        if (category === "gym") {
            if (!type) {
                res.status(400).send("Please provide 'type' in the query.");
            } else {
                const gymexercises = await Gymmodal.find({ type })
                if (gymexercises.length === 0) {
                    res.status(404).send("No exercises found with the specified type.");
                } else {
                    res.json(gymexercises);
                }
            }
        } else {
            res.status(400).send("Invalid category or category not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

})


module.exports = route