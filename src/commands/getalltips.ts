import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getTips } from "@/app/lib/dbhelper/tips";
import Tips from "@/app/back/models/tips";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getalltips").setDescription("Get All Tips");

const MAX_MESSAGE_LENGTH = 2000;
const TIPS_PER_MESSAGE = 10;

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const tips: Tips[] = await getTips();

    let i = 0;
    while (i < tips.length) {
      const chunkTips = tips.slice(i, i + TIPS_PER_MESSAGE);
      const tipsList = chunkTips.map(tip => `**${tip.title}**\n${tip.tip}`).join('\n\n');
      let start = 0;

      while (start < tipsList.length) {
        const end = Math.min(start + MAX_MESSAGE_LENGTH, tipsList.length);
        const chunk = tipsList.slice(start, end);
        if (start === 0 && i === 0) {
          await interaction.reply({ content: chunk });
        } else {
          await interaction.followUp({ content: chunk });
        }
        start = end;
      }
      i += TIPS_PER_MESSAGE;
    }
  } catch (error) {
    console.error('Error fetching tips:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("An error occurred while fetching tips.");
    } else {
      await interaction.reply("An error occurred while fetching tips.");
    }
  }
}
