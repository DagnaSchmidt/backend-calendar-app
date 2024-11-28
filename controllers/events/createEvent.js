import Event from "../../models/event.js";

export const createEvent = async (req, res) => {
    const { type, description, repeatable, repeat, all_day, time, participants, location, userId } = req.body;

    try {
        const event = new Event({
            type,
            description,
            repeatable,
            repeat,
            all_day,
            time,
            participants,
            location,
            user_id: userId
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
