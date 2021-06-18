import { Client, Message } from "discord.js";
import { EmojiCollection } from "~PanzerBot/EmojiCollection";
import { Handler } from "~PanzerBot/Handler";

const panzerRegex = /(panzer(?!bot)|tank)/ig;
const reactionEmoji = 'panzer';

export interface MessageHandler {
  (message: Message): void;
}

export class PanzerReaction implements Handler {
  public constructor(private readonly emojiCollection: EmojiCollection) {}

  public register(client: Client): void {
    client.on('message', this.panzerReact());
  }

  public panzerReact(): MessageHandler {
    const emojiCollection = this.emojiCollection;

    return (message: Message): void => {
      if (message.content.match(panzerRegex)) {
        message.react(
          emojiCollection.findByName(message, reactionEmoji)
        );
      }
    }
  }
}
