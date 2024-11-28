import Event from "../../models/event.js";

export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id).populate('participants', 'username');

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: 'Invalid event ID or server error' });
    }
};
