const fs = require('fs');
const path = require('path');

const rootPackagePath = path.join(__dirname, 'package.json');
const libPackagePath = path.join(__dirname, 'projects', 'lib', 'package.json');

const rootPackageJson = require(rootPackagePath);
const childPackageJson = require(libPackagePath);

childPackageJson.version = rootPackageJson.version;
fs.writeFileSync(libPackagePath, JSON.stringify(childPackageJson, null, 2));

