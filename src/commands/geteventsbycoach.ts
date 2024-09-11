import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { fillCoachStatistic } from "@/app/lib/dbhelper/statistics_data";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("geteventsbycoach").setDescription("Get All Events");

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const coachsStatistics = await fillCoachStatistic();
    const nbEvents = coachsStatistics.coach_list
        .map((coach, index) => ({
            coach,
          value: coachsStatistics.coach_nb_event[index],
        }))
        .sort((a, b) => b.value - a.value)

    const message = nbEvents
      .map((data) => `**${data.coach}** -> ${data.value}`)
      .join("\n");

    await interaction.reply(`**Coaches Events:**\n${message}`);
  } catch (error) {
    console.error('Error fetching events:', error);
    await interaction.reply('An error occurred while fetching events data.');
  }
}
