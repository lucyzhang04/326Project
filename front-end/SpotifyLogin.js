// Check if the user is logged in by reading cookies
// to see if there is a refresh token saved.

// If the user is logged in, display get their profile
// photo and name from Spotify API and display it instead of the Login link.

export default function HandleSpotifyLogin() {
  function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return null;
  }
  window.onload = () => {
    console.log("no");
    console.log(window.location);
    if (window.location.hash) {
      handleAuthCallback();
    }
    if (getCookie("spotify_refresh_token")) {
      // Get user profile from Spotify API
      getUserProfile().then((profile) => {
        const profilePicture = profile.profilePicture;
        const name = profile.name;

        // Update the UI
        const userContainer = document.getElementById("user-container");
        userContainer.innerHTML = ""; // Clear any previous content
        const pfp = document.createElement("img");
        pfp.src = profilePicture;
        pfp.alt = `${name} profile picture`;
        pfp.width = 50;

        const nameElement = document.createElement("span");
        nameElement.innerText = `Logged in as ${name}`;

        const logoutButton = document.createElement("button");
        logoutButton.innerText = "Log Out";
        logoutButton.id = "logout-button";
        logoutButton.onclick = logout;

        userContainer.appendChild(nameElement);
        userContainer.appendChild(pfp);
        userContainer.appendChild(logoutButton);

        // Hide the login link
        const loginElement = document.getElementById("login-element");
        loginElement.classList.add("hidden");
      });
    }
  };

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiry in days
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
  }

  function storeTokensInCookies(tokens) {
    setCookie("spotify_access_token", tokens.accessToken, 1);
    setCookie("spotify_refresh_token", tokens.refreshToken, 30);
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
      storeTokensInCookies(tokens);
      console.log("Tokens stored in cookies!");
      // Clean up the URL
      window.history.replaceState({}, document.title, "/");
    } else {
      console.error("Missing tokens in the URL fragment.");
    }
  }

  async function fetchUserProfile() {
    const accessToken = getCookie("spotify_access_token");
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
      const profilePicture = profile.images?.[0]?.url; // Safely access the first image URL

      console.log("Name:", name);
      console.log("Profile Picture:", profilePicture);

      return { name, profilePicture };
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  function logout() {
    // Clear cookies by setting their expiration to a past date
    document.cookie =
      "spotify_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "spotify_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Reset the UI
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = ""; // Clear user info
    const loginElement = document.getElementById("login-element");
    loginElement.classList.remove("hidden"); // Show login link again
    loginElement.href = "/spotify/login";
    loginElement.onclick = null;
  }
}
