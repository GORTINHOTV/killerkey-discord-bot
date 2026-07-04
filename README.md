# KillerKey Discord Bot

Bot Node.js pronto pro comando `.getkey`. Cada usuário do KillerKey gera **seu próprio bot token** no painel (por projeto) e roda esse mesmo código.

## Passo a passo (cada usuário faz o seu)

### 1. No painel do KillerKey
Abra seu projeto no dashboard → seção **"Discord bot — comando .getkey"** → clique **Generate token**. Copie o `kkbot_...`.

### 2. Crie o bot no Discord
- https://discord.com/developers/applications → **New Application** → **Bot** → **Reset Token** (copie)
- Em **Privileged Gateway Intents**: ative **MESSAGE CONTENT INTENT**
- Em **OAuth2 → URL Generator**: marque `bot` + permissões `Send Messages`, `Embed Links`. Adicione o bot ao seu servidor.

### 3. Rode o bot
```bash
cd discord-bot
npm install
cp .env.example .env
# edite .env com:
#   DISCORD_BOT_TOKEN  = token do seu bot do Discord
#   KILLERKEY_BOT_TOKEN = kkbot_... gerado no painel
#   KILLERKEY_API_URL   = URL do KillerKey (recomendado: seu domínio próprio)
npm start
```

### 4. Hospedar 24/7
- **Railway** (free): `railway init` → `railway up`
- **Fly.io**: `fly launch`
- **VPS**: `pm2 start bot.js --name killerkey-bot`

## Como funciona
`.getkey` no Discord → bot chama `POST /api/public/bot/getkey` com o `kkbot_...` → KillerKey cria uma key de **24h** atrelada ao seu projeto → bot envia por DM.
- Cooldown por usuário do Discord é configurado no painel (padrão: 24h).
- Sem opções extras, sem ads.

## URL estável (importante)
Se você renomear seu projeto Lovable, `asoeuhh.lovable.app` muda. Use uma destas:
- Domínio próprio conectado ao KillerKey (recomendado)
- `project--39fcb146-6300-417b-ae8b-b29252c26ad5.lovable.app` (nunca muda)
