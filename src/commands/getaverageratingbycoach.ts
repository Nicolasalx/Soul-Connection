import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getaverageratingbycoach").setDescription("Get All Average Rating");

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const coachsStatistics = await fillCoachStatistic();
    const averageRatingData = coachsStatistics.coach_list
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.coach_average_rating[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = averageRatingData
      .map((data) => `**${data.coach}** -> ${data.value} ⭐`)
      .join("\n");

    await interaction.reply(`**Coaches Average Rating:**\n${message}`);
  } catch (error) {
    console.error('Error fetching average rating:', error);
    await interaction.reply('An error occurred while fetching average rating data.');
  }
}
