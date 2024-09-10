import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";

export const data = new SlashCommandBuilder().setName("getastrosigndistribution").setDescription("Get Astrological Sign Distribution");

export async function execute(interaction: CommandInteraction) {
  try {
    const coachsStatistics = await fillCoachStatistic();
    
    const astrologicalSignRepartition = coachsStatistics.data_astrological_sign.name_astro_sign
        .map((coach, index) => ({
          coach,
          value: coachsStatistics.data_astrological_sign.number_astro_sign[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = astrologicalSignRepartition
      .map((data) => `**${data.coach}** -> ${data.value}`)
      .join("\n");

    await interaction.reply(`**Astrological Sign Distribution:**\n${message}`);
  } catch (error) {
    console.error('Error fetching average rating:', error);
    await interaction.reply('An error occurred while fetching astrological sign distribution.');
  }
}
