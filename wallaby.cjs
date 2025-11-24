module.exports = function () {
  return {
    autoDetect: ["node:test"],
    files: ["*.ts", "!*.spec.ts", "!*.test.ts"],
    tests: ["*.spec.ts", "*.test.ts"],
    env: { runner: "/opt/homebrew/bin/node" },
  };
};
