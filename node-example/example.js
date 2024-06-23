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
