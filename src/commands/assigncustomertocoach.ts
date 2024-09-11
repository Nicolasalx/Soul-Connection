import { assignCoachToCustomer } from "@/app/lib/dbhelper/customers";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ensureUserLoggedIn } from "./authUtils";

var mongoose = require('mongoose');

export const data = new SlashCommandBuilder()
  .setName("assigncustomertocoach")
  .setDescription("Assign a Customer to a Coach")
  .addStringOption(option => 
    option
      .setName("customer_id")
      .setDescription("The ID of the customer (mongo id)")
      .setRequired(true)
  )
  .addStringOption(option => 
    option
      .setName("coach_id")
      .setDescription("The ID of the coach")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const customerId = interaction.options.get("customer_id")?.value as string;
    const coachId = Number(interaction.options.get("coach_id")?.value);

    var objectId = new mongoose.Types.ObjectId(customerId);

    if (isNaN(coachId)) {
      throw new Error("Coach ID must be a valid number.");
    }
    await assignCoachToCustomer(coachId, objectId);
    await interaction.reply(`Customer ${customerId} assigned to Coach ${coachId}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    await interaction.reply('An error occurred while fetching data.');
  }
}
