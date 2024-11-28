import Event from "../../models/event.js";

export const deleteEvent = async (req, res) => {
    const userId = req.body;
    const { id } = req.params;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.user_id.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await event.deleteOne();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
