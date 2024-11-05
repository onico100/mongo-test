import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PUBLIC_DB_CONNECTION:
      "mongodb+srv://odeyacopperman:D0P7tYHEgzueAPPq@cluster0.1rf5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  },
};

export default nextConfig;
