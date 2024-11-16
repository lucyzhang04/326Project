export function mock_trending_fetch(url, v0){
    return new Promise((resolve, reject) => {
        const delay = 500;

        setTimeout(() =>{
            const mockResponse = {
                ok: true,
                status: 200,
                url,
                json: async () => getData(v0),
                
                /*async () => ([
                    {"id": 1, "title": "Hips Don't Lie", "artist": "Shakira", "shares": 150},
                    {"id": 2, "title": "Cotton Eye Joe", "artist": "Rednex", "shares": 100},
                    {"id": 3, "title": "Bailando", "artist": "Enrique Iglesias", "shares": 90},
                    {"id": 4, "title": "Dancing Queen", "artist": "ABBA", "shares": 87},
                    {"id": 5, "title": "Do You Want to Build a Snowman", "artist": "Kristen Bell", "shares": 60}
                ]),*/

                text: async () => "This is a mock response."
            };
                
            if(url.includes("error")){
                reject(new Error("Network Error"));
            }else{
                resolve(mockResponse);
            }
        }, delay)
    });
}

function getData(v0){

    console.log(`v0 value: ${v0}`);

    //let v0 = true;
    if(v0){
        return [
            {"id": 1, "title": "Hips Don't Lie", "artist": "Shakira", "shares": 150},
            {"id": 2, "title": "Cotton Eye Joe", "artist": "Rednex", "shares": 100},
            {"id": 3, "title": "Bailando", "artist": "Enrique Iglesias", "shares": 90},
            {"id": 4, "title": "Dancing Queen", "artist": "ABBA", "shares": 87},
            {"id": 5, "title": "Do You Want to Build a Snowman", "artist": "Kristen Bell", "shares": 60}
        ];
    }else{
        return [
            {"id": 1, "title": "Vienna", "artist": "Billy Joel", "shares": 180},
            {"id": 2, "title": "Reflection", "artist": "Christina Aguilera", "shares": 110},
            {"id": 3, "title": "Bailando", "artist": "Enrique Iglesias", "shares": 90},
            {"id": 4, "title": "Dancing Queen", "artist": "ABBA", "shares": 87},
            {"id": 5, "title": "Do You Want to Build a Snowman", "artist": "Kristen Bell", "shares": 60}
        ];
    }
}