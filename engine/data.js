//Functions for data that allows the user to get pokemonsearch data
const utils = require('./classes');

var MAX_PKMN = 1025;
var LOADING = 0;
var cache = {}
var loaded = 0;
var loadNext = 1;
var fetchHeader = "https://raw.githubusercontent.com/PokemonSearch/pokemonsearch.github.io/jsdex-light/public/";
var fetch;
var replaceName = {
    "deoxys-normal":"deoxys",
    "wormadam-plant":"wormadam",
    "giratina-altered":"giratina",
    "shaymin-land":"shaymin",
    "basculin-red-striped":"basculin",
    "darmanitan-standard":"darmanitan",
    "tornadus-incarnate":"tornadus",
    "thundurus-incarnate":"thundurus",
    "landorus-incarnate":"landorus",
    "keldeo-ordinary":"keldeo",
    "meloetta-aria":"meloetta",
    "meowstic-male":"meowstic",
    "aegislash-shield":"aegislash",
    "gourgeist-average":"gourgeist",
    "pumpkaboo-average":"pumpkaboo",
    "zygarde-50":"zygarde",
    "oricorio-baile":"oricorio",
    "lycanroc-midday":"lycanroc",
    "wishiwashi-solo":"wishiwashi",
    "minior-red-meteor":"minior",
    "mimikyu-disguised":"mimikyu",
    "toxtricity-amped":"toxtricity",
    "eiscue-ice":"eiscue",
    "morpeko-full-belly":"morpeko",
    "indeedee-male":"indeedee",
    "urshifu-single-strike":"urshifu",
    "basculegion-male":"basculegion",
    "enamorus-incarnate":"enamorus"};

function init(fetchObj)
{
    fetch = fetchObj;
}

async function loadAllData(maxSimulLoading = 20)
{
    while(loaded < MAX_PKMN)
    {
        if(LOADING < maxSimulLoading && loadNext <= MAX_PKMN)
        {
            loadPokemonInSequence(loadNext);
        }
        await new Promise(r => setTimeout(r, 1));
    }
}

function inCache(natdexID, form=null)
{
    if(form == null)
    {
        form = "base";
    }
    if( Object.keys(cache).includes(natdexID.toString()))
    {
        return Object.keys(cache[natdexID]).includes(form);
    }
    return false;
}

async function getPokemon(natdexID, formName = null)
{
    var form = "base";
    if(formName != null)
    {
        form = formName;
    }
    if(inCache(natdexID, form))
    {
        return new utils.Data(cache[natdexID][form]);
    }
    else
    {
        await loadPokemonData(natdexID, formName);
        return getPokemon(natdexID, formName);
    }
}

function getItemSprite(itemName)
{
    return fetchHeader+"data/items/sprites"+itemName+"/"+itemName+".png";
}

async function loadPokemonData(natdexID, formName = null) //load the data for a pokemon through their corrosponding national dex data -> natdexID: national dex number for the pokemon, form: string name for the pokemon
{
    
    var api_data;
    var spec_data = await fetch(fetchHeader+"data/api/"+natdexID+"/species.json").then((response) => response.json());
    var evo_data = await fetch(fetchHeader+"data/api/"+natdexID+"/evo.json").then((response) => response.json());
    var sprite;
    var form;
    if(formName == null)
    {
        api_data = await fetch(fetchHeader+"data/api/"+natdexID+"/api.json").then((response) => response.json());
        sprite = fetchHeader+"data/sprites/"+natdexID+"/front_default.png";
    }
    else
    {
        form = formName.toLowerCase();
        api_data = await fetch(fetchHeader+"data/api/"+natdexID+"/"+form+"/api.json").then((response) => response.json());
        sprite = fetchHeader+"data/sprites/"+natdexID+"/"+form+"/front_default.png";
    }
    if(cache[natdexID] == null)
    {
        cache[natdexID] = {}
    }

    if(formName == null)
    {
        cache[natdexID]["base"] = {api:api_data,species:spec_data,sprite:sprite,evo:evo_data};
    }
    else
    {
        cache[natdexID][form] = {api:api_data,species:spec_data,sprite:sprite,evo:evo_data};
    }
}

async function getForms(natdexID)
{
    var data = await getPokemon(natdexID);
    var forms = data.species.varieties;
    var formList = [];
    var baseName = forms[0].pokemon.name;
    if(replaceName[baseName] != null)
    {
        baseName = replaceName[baseName];
    }
    for(var i = 0; i < forms.length; i++)
    {
        var formData = forms[i];
        if(formData.is_default)
        {
            continue;
        }
        var formName = formData.pokemon.name;
        formName = formName.replaceAll(baseName+"-","");
        formList.push(formName);
    }
    return formList;
}

async function loadPokemonInSequence(natdexID)
{
    loadNext++;
    LOADING++;
    await loadPokemonData(natdexID, null);
    var data = cache[natdexID]["base"];
    var forms = data.species.varieties;
    var baseName = forms[0].pokemon.name;
    try
    {
    if(replaceName[baseName] != null)
    {
        baseName = replaceName[baseName];
    }
    for(var i = 0; i < forms.length; i++)
    {
        var formData = forms[i];
        if(formData.is_default)
        {
            continue;
        }
        var formName = formData.pokemon.name;
        formName = formName.replaceAll(baseName+"-","");
        await loadPokemonData(natdexID, formName);
    }
    loaded++;
    LOADING--;
    }
    catch
    {

    }
}

function randomID()
{
    return Math.round(1 + Math.random()*(MAX_PKMN - 1));
}


module.exports = {cache,init,loadPokemonData,loadAllData, getPokemon, getForms, getItemSprite, randomID, MAX_PKMN};