import { GuildEmoji, GuildEmojiManager, Message } from "discord.js";
import { sprintf } from "sprintf-js";

export class EmojiCollection {

  private emojis: Map<string, GuildEmoji>;

  public static create(): EmojiCollection {
    return new EmojiCollection(new Map<string, GuildEmoji>());
  }

  public constructor(emojis: Map<string, GuildEmoji>) {
    this.emojis = emojis;
  }

  public findByName(message: Message, name: string): GuildEmoji {
    if (!this.emojis.has(name)) {
      this.emojis.set(name, this.fetchGuildEmoji(message, name));
    }

    return this.emojis.get(name) as GuildEmoji;
  }

  private fetchGuildEmoji(message: Message, name: string): GuildEmoji {
    console.log(sprintf('Looking up Emoji "%s"', name));
    const guildEmojis = message.guild?.emojis as GuildEmojiManager;
    const emoji = guildEmojis.cache.find(emoji => emoji.name === name);
    if (undefined === emoji) {
      throw new Error('Emoji not found');
    }

    return emoji as GuildEmoji;
  }
}
