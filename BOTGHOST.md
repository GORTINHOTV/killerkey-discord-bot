# KillerKey no BotGhost (sem código)

Você não precisa hospedar o bot Node — dá pra usar o **[BotGhost](https://botghost.com)** e chamar direto a API do KillerKey.

## 1. No painel KillerKey
Projeto → **Discord bot** → **Generate token** → copie o `kkbot_...`.

## 2. No BotGhost
1. **Commands → Custom Command** → nome `getkey` (slash command, sem opções).
2. Adicione uma ação **API Request → Send API Request**:
   - **Method:** `POST`
   - **URL:** `https://asoeuhh.lovable.app/api/public/bot/getkey`
     *(ou use o domínio próprio / `project--39fcb146-6300-417b-ae8b-b29252c26ad5.lovable.app` pra URL estável)*
   - **Headers:**
     - `Authorization` = `Bearer kkbot_SEU_TOKEN_AQUI`
     - `Content-Type` = `application/json`
   - **Body (JSON):**
     ```json
     {
       "discord_user_id": "{user_id}",
       "discord_username": "{user_username}"
     }
     ```
   - **Save response to variable:** `kkresp`

3. Adicione uma ação **Conditional → If Variable**:
   - Se `{kkresp_success}` = `true` → **Send Embed**:
     - Título: `Safyra Keyless — Key de 1 dia`
     - Descrição: `{kkresp_message}`
     - Campo `Expira em`: `<t:{kkresp_expires_at_unix}:R>`
     - **Ephemeral:**  (só o usuário vê)
   - Senão → **Send Message** (ephemeral): `{kkresp_message}`

Pronto. Cooldown, geração de key e expiração ficam por conta do KillerKey.

## Campos que a API devolve
| Variável BotGhost        | O que é                                       |
|--------------------------|-----------------------------------------------|
| `{kkresp_success}`       | `true` / `false`                              |
| `{kkresp_key}`           | a key `KL-XXXX-XXXX-XXXX` (só se sucesso)     |
| `{kkresp_expires_at}`    | ISO string                                    |
| `{kkresp_expires_at_unix}` | timestamp p/ `<t:...:R>` do Discord         |
| `{kkresp_message}`       | mensagem pronta pra colar no embed            |
| `{kkresp_cooldown}`      | `true` quando ainda em cooldown               |
| `{kkresp_hours_left}`    | horas restantes se em cooldown                |
