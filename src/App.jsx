import { useState } from "react";

const sections = [
  { id: "blockchain", label: "⛓ Blockchain", icon: "⛓" },
  { id: "crypto", label: "🪙 Crypto Basics", icon: "🪙" },
  { id: "trading", label: "📈 Trading", icon: "📈" },
  { id: "defi", label: "🏦 DeFi", icon: "🏦" },
  { id: "web3dev", label: "🛠 Web3 Dev", icon: "🛠" },
  { id: "solidity", label: "📜 Solidity", icon: "📜" },
  { id: "tools", label: "🔧 Tools & APIs", icon: "🔧" },
  { id: "roadmap", label: "🗺 Roadmap", icon: "🗺" },
];

const content = {
  blockchain: {
    title: "Blockchain Fundamentals",
    subtitle: "The foundation everything else is built on",
    color: "#00d4ff",
    cards: [
      {
        title: "What is a Blockchain?",
        tag: "CORE CONCEPT",
        body: `A blockchain is a distributed ledger — a database replicated across thousands of nodes. Each block contains:
• A list of transactions
• A hash of the previous block (creating the "chain")
• A nonce (used in mining/PoW)
• A timestamp

Changing any block would invalidate all subsequent blocks AND require consensus from the network — making tampering computationally impossible.`,
      },
      {
        title: "Consensus Mechanisms",
        tag: "HOW AGREEMENT WORKS",
        body: `**Proof of Work (PoW)** — Bitcoin's model. Miners compete to solve a cryptographic puzzle. Winner adds the block & earns the reward. Energy-intensive but battle-tested.

**Proof of Stake (PoS)** — Ethereum's current model (post-Merge). Validators lock up (stake) ETH as collateral. Chosen pseudo-randomly to propose blocks. Much more energy-efficient.

**Delegated PoS (DPoS)** — Used by chains like EOS & Tron. Token holders vote for delegates who validate. Faster but more centralized.`,
      },
      {
        title: "Hash Functions & Merkle Trees",
        tag: "CRYPTOGRAPHY",
        body: `**SHA-256** (Bitcoin) & **Keccak-256** (Ethereum) are the core hash functions. They're deterministic, one-way, and collision-resistant.

**Merkle Trees** allow efficient verification of transaction inclusion:
→ Each transaction is hashed
→ Pairs of hashes are combined and hashed again
→ This continues up to a single "Merkle Root" stored in the block header

This means you can verify a single transaction exists in a block WITHOUT downloading all transactions — critical for light clients (SPV nodes).`,
      },
      {
        title: "Public vs Private Chains",
        tag: "NETWORK TYPES",
        body: `**Public** — Permissionless, open, decentralized. Anyone can read/write. (Bitcoin, Ethereum, Solana)

**Private** — Permissioned, usually enterprise. Central authority controls who participates. (Hyperledger Fabric)

**Consortium** — Semi-decentralized. A group of organizations share control. (R3 Corda)

**Layer 2s** — Built on top of L1s to scale. Inherit security from the base chain. (Arbitrum, Optimism, Base, zkSync)`,
      },
      {
        title: "Accounts & State",
        tag: "ETHEREUM MODEL",
        body: `Ethereum is a state machine. The global state is a mapping of addresses → account states.

**Two account types:**
• **Externally Owned Accounts (EOAs)** — Controlled by a private key. No code. Can initiate transactions.
• **Contract Accounts** — Has code. Triggered by transactions. Cannot initiate.

**Account state contains:**
• nonce (tx count)
• balance (ETH)
• storageRoot (contract data)
• codeHash (contract bytecode)`,
      },
      {
        title: "The EVM",
        tag: "ETHEREUM VIRTUAL MACHINE",
        body: `The EVM is the sandboxed runtime for smart contracts. It's deterministic — every node must reach the same result for the same input.

**Key concepts:**
• **Stack-based** architecture (not register-based)
• **Opcodes** — Low-level instructions (ADD, MSTORE, CALL, etc.)
• **Gas** — Each opcode costs gas. Prevents infinite loops and compensates validators.
• **Memory** — Temporary, cleared after execution
• **Storage** — Persistent on-chain data. Expensive (SSTORE is one of the costliest opcodes)`,
      },
    ],
  },

  crypto: {
    title: "Crypto Basics",
    subtitle: "Wallets, keys, transactions — the plumbing every dev must know",
    color: "#f7931a",
    cards: [
      {
        title: "Public/Private Key Cryptography",
        tag: "CRYPTOGRAPHY",
        body: `Your identity in crypto is a keypair:

**Private Key** — A random 256-bit number. NEVER share this. This IS your wallet.
**Public Key** — Derived from private key using elliptic curve multiplication (secp256k1). Deterministic but irreversible.
**Address** — Last 20 bytes of Keccak-256 hash of the public key. This is what you share.

\`\`\`
Private Key → (secp256k1) → Public Key → (Keccak-256 + slice) → Address
\`\`\`

Ethereum uses ECDSA (Elliptic Curve Digital Signature Algorithm) for signing transactions.`,
      },
      {
        title: "Seed Phrases & HD Wallets",
        tag: "KEY MANAGEMENT",
        body: `Modern wallets use BIP-39 mnemonic phrases (12 or 24 words) as a human-readable backup of entropy.

**Derivation path:** BIP-44 standard
\`\`\`
m / purpose' / coin' / account' / change / index
m/44'/60'/0'/0/0  ← First Ethereum address
m/44'/60'/0'/0/1  ← Second address
\`\`\`

This means one seed phrase generates unlimited keypairs — all recoverable from the same 12 words. The entropy → mnemonic → seed → HD wallet tree chain is deterministic.

As a dev: **never hardcode private keys**. Use env vars + .env in gitignore.`,
      },
      {
        title: "Transactions Deep Dive",
        tag: "HOW TXs WORK",
        body: `An Ethereum transaction contains:
• **nonce** — Prevents replay attacks. Sequentially incremented per address.
• **to** — Recipient address (or null for contract deployment)
• **value** — ETH amount in wei (1 ETH = 10^18 wei)
• **data** — ABI-encoded function call for contracts
• **gasLimit** — Max gas you authorize
• **maxFeePerGas** — Max you'll pay per gas (EIP-1559)
• **maxPriorityFeePerGas** — Tip to validator
• **v, r, s** — ECDSA signature components

**Lifecycle:** signed → broadcast → mempool → included in block → finalized`,
      },
      {
        title: "Gas & EIP-1559",
        tag: "FEES",
        body: `Pre-EIP-1559: simple gasPrice auction — you just bid.

**EIP-1559 (London upgrade):**
• **Base Fee** — Protocol-set, burned (🔥 deflationary). Adjusts based on block fullness.
• **Priority Fee (tip)** — Goes to the validator. Incentivizes inclusion.
• **Max Fee** — Cap you set. Overage refunded.

\`\`\`
Total cost = gasUsed × (baseFee + priorityFee)
\`\`\`

For devs: always set reasonable gasLimit. Use eth_estimateGas. Watch for gasLimit vs gasPrice confusion (limit = units, price = cost per unit).`,
      },
      {
        title: "Token Standards",
        tag: "ERC STANDARDS",
        body: `**ERC-20** — Fungible tokens. The backbone of DeFi. Every USDC, WETH, UNI is ERC-20.
Key functions: transfer, approve, transferFrom, balanceOf, allowance

**ERC-721** — Non-fungible tokens (NFTs). Each token has a unique ID.
Key functions: ownerOf, transferFrom, tokenURI

**ERC-1155** — Multi-token standard. A single contract can handle both fungible & NFTs. Gas efficient for batch transfers.

**ERC-4626** — Tokenized Vault Standard. Standardizes yield-bearing vaults in DeFi.

As a dev: study the interfaces carefully. Approvals (ERC-20) are a major UX pain point and a major attack surface.`,
      },
      {
        title: "Signing & Verification",
        tag: "AUTHENTICATION",
        body: `Signing is how wallets prove identity without revealing private keys.

**eth_sign / personal_sign** — Signs arbitrary data. Used in "Sign in with Ethereum" (SIWE).
**EIP-712** — Typed structured data signing. Human-readable in wallet UI. Used by Uniswap permits, OpenSea, etc.

\`\`\`js
// ethers.js example
const message = "Welcome to MyApp!";
const signature = await signer.signMessage(message);
const recoveredAddr = ethers.verifyMessage(message, signature);
// recoveredAddr === signer.address → authenticated!
\`\`\`

This powers wallet-based auth — no passwords, no backend user storage needed.`,
      },
    ],
  },

  trading: {
    title: "Trading & Markets",
    subtitle: "How crypto markets work, and how to think about price",
    color: "#00ff88",
    cards: [
      {
        title: "CEX vs DEX",
        tag: "MARKET TYPES",
        body: `**Centralized Exchange (CEX)** — Binance, Coinbase, Kraken
• Order book model: bids & asks matched by exchange engine
• You don't hold your keys ("not your keys, not your coins")
• Fast, liquid, regulated
• KYC/AML required
• Custodial risk (FTX collapse)

**Decentralized Exchange (DEX)** — Uniswap, Curve, dYdX
• Non-custodial: you trade from your own wallet
• Smart contract execution
• Permissionless — no KYC
• On-chain transparency
• Slower, sometimes less liquid, gas costs`,
      },
      {
        title: "AMM: Automated Market Makers",
        tag: "HOW DEXes WORK",
        body: `AMMs replace order books with liquidity pools. The price is set by a mathematical formula.

**Uniswap v2 — Constant Product Formula:**
\`\`\`
x * y = k
\`\`\`
Where x = token A reserves, y = token B reserves, k = constant.

When you buy token A, you add token B to the pool → x decreases, y increases → price of A goes up.

**Slippage** — Larger trades move the price more. Set a slippage tolerance (0.5%-1% typical).

**Price Impact** — The % the trade shifts the price. Critical to show in UIs.

Uniswap v3 introduced **concentrated liquidity** — LPs provide liquidity in custom price ranges, dramatically improving capital efficiency.`,
      },
      {
        title: "Order Books & Order Types",
        tag: "CEX TRADING",
        body: `**Market Order** — Buy/sell immediately at best available price. Always fills but price varies.

**Limit Order** — Set a specific price. Fills only when market hits that price.

**Stop Loss** — Sell automatically if price drops to X. Risk management.

**Stop Limit** — Stop loss that becomes a limit order when triggered.

**Order Book Structure:**
• Bids — buy orders sorted by price descending
• Asks — sell orders sorted by price ascending
• Spread — difference between best bid and best ask
• Depth — how much volume at each price level

As a dev building trading tools: WebSocket order book data from exchange APIs is your bread and butter.`,
      },
      {
        title: "Technical Analysis Essentials",
        tag: "PRICE ANALYSIS",
        body: `**Key indicators:**
• **Moving Averages (MA/EMA)** — Smooth price data to identify trends. Golden cross (50MA > 200MA) = bullish signal.
• **RSI (Relative Strength Index)** — 0-100 oscillator. >70 = overbought, <30 = oversold.
• **MACD** — Momentum indicator. Signal line crossovers = potential entries.
• **Bollinger Bands** — Price volatility bands. Squeeze = low volatility = potential breakout.
• **Volume** — Confirms moves. Price up + volume up = strong signal.

**Candlestick patterns:** Doji, Hammer, Engulfing, Evening Star.

As a dev: TradingView's Lightweight Charts library is the go-to for building charting UIs.`,
      },
      {
        title: "Market Concepts",
        tag: "VOCABULARY",
        body: `**Spot** — Buy/sell the actual asset for immediate delivery.
**Futures** — Agreement to buy/sell at a future date at an agreed price. Can be leveraged.
**Perpetuals (Perps)** — Futures with no expiry. Most popular crypto derivative. Funded by a funding rate between longs and shorts.
**Leverage** — Amplify position size using borrowed capital. 10x leverage = 10% move = 100% gain/loss.
**Liquidation** — When leveraged position moves against you enough, exchange closes it automatically.
**Funding Rate** — Periodic payment between perp longs & shorts to keep price near spot.
**Open Interest** — Total value of outstanding contracts. Rising OI + rising price = bullish.`,
      },
      {
        title: "On-Chain Data & Edge",
        tag: "DATA ADVANTAGE",
        body: `Unlike stocks, crypto gives you radical transparency. On-chain data is public:

**Useful signals:**
• **Exchange inflows/outflows** — Large inflows to CEX may signal selling pressure.
• **Whale wallets** — Track large holders on Etherscan or Nansen.
• **Liquidation levels** — Coinalyze/Hyblock show where leveraged positions will get liquidated.
• **Funding rates** — Extreme positive = overleveraged longs = potential short squeeze.
• **SOPR (Spent Output Profit Ratio)** — Are holders selling at profit or loss?
• **Gas fees** — High gas = high network activity = potential price movement.

Tools: Glassnode, Nansen, Dune Analytics, The Graph.`,
      },
    ],
  },

  defi: {
    title: "DeFi — Decentralized Finance",
    subtitle: "The financial system rebuilt in smart contracts",
    color: "#a855f7",
    cards: [
      {
        title: "DeFi Stack",
        tag: "ARCHITECTURE",
        body: `DeFi is composable — protocols stack on top of each other like money Legos.

**Layer 1: Settlement** — Ethereum, Solana, Avalanche
**Layer 2: Assets** — ETH, stablecoins (USDC, DAI), wrapped tokens (WBTC)
**Layer 3: Protocols:**
• **DEXes** — Uniswap, Curve, Balancer
• **Lending** — Aave, Compound, Morpho
• **Stablecoins** — MakerDAO (DAI), Frax, crvUSD
• **Derivatives** — dYdX, GMX, Synthetix
• **Yield** — Yearn, Convex, Pendle
**Layer 4: Aggregators** — 1inch, ParaSwap, Beefy`,
      },
      {
        title: "Liquidity Providing (LP)",
        tag: "EARNING YIELD",
        body: `LPs deposit token pairs into AMM pools and earn trading fees.

**Example:** Deposit $1000 USDC + $1000 ETH into Uniswap ETH/USDC pool
→ Receive LP tokens representing your share
→ Earn % of every swap fee in that pool

**Impermanent Loss (IL)** — The real risk for LPs. If token prices diverge significantly from when you deposited, you'd have been better off just holding. IL is "impermanent" — it reverses if prices return to entry.

\`\`\`
IL increases as price ratio diverges from 1:1 initial ratio
2x price move → ~5.7% IL
4x price move → ~20% IL
\`\`\`

Stablecoin pairs (USDC/USDT) have near-zero IL.`,
      },
      {
        title: "Lending & Borrowing",
        tag: "AAVE / COMPOUND",
        body: `**Supply side:** Deposit tokens → earn interest (from borrowers) → receive aTokens/cTokens that accrue yield.

**Borrow side:** Deposit collateral → borrow up to your collateral factor (e.g., 75% for ETH).

**Health Factor (Aave):**
\`\`\`
HF = (collateral × liquidation threshold) / borrowed value
HF < 1 → liquidation
\`\`\`

**Use cases:**
• Leverage: Deposit ETH → borrow USDC → buy more ETH → repeat
• Shorting: Borrow an asset → sell → buy back cheaper → repay
• Liquidity without selling: Get stablecoin liquidity while keeping ETH exposure`,
      },
      {
        title: "Flash Loans",
        tag: "ADVANCED",
        body: `Borrow any amount of any asset with ZERO collateral, as long as it's repaid in the SAME transaction.

If the loan isn't repaid, the entire transaction reverts as if it never happened.

**Use cases:**
• Arbitrage — Exploit price differences across DEXes
• Liquidations — Borrow to liquidate, earn fee, repay loan
• Collateral swaps — Swap collateral in lending protocols atomically
• Self-liquidation — Repay your own loan with borrowed funds

\`\`\`solidity
// Aave flash loan
function executeOperation(address asset, uint256 amount, 
  uint256 premium, ...) external {
  // 1. Do your arbitrage/operation
  // 2. Repay amount + premium
  IERC20(asset).approve(POOL, amount + premium);
  return true;
}
\`\`\``,
      },
      {
        title: "MEV — Maximal Extractable Value",
        tag: "THE DARK FOREST",
        body: `MEV is profit extracted by reordering, inserting, or censoring transactions within a block.

**Types:**
• **Arbitrage** — Sandwich profitable AMM price discrepancies
• **Sandwich Attack** — Front-run + back-run a victim's large swap. Buy before them → price goes up → they buy at worse price → you sell into their buy.
• **Liquidations** — Race to liquidate undercollateralized positions first.
• **JIT Liquidity** — Just-in-time LP: add liquidity just before a large swap, earn fees, immediately remove.

**MEV Supply Chain:** Searchers → Builders → Validators (via MEV-Boost / PBS)

**Why devs care:** Your users can be sandwiched. Implement slippage protection. Private mempools (Flashbots Protect) route transactions to block builders directly, avoiding public mempool.`,
      },
      {
        title: "Bridges & Cross-Chain",
        tag: "INTEROPERABILITY",
        body: `Moving assets between chains requires bridges.

**Lock & Mint bridges:** Lock token on Chain A → mint wrapped version on Chain B. (Wormhole, Multichain)

**Liquidity-based bridges:** Use liquidity pools on each chain. (Across, Hop Protocol)

**Native bridges:** Official bridges from L2 teams. Most secure but slowest (7-day Optimistic rollup challenge period).

**Bridge risks:**
• Smart contract exploits (Ronin bridge $625M hack, Wormhole $320M)
• Validator set compromise
• Liquidity constraints

As a dev building cross-chain: use **LayerZero** or **CCIP (Chainlink)** for cross-chain messaging. Consider using Across or Stargate for asset bridging in your UIs.`,
      },
    ],
  },

  web3dev: {
    title: "Web3 Development",
    subtitle: "The libraries, patterns, and architecture for dApp development",
    color: "#ff6b35",
    cards: [
      {
        title: "The Web3 Stack",
        tag: "ARCHITECTURE",
        body: `\`\`\`
Frontend (React/Next.js)
    ↓
Web3 Library (viem / ethers.js)
    ↓
Wallet Connection (wagmi + ConnectKit/RainbowKit)
    ↓
RPC Provider (Alchemy / Infura / Public RPC)
    ↓
Blockchain (Ethereum / Arbitrum / Base / etc.)
    ↑
Indexing (The Graph / Alchemy Subgraphs)
    ↑
Contract Events & Logs
\`\`\`

**Recommended modern stack:**
• viem (low-level, TypeScript-first)
• wagmi v2 (React hooks for viem)
• ConnectKit or RainbowKit (wallet connection UI)
• Alchemy for RPC + indexing
• Foundry for smart contract dev`,
      },
      {
        title: "viem & ethers.js",
        tag: "WEB3 LIBRARIES",
        body: `**ethers.js** — The classic. v5 widely used, v6 breaking changes. Larger bundle.
\`\`\`ts
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(address, abi, provider);
const balance = await contract.balanceOf(userAddress);
\`\`\`

**viem** — Modern, TypeScript-native, tree-shakeable, modular. The future.
\`\`\`ts
const client = createPublicClient({ chain: mainnet, transport: http() });
const balance = await client.readContract({
  address, abi, functionName: 'balanceOf', args: [userAddress]
});
\`\`\`

viem is strictly typed from ABI — TypeScript knows the return type of readContract based on the ABI. This is a game-changer for dApp reliability.`,
      },
      {
        title: "wagmi — React Hooks for Ethereum",
        tag: "REACT INTEGRATION",
        body: `wagmi wraps viem with React hooks for data fetching, caching, and wallet state.

\`\`\`tsx
// Connect wallet
const { address, isConnected } = useAccount();

// Read contract
const { data: balance } = useReadContract({
  address: TOKEN_ADDRESS,
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [address],
});

// Write (send tx)
const { writeContract } = useWriteContract();
writeContract({
  address: TOKEN_ADDRESS,
  abi: erc20Abi,
  functionName: 'transfer',
  args: [recipient, amount],
});
\`\`\`

wagmi handles caching, re-fetching, loading/error states automatically.`,
      },
      {
        title: "ABI & Contract Interaction",
        tag: "CRITICAL CONCEPT",
        body: `ABI (Application Binary Interface) is the JSON schema of a smart contract's functions and events.

\`\`\`json
{
  "name": "transfer",
  "type": "function",
  "inputs": [
    {"name": "to", "type": "address"},
    {"name": "amount", "type": "uint256"}
  ],
  "outputs": [{"type": "bool"}]
}
\`\`\`

**How calls work:**
1. Encode function selector: first 4 bytes of Keccak-256 of "transfer(address,uint256)"
2. ABI-encode the arguments
3. Send as transaction data field

**Tools:** Etherscan → Contract → Read/Write (auto-generates UI from ABI). Get ABIs from Etherscan or compile from source.

Always use ABIs from verified contracts or compile yourself — never trust random ABIs.`,
      },
      {
        title: "Events & Indexing",
        tag: "DATA LAYER",
        body: `Smart contracts emit events when state changes. Events are stored in transaction receipts (logs), NOT in contract storage — they're much cheaper.

\`\`\`solidity
event Transfer(address indexed from, address indexed to, uint256 value);
emit Transfer(msg.sender, recipient, amount);
\`\`\`

**Indexed parameters** — Up to 3. Creates a "topic" — allows efficient filtering.

**Reading events:**
\`\`\`ts
// viem: get historical Transfer events
const logs = await client.getLogs({
  address: TOKEN_ADDRESS,
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  fromBlock: 0n, toBlock: 'latest'
});
\`\`\`

**The Graph** — Index events into a GraphQL API for complex queries. Essential for DeFi dashboards.`,
      },
      {
        title: "IPFS & Decentralized Storage",
        tag: "STORAGE",
        body: `Storing large data on-chain is expensive. Use decentralized storage for media, metadata.

**IPFS** — Content-addressed storage. Files identified by CID (hash of content). Not persistent by default — need pinning.

**Pinning Services:** Pinata, NFT.Storage, Web3.Storage

**Arweave** — Permanent storage, pay once. Used for critical NFT metadata.

**NFT Metadata pattern:**
\`\`\`json
// tokenURI returns IPFS URL pointing to:
{
  "name": "My NFT #1",
  "description": "...",
  "image": "ipfs://QmXxx.../1.png",
  "attributes": [{"trait_type": "Color", "value": "Blue"}]
}
\`\`\`

As a dev: Filecoin (via web3.storage) is reliable for durable storage. Pinata has a solid SDK.`,
      },
    ],
  },

  solidity: {
    title: "Solidity & Smart Contracts",
    subtitle: "Writing, testing, and securing on-chain code",
    color: "#ffd700",
    cards: [
      {
        title: "Solidity Fundamentals",
        tag: "LANGUAGE",
        body: `\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Token {
    // State (stored on-chain, costs gas to change)
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    // Events (cheap, off-chain indexable)
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    // Functions
    function transfer(address to, uint256 amount) external returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
}
\`\`\`
Key: msg.sender (caller), msg.value (ETH sent), block.timestamp, address(this)`,
      },
      {
        title: "Function Visibility & Modifiers",
        tag: "ACCESS CONTROL",
        body: `**Visibility:**
• \`public\` — Callable internally + externally
• \`external\` — Only from outside the contract (gas efficient for large calldata)
• \`internal\` — Only this contract + inheriting contracts
• \`private\` — Only this contract

**State mutability:**
• \`view\` — Reads state, no gas (when called externally)
• \`pure\` — Doesn't read state either
• \`payable\` — Can receive ETH

**Modifiers:**
\`\`\`solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _; // execute function body here
}

function withdraw() external onlyOwner {
    payable(owner).transfer(address(this).balance);
}
\`\`\``,
      },
      {
        title: "Common Vulnerabilities",
        tag: "🚨 SECURITY",
        body: `**Reentrancy** — Contract calls external contract before updating state. Attacker re-enters.
Fix: Checks-Effects-Interactions pattern. Or ReentrancyGuard.

**Integer Overflow/Underflow** — Fixed in Solidity 0.8+ (reverts). Use SafeMath for < 0.8.

**Access Control** — Missing onlyOwner. Unprotected initialize() functions.

**Oracle Manipulation** — Using spot price from AMM as oracle. Use TWAP or Chainlink.

**Frontrunning** — Miners/bots see pending txs and insert theirs first.

**Signature Replay** — Reusing valid signatures. Include chainId + nonce.

**Delegatecall** — Executes code in caller's context. Proxy patterns use this — understand storage slots.

Always audit with Slither (static analysis) before deploying.`,
      },
      {
        title: "Proxy Patterns & Upgradability",
        tag: "ARCHITECTURE",
        body: `Smart contracts are immutable — but proxy patterns enable upgrades.

**Transparent Proxy (OpenZeppelin):**
\`\`\`
User → Proxy (stores state) → delegatecall → Implementation (logic)
\`\`\`
The proxy delegates all calls to the implementation via delegatecall. Upgrade = point proxy to new implementation.

**UUPS (EIP-1822)** — Upgrade logic lives in the implementation itself. More gas efficient.

**Diamond (EIP-2535)** — Multiple implementation facets. Unlimited contract size.

**Key risk:** Storage layout must be preserved across upgrades. Adding variables at top of storage in upgrades = collision bug.

Use OpenZeppelin Upgrades plugin for Hardhat/Foundry — it validates storage layout automatically.`,
      },
      {
        title: "Testing & Development Tools",
        tag: "TOOLING",
        body: `**Foundry** — The modern standard. Rust-based, extremely fast.
\`\`\`bash
forge init my-project
forge test          # Run tests
forge test -vvv     # Verbose (shows traces)
forge coverage      # Coverage report
cast call <addr> "balanceOf(address)" <user>  # Query contracts
\`\`\`

\`\`\`solidity
// Foundry test example
contract TokenTest is Test {
    Token token;
    function setUp() public { token = new Token(1000e18); }
    function test_Transfer() public {
        token.transfer(alice, 100e18);
        assertEq(token.balanceOf(alice), 100e18);
    }
    function test_Fuzz_Transfer(uint256 amount) public {
        vm.assume(amount <= token.balanceOf(address(this)));
        // fuzz testing!
    }
}
\`\`\`

**Hardhat** — JS/TS-based. Better for projects heavily integrated with frontend.`,
      },
      {
        title: "OpenZeppelin & Standards",
        tag: "LIBRARIES",
        body: `OpenZeppelin Contracts is the standard library for Solidity. Audited, battle-tested.

**Common imports:**
\`\`\`solidity
// Tokens
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Access
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Security
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

// Upgradeable versions
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
\`\`\`

**Wizard:** wizard.openzeppelin.com — Generate contract boilerplate by selecting features.`,
      },
    ],
  },

  tools: {
    title: "Tools, APIs & Infrastructure",
    subtitle: "The professional toolbox for crypto development",
    color: "#06b6d4",
    cards: [
      {
        title: "RPC Providers",
        tag: "NODE ACCESS",
        body: `You need an RPC endpoint to read blockchain state and send transactions.

**Alchemy** — Best DX, enhanced APIs (NFT API, Transfers API, Webhooks), generous free tier. Recommended.
**Infura** — Reliable, ConsenSys-backed, multi-chain.
**QuickNode** — Fast, global edge nodes, good for high-frequency trading bots.
**Ankr** — Cheaper at scale.
**Public RPCs** — Free but rate-limited. Fine for dev, not prod.

\`\`\`ts
// Never expose RPC keys in frontend! Use a proxy or NEXT_PUBLIC_ carefully
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ALCHEMY_RPC_URL)
});
\`\`\`

For prod: use Alchemy's SDK (@alchemy-sdk/core) for enhanced features beyond standard JSON-RPC.`,
      },
      {
        title: "Alchemy Enhanced APIs",
        tag: "BEYOND RPC",
        body: `Standard RPC is limited. Alchemy adds powerful APIs:

**NFT API** — Get NFTs by owner, collection, metadata in one call (vs hundreds of RPC calls)
**Transfers API** — Get complete asset transfer history for any address
**Token Balances API** — All ERC-20 balances in one call
**Webhooks** — Get notified when address activity occurs (address activity, mined tx, dropped tx)
**Simulation API** — Simulate transaction execution before sending (alchemy_simulateAssetChanges)

\`\`\`ts
const alchemy = new Alchemy({ apiKey: KEY, network: Network.ETH_MAINNET });
const nfts = await alchemy.nft.getNftsForOwner("0x...");
const transfers = await alchemy.core.getAssetTransfers({...});
\`\`\``,
      },
      {
        title: "The Graph",
        tag: "INDEXING",
        body: `The Graph indexes blockchain events into a queryable GraphQL API (Subgraphs).

**Why:** You can't efficiently query "all Uniswap swaps in the last 7 days" via raw RPC. The Graph indexes and stores this.

**Using existing subgraphs:**
\`\`\`ts
const UNISWAP_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
const { data } = await fetch(UNISWAP_SUBGRAPH, {
  method: 'POST',
  body: JSON.stringify({ query: \`{ pools(first: 10, orderBy: volumeUSD) { id token0 { symbol } volumeUSD } }\` })
});
\`\`\`

**Building your own subgraph:**
Define schema.graphql (entities) + subgraph.yaml (event sources) + mappings.ts (AssemblyScript handlers).

Alternatives: Goldsky, Envio (faster, EVM + non-EVM), Alchemy Subgraphs.`,
      },
      {
        title: "Chainlink Oracles",
        tag: "PRICE FEEDS",
        body: `Smart contracts can't access external data. Oracles bridge off-chain data to on-chain.

**Chainlink Data Feeds** — The standard for price feeds in DeFi.
\`\`\`solidity
AggregatorV3Interface priceFeed = AggregatorV3Interface(
    0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419 // ETH/USD on mainnet
);
(, int256 price, , , ) = priceFeed.latestRoundData();
// price = 3500 * 10^8 (8 decimals)
\`\`\`

**Chainlink VRF** — Verifiable random numbers. For NFT mints, games, lotteries.
**Chainlink CCIP** — Cross-chain messaging and token transfers.
**Chainlink Automation** — Trigger contract functions automatically (like cron jobs for contracts).`,
      },
      {
        title: "Data & Analytics",
        tag: "RESEARCH TOOLS",
        body: `**Dune Analytics** — SQL-queryable blockchain data. Build dashboards, fork community queries.
\`\`\`sql
SELECT date_trunc('day', block_time) as day, SUM(amount_usd) as volume
FROM uniswap_v3_ethereum.trades
WHERE block_time > NOW() - INTERVAL '30 days'
GROUP BY 1 ORDER BY 1
\`\`\`

**Nansen** — Labeled wallet analytics. See what "smart money" wallets are doing.

**Glassnode** — On-chain metrics for macro analysis (MVRV, SOPR, exchange flows).

**DefiLlama** — TVL tracking across all DeFi protocols. Open API.

**Etherscan API** — Transaction history, contract verification, gas tracker. Free with API key.

**CoinGecko / CoinMarketCap API** — Price data, market cap, trading volume.`,
      },
      {
        title: "Dev Environment",
        tag: "LOCAL SETUP",
        body: `**Foundry** (Rust) — forge, cast, anvil, chisel
• \`anvil\` — Local Ethereum node (like Hardhat Network but faster)
• \`cast\` — CLI for interacting with contracts
• \`chisel\` — Solidity REPL

**Hardhat** (Node.js) — More JS ecosystem integration
\`\`\`bash
npx hardhat node         # Local node
npx hardhat run scripts/deploy.ts --network localhost
\`\`\`

**Tenderly** — Transaction simulation, debugger with full trace. Essential for debugging mainnet txs.

**Remix IDE** — Browser-based. Great for quick prototyping.

**Block Explorers:**
• Etherscan (Ethereum)
• Arbiscan (Arbitrum)
• Basescan (Base)
• Snowtrace (Avalanche)`,
      },
    ],
  },

  roadmap: {
    title: "Dev Roadmap",
    subtitle: "Where to start and how to progress as a crypto dev",
    color: "#ff4081",
    cards: [
      {
        title: "Stage 1: Foundation (Weeks 1-4)",
        tag: "BEGINNER",
        body: `**Goal:** Understand the ecosystem. Read first, build small.

✅ Read "Mastering Ethereum" (Andreas Antonopoulos) — free online
✅ Understand keys, wallets, transactions deeply
✅ Use Metamask on testnets (Sepolia)
✅ Read contracts on Etherscan — understand what bytecode, ABI, verified source means
✅ Build a simple React dApp that reads ETH balance
✅ Learn Solidity basics on CryptoZombies (cryptozombies.io)
✅ Deploy your first ERC-20 on Sepolia testnet via Remix

**Resources:**
• ethereum.org/developers
• docs.soliditylang.org
• learnweb3.io (structured curriculum)`,
      },
      {
        title: "Stage 2: Building (Months 2-3)",
        tag: "INTERMEDIATE",
        body: `**Goal:** Build real dApps. Understand DeFi protocols.

✅ Set up Foundry. Write tests. Write invariant tests.
✅ Build a full wagmi + viem + ConnectKit frontend
✅ Fork Uniswap V2 on local anvil node. Add liquidity. Make swaps.
✅ Understand proxy patterns. Deploy an upgradeable contract.
✅ Integrate Chainlink price feeds into a contract
✅ Build a simple lending protocol (deposit, borrow, liquidate)
✅ Use The Graph to index your contract events
✅ Read: "How does Compound work?" — trace the code

**Project ideas:**
• Token vesting contract with cliff
• Multi-sig wallet
• On-chain voting DAO`,
      },
      {
        title: "Stage 3: Specialization (Months 4-6)",
        tag: "ADVANCED",
        body: `**Choose your lane:**

**Smart Contract Security:**
→ Capture The Flag (Ethernaut, Damn Vulnerable DeFi)
→ Audit reports (Code4rena, Sherlock, Solodit.xyz)
→ Trail of Bits, Spearbit methodology docs
→ Get paid: bug bounties (Immunefi) or audit contests

**DeFi Protocol Dev:**
→ Build AMM from scratch
→ Build money market from scratch
→ Study Uniswap v3 whitepaper
→ Study AAVE v3 codebase

**dApp / Frontend Dev:**
→ Build a full DeFi dashboard
→ Build a DEX aggregator UI
→ Build NFT marketplace with ERC-2981 royalties`,
      },
      {
        title: "Where to Make Money as a Dev",
        tag: "MONETIZATION",
        body: `**Smart Contract Auditing** — $200-$1000/hr for senior auditors. Platforms: Code4rena, Sherlock.

**Bug Bounties** — Immunefi has bounties up to $10M. Real payouts for real bugs.

**Protocol Dev** — Working directly at DeFi protocols. Remote, pays in tokens + salary.

**MEV Bots** — Searcher bots that capture arbitrage. High risk, high reward. Requires deep understanding of mempool + Flashbots.

**dApp Development** — Freelance or build your own. SaaS tools for traders, portfolio trackers, analytics dashboards.

**Consulting** — Many non-crypto companies want Web3 integration. High rates.

**Content + Building** — Build in public. Combine your YouTube channel + open source code + consulting.`,
      },
      {
        title: "Key Projects to Study",
        tag: "LEARN FROM THE BEST",
        body: `These codebases are the best education in existence. Study them:

**Uniswap V3** — github.com/Uniswap/v3-core
Concentrated liquidity, tick math, sqrt price — most elegant AMM math

**AAVE V3** — github.com/aave/aave-v3-core
Health factors, interest rate models, liquidation logic

**MakerDAO** — github.com/makerdao/dss
CDP system, stability fees, emergency shutdown — the OG

**OpenZeppelin** — github.com/OpenZeppelin/openzeppelin-contracts
Reference implementation of every standard

**Foundry** — github.com/foundry-rs/foundry
Understand how a dev tool is built

**Morpho** — github.com/morpho-org/morpho-blue
Minimalist lending protocol. Clean Solidity.`,
      },
      {
        title: "Communities & Resources",
        tag: "NETWORK",
        body: `**Learning:**
• ethereum.org/developers — Official, comprehensive
• docs.uniswap.org — Excellent protocol docs
• book.getfoundry.sh — Foundry documentation
• useWeb3.xyz — Curated dev resources
• 0xSplits, Paradigm, a16z crypto blogs

**Community:**
• Ethereum R&D Discord
• Developer DAO
• BuildSpace (now Nights & Weekends)
• Twitter/X — Follow: @PatrickAlphaC, @pcaversaccio, @bantg, @_rari, @gakonst

**Practice:**
• Ethernaut (OpenZeppelin) — Hack smart contracts to learn
• Damn Vulnerable DeFi — DeFi-specific attack scenarios
• Code4rena / Sherlock — Audit real protocols

Your channel angle: "Building in Web3 as an African Dev" — underrepresented perspective with massive audience potential.`,
      },
    ],
  },
};

