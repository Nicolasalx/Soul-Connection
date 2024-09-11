import Customers from "@/app/back/models/customers";
import { getCustomers } from "@/app/lib/dbhelper/customers";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getallcustomers").setDescription("Get All Customers");

const MAX_MESSAGE_LENGTH = 2000;
const CUSTOMERS_PER_MESSAGE = 30;

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const customers: Customers[] = await getCustomers();

    let i = 0;
    while (i < customers.length) {
      const chunkCustomers = customers.slice(i, i + CUSTOMERS_PER_MESSAGE);
      const customersList = chunkCustomers.map(customers => `**${customers.name}** / ${customers.gender} / ${customers.astrological_sign}`).join('\n');
      let start = 0;

      while (start < customersList.length) {
        const end = Math.min(start + MAX_MESSAGE_LENGTH, customersList.length);
        const chunk = customersList.slice(start, end);
        if (start === 0 && i === 0) {
          await interaction.reply({ content: chunk });
        } else {
          await interaction.followUp({ content: chunk });
        }
        start = end;
      }
      i += CUSTOMERS_PER_MESSAGE;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("An error occurred while fetching customers.");
    } else {
      await interaction.reply("An error occurred while fetching customers.");
    }
  }
}
