import { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } from 'discord.js';

export const adminUnlinkCmd = {
    data: new SlashCommandBuilder()
        .setName('admin_unlink')
        .setDescription('Admin only: Remove any user saved token')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Sirf Admin role wale hi use kar payenge
        .addUserOption(option => 
            option.setName('target')
                .setDescription('User jiska token hatana hai')
                .setRequired(true)
        ),
    prefix: 'admin_unlink',
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ content: '❌ Is command ko use karne ke liye aapke paas **Administrator** permission honi chahiye!', flags: MessageFlags.Ephemeral });
            return;
        }

        const targetUser = interaction.options.getUser('target');
        const ts = client.tokenStore;
        
        const removed = ts.remove(targetUser.id);
        if (removed) {
            await interaction.reply({ content: `✅ Successfully removed token for <@${targetUser.id}>.`, flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: `❌ User <@${targetUser.id}> ka koi token saved nahi mila.`, flags: MessageFlags.Ephemeral });
        }
    }
};
