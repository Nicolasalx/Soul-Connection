import { CommandInteraction } from "discord.js";
import { loggedInUsers } from "./login";

export async function ensureUserLoggedIn(interaction: CommandInteraction): Promise<boolean> {
  if (!loggedInUsers[interaction.user.id]) {
    await interaction.reply({
      content: "❌ You must be logged in to use this command.",
      ephemeral: true,
    });
    return false;
  }
  return true;
}
