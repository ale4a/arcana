import { defineChain } from "viem";

export const lisk = /*#__PURE__*/ defineChain({
  id: 1135,
  network: "lisk",
  name: "Lisk",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.lisk.com"],
    },
    public: {
      http: ["https://rpc.api.lisk.com"],
    },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://blockscout.lisk.com",
    },
    default: {
      name: "Blockscout",
      url: "https://blockscout.lisk.com",
    },
  },
  testnet: false,
});
