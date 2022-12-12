/// DEX Contract Deployed on XDC Apothem Testnet

// Contract

- DEX contract (Full pair )
- Mock token 1 - WETH (Wrapped Ether)
- XDC Token - Native
- Stablecoin Backed by XDC

/// We are using similar to what Uniswap uses in their architecture to create contracts

1. Core contracts

- ERC20 Token Contract - Token contract for the tokens we are gonna use and one token for the pool managment
- PAIR Contract - This Contract handles , the swapping , minting , and burning for the PAIR
- Factory contract - that manages and create the PAIR Contract

2. Frontends Contracts

- Router - Contract that can be use by frontend to just intiate Swapping and Liquidity

/// Aim

- Add Liquidity and earn rewards
- Create Pool for a token PAIR
- Swapping of token PAIR
