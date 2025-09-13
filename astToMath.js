function fullTranspileFinal(ast) {
  let { exp, residueFNs } = fullTranspile(ast);
  residueFNs.push(...stdSysLib);
  return {
    exp: `main(memory) = ${exp}`,
    residueFNs,
  };
}

function fullTranspile(ast) {
  if (typeof ast === "string") {
    return { exp: ast, residueFNs: [] };
  }

  let exp = "memory";
  let residueFNs = [];
  const statements = Array.isArray(ast) ? ast : ast.stats || [];

  for (let i = 0; i < statements.length; i++) {
    const r = fullUniNodeTranspile(statements[i], fullTranspile);

    if (r.exp && r.exp !== "memory") {
      exp = r.exp.replace(/memory/g, exp);
    }

    if (r.residueFNs && r.residueFNs.length > 0) {
      residueFNs.push(...r.residueFNs);
    }
  }

  residueFNs = [...new Set(residueFNs)];
  return { exp, residueFNs };
}

function fullUniNodeTranspile(node, fullTranspile) {
  switch (node.type) {
    case "var":
      return { exp: genVariableStore(node, fullTranspile), residueFNs: [] };
    case "condition":
      return genIfElse(node, fullTranspile);
    case "functionCall":
      return getfunctionCall(node, fullTranspile);
    case "function":
      return genFunction(node, fullTranspile);
    default:
      return { exp: "memory", residueFNs: [] };
  }
}

const stdSysLib = [];

function applyMathStepsSerial(steps) {
  let str = "memory";
  for (let i = steps.length - 1; i >= 0; i--) {
    const step =
      typeof steps[i] === "string"
        ? steps[i]
        : (steps[i] && steps[i].exp) || "memory";
    str = str.replaceAll("memory", `(${step})`);
  }
  return str;
}

function normalizeToTranspiled(obj, fullTranspile) {
  if (typeof obj === "string") {
    return { exp: obj, residueFNs: [] };
  }
  return fullTranspile(obj);
}

function genIfElse(node, fullTranspile) {
  //const condition = normalizeToTranspiled(node.condition, fullTranspile);
  const condition = node.condition.raw;
  const ifC = normalizeToTranspiled(node.if, fullTranspile);
  const elseC = normalizeToTranspiled(node.else, fullTranspile);
  return {
    exp: `if_condition(${condition}, ${ifC.exp}) + else_condition(${condition}, ${elseC.exp})`,
    residueFNs: [
      ...(condition.residueFNs || []),
      ...(ifC.residueFNs || []),
      ...(elseC.residueFNs || []),
    ],
  };
}

function genVariableStore(node, fullTranspile, applyArr = true, ll) {
  if (node.varType === "arr" && applyArr) {
    const steps = [];
    for (let i = 0; i < node.value.length; i++) {
      const elem = { ...node.value[i], address: node.address + i };
      let lladr = node.address + i + 1;
      if (i == node.value.length - 1) {
        lladr = node.address;
      }
      const step = genVariableStore(elem, fullTranspile, false, lladr);
      steps[i] = step;
    }
    return applyMathStepsSerial(steps);
  } else if (node.varType === "ptr" && !ll) {
    return `cellConstructorOnMemory(memory, ${node.address}, ${node.value}, -1)`;
  } else if (node.varType === "num" && !ll) {
    return `cellConstructorOnMemory(memory, ${node.address}, ${node.value}, 0)`;
  } else {
    const lastFlag = typeof ll === "number" ? ll : 0;
    const val = typeof node.value !== "undefined" ? node.value : 0;
    return `cellConstructorOnMemory(memory, ${node.address}, ${val}, ${lastFlag})`;
  }
}

function genFunction(node, fullTranspile) {
  let prams = node.params.join(",");
  if (node.params.length != 0) prams = "," + prams;
  const transpiledResult = fullTranspile(node.code, false);
  const fnExp = `${node.name}(memory ${prams}) = ${transpiledResult.exp}`;
  return {
    exp: "memory",
    residueFNs: [...(transpiledResult.residueFNs || []), fnExp],
  };
}

function getfunctionCall(node, fullTranspile) {
  let prams = "";
  if (node.params.length != 0) {
    let r = [];
    for (let i = 0; i < node.params.length; i++) {
      if (node.params[i].type === "number") {
        r[i] = node.params[i].value;
      } else if (node.params[i].type === "varName") {
        r[i] = node.params[i];
      } else {
        r[i] = node.params[i].value || node.params[i];
      }
    }
    prams = "," + r.join(",");
  }
  return {
    exp: `${node.name}(memory ${prams})`,
    residueFNs: [],
  };
}

function create(globalPipeLineMEM) {
  return {
    astToMath: function () {
      if (!globalPipeLineMEM.pipelineData.transformedAST) {
        console.warn(
          "transformedAST data is invalid",
          globalPipeLineMEM.pipelineData.transformedAST
        );
        return;
      }
      return fullTranspileFinal(globalPipeLineMEM.pipelineData.transformedAST);
    },
  };
}

module.exports = { create };
