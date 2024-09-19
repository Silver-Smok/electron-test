require("dotenv").config();
const path = require("path");
const fs = require("fs");

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "icons/logo",
    appBundleId: "com.silver-stock",
    name: "SilverStock",
    appCategoryType: "public.app-category.business",
    arch: ["x64", "arm64"],
    out: "out/multi-arch",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {
        format: "ULFO",
        icon: "icons/logo.icns",
        name: "SilverStock",
      },
    },
    {
      name: "@electron-forge/maker-zip",
    },
  ],
  hooks: {
    postPackage: async (forgeConfig, options) => {
      const outputPath = options.outputPaths[0];

      console.log("Output Path:", outputPath);

      if (options.arch === "x64") {
        const newPath = path.join(
          path.dirname(outputPath),
          "SilverStock_x64.dmg"
        );
        fs.renameSync(outputPath, newPath);
        console.log(`Renamed DMG for x64: ${newPath}`);
      } else if (options.arch === "arm64") {
        const newPath = path.join(
          path.dirname(outputPath),
          "SilverStock_arm64.dmg"
        );
        fs.renameSync(outputPath, newPath);
        console.log(`Renamed DMG for arm64: ${newPath}`);
      }
    },
  },
  buildIdentifier: "multi-arch",
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Silver-Smok",
          name: "electron-test",
        },
        prerelease: false,
        draft: false,
      },
    },
  ],
  build: {
    win: {
      target: [
        {
          target: "squirrel",
          arch: ["x64"],
        },
      ],
    },
    mac: {
      target: [
        {
          target: "dmg",
          arch: ["x64", "arm64"],
        },
      ],
    },
  },
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