const CodeBlock = ({ children }) => (
  <pre
    style={{
      background: "rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "11px",
      lineHeight: "1.6",
      overflowX: "auto",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: "#e2e8f0",
      margin: "8px 0",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}
  >
    {children}
  </pre>
);

const renderBody = (text) => {
  const lines = text.split("\n");
  const result = [];
  let codeLines = [];
  let inCode = false;

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCode) {
        result.push(<CodeBlock key={`code-${i}`}>{codeLines.join("\n")}</CodeBlock>);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeLines.push(line);
      return;
    }
    if (line === "") {
      result.push(<div key={i} style={{ height: "8px" }} />);
      return;
    }
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong style="color:#e2e8f0;font-weight:600">${m}</strong>`)
      .replace(/`(.*?)`/g, (_, m) => `<code style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:11px;color:#7dd3fc">${m}</code>`);
    result.push(
      <p
        key={i}
        style={{ margin: "3px 0", lineHeight: "1.7", fontSize: "13px", color: "#94a3b8" }}
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
  return result;
};

export default function CryptoDevGuide() {
  const [active, setActive] = useState("blockchain");
  const sec = content[active];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b14",
        fontFamily: "'Syne', 'Space Grotesk', sans-serif",
        color: "#e2e8f0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 2px; }
        .nav-btn { transition: all 0.2s; }
        .nav-btn:hover { transform: translateY(-1px); }
        .card-hover { transition: all 0.25s; }
        .card-hover:hover { transform: translateY(-3px); }
      `}</style>

      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(2px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ₿
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "-0.3px" }}>
                Crypto × Web3 × Trading
              </div>
              <div style={{ fontSize: "11px", color: "#4a5568" }}>
                Complete Dev Reference — {Object.values(content).reduce((a, s) => a + s.cards.length, 0)} topics
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {sections.map((s) => (
              <button
                key={s.id}
                className="nav-btn"
                onClick={() => setActive(s.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: active === s.id
                    ? `1px solid ${content[s.id].color}40`
                    : "1px solid rgba(255,255,255,0.07)",
                  background: active === s.id
                    ? `${content[s.id].color}15`
                    : "rgba(255,255,255,0.03)",
                  color: active === s.id ? content[s.id].color : "#64748b",
                  fontSize: "12px",
                  fontWeight: active === s.id ? "600" : "400",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: "4px",
              background: `${sec.color}20`,
              border: `1px solid ${sec.color}30`,
              fontSize: "10px",
              fontWeight: "700",
              color: sec.color,
              letterSpacing: "1.5px",
              marginBottom: "10px",
            }}
          >
            {sections.find((s) => s.id === active)?.label.toUpperCase()}
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              margin: "0 0 8px",
              letterSpacing: "-0.5px",
              background: `linear-gradient(135deg, #ffffff, ${sec.color})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {sec.title}
          </h1>
          <p style={{ color: "#4a5568", fontSize: "14px", margin: 0 }}>{sec.subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "16px",
          }}
        >
          {sec.cards.map((card, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${sec.color}60, transparent)`,
                }}
              />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    margin: 0,
                    color: "#f1f5f9",
                    lineHeight: "1.4",
                    flex: 1,
                    paddingRight: "8px",
                  }}
                >
                  {card.title}
                </h3>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: sec.color,
                    background: `${sec.color}15`,
                    padding: "3px 6px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    border: `1px solid ${sec.color}25`,
                  }}
                >
                  {card.tag}
                </span>
              </div>
              <div>{renderBody(card.body)}</div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div
          style={{
            marginTop: "32px",
            padding: "16px 20px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#4a5568" }}>
            Section {sections.findIndex((s) => s.id === active) + 1} of {sections.length} •{" "}
            <span style={{ color: sec.color }}>{sec.cards.length} topics</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {sections.map((s, i) => (
              <div
                key={i}
                onClick={() => setActive(s.id)}
                style={{
                  width: active === s.id ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: active === s.id ? sec.color : "rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {sections.findIndex((s) => s.id === active) > 0 && (
              <button
                onClick={() => setActive(sections[sections.findIndex((s) => s.id === active) - 1].id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "7px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "#64748b",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ← Prev
              </button>
            )}
            {sections.findIndex((s) => s.id === active) < sections.length - 1 && (
              <button
                onClick={() => setActive(sections[sections.findIndex((s) => s.id === active) + 1].id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "7px",
                  border: `1px solid ${sec.color}40`,
                  background: `${sec.color}15`,
                  color: sec.color,
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: "600",
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}