const allPlayers = () => {
  document.getElementById("player-container").innerHTML = "";
  document.getElementById("player-details-container").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  let searchForm = document.getElementById("search-form").value;
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchForm}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPlayers(data.player));
  document.getElementById("spinner").style.display = "none";
  document.getElementById("search-form").value = "";
};

const showPlayers = (players) => {
  if (players) {
    document.getElementById("error-msg").innerHTML = "";
  }else{
    document.getElementById("error-msg").innerHTML = "<p class='alert alert-danger'> No Result Found </p>";
  }
  for (const player of players) {
    const playerContainer = document.getElementById("player-container");

    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `<div class="card h-100 pb-2">
    <img src="${player.strThumb}" class="card-img-top" alt="Player Image">
    <div class="card-body">
      <h5 class="card-title">Name: ${player.strPlayer}</h5>
      <p class="card-text">Country: ${player.strNationality}</p>
    </div>
    <div class="all-button">
      <button class="btn btn-danger">Delete</button>
      <button onclick="details('${player.idPlayer}')" class="btn btn-primary">Details</button>
    </div>
  </div>`;
    playerContainer.appendChild(div);
    // console.log(player);
  }
};

const details = (info) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showPlayerDetails(data.players[0]));
  // console.log(info);
};

const showPlayerDetails = (players) => {
  const playerDetailsContainer = document.getElementById(
    "player-details-container"
  );
  playerDetailsContainer.innerHTML = `<div class="card border h-100 p-3 text-center">
    <img src="${players.strThumb}" class="card-img-top w-25 m-auto" alt="Player Image">
    <div class="card-body">
      <h3 class="card-title">Name: ${players.strPlayer}</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Country: ${players.strNationality}</li>
      <li class="list-group-item">Gender: ${players.strGender}</li>
      <li class="list-group-item">Height: ${players.strHeight}</li>
      <li class="list-group-item">Weight: ${players.strWeight}</li>
    </ul>
  </div>`;
};
