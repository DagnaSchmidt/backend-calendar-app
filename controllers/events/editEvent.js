import Event from "../../models/event.js";

export const editEvent = async (req, res) => {
    const userId = req.body;
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.user_id.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
