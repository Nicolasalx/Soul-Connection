import { update_full_db } from '@/app/lib/update_db_data/update_full_db';
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {
  try {
    await update_full_db();
    console.log("DB updated successfully!!!");
  } catch (error) {
    console.error("Error updating DB:", error);
  }
});
