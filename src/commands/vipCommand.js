import { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } from 'discord.js';
import { setVip } from '../quest/vipStore.js';

export const vipCmd = {
    data: new SlashCommandBuilder()
        .setName('vip')
        .setDescription('Admin: Give or remove VIP access')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Sirf Admin role wale hi dekh aur chala payenge
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Target user')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('status')
                .setDescription('True to give VIP, false to remove')
                .setRequired(true)
        ),
    prefix: 'vip',
    async execute(interaction, client) {
        // Extra security check agar koi prefix ya bypass se try kare
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ content: '❌ Is command ko use karne ke liye aapke paas **Administrator** permission honi chahiye!', flags: MessageFlags.Ephemeral });
            return;
        }

        const target = interaction.options.getUser('user');
        const status = interaction.options.getBoolean('status');

        setVip(target.id, status);

        await interaction.reply({ 
            content: `✅ User <@${target.id}> VIP status has been set to: **${status ? 'ENABLED 🌟' : 'DISABLED ❌'}**`, 
            flags: MessageFlags.Ephemeral 
        });
    }
};
