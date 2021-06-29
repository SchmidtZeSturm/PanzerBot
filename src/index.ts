import './env';
import { Client } from "discord.js";
import { InvalidPanzerBotToken } from "~PanzerBot/InvalidPanzerBotToken"
import { PanzerReaction } from "~PanzerBot/PanzerReaction";
import { EmojiCollection } from "~PanzerBot/EmojiCollection";

const fetchToken = () => {
  const token = process.env.PANZERBOT_TOKEN;

  if (!token) {
    throw InvalidPanzerBotToken.fromEmpty(token);
  }

  return token;
};

const client = new Client();

const panzerReaction = new PanzerReaction(EmojiCollection.create());

panzerReaction.register(client);

client.on('ready', () => {
  console.log('I am ready, ja?');
});

try {
  client.login(fetchToken());
} catch(e) {
  client.destroy();
  console.log(e);
}
