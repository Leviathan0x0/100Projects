// DOM ELEMENTS
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const profileContainer = document.getElementById('profile-container');
const errorContainer = document.getElementById('error-container');
const errorHeading = document.getElementById('error-heading');
const errorText = document.getElementById('error-text');
const avatar = document.getElementById('avatar');
const name = document.getElementById('name');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('bio');
const locationElement = document.getElementById('location');
const joinedDateElement = document.getElementById('joined-date');
const profileLink = document.getElementById('profile-link');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repos = document.getElementById('repos');
const companyElement = document.getElementById('company');
const blogElement = document.getElementById('blog');
const twitterElement = document.getElementById('twitter');
const companyContainer = document.getElementById('company-container');
const blogContainer = document.getElementById('blog-container');
const twitterContainer = document.getElementById('twitter-container');
const reposContainer = document.getElementById('repos-container');

// EVENT LISTENERS
searchBtn.addEventListener('click', searchUser);
searchInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') searchUser();
});

// FUNCTIONS
async function searchUser() {
	const username = searchInput.value.trim();
	if (!username) return showError('Input Error', 'Please enter a GitHub username.');

	try {
		profileContainer.classList.add('hidden');
		errorContainer.classList.add('hidden');
		const res = await fetch(`https://api.github.com/users/${username}`);

		if (!res.ok) return showError('User Not Found', 'Please check the username and try again.');

		const userData = await res.json();
		console.log(userData);

		displayUserData(userData);

		fetchRepos(userData.repos_url);
	} catch (e) {
		showError('Something went wrong.', 'Please try again later.');
		console.error(e);
	}
}

function displayUserData(user) {
	avatar.src = user.avatar_url;
	name.textContent = user.name || user.login;
	usernameElement.textContent = `@${user.login}`;
	bioElement.textContent = user.bio || 'No bio available.';

	locationElement.textContent = user.location || 'Not Specified';
	joinedDateElement.textContent = formatDate(user.created_at);

	profileLink.href = user.html_url;
	followers.textContent = user.followers;
	following.textContent = user.following;
	repos.textContent = user.public_repos;

	if (user.company) companyElement.textContent = user.company;
	else companyElement.textContent = 'Not Specified';

	if (user.blog) {
		blogElement.textContent = user.blog;
		blogElement.href = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`;
	} else {
		blogElement.textContent = 'No Website';
		blogElement.href = '#';
	}
	blogContainer.style.display = 'flex';

	if (user.twitter_username) {
		twitterElement.textContent = `@${user.twitter_username}`;
		twitterElement.href = `https://x.com/${user.twitter_username}`;
	} else {
		twitterElement.textContent = 'No X handle';
		twitterElement.href = '#';
	}
	twitterContainer.style.display = 'flex';

	profileContainer.classList.remove('hidden');
}

function showError(heading, msg) {
	profileContainer.classList.add('hidden');
	errorHeading.textContent = heading;
	errorText.textContent = msg;
	errorContainer.classList.remove('hidden');
}

function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

async function fetchRepos(reposUrl) {
	reposContainer.innerHTML = "<div class='loading-repos'>Loading Repositories...</div>";
	try {
		const res = await fetch(reposUrl + '?per_page=6');
		const repos = await res.json();
		displayRepos(repos);
	} catch (e) {
		reposContainer.innerHTML = `<div class='no-repos'>${e.message}</div>`;
	}
}

function displayRepos(repos) {
	if (repos.length === 0) return (reposContainer.innerHTML = `<div class='no-repos'>No Repositories Found</div>`);

	reposContainer.innerHTML = '';

	repos.forEach((repo) => {
		const repoCard = document.createElement('div');
		repoCard.classList.add('repo-card');
		const updatedAt = formatDate(repo.updated_at);

		repoCard.innerHTML = `
		<a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-code-branch"></i> ${repo.name}
      </a>
      <p class="repo-description">${repo.description || 'No description available'}</p>
      <div class="repo-meta">
        ${
				repo.language
					? `
          <div class="repo-meta-item">
            <i class="fas fa-circle"></i> ${repo.language}
          </div>
        `
					: ''
			}
        <div class="repo-meta-item">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-code-fork"></i> ${repo.forks_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-history"></i> ${updatedAt}
        </div>
      </div>
		`;
		reposContainer.appendChild(repoCard);
	});
}

searchInput.value = 'yyx990803';
searchUser();
