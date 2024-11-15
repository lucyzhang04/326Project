import { SongDatabase } from "./database.js";

function createDB(dbName){
    return new SongDatabase(dbName);
}

export function getSongDB(){
    return createDB("songDB");
}

export function getLoginDB(){
    //feel free to change the name or whatever else you find necessary
    return createDB("loginDB");
}