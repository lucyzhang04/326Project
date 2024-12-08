// Check if the user is logged in by reading cookies
// to see if there is a refresh token saved.
// If the user is logged in, display get their profile
// photo and name from Spotify API and display it instead of the Login link.

export default function HandleSpotifyLogin() {
  console.log("In HandleSpotifyLogin() function");
  function getLocalStorageItem(key) {
    return localStorage.getItem(key);
  }

  function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
  }

  document.addEventListener("readyForHydration", () => {
    console.log("DOM fully loaded and parsed");
    const userContainer = document.getElementById("user-container");
    if (!userContainer) {
      console.error("User container element not found");
      return;
    }

    if (window.location.hash) {
      handleAuthCallback();
    }
    if (getLocalStorageItem("spotify_refresh_token")) {
      if (getLocalStorageItem("spotify_username")) {
        const profilePicture = getLocalStorageItem("spotify_profileURL");
        const name = getLocalStorageItem("spotify_displayName");
        updateUI(profilePicture, name);
      } else {
        // Get user profile from Spotify API
        getUserProfile().then((profile) => {
          const profilePicture = profile.profilePicture;
          const username = profile.username;
          const displayName = profile.name || username;

          updateUI(profilePicture, displayName);

          setLocalStorageItem("spotify_username", username);
          setLocalStorageItem("spotify_profileURL", profilePicture);
          setLocalStorageItem("spotify_displayName", displayName);
        });
      }
    }
  });

  function updateUI(profilePicture, displayName) {
    const userContainer = document.getElementById("user-container");
    if (!userContainer) {
      console.error("User container element not found");
      return;
    }
    userContainer.innerHTML = ""; // Clear any previous content
    const pfp = document.createElement("img");
    pfp.src = profilePicture;
    pfp.alt = `${displayName} profile picture`;
    pfp.width = 50;

    const nameElement = document.createElement("span");
    nameElement.innerText = `Logged in as ${displayName}`;

    const logoutButton = document.createElement("button");
    logoutButton.innerText = "Log Out";
    logoutButton.id = "logout-button";
    logoutButton.onclick = logout;

    userContainer.appendChild(nameElement);
    userContainer.appendChild(pfp);
    userContainer.appendChild(logoutButton);
    // Hide the login link
    const loginElement = document.getElementById("login-element");
    if (loginElement) {
      loginElement.classList.add("hidden");
    }
  }

  function storeTokensInLocalStorage(tokens) {
    setLocalStorageItem("spotify_access_token", tokens.accessToken);
    setLocalStorageItem("spotify_refresh_token", tokens.refreshToken);
  }

  function parseHash() {
    const hash = window.location.hash.substring(1); // Remove the leading '#'
    const params = new URLSearchParams(hash);
    return {
      accessToken: params.get("access_token"),
      refreshToken: params.get("refresh_token"),
    };
  }

  async function handleAuthCallback() {
    const tokens = parseHash();
    if (tokens.accessToken && tokens.refreshToken) {
      storeTokensInLocalStorage(tokens);
      // Clean up the URL
      window.history.replaceState({}, document.title, "/");
    } else {
      console.error("Missing tokens in the URL fragment.");
    }
  }

  async function fetchUserProfile() {
    const accessToken = getLocalStorageItem("spotify_access_token");
    if (!accessToken) {
      throw new Error("Access token is missing!");
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  }

  async function getUserProfile() {
    try {
      const profile = await fetchUserProfile();
      const name = profile.display_name;
      const username = profile.id;
      const profilePicture =
        profile.images?.[0]?.url ||
        `https://placehold.co/400/orange/white?text=${name}`;

      return { name, username, profilePicture };
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  function logout() {
    // Clear localStorage items
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_username");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_displayName");
    localStorage.removeItem("spotify_profileURL");

    // Reset the UI
    const userContainer = document.getElementById("user-container");
    if (userContainer) {
      userContainer.innerHTML = ""; // Clear user info
    }
    const loginElement = document.getElementById("login-element");
    if (loginElement) {
      loginElement.classList.remove("hidden"); // Show login link again
      loginElement.href = "/spotify/login";
      loginElement.onclick = null;
    }
  }
}

// HandleSpotifyLogin();
