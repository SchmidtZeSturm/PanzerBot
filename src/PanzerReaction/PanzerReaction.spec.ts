import { describe, test, expect, jest} from '@jest/globals';
import { Client, GuildEmoji, Message } from "discord.js";
import { PanzerReaction, MessageHandler } from "./PanzerReaction";
import { EmojiCollection } from "~PanzerBot/EmojiCollection";
import { mocked } from "ts-jest/utils";

describe('PanzerReaction handler', () => {

  test('It registers a handler', () => {
    const client = mocked(Client);
    const panzerReaction = new PanzerReaction(new EmojiCollection);
    client.on = jest.fn((event: string, messageHandler: MessageHandler) => {
      expect(event).toBe('message');
    });
    panzerReaction.register(client);
  });

  test('it reacts to a message that mentions a panzer', () => {
    const message = mocked(Message, true);
    const emojiCollection = mocked(EmojiCollection);
    const emoji = mocked(GuildEmoji);
    emojiCollection.findByName = jest.fn().mockImplementation(() => {
      return emoji;
    });
    message.content = 'panzer panzer panzer';

    message.react = jest.fn().mockImplementation(() => {});

    const panzerReaction = new PanzerReaction(emojiCollection);

    const reaction = panzerReaction.panzerReact();

    reaction(message as Message);

    expect(message.react).toHaveBeenCalledWith(emoji);
  })
});
