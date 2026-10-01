// KillerKey Discord Bot — .getkey command
// Hospede em Railway / Fly.io / VPS (Node 18+).
//
// Setup rápido:
//   1. No painel do KillerKey abra o projeto → "Discord bot" → clique "Generate token"
//   2. cd discord-bot && npm install
//   3. cp .env.example .env  (cole o token do Discord e o bot token do KillerKey)
//   4. node bot.js
//
// Uso no Discord: um usuário digita ".getkey" no canal onde o bot está.

import "dotenv/config";
import { Client, GatewayIntentBits, EmbedBuilder, Events } from "discord.js";

const {
  DISCORD_BOT_TOKEN,
  KILLERKEY_API_URL,     // ex: https://SEU-DOMINIO.com  (ou https://asoeuhh.lovable.app)
  KILLERKEY_BOT_TOKEN,   // "kkbot_..." gerado no dashboard
  COMMAND_PREFIX = ".getkey",
} = process.env;

if (!DISCORD_BOT_TOKEN || !KILLERKEY_API_URL || !KILLERKEY_BOT_TOKEN) {
  console.error("Missing DISCORD_BOT_TOKEN / KILLERKEY_API_URL / KILLERKEY_BOT_TOKEN");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.trim().toLowerCase() !== COMMAND_PREFIX.toLowerCase()) return;

  try {
    const res = await fetch(`${KILLERKEY_API_URL.replace(/\/$/, "")}/api/public/bot/getkey`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${KILLERKEY_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        discord_user_id: msg.author.id,
        discord_username: msg.author.username,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      await msg.reply(` ${data.error ?? "Falha ao gerar key"}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Safyra Key — Sua key de 1 dia")
      .setColor(0x8b5cf6)
      .setDescription("Chave gerada com sucesso. Válida por 24h.")
      .addFields(
        { name: "Key", value: `\`\`\`${data.key}\`\`\`` },
        { name: "Expira", value: new Date(data.expires_at).toLocaleString("pt-BR") },
      )
      .setFooter({ text: "Não compartilhe sua key. Ela trava no seu HWID no primeiro uso." });

    try {
      await msg.author.send({ embeds: [embed] });
      await msg.reply("Enviei sua key na DM!");
    } catch {
      await msg.reply({ embeds: [embed] });
    }
  } catch (err) {
    console.error(err);
    await msg.reply("Erro de rede ao contatar o KillerKey.");
  }
});

client.login(DISCORD_BOT_TOKEN);
