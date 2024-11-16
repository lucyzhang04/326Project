console.log("Loading Exercise...");
export class TaskDatabase {
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
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id" });
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
  async addTask(task) {
    const db = await this.openDatabase();
    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    store.add(task);
    return new Promise((resolve, reject) => {
      tx.oncomplete = function () {
        resolve("Task added successfully!");
      };
      tx.onerror = function () {
        reject("Failed to add task.");
      };
    });
  }
  // Method to get all tasks-- will be used to display liked songs
  async getTasks() {
    const db = await this.openDatabase();
    const tx = db.transaction("tasks");
    const store = tx.objectStore("tasks");
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const tasks = request.result;
        resolve(tasks);
      }
      request.onerror = () => {
        reject("Failed to get all tasks.");
      }
    });
  }
  // Method to clear all tasks-- will be used to reset liked songs every 24 hours
  async clearAllTasks() {
    const db = await this.openDatabase();
    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    const request = store.clear();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve("Tasks cleared successfully!");
      }
      request.onerror = () => {
        reject("Failed to clear tasks");
      }
    });
  }
}