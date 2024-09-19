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
      config: {
        name: "SilverStock",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: (arch) => ({
        format: "ULFO",
        icon: "icons/logo.icns",
        name: arch === "x64" ? "SilverStock_x64" : "SilverStock_arm64",
      }),
    },
    {
      name: "@electron-forge/maker-zip",
    },
  ],
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
        assets: [
          "out/make/squirrel.windows/SilverStock.Setup.exe",
          "out/make/squirrel.windows/RELEASES",
          "out/multi-arch/SilverStock_x64.dmg",
          "out/multi-arch/SilverStock_arm64.dmg",
        ],
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
