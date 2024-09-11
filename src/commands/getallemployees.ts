import { CommandInteraction, SlashCommandBuilder, GuildMember } from "discord.js";
import { getEmployees } from "@/app/lib/dbhelper/employees";
import Employees from "@/app/back/models/employees";
import { loggedInUsers } from "./login";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder()
  .setName("getallemployees")
  .setDescription("Get All Employees");

const MAX_MESSAGE_LENGTH = 2000;
const EMPLOYEES_PER_MESSAGE = 30;

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }
    const employees: Employees[] = await getEmployees();

    let i = 0;
    while (i < employees.length) {
      const chunkEmployees = employees.slice(i, i + EMPLOYEES_PER_MESSAGE);
      const employeesList = chunkEmployees
        .map((employee) => `**${employee.name} ${employee.surname}** -> ${employee.id}`)
        .join("\n");
      let start = 0;

      while (start < employeesList.length) {
        const end = Math.min(start + MAX_MESSAGE_LENGTH, employeesList.length);
        const chunk = employeesList.slice(start, end);
        if (start === 0 && i === 0) {
          await interaction.reply({ content: chunk });
        } else {
          await interaction.followUp({ content: chunk });
        }
        start = end;
      }
      i += EMPLOYEES_PER_MESSAGE;
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp("An error occurred while fetching employees.");
    } else {
      await interaction.reply("An error occurred while fetching employees.");
    }
  }
}
