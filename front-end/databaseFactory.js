import { SongDatabase } from "./database.js";

export function getSongDB(){
    return new SongDatabase("songDB");
}