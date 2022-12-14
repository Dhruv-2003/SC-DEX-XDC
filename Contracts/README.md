/// DEX Contract Deployed on XDC Apothem Testnet

/// We are using similar to what Uniswap uses in their architecture to create contracts

1. Core contracts

- ERC20 Token Contract - Token contract for the tokens we are gonna use and one token for the pool managment

- PAIR Contract - This Contract handles , the swapping , minting , and burning for the PAIR

- Factory contract - that manages and create the PAIR Contract

2. Frontends Contracts

- Router - Contract that can be use by frontend to just intiate Swapping and Liquidity

- Price Oracle - fetch the price of the tokens in respect to each other according to the one offered in the pool

3. Others Contract

- IXDC Token
- Mock token 1
- Mock token 2
- ETH Wrapper - if Bridge Created
- Stablecoin Backed by XDC

/// Aim

- Manage the Funds
- for Liquidity Providers
- Create Pool for a token PAIR
- Swapping for token PAIR
- Protocol Fee
- Price Oracle
- Stable Coin
