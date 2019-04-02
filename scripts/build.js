let shell = require("shelljs");
// delete dist
shell.exec("rm -rf dist/*");
shell.exec("cp -R views dist/");
shell.exec("cp -R src/public dist/");
shell.exec("babel src -d dist");
