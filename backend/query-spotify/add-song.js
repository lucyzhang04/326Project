async function addSongsToLiked(selectedSongs) {
    const accessToken = () => req.session.access_token;

    if (!accessToken) {
        console.error("Access token not available!");
        return;
    }

    const response = await fetch("https://api.spotify.com/v1/me/tracks", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ids: selectedSongs.map(song => song.id) })
    });

    if (response.ok) {
        console.log("Songs added to Liked Songs!");
    } else {
        console.error("Error adding songs:", response.statusText);
    }
}

const selectedSongs = [
    { id: "1l0wPhFZP1kWkZNQrrYrGy", name: "RUNNING" },
    { id: "698ItKASDavgwZ3WjaWjtz", name: "Faded" }
];

// Call the function
addSongsToLiked(selectedSongs).then(() => {
    console.log("Songs added successfully!");
}).catch(err => {
    console.error("An error occurred:", err);
});

module.exports = { addSongsToLiked };

