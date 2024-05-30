function details(data) {
    // Name of pokemon
    let form = data.forms[0];
    let name = capitalize(form.name);
    $("#resultName").html(name); 
    // Type of pokemon
    let types = data.types;
    let type = "";
    for (let i = 0; i < types.length; i++) {
        type += capitalize(types[i].type.name);
        if (i < types.length-1) {
            type += ", "
        }
    }
    $("#resultType").html(type);
    // Abilities of pokemon
    let abilities = data.abilities;
    let ability = "";
    for (let i = 0; i < abilities.length; i++) {
        ability += capitalize(abilities[i].ability.name);
        if (i < abilities.length-1) {
            ability += ", "
        }
    }
    $("#resultAbility").html(ability);
    // Base stats of pokemon 
    let stats = data.stats;
    for (let i = 0; i < 6; i++) {
        if (stats[i].stat.name == "hp") {
            hpStat = stats[i].base_stat;
            $("#hp").html(hpStat);
        } else if (stats[i].stat.name == "attack") {
            attackStat = stats[i].base_stat;
            $("#attack").html(attackStat);
        } else if (stats[i].stat.name == "defense") {
            defenseStat = stats[i].base_stat;
            $("#defense").html(defenseStat);
        } else if (stats[i].stat.name == "special-attack") {
            spAStat = stats[i].base_stat;
            $("#spAttack").html(spAStat);
        } else if (stats[i].stat.name == "special-defense") {
            spDStat = stats[i].base_stat;
            $("#spDefense").html(spDStat);
        } else if (stats[i].stat.name == "speed") {
            speedStat = stats[i].base_stat;
            $("#speed").html(speedStat);
        } 
    }
    // Moves learnable by pokemon
    let moves = data.moves;
    for (let i = 0; i < moves.length; i++) {
        let moveName = capitalize(moves[i].move.name);
        let moveInfo = moves[i].move.url;
        let moveLearn = moves[i].version_group_details[0].move_learn_method.name;
        let moveLevel = moves[i].version_group_details[0].level_learned_at;
        var table = document.getElementById("lvlUp");
        clearTable(table);
        var table = document.getElementById("machine");
        clearTable(table);
        var table = document.getElementById("tutor");
        clearTable(table);
        $.get(moveInfo, function(moveData) {
            let moveType = capitalize(moveData.type.name);
            moveAddRow(moveLearn, moveName, moveType, moveLevel);
        });
    // Sprites of pokemon
    let sprites = data.sprites;
    let normalSprite = sprites.front_default;
    let shinySprite = sprites.front_shiny;
    document.getElementById("normal").src = sprites.front_default;
    document.getElementById("shiny").src = shinySprite;
    }

}

function moveAddRow(moveLearn, moveName, moveType, moveLevel) {
    if (moveLearn == "level-up") {
        var table = document.getElementById("lvlUp");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = moveLevel;
        cell2.innerHTML = moveType;
        cell3.innerHTML = moveName;
    } else if (moveLearn == "machine") {
        var table = document.getElementById("machine");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = moveType;
        cell2.innerHTML = moveName;
    } else if (moveLearn == "tutor") {
        var table = document.getElementById("tutor");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = moveType;
        cell2.innerHTML = moveName;
    }
}

function clearTable(table) {
    for(var i = 2;i<table.rows.length;){
        table.deleteRow(i);
    }
}

function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
        return true;
    else
        return false;
}

function submit() {
    document.getElementById("details").style.display = "block";
    document.getElementById('details').scrollIntoView();

    let url = "https://pokeapi.co/api/v2/pokemon";

    let pokeListURL = url + "?limit=100000&offset=0";
    let pokeList = [];

    // $.get(pokeListURL, function(data) {
    //     let results = data.results;
    //     for (let i = 0; i < 1010; i++) {
    //         pokeURL = results[i].url;
    //         pokeList.push("["+results[i].name+","+ pokeURL.slice(34,pokeURL.length-1)+"]");
    //     }
    //     document.getElementById("raw1").innerHTML = pokeList;
    // }); 

    let pokeName = $("#pokemonName").val();

    url = url + "/" + pokeName.toLowerCase();

    if (UrlExists(url) == true) {
        $.get(url, function(data, status) {
                document.getElementById("invalid").style.display = "none";
                details(data);
        }); 
    } else {
        document.getElementById("invalid").style.display = "block";
    }

}