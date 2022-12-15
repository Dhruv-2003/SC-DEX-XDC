import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [chain.goerli],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#FCF8E8",
          accentColorForeground: "black",
          borderRadius: "none",
          fontStack: "rounded",
        })}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
