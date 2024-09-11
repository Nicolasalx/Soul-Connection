import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getearningsbycoach").setDescription("Get All Earnings");

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const coachsStatistics = await fillCoachStatistic();
    const nbGainData = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_gain[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = nbGainData
      .map((data) => `**${data.coach}** -> ${data.value}`)
      .join("\n");

    await interaction.reply(`**Coaches Earnings:**\n${message}`);
  } catch (error) {
    console.error('Error fetching earnings:', error);
    await interaction.reply('An error occurred while fetching earnings data.');
  }
}
