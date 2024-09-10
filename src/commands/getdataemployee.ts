import { getEmployees } from "@/app/lib/dbhelper/employees";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("getdataemployee")
  .setDescription("Get Data Employee")
  .addStringOption(option =>
    option
      .setName("employee_id")
      .setDescription("The ID of the employee")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    const employeeIdStr = interaction.options.get("employee_id")?.value as string;
    if (!employeeIdStr) {
      await interaction.reply('❌ Please provide a valid employee ID.');
      return;
    }
    const employeeId = parseInt(employeeIdStr, 10);
    if (isNaN(employeeId)) {
      await interaction.reply('❌ The provided employee ID is not a valid number.');
      return;
    }

    const employeeData = await getEmployees();
    const employee = employeeData.find(cust => cust.id === employeeId);

    if (employee) {
      const { name, surname, birth_date, email, gender, work } = employee;

      await interaction.reply(
        `🌟 **Employee Details** 🌟\n` +
        `----------------------------------\n` +
        `👤 **Name**: *${name} ${surname}*\n` +
        `📧 **Email**: *${email}*\n` +
        `📆 **Birth Date**: *${birth_date}*\n` +
        `⚧ **Gender**: *${gender}*\n` +
        `👷 **Work**: *${work}*\n` +
        `----------------------------------\n` +
        `✨ *Thank you for using the bot!* ✨`
      );
    } else {
      await interaction.reply('❌ Employee not found.');
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    await interaction.reply('⚠️ An error occurred while fetching employee data.');
  }
}
