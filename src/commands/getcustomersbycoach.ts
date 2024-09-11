import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getcustomersbycoach").setDescription("Get All Customers");

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const coachsStatistics = await fillCoachStatistic();
    const nbCustomers = coachsStatistics.coach_list
        .map((coach, index) => ({
            coach,
          value: coachsStatistics.coach_nb_client[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = nbCustomers
      .map((data) => `**${data.coach}** -> ${data.value}`)
      .join("\n");

    await interaction.reply(`**Number of Customers by Coach:**\n${message}`);
  } catch (error) {
    console.error('Error fetching customers:', error);
    await interaction.reply('An error occurred while fetching customers data.');
  }
}
