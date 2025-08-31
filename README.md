# 🏛️ Arcana Vault

**A sophisticated ERC4626 vault with pluggable investment strategies for Lisk DeFi yield optimization**

Arcana is a yield aggregator built for the Lisk ecosystem that allows users to deposit Lisk tokens and automatically deploy them across multiple Lisk DeFi protocols through a unified interface. Built with security, efficiency, and composability in mind for the Lisk community.

## Aleph Hackaton

- Verified Lisk Mainnet Contract: [Arcana](https://blockscout.lisk.com/address/0x22EC63533e99f6CEf08DEBa30cf67cd9982cb2E2)

## 🎯 Use Cases

- **Lisk Yield Farming**: Automatically deploy Lisk capital across multiple yield-generating protocols
- **Risk Management**: Diversify exposure across different Lisk DeFi strategies
- **Capital Efficiency**: Optimize returns through intelligent rebalancing of Lisk assets
- **Simplified Lisk DeFi**: Single interface for multiple Lisk protocol interactions
- **Institutional Lisk DeFi**: Professional-grade vault for large Lisk capital deployment

## 🚀 Key Features

### ✨ ERC4626 Compliance
- Standard tokenized vault interface
- Seamless integration with DeFi protocols
- Predictable share calculation and redemption

### 🔌 Pluggable Lisk Strategies
- **MorphoStrategy**: Integration with Morpho MetaMorpho vaults on Lisk
- **RasaStrategy**: Integration with Aave-like lending pools on Lisk
- Easy to add new Lisk ecosystem strategies through the `IInvestStrategy` interface

### ⚖️ Dynamic Rebalancing
- Move Lisk assets between strategies based on market conditions
- Optimize for highest yields across Lisk protocols
- Maintain risk-adjusted returns for Lisk token holders

### 🛡️ Security Features
- Owner-controlled strategy management
- Emergency withdrawal capabilities
- Comprehensive testing suite

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Assets   │───▶│  Arcana Vault   │───▶│   Strategies    │
│                 │    │   (ERC4626)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  Rebalancing    │    │  Yield Sources  │
                       │   Engine        │    │                 │
                       └─────────────────┘    └─────────────────┘
```

## 📊 Lisk Strategy Details

### 🦋 MorphoStrategy (Lisk Ecosystem)
- **Protocol**: Morpho MetaMorpho vaults on Lisk
- **Yield Source**: Lisk lending and borrowing optimization
- **Risk Profile**: Medium (diversified Lisk lending positions)
- **Key Features**: 
  - Automated Lisk position management
  - Gas-efficient Lisk operations
  - Real-time Lisk yield optimization

### 🌊 RasaStrategy (Lisk Ecosystem)
- **Protocol**: Aave-like lending pools on Lisk
- **Yield Source**: Lisk supply-side lending rewards
- **Risk Profile**: Low (collateralized Lisk lending)
- **Key Features**:
  - Stable Lisk lending yields
  - Liquid Lisk collateral
  - Proven Lisk protocol security

## 🛠️ Development

### Prerequisites
- Scaffold-ETH 2
- Hardhat (latest version)
- Node.js 22+
- Git

### Installation
```bash
git clone <repository-url>
cd arcana
npm install
cd packages/hardhat
```

### Build
```bash
npx hardhat compile
```

### Test
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Arcana.test.js

# Run with verbose output
npx hardhat test --verbose
```

### Deploy
```bash
# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

## 📈 Lisk Usage Examples

### Basic Lisk Deposit
```javascript
// Approve Lisk tokens
await liskToken.approve(arcana.address, amount);

// Deposit Lisk and receive vault shares
const shares = await arcana.deposit(amount, receiver);
```

### Lisk Strategy Rebalancing
```javascript
// Move 1000 Lisk tokens from Morpho (index 0) to Rasa (index 1)
await arcana.rebalance(0, 1, ethers.utils.parseEther("1000"));
```

### Lisk Withdrawal
```javascript
// Withdraw Lisk assets by burning shares
const liskAssets = await arcana.withdraw(shares, receiver, owner);
```

### Lisk Frontend Integration
```typescript
// Using wagmi hooks for Lisk integration
const { writeAsync: depositAsync } = useScaffoldContractWrite({
  contractName: "Arcana",
  functionName: "deposit",
  args: [amount, address],
});

// Lisk deposit function
const handleLiskDeposit = async (amount: string) => {
  const amountInWei = parseEther(amount);
  await depositAsync({ args: [amountInWei, address] });
};
```

## 🔍 Testing

The project includes comprehensive tests covering:

- ✅ Lisk vault deposit/withdraw functionality
- ✅ Lisk strategy integration (Morpho & Rasa)
- ✅ Lisk rebalancing operations
- ✅ Edge cases and error conditions for Lisk operations
- ✅ Mock Lisk contract interactions

### Test Structure
```
packages/hardhat/test/
├── Arcana.test.t.sol            # Unit tests for vault functionality
├── ArcanaIntegration.test.sol # Integration tests with real protocols
└── mocks/
    ├── MockToken.sol         # ERC20 token for testing
    ├── MockMorphoVault.sol   # Morpho vault simulation
    └── MockRasaPool.sol      # Rasa pool simulation
```

## 🔧 Configuration

### Lisk Strategy Parameters
- **MorphoStrategy**: Requires Morpho vault address and Lisk token
- **RasaStrategy**: Requires Rasa pool address and Lisk token
- **Rebalancing**: Owner-controlled with configurable thresholds for Lisk assets

### Gas Optimization
- Efficient batch operations
- Minimal external calls
- Optimized storage patterns

## 🚨 Security Considerations

- **Access Control**: Owner-only Lisk strategy management
- **Reentrancy Protection**: Standard OpenZeppelin patterns for Lisk operations
- **Slippage Protection**: Configurable limits for large Lisk operations
- **Emergency Functions**: Quick Lisk withdrawal capabilities

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: Inline code comments and this README

---

**Built with ❤️ for the Lisk community**
