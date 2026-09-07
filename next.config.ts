import type { NextConfig } from "next";

const PUBLIC_INSTALLER_ORIGIN =
  "https://github.com/Triko-Dude/smart-calendar-marketing/releases/latest/download";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/downloads/Chronocal-Windows-setup.exe",
        destination: `${PUBLIC_INSTALLER_ORIGIN}/Chronocal-Windows-setup.exe`,
        permanent: false,
      },
      {
        source: "/downloads/:file.exe",
        destination: `${PUBLIC_INSTALLER_ORIGIN}/:file.exe`,
        permanent: false,
      },
      {
        source: "/downloads/:file.msi",
        destination: `${PUBLIC_INSTALLER_ORIGIN}/:file.msi`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
