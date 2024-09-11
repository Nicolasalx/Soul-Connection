import Events from "@/app/back/models/events";
import { getEvents } from "@/app/lib/dbhelper/events";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder().setName("getallevents").setDescription("Get All Events");

const MAX_MESSAGE_LENGTH = 2000;
const EVENTS_PER_MESSAGE = 30;

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const events: Events[] = await getEvents();

    let i = 0;
    while (i < events.length) {
      const chunkEvents = events.slice(i, i + EVENTS_PER_MESSAGE);
      const eventList = chunkEvents.map(event => `Name: **${event.name}**\t Date: ${event.date} \t Type: ${event.type}`).join('\n');
      let start = 0;

      while (start < eventList.length) {
        const end = Math.min(start + MAX_MESSAGE_LENGTH, eventList.length);
        const chunk = eventList.slice(start, end);
        if (start === 0 && i === 0) {
          await interaction.reply({ content: chunk });
        } else {
          await interaction.followUp({ content: chunk });
        }
        start = end;
      }
      i += EVENTS_PER_MESSAGE;
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("An error occurred while fetching tips.");
    } else {
      await interaction.reply("An error occurred while fetching tips.");
    }
  }
}
