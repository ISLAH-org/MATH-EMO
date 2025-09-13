function parse(tokens) {}

function create(globalPipeLineMEM) {
  return {
    parse: function () {
      if (!globalPipeLineMEM.pipelineData.tokenized) {
        console.warn(
          "tokenized data is invalid",
          globalPipeLineMEM.pipelineData.tokenized
        );
        return;
      }
      return parse(globalPipeLineMEM.pipelineData.tokenized);
    },
  };
}

module.exports = { create };
