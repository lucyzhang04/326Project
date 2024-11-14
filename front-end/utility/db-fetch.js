
 export function fetch(url, _options = {}) {
    return new Promise((resolve, reject) => {
      // Define a delay to simulate network latency (e.g., 1 second)
      const delay = 1000;
  
      setTimeout(() => {
        // Define a mock response object
        const mockResponse = {
          ok: true,
          status: 200,
          statusText: "OK",
          url,
          json: async () => ([{ 
                name: "Podcast 1",
                host : "Jane Doe",
                image: "This is a mock response", 
                url 
            },
            { 
                name: "Podcast 2",
                host : "John Deere",
                image: "This is a mock response", 
                url 
            }
            ]),
          text: async () => "This is a mock response",
        };
  
        // Use the URL to simulate failure or success
        if (url.includes("error")) {
          reject(new Error("Network error"));
        } else {
          resolve(mockResponse);
        }
      }, delay);
    });
  }
  