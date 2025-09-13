function generateCode(mathCode) {}

function create(globalPipeLineMEM) {
  return {
    generateCode: function () {
      if (!globalPipeLineMEM.pipelineData.optimizedMath) {
        console.warn(
          "optimizedMATH data is invalid",
          globalPipeLineMEM.pipelineData.optimizedMath
        );
        return;
      }
      return generateCode(globalPipeLineMEM.pipelineData.optimizedMath);
    },
  };
}

module.exports = { create };
