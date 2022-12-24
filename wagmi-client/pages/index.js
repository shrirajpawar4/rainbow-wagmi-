import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import { ConnectButton } from '@rainbow-me/rainbowkit';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex justify-center mt-20'>
     <ConnectButton />
    </div>
  )
}
