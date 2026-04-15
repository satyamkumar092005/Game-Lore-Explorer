let lastResults = [];

async function searchGame() {
  const query = document.getElementById("searchInput").value;
  if (!query.trim()) return;

  const res = await fetch(`https://api.rawg.io/api/games?key=f90c73d0d0b74b77bbb208088a38d3b2&search=${query}`);
  const data = await res.json();

  lastResults = data.results;
  displayResults(lastResults);
}

function displayResults(games) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '';

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.innerHTML = `
      <h2>${game.name}</h2>
      <img src="${game.background_image}" alt="${game.name}" />
      <p><strong>Released:</strong> ${game.released}</p>
    `;
    gameCard.addEventListener('click', () => showGameDetails(game.id));
    resultsDiv.appendChild(gameCard);
  });
}

async function showGameDetails(gameId) {
  const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=f90c73d0d0b74b77bbb208088a38d3b2`);
  const game = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <div class="game-card">
      <h2>${game.name}</h2>
      <img src="${game.background_image}" alt="${game.name}" />
      <p><strong>Released:</strong> ${game.released}</p>
      <p><strong>Genres:</strong> ${game.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Platforms:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
      <p><strong>Description:</strong> ${game.description_raw.slice(0, 300)}...</p>
      <button class="back-button" onclick="displayResults(lastResults)">← Go Back</button>
    </div>
  `;
}



