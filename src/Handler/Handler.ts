import { Client } from "discord.js";

export interface Handler {
    register(client: Client): void;
}
