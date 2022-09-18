import { useState, useEffect } from 'react'
import {
	Grid,
	Typography,
	Link,
	CircularProgress,
	Box,
	Button,
	Modal
} from '@mui/material'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import HeaderPart from '../../components/HeaderPart'
import { StyledPrimaryButton } from '../../components/Buttons'

// toast import
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import wallet_img from './../../assets/images/wallet_icon.png';
import { NFTCard } from '../../components/Card'

// import { DISCORD_REDIRECT_URL } from '../../config'
// import { verifyMessage, walletRemove } from '../../api'

import { useResize } from '../../utils/Helper'

// redux import
import { useAppSelector } from "../../redux/hook"
import { useDispatch } from "react-redux"

import { getWalletInfo, verifyMessage, walletRemove } from "./actions"

// sass import
import styles from './index.module.scss'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	border: 'none',
	outline: 'none'
}

const Dashboard = () => {
	const dispatch = useDispatch()

	const global = useAppSelector((state) => state.global)
	const dashboard = useAppSelector((state) => state.dashboard)

	const wallet = useWallet()

	const { isMobile } = useResize()

	const [loading, setLoading] = useState(false)

	const [collections, setCollection] = useState([])
	const [selectedCollection, setSelectedCollection] = useState(-1)

	const [filteredNFTs, setFilteredNFTs] = useState([])

	const handleCollectionChange = (e: any) => {
		setSelectedCollection(e.target.value)
		handleFilterNFTs(e.target.value)
	}

	const handleFilterNFTs = (value: any) => {
		if (value !== -1) {
			setFilteredNFTs(dashboard.nfts.filter((nft: any, index: any) => nft.data.name.split('#')[0] === collections[value]))
		}
		else {
			setFilteredNFTs(dashboard.nfts)
		}
	}

	const handleGetWalletInfo = async (data: any) => {
		setLoading(true)
		await getWalletInfo(data, dispatch)
		setFilteredNFTs(dashboard.nfts)
		setLoading(false)
	}

	useEffect(() => {
		const nftNames: any = dashboard.nfts.map((nft: any) => {
			return nft.data.name.split('#')[0]
		})
		const filteredCollections = nftNames.filter((n: any, i: any) => nftNames.indexOf(n) === i)

		// Init Values
		setCollection(filteredCollections)
		setSelectedCollection(-1)
		handleFilterNFTs(-1)
	}, [dashboard])

	useEffect(() => {
		if (global.authorize.access_token !== null) {
			handleGetWalletInfo({ accessToken: global.authorize['access_token'], tokenType: global.authorize['token_type'] })
		}
	}, [global.authorize])

	const handleSignMessage = async () => {
		setLoading(true)
		const message = `Sign in with LIMITLESS DAO.\n\nNo password needed.\n\nClick "Sign" or "Approve" only means you have proved this wallet is owned by your.\n\nThis request will not trigger any blockchain transaction or cost any gas fee.`
		const encodedMessage = new TextEncoder().encode(message)
		try {
			const signature = await wallet.signMessage!(encodedMessage)
			await verifyMessage({
				accessToken: global.authorize.access_token,
				publicKey: wallet.publicKey,
				signature: signature,
				tokenType: global.authorize.token_type
			})

			setLoading(false)
			handleGetWalletInfo({
				accessToken: global.authorize.access_token,
				tokenType: global.authorize.token_type
			})
		} catch (e) {
			toast.error("Sign Message Failed!", { theme: 'dark' })
			setLoading(false)
		}
	}

	const handleWalletRemove = async (wallet: any) => {
		setLoading(true)

		await walletRemove({
			accessToken: global.authorize.access_token,
			tokenType: global.authorize.token_type,
			wallet: wallet
		})
		setLoading(false)

		handleGetWalletInfo({
			accessToken: global.authorize.access_token,
			tokenType: global.authorize.token_type
		})
	}

	return (
		<div className={styles.home}>
			<Modal open={loading} >
				<Box sx={style}>
					<CircularProgress sx={{ color: "#FFFFFF" }}></CircularProgress>
				</Box>
			</Modal>
			<HeaderPart></HeaderPart>
			<Grid container justifyContent="center" className={styles.main_content}
				sx={{ flexGrow: 1 }}
			>
				<Grid item xs={12} sm={12} md={4} sx={{ paddingRight: '30px' }}>
					<Typography className={styles.wallet_connection}>WALLET CONNECTION</Typography>
					<div className={styles.wallet_buttons}>
						<WalletMultiButton className={styles.wallet_connect} />
						{
							wallet.connected ?
								<StyledPrimaryButton sx={{ ml: '15px' }} onClick={() => handleSignMessage()}>Link Wallet</StyledPrimaryButton>
								: <></>
						}
						<div className={styles.wallet_container}>
							{
								dashboard.wallets.map((wallet: string, index: any) =>
									<div className={styles.connected_wallet_info} key={index}>
										<div style={{ display: 'flex' }}>
											<img src={wallet_img}></img>
											<Typography className={styles.wallet_address}>
												{wallet.substr(0, 4) + '...' + wallet.substr(wallet.length - 4, wallet.length)}
											</Typography>
										</div>
										<Button className={styles.removeButton} onClick={() => handleWalletRemove(wallet)}>Remove</Button>
									</div>
								)
							}
						</div>
					</div>
				</Grid>

				<Grid item xs={12} sm={12} md={8}>
					<FormControl fullWidth style={{ width: '220px' }}>
						<Select className={styles.select_collection}
							value={selectedCollection}
							onChange={handleCollectionChange}
							style={{ width: '220px' }}
						>
							<MenuItem value={-1}>All Collections</MenuItem>
							{collections &&
								collections.map((colName: any, index: number) => {
									return (
										<MenuItem
											key={index}
											value={index}
										>
											{colName}
										</MenuItem>
									)
								})
							}

						</Select>
					</FormControl>

					<div className={styles.nft_container}>

						<Grid className={styles.nft_items}>
							{filteredNFTs.map((nft: any, index: any) => (
								<NFTCard
									key={index}
									nft={nft}
								/>
							))}
						</Grid>
					</div>
				</Grid>
			</Grid >
		</div>
	)
}

export default Dashboard