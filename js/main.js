// add event to element with id="button"
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', pokemonSearch, false);

// This is code so the enter key also fires (runs/invokes/instantiates) the function
var search1 = document.getElementById('search1');
search1.addEventListener('keypress', function enterKey(e) {
	if(e.keyCode == 13) {
		pokemonSearch();
	};
}, false);

// This is code so the enter key also fires (runs/invokes/instantiates) the function
var search2 = document.getElementById('search2');
search2.addEventListener('keypress', function enterKey(e) {
	if(e.keyCode == 13) {
		pokemonSearch();
	};
}, false);


function pokemonSearch() {
    // store user input
    var search1 = document.getElementById("search1").value;
    var search2 = document.getElementById("search2").value;

    // retrieve result div
    var result1 = document.getElementById("results1");
    var result2 = document.getElementById("results2");

    // clear any previous data after each new search
    result1.innerHTML = "";
    result2.innerHTML = "";

    pokemonAPISearch(search1, result1);
    pokemonAPISearch(search2, result2);
}

function pokemonAPISearch(search, result) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + search, true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        console.log(data)

        // create pokemon info div
        var newColSm4 = document.createElement('div');

        // display the pokemon name
        var name = document.createElement('h2');
        name.innerText = data.name;

        // display the pokemon image
        var newImg = document.createElement('img');
        newImg.src = data.sprites.front_default;

        // display height
        var height = document.createElement('h3');
        height.innerText = 'Height: ' + (data.height * 3.937).toFixed(1) + ' inches';

        // display weight
        var weight = document.createElement('h3');
        weight.innerText = 'Weight: ' + (data.weight * 3.527 / 16).toFixed(1) + ' pounds';

        // display abilities
        var abilityDisplay = document.createElement('h3');
        var abilities = 'Abilities: ';
        for(i = 0; i < data.abilities.length; i++) {
            if(i === 0) {
                abilities += data.abilities[i].ability.name;
            } else {
                abilities += ', ' + data.abilities[i].ability.name; 
            }
        }
        abilityDisplay.innerText = abilities;

        // add tags to document
        newColSm4.appendChild(name);
        newColSm4.appendChild(newImg);
        newColSm4.appendChild(height);
        newColSm4.appendChild(weight);
        newColSm4.appendChild(abilityDisplay);

        // add results to the screen
        result.appendChild(newColSm4);

    }

    // Send request
    request.send()
}
