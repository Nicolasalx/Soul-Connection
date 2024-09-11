import { getCustomers } from "@/app/lib/dbhelper/customers";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ensureUserLoggedIn } from "./authUtils";

export const data = new SlashCommandBuilder()
  .setName("getdatacustomer")
  .setDescription("Get Data Customer")
  .addStringOption(option =>
    option
      .setName("customer_id")
      .setDescription("The ID of the customer")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    if (!(await ensureUserLoggedIn(interaction))) {
      return;
    }

    const customerIdStr = interaction.options.get("customer_id")?.value as string;
    if (!customerIdStr) {
      await interaction.reply('❌ Please provide a valid customer ID.');
      return;
    }
    const customerId = parseInt(customerIdStr, 10);
    if (isNaN(customerId)) {
      await interaction.reply('❌ The provided customer ID is not a valid number.');
      return;
    }

    const customerData = await getCustomers();
    const customer = customerData.find(cust => cust.id === customerId);

    if (customer) {
      const { name, surname, birth_date, email, gender, address, description, astrological_sign, phone_number } = customer;

      await interaction.reply(
        `🌟 **Customer Details** 🌟\n` +
        `----------------------------------\n` +
        `👤 **Name**: *${name} ${surname}*\n` +
        `📧 **Email**: *${email}*\n` +
        `📆 **Birth Date**: *${birth_date}*\n` +
        `⚧ **Gender**: *${gender}*\n` +
        `🏠 **Address**: *${address}*\n` +
        `📝 **Description**: *${description}*\n` +
        `🔮 **Astrological Sign**: *${astrological_sign}*\n` +
        `📞 **Phone Number**: *${phone_number}*\n` +
        `----------------------------------\n` +
        `✨ *Thank you for using the bot!* ✨`
      );
    } else {
      await interaction.reply('❌ Customer not found.');
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    await interaction.reply('⚠️ An error occurred while fetching customers data.');
  }
}
