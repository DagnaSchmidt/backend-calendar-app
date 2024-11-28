import Event from "../../models/event.js";

export const getEvents = async (req, res) => {
    const userId = req.body;

    try {
        const events = await Event.find({ user_id: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
