import Tips from "@/app/back/models/tips";
import { createTip, deleteTip, getTips, updateTip } from "../dbhelper/tips";

export async function delete_db_tips()
{
    const existingTips = await getTips();

    for (const tip of existingTips) {
        if (tip._id) {
            deleteTip(tip._id.toString());
        }
    }
}

export async function update_db_tips()
{
    try {
        const res = await fetch('/api/tips', { method: 'GET' });
        const tipsList: Tips[] = await res.json();
        
        const existingTips = await getTips();
        const existingTipMap = new Map(existingTips.map(tip => [tip.id, tip]));
        
        for (const currentTip of tipsList) {
            try {
                const existingTip = existingTipMap.get(currentTip.id);

                if (existingTip) {
                    if (existingTip._id) {
                        const needsUpdate =
                        existingTip.tip !== currentTip.tip ||
                        existingTip.title !== currentTip.title;
                        
                        if (needsUpdate) {
                            await updateTip(existingTip._id.toString(), currentTip);
                        }
                    }
                } else {
                    await createTip(currentTip);
                }
            } catch (error) {
                console.error(`Error processing tip ${currentTip.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating tips:', error);
    }
}
