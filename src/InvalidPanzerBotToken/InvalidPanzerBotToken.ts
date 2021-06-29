import { EmptyPanzerBotToken } from "./types";
import { sprintf } from "sprintf-js";

export class InvalidPanzerBotToken extends Error
{
  public static fromEmpty(emptyToken: EmptyPanzerBotToken): InvalidPanzerBotToken {
    let emptyType: string = typeof emptyToken;
    if ('string' === emptyType) {
      emptyType = 'empty string';
    }
    return new InvalidPanzerBotToken(sprintf('The token cannot be empty but was of type %s', emptyType));
  }
}
