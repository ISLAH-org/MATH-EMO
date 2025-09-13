function translateAST(ast) {
  let newAST = [];
  for (let i = 0; i < ast.length; i++) {
    switch (ast[i].type) {
      case "var":
        newAST[i] = handelVARta(ast[i]);
        break;
      case "functionCall":
        newAST[i] = handelFunctionCallta(ast[i]);
        break;
      case "if":
        newAST[i] = handelIfta(ast[i]);
        break;
      case "function":
        newAST[i] = handelFuncta(ast[i]);
        break;
      default:
        newAST[i] = ast[i];
    }
  }

  return newAST; // Return array directly
}

let variableCounter = 0;
const variableMap = new Map();

function getVariableAddress(name) {
  if (!variableMap.has(name)) {
    variableMap.set(name, variableCounter++);
  }
  return variableMap.get(name);
}

function handelVARta(ast) {
  let t = "num";
  if (ast.name.startsWith("ptr")) {
    t = "ptr";
  }

  let v;

  if (ast.value.type == "array") {
    t = "arr";
    v = [];
    for (let i = 0; i < ast.value.value.length; i++) {
      if (ast.value.value[i].type !== "number") {
        console.warn(
          `not a number in an array for ${ast.name} ignoring safely its value is ${ast.value.value[i].rawVal} at arr ${ast.value.rawVal} 1d numeric arrays are only allowed`
        );
        continue;
      }
      v[i] = {
        type: "num",
        value: ast.value.value[i].value,
      };
    }
  } else if (ast.value.type == "number") {
    v = ast.value.value;
  } else if (ast.value.type == "mathexpr") {
    v = ast.value.value;
    t = "expr";
  } else {
    v = ast.value;
  }

  return {
    type: "var",
    varType: t,
    name: ast.name,
    value: v,
    address: ast.name,
  };
}

function handelFunctionCallta(ast) {
  let processedParams = [];
  if (ast.prams && ast.prams.length > 0) {
    processedParams = ast.prams.map((param) => {
      if (typeof param === "object" && param.type) {
        return param;
      }
      return param;
    });
  }

  return {
    type: "functionCall",
    name: ast.callName,
    params: processedParams,
  };
}

function handelIfta(ast) {
  let condition = ast.condition;
  let ifBlock = translateAST(ast.code);
  let elseBlock = ast.else ? translateAST(ast.else) : null;

  return {
    type: "condition",
    condition: condition,
    if: { stats: ifBlock },
    else: elseBlock ? { stats: elseBlock } : { stats: [] },
  };
}

function handelFuncta(ast) {
  let translatedScope = translateAST(ast.scope);

  return {
    type: "function",
    name: ast.name || "anonymous",
    params: ast.prams || [],
    code: { stats: translatedScope },
  };
}

function create(globalPipeLineMEM) {
  return {
    transformAST: function () {
      if (!globalPipeLineMEM.pipelineData.parsed) {
        console.warn(
          "parsed data is invalid",
          globalPipeLineMEM.pipelineData.parsed
        );
        return;
      }
      return translateAST(globalPipeLineMEM.pipelineData.parsed);
    },
  };
}

module.exports = { create };
