require("dotenv").config();

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "icons/logo",
    appBundleId: "com.silver-stock",
    name: "SilverStock",
    appCategoryType: "public.app-category.business",
    arch: ["x64", "arm64"],
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
