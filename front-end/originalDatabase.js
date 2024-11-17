console.log("Loading Exercise...");

export class TaskDatabase {
  constructor(name) {
    this.name = name;
    this.db = null;
  }

  async openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, 1);
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains('tasks')) {
          this.db.createObjectStore('tasks', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => {
        reject('Error opening database: ' + event.target.errorCode);
      };
    });
  }

  async getTasks() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readonly');
      const objectStore = transaction.objectStore('tasks');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error getting tasks: ' + event.target.errorCode);
      };
    });
  }

  async addTask(task) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readwrite');
      const objectStore = transaction.objectStore('tasks');
      const request = objectStore.put(task);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error adding task: ' + event.target.errorCode);
      };
    });
  }
}
