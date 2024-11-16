console.log("Loading Exercise...");

export class SongDatabase {
  
  constructor(dbName) {
    this.dbName = dbName;
  }

  // Method to open the database
  async openDatabase() {
    return new Promise((resolve, reject) => {
      if (this.dbName === "") {
        reject("Database name cannot be empty.");
        return;
      }

      let request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = function (event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("song")) {
          db.createObjectStore("song", { keyPath: "id" });
        }
      };
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  // Method to add a task-- will be used to add a liked song to DB
  async addSong(song) {
    const db = await this.openDatabase();
    const tx = db.transaction("song", "readwrite");
    const store = tx.objectStore("song");
    const songWithId = { ...song, id: `${song.title}-${song.artist}` };
    store.add(song);

    return new Promise((resolve, reject) => {
      tx.oncomplete = function () {
        resolve("Song added successfully!");
      };
      tx.onerror = function () {
        reject("Failed to add song.");
      };
    });
  }

  // Method to get all tasks-- will be used to display liked songs
  async getSong() {
    const db = await this.openDatabase();
    console.log("database opened");
    const tx = db.transaction("song");
    const store = tx.objectStore("song");
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const tasks = request.result;
        resolve(tasks);
      }
      request.onerror = () => {
        reject("Failed to get all song.");
      }
    });
  }

  // Method to clear all tasks-- will be used to reset liked songs every 24 hours
  async clearAllSongs() {
    const db = await this.openDatabase();
    const tx = db.transaction("song", "readwrite");
    const store = tx.objectStore("song");
    const request = store.clear();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve("Songs cleared successfully!");
      }
      request.onerror = () => {
        reject("Failed to clear songs");
      }
    });
  }

  // Method to delete a specific song from the database-- will be used for unliking feature
  async deleteSong(songId) {
    const db = await this.openDatabase();
    const tx = db.transaction("song", "readwrite");
    const store = tx.objectStore("song");
    const request = store.delete(songId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve("Task deleted successfully!");
      }
      request.onerror = () => {
        reject("Failed to remove task");
      }
    });
  }
}

