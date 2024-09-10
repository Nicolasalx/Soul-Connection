import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";

export const data = new SlashCommandBuilder().setName("getencountersbycoach").setDescription("Get All Encounters");

export async function execute(interaction: CommandInteraction) {
  try {
    const coachsStatistics = await fillCoachStatistic();
    const nbEncounters = coachsStatistics.coach_list
        .map((coach, index) => ({
            coach,
          value: coachsStatistics.coach_encounter[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = nbEncounters
      .map((data) => `**${data.coach}** -> ${data.value}`)
      .join("\n");

    await interaction.reply(`**Coaches Encounters:**\n${message}`);
  } catch (error) {
    console.error('Error fetching encounters:', error);
    await interaction.reply('An error occurred while fetching encounters data.');
  }
}
