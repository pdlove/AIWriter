import { CarpenterServer  } from "carpenter";
import * as stack from './index.js';
async function main(params) {
    const carpenter = new CarpenterServer();
    await carpenter.init({debugLevel: 2, singleUserMode: true, startReact: '/part/StoryWriter/App.jsx'});
    carpenter.addStack('StoryWriter', stack.modelList, stack.modelSeedOrder, stack.routes, stack.jobs, stack.publicPath, stack.componentPath);
    await carpenter.DatabaseInitialize();      
    carpenter.Start();
}

main();

