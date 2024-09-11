import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { loggedInUsers } from "./login";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder()
  .setName("logout")
  .setDescription("Logout");

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
        return;
    }

    if (loggedInUsers[interaction.user.id]) {
      delete loggedInUsers[interaction.user.id];
      await interaction.reply('✅ You have been logged out successfully.');
    } else {
      await interaction.reply('❌ You are not logged in.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    await interaction.reply('⚠️ An error occurred during logout.');
  }
}
