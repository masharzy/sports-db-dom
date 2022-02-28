const allPlayers = () => {
    let searchForm = document.getElementById('search-form').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchForm}`;
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
    
    // console.log(url);
}