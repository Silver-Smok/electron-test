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
    postMake: async (forgeConfig, options) => {
      options.forEach((option) => {
        const outputPath = option.artifacts[0];

        console.log("Output Path:", outputPath);

        if (option.arch === "x64") {
          const newPath = path.join(
            path.dirname(outputPath),
            "SilverStock_x64.dmg"
          );
          fs.copyFileSync(outputPath, newPath);
          console.log(`Copied DMG for x64: ${newPath}`);
        } else if (option.arch === "arm64") {
          const newPath = path.join(
            path.dirname(outputPath),
            "SilverStock_arm64.dmg"
          );
          fs.copyFileSync(outputPath, newPath);
          console.log(`Copied DMG for arm64: ${newPath}`);
        }
      });
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
          arch: ["x64"],
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
