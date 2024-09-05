import Events from "@/app/back/models/events";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../dbhelper/events";

export async function delete_db_events()
{
    const existingEvents = await getEvents();

    for (const event of existingEvents) {
        if (event._id) {
            deleteEvent(event._id.toString());
        }
    }
}

export async function update_db_events()
{
    try {
        const res = await fetch('/api/events', { method: 'GET' });
        const data: Partial<Events>[] = await res.json();
        
        const existingEvents = await getEvents();
        const existingEventMap = new Map(existingEvents.map(event => [event.id, event]));
        
        const fetchFullDataPromises = data.map(async (event) => {
            const fullRes = await fetch(`/api/events/${event.id}`, { method: 'GET' });
            return await fullRes.json();
        });
        
        const fullEvents = await Promise.all(fetchFullDataPromises);
        
        for (const fullData of fullEvents) {
            try {
                const fullEvent = new Events(
                    fullData.id,
                    fullData.name,
                    fullData.date,
                    fullData.max_participants,
                    fullData.location_x,
                    fullData.location_y,
                    fullData.type,
                    fullData.employee_id,
                    fullData.location_name
                );

                const existingEvent = existingEventMap.get(fullEvent.id);

                if (existingEvent) {
                    if (existingEvent._id) {
                        const needsUpdate =
                            existingEvent.name !== fullEvent.name ||
                            existingEvent.date !== fullEvent.date ||
                            existingEvent.max_participants !== fullEvent.max_participants ||
                            existingEvent.location_x !== fullEvent.location_x ||
                            existingEvent.location_y !== fullEvent.location_y ||
                            existingEvent.type !== fullEvent.type ||
                            existingEvent.employee_id !== fullEvent.employee_id ||
                            existingEvent.location_name !== fullEvent.location_name;
                        
                        if (needsUpdate) {
                            await updateEvent(existingEvent._id.toString(), fullEvent);
                        }
                    }
                } else {
                    await createEvent(fullEvent);
                }
            } catch (error) {
                console.error(`Error processing event ${fullData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating events:', error);
    }
}
