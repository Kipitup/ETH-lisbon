import '../utils/styles/globals.css'
import { Inter, Plus_Jakarta_Sans } from '@next/font/google'
import { ApolloProvider } from '@apollo/client'
import { initApollo } from '@/lib/apolloClient'
import '@/utils/styles/custom-animation.css'

const plusJakartaSans = Plus_Jakarta_Sans({
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-plusJakartaSans'
})

const inter = Inter({
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-inter'
})

export default function App({ Component, pageProps }) {
	const apolloClient = initApollo()

	return (
		<>
					<ApolloProvider client={apolloClient}>
						<main className={`${plusJakartaSans.variable} ${inter.variable} flex h-full flex-col font-sans`}>
							<Component {...pageProps} />
						</main>
					</ApolloProvider>
		</>
	)
}
