document.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    githubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(username) {
      // Construct the GitHub API URL for user search
      const apiUrl = `https://api.github.com/search/users?q=${username}`;
  
      // Fetch data from the API
      fetch(apiUrl, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      reposList.innerHTML = "";
  
      users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userItem.addEventListener("click", () => {
          fetchAndDisplayRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function fetchAndDisplayRepos(username) {
      // Construct the GitHub API URL for user repositories
      const apiUrl = `https://api.github.com/users/${username}/repos`;
  
      // Fetch data from the API
      fetch(apiUrl, {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
  
      if (repos.length === 0) {
        reposList.innerHTML = "No repositories found for this user.";
        return;
      }
  
      const reposHeader = document.createElement("li");
      reposHeader.textContent = "User Repositories:";
      reposList.appendChild(reposHeader);
  
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  