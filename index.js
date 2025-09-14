// const tokenizer = require("./tokenizer");
const parser = require("./parser");
const astTransformer = require("./astTransformer");
const astToMath = require("./astToMath");
const algebricOptimizer = require("./algebricOptimizer");
const mathToCode = require("./mathToCode");

async function main(text) {
  const globalPipeLineMEM = {
    ready: { init: false },
    pipelineData: {
      rawText: text,
      // tokenized: [],
      parsed: [],
      transformedAST: [],
      transpiledMath: {},
      optimizedMath: {},
      code: {},
    },
    logs: [],
  };

  // const tokenizer_INS = await tokenizer.create(globalPipeLineMEM);
  const parser_INS = await parser.create(globalPipeLineMEM);
  const astTransformer_INS = await astTransformer.create(globalPipeLineMEM);
  const astToMath_INS = await astToMath.create(globalPipeLineMEM);
  const algebricOptimizer_INS = await algebricOptimizer.create(
    globalPipeLineMEM
  );
  const mathToCode_INS = await mathToCode.create(globalPipeLineMEM);

  globalPipeLineMEM.ready.init = true;

  // console.log(!!globalPipeLineMEM.pipelineData.rawText);

  // main code
  // globalPipeLineMEM.pipelineData.tokenized = tokenizer_INS.defaultTokenizer();
  globalPipeLineMEM.pipelineData.parsed = parser_INS.parse();
  // console.log(JSON.stringify(globalPipeLineMEM.pipelineData.parsed, null, 2));
  globalPipeLineMEM.pipelineData.transformedAST =
    astTransformer_INS.transformAST();
  globalPipeLineMEM.pipelineData.transpiledMath = astToMath_INS.astToMath();
  globalPipeLineMEM.pipelineData.optimizedMath =
    algebricOptimizer_INS.optimize();
  globalPipeLineMEM.pipelineData.code = mathToCode_INS.generateCode();
  console.log(globalPipeLineMEM);
  return globalPipeLineMEM;
}

// its a test - during dev time
main(`
 function a (b){
         var 2 = (mem(memory, 1) + 5);
         mem(memory,2);
     }
     var 1 = 100;
     var 1 = ( a(5) );
  `);
