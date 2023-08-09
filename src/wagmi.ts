'use client'

import { getDefaultConfig } from 'connectkit'
import { createConfig, configureChains } from 'wagmi'
import { zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
const walletConnectID = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID

const { chains } = configureChains(
  [zora],
  [publicProvider()],
)

export const config = createConfig(
  getDefaultConfig({
    alchemyId: alchemyKey as string,
    walletConnectProjectId: walletConnectID as string,
    appName: 'Caisson',
    autoConnect: true,
    chains,
  }),
)
