## Chi-Yu Engine
# What does it do?
Chi-Yu Engine is a library that allows the easy access of the PokeAPI data used in [PokeSearch](https://pokemonsearch.github.io) and more importantly, the [Chi-Yu Game](https://pokemonsearch.github.io/chiyu).\
The main goal of this engine is to reduce the initial work required to create similar projects.
# Installation
The package can be installed through [Node Package Manager](https://www.npmjs.com/)
```console
npm install chiyu-engine
```
# Example (Node.js)
```javascript
const engine = require("../engine/data.js");
const nf = require('node-fetch');

engine.init(nf);
async function main()
{
    for(var i = 0; i < 6; i++)
    {
        var id;
        var data;
        
        do
        {
            id = engine.randomID();
            data = await engine.getPokemon(id);
        }
        while(((await engine.getForms(id)).length == 0));

        console.log(data.api.name+":",await engine.getForms(data.api.id));
    }
}

main();
```
Output:
```
graveler: [ 'alola' ]
eternatus: [ 'eternamax' ]
landorus-incarnate: [ 'therian' ]
flapple: [ 'gmax' ]
groudon: [ 'primal' ]
lapras: [ 'gmax' ]
```

