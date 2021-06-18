import { result } from './env';
import { Client } from "discord.js";
import { PanzerReaction } from "~PanzerBot/PanzerReaction";
import { EmojiCollection } from "~PanzerBot/EmojiCollection";

console.log(result);

const client = new Client();
const token = process.env.PANZERBOT_TOKEN;

const emojiCollection = new EmojiCollection();
const panzerReaction = new PanzerReaction(emojiCollection);

panzerReaction.register(client);

client.on('ready', () => {
  console.log('I am ready!');
});

client.login(token);
