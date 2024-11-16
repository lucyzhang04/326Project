
 export function mock_submission_fetch(url, _options = {}) {

    return new Promise((resolve, reject) => {
      const delay = 500;
      setTimeout(() => {
        const mockResponse = {
          ok: true,
          status: 200,
          statusText: "OK",
          url,
          test: () => "this is a test",
          json: async () => make_response(),
          text: async () => "This is a mock response",
        };

        if (url.includes("error")) {
          reject(new Error("Network error"));
        } else {
          resolve(mockResponse);
        }
      }, delay);
    });
  }

  function make_response(){
    return ([
      { 
          "name": "The Rest is History",
          "host" : "Jane Doe\n",
          "image": "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp", 
      }, 
      { 
          "name": "The Daily",
          "host" : "New York Times",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
      },
      { 
          "name": "How to Save the Planet",
          "host" : "Jane Doe",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
      },
      { 
          "name": "Podcast 1\n",
          "host" : "Jack & Jill",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04160429/Free-Stock-Photos-07.jpg", 
      },
      { 
          "name": "How to Save the Planet",
          "host" : "Jane Doe",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
      },
      { 
          "name": "The Rest is History",
          "host" : "Jane Doe\n",
          "image": "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp", 
      }, 
      { 
          "name": "The Daily",
          "host" : "New York Times",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
      },
      { 
          "name": "How to Save the Planet",
          "host" : "Jane Doe",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg", 
      },
      { 
          "name": "Podcast 1\n",
          "host" : "Jack & Jill",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04160429/Free-Stock-Photos-07.jpg", 
      },
      { 
          "name": "The Daily",
          "host" : "New York Times",
          "image": "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04154511/Free-Stock-Photos-06.jpg"
      },
      { 
        "name": "The Rest is History",
        "host" : "Jane Doe\n",
        "image": "https://ichef.bbci.co.uk/images/ic/1424x801/p0d0mjrz.jpg.webp", 
      },
    ]);
}
  