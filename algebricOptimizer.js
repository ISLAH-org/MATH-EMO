function optimize() {}

function create(globalPipeLineMEM) {
  return {
    optimize: function () {
      if (!globalPipeLineMEM.pipelineData.transpiledMath) {
        console.warn(
          "transpiled data is invalid",
          globalPipeLineMEM.pipelineData.transpiledMath
        );
        return;
      }
      return optimize(globalPipeLineMEM.pipelineData.transpiledMath);
    },
  };
}

module.exports = { create };
