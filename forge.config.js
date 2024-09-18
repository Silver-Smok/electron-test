require("dotenv").config();

module.exports = {
  packagerConfig: {
    asar: true,
    icon: "icons/logo",
    appBundleId: "com.silver-stock",
    name: "SilverStock",
    appCategoryType: "public.app-category.business",
    arch: [
      "x64", 
      "arm64"
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "icons/logo.icns",
        name: "SilverStock",
      },
    },
    {
      name: "@electron-forge/maker-zip",
    },
  ],
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
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
