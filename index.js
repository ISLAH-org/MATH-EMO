const tokenizer = require("./tokenizer");
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
      tokenized: [],
      parsed: [],
      transformedAST: [],
      transpiledMath: {},
      optimizedMath: {},
      code: {},
    },
    logs: [],
  };

  const tokenizer_INS = await tokenizer.create(globalPipeLineMEM);
  const parser_INS = await parser.create(globalPipeLineMEM);
  const astTransformer_INS = await astTransformer.create(globalPipeLineMEM);
  const astToMath_INS = await astToMath.create(globalPipeLineMEM);
  const algebricOptimizer_INS = await algebricOptimizer.create(
    globalPipeLineMEM
  );
  const mathToCode_INS = await mathToCode.create(globalPipeLineMEM);

  globalPipeLineMEM.ready.init = true;

  // main code
  pipelineData.tokenized = tokenizer_INS.defaultTokenizer();
  pipelineData.parsed = parser_INS.parse();
  pipelineData.transformedAST = astTransformer_INS.transformAST();
  pipelineData.transpiledMath = astToMath_INS.astToMath();
  pipelineData.optimizedMath = algebricOptimizer_INS.optimize();
  pipelineData.code = mathToCode_INS.toCode();

  return globalPipeLineMEM;
}

// its a test - during dev time
// main(``);
