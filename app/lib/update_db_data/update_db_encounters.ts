import Encounters from "@/app/back/models/encounters";
import { createEncounter, deleteEncounter, getEncounters, updateEncounter } from "../dbhelper/encounters";

export async function delete_db_encounters()
{
    const existingEncounters = await getEncounters();

    for (const encounter of existingEncounters) {
        if (encounter._id) {
            deleteEncounter(encounter._id.toString());
        }
    }
}

export async function update_db_encounters()
{
    try {
        const res = await fetch('/api/encounters', { method: 'GET' });
        const data: Partial<Encounters>[] = await res.json();

        const existingEncounters = await getEncounters();
        const existingEncounterMap = new Map(existingEncounters.map(emp => [emp.id, emp]));

        const fetchFullDataPromises = data.map(async (encounter) => {
            const fullRes = await fetch(`/api/encounters/${encounter.id}`, { method: 'GET' });
            return await fullRes.json();
        });
        
        const fullEncounters = await Promise.all(fetchFullDataPromises);
        
        for (const fullData of fullEncounters) {
            try {
                const fullEncounter = new Encounters(
                    fullData.id,
                    fullData.customer_id,
                    fullData.date,
                    fullData.rating,
                    fullData.comment,
                    fullData.source,
                );

                const existingEncounter = existingEncounterMap.get(fullEncounter.id);

                if (existingEncounter) {
                    if (existingEncounter._id) {
                        const needsUpdate =
                        existingEncounter.customer_id !== fullEncounter.customer_id ||
                        existingEncounter.date !== fullEncounter.date ||
                        existingEncounter.rating !== fullEncounter.rating ||
                        existingEncounter.comment !== fullEncounter.comment ||
                        existingEncounter.source !== fullEncounter.source;

                        if (needsUpdate) {
                            await updateEncounter(existingEncounter._id.toString(), fullEncounter);
                        }
                    }
                } else {
                    await createEncounter(fullEncounter);
                }
            } catch (error) {
                console.error(`Error processing encounter ${fullData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating encounters:', error);
    }
}
