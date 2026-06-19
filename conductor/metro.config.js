const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, '..', 'shared');

const config = getDefaultConfig(projectRoot);

// Watch ONLY shared data (avoid scanning the whole monorepo, which can OOM Metro on Windows)
config.watchFolders = [sharedRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
config.resolver.unstable_enableSymlinks = true;
config.resolver.extraNodeModules = {
  '@shared': sharedRoot,
};

module.exports = config;
