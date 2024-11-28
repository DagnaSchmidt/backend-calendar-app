import express from 'express';
import { createEvent } from './createEvent.js';
import { editEvent } from './editEvent.js';
import { deleteEvent } from './deleteEvent.js';
import { getEvents } from './getEvents.js';
import { getEventById } from './getEventById.js';
import { authenticate } from '../../utils/authMiddleware.js';
export const eventsRouter = express.Router();

eventsRouter.post('/', authenticate, createEvent);
eventsRouter.put('/:id', authenticate, editEvent);
eventsRouter.delete('/:id', authenticate, deleteEvent);
eventsRouter.get('/', authenticate, getEvents);
eventsRouter.get(':id', authenticate, getEventById);

export default eventsRouter;
