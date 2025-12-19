import { invoke } from "@tauri-apps/api/core";
import { Game } from "../types/game";

export const gameService = {
  async registerGame(
    title: string,
    remarks?: string,
    price?: string,
    customFields?: Record<string, any>
  ): Promise<Game> {
    return await invoke("register_game", {
      title,
      remarks: remarks || null,
      price: price || null,
      customFields: customFields || null,
    });
  },

  async searchGames(query: string): Promise<Game[]> {
    return await invoke("search_games", { query });
  },

  async getAllGames(): Promise<Game[]> {
    return await invoke("get_all_games");
  },

  async updateGame(
    id: string,
    title: string,
    remarks?: string,
    price?: string,
    customFields?: Record<string, any>
  ): Promise<Game> {
    return await invoke("update_game", {
      id,
      title,
      remarks: remarks || null,
      price: price || null,
      customFields: customFields || null,
    });
  },

  async deleteGame(id: string): Promise<void> {
    return await invoke("delete_game", { id });
  },
};
