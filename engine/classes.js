class Data
{
    constructor(json)
    {
        this.api = new Data.apiWrapper(json.api);
        this.species = new Data.speciesWrapper(json.species);
        this.evo = new Data.evoWrapper(json.evo);
        this.sprite = json.sprite;
        this.json = json;
    }
}

Data.apiWrapper = class {
    constructor(json)
    {
        this.abilities = json.abilities
        this.base_experience = json.base_experience
        this.cries = json.cries
        this.forms = json.forms
        this.game_indices = json.game_indices
        this.height = json.height
        this.held_items = json.held_items
        this.id = json.id
        this.is_default = json.is_default
        this.location_area_encounters = json.location_area_encounters
        this.moves = json.moves
        this.name = json.name
        this.order = json.order
        this.past_abilities = json.past_abilities
        this.past_types = json.past_types
        this.species = json.species
        this.sprites = json.sprites
        this.stats = json.stats
        this.types = json.types
        this.weight = json.weight
        this.json = json;
    }
}

Data.speciesWrapper = class {
    constructor(json)
    {
        this.base_happiness = json.base_happiness
        this.capture_rate = json.capture_rate
        this.color = json.color
        this.egg_groups = json.egg_groups
        this.evolution_chain = json.evolution_chain
        this.evolves_from_species = json.evolves_from_species
        this.flavor_text_entries = json.flavor_text_entries  
        this.form_descriptions = json.form_descriptions      
        this.forms_switchable = json.forms_switchable        
        this.gender_rate = json.gender_rate
        this.genera = json.genera
        this.generation = json.generation
        this.growth_rate = json.growth_rate
        this.habitat = json.habitat
        this.has_gender_differences = json.has_gender_differences
        this.hatch_counter = json.hatch_counter
        this.id = json.id
        this.is_baby = json.is_baby
        this.is_legendary = json.is_legendary
        this.is_mythical = json.is_mythical
        this.name = json.name
        this.names = json.names
        this.order = json.order
        this.pal_park_encounters = json.pal_park_encounters
        this.pokedex_numbers = json.pokedex_numbers
        this.shape = json.shape
        this.varieties = json.varieties
    }
}

Data.evoWrapper = class {
    constructor(json)
    {
        this.baby_trigger_item = json.baby_trigger_item
        this.chain = json.chain
        this.id = json.id
    }
}

module.exports = {Data};