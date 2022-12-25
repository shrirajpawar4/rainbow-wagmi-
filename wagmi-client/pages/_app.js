import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, midnightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// adding gnosis chain
const GnosisChain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDai',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/gnosis',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/xdai/mainnet' },
  },
  iconUrls: ["https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png"],
  testnet: false,
}



const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
  publicProvider()]
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

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode theme={midnightTheme({accentColor: '#7b3fe4',
        accentColorForeground: 'white',})} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
