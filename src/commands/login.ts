import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getEmployees } from "@/app/lib/dbhelper/employees";

export const loggedInUsers: Record<string, boolean> = {};

export const data = new SlashCommandBuilder()
  .setName("login")
  .setDescription("Login")
  .addStringOption(option =>
    option
      .setName("email")
      .setDescription("The email of the user")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("password")
      .setDescription("The password of the user")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    const email = interaction.options.get("email")?.value as string;
    if (!email) {
      await interaction.reply('❌ Please provide a valid employee e-mail.');
      return;
    }
    const password = interaction.options.get("password")?.value as string;
    if (!password) {
      await interaction.reply('❌ Please provide a valid employee password.');
      return;
    }

    const response = await fetch('http://localhost:3000/api/employees/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const employees = await getEmployees();
      const employee = employees.find(emp => emp.email === email);

      if (employee) {
        await interaction.reply('✅ Connection success !');
        loggedInUsers[interaction.user.id] = true;
      } else {
        await interaction.reply('❌ Ypu are not connected as an employee !');
      }
    } else {
      await interaction.reply('❌ Connection failed !');
    }
  } catch (error) {
    console.error('Error logging in employee:', error);
    await interaction.reply('⚠️ An error occurred during login.');
  }
}
