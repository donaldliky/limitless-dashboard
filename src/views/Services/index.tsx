import { useState, useEffect, useRef } from 'react'
import {
	Grid,
	Link,
	CircularProgress,
	Box,
	Modal
} from '@mui/material'

import HeaderPart from '../../components/HeaderPart'
import FormControl from '@mui/material/FormControl'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBoxSharp'
import AddBoxIcon from '@mui/icons-material/AddBoxSharp'

import { useResize } from '../../utils/Helper'
import discordImg from '../../assets/images/discord_id_img.svg'
import collectionIcon from '../../assets/images/collection_icon.png'
import styles from './styles/index.module.scss'
import modals from './styles/modal.module.scss'
import './styles/style.css'

import { BACKEND_URL } from '../../config'
// toast import
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// redux import

import { useAppSelector } from "../../redux/hook"
import { useDispatch } from "react-redux"

import { getServers, updateServer, createServer, destroyServer } from './actions'

const useStyles = makeStyles({
	root: {
		color: '00FFFF',
		border: 0,
		borderRadius: 0,
	},
	input: {
		'&::placeholder': {
			textOverflow: 'ellipsis !important',
			color: 'blue'
		}
	}
})

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	border: 'none',
	outline: 'none'
}

interface Attribute {
	trait_type: string,
	value: string,
	role: string
}

interface Amount {
	count: number,
	role: string
}

interface Server {
	serverID: string,
	serverName: string,
	serverAvatar: string,
	channelName: string,
	stakingApi: string,
	creators: string[],
	attributes: Attribute[],
	amounts: Amount[]
}


const Services = () => {
	const classes = useStyles()
	const { isMobile, isResponsive } = useResize()

	const global = useAppSelector((state) => state.global)

	const min = 0
	const max = 100

	const [loading, setLoading] = useState(false)
	const [currentTab, setCurrentTab] = useState('1')
	const [openModal, setOpenModal] = useState(false)
	const [editMode, setEditMode] = useState('VIEW')
	const [imgSrc, setImageSrc] = useState(collectionIcon)
	const [imageFile, setImageFile] = useState('')
	const [newCreator, setNewCreator] = useState('')

	const [newAttribute, setNewAttribute] = useState<Attribute>({
		trait_type: '',
		value: '',
		role: ''
	} as Attribute)

	const [newAmount, setNewAmount] = useState<Amount>({
		count: 0,
		role: ''
	} as Amount)

	const [servers, setServers] = useState([])

	const [server, setServer] = useState<Server>({
		serverID: '',
		serverName: '',
		serverAvatar: '',
		channelName: '',
		stakingApi: '',
		creators: [] as String[],
		attributes: [] as Attribute[],
		amounts: [] as Amount[]
	} as Server)

	const handleAddRequest = (mode: string) => {
		setEditMode(mode)
		setOpenModal(true)
	}

	const handleNewAttributeChange = (event: any) => {
		setNewAttribute({
			...newAttribute,
			[event.target.name]: event.target.value,
		})
	}

	const handleNewAmountChange = (event: any) => {
		setNewAmount({
			...newAmount,
			[event.target.name]: event.target.value,
		})
	}

	const handleServerChange = (event: any) => {
		setServer({
			...server,
			[event.target.name]: event.target.value,
		})
	}

	const handleAttributeChange = (event: any, index: any) => {
		let attributes = server.attributes
		attributes[index] = {
			...attributes[index],
			[event.target.name]: event.target.value,
		}
		setServer({
			...server,
			attributes: attributes,
		})
	}

	const handleDeleteAttribute = (event: any, index: any) => {
		let attributes = server.attributes.filter((value, key) => key !== index)
		setServer({
			...server,
			attributes: attributes,
		})
	}

	const handleAddAttribute = () => {
		let attributes = server.attributes
		attributes.push(newAttribute)
		setServer({
			...server,
			attributes: attributes,
		})
		setNewAttribute({ trait_type: '', value: '', role: '' })
	}

	const handleCreatorChange = (event: any, index: any) => {
		const newCreators = server.creators
		newCreators[index] = event.target.value
		setServer({
			...server,
			creators: newCreators,
		})
	}

	const handleDeleteCreator = (event: any, index: any) => {
		const newCreators = server.creators.filter((creator, key) => key !== index)

		setServer({
			...server,
			creators: newCreators,
		})
	}

	const handleNewCreatorChange = (event: any) => {
		setNewCreator(event.target.value)
	}

	const handleAddCreator = (event: any) => {
		const newCreators = server.creators
		newCreators.push(newCreator)
		setNewCreator('')
		setServer({
			...server,
			creators: newCreators,
		})
	}

	const handleAmountChange = (event: any, index: any) => {
		let amounts = server.amounts
		amounts[index] = {
			...amounts[index],
			[event.target.name]: event.target.value,
		}
		setServer({
			...server,
			amounts: amounts,
		})
	}

	const handleDeleteAmount = (event: any, index: any) => {
		let amounts = server.amounts.filter((amount, key) => key !== index)
		setServer({
			...server,
			amounts: amounts,
		})
	}

	const handleAddAmount = () => {
		let amounts = server.amounts
		amounts.push(newAmount)
		setServer({
			...server,
			amounts: amounts,
		})
		setNewAmount({ count: 0, role: '' })
	}

	const handleSubmit = async () => {
		setLoading(true)
		if (editMode === 'NEW') {
			const formData = new FormData()
			if (imageFile !== '')
				formData.append('file', imageFile)
			formData.append('params', JSON.stringify(server))
			formData.append('authorize', JSON.stringify(global.authorize))
			await createServer(formData)

		} else if (editMode === 'EDIT') {
			const formData = new FormData()
			if (imageFile !== '')
				formData.append('file', imageFile)
			formData.append('params', JSON.stringify(server))
			formData.append('authorize', JSON.stringify(global.authorize))
			await updateServer(formData)
		}

		getServersByClient(global.authorize)
		handleCancel()
		setLoading(false)
	}

	const handleCancel = () => {
		setServer({
			serverID: '',
			serverName: '',
			serverAvatar: '',
			channelName: '',
			stakingApi: '',
			creators: [],
			attributes: [],
			amounts: []
		} as Server)
		setNewCreator('')
		setImageSrc(collectionIcon)
		setNewAttribute({
			trait_type: '',
			value: '',
			role: ''
		} as Attribute)

		setNewAmount({
			count: 0,
			role: ''
		} as Amount)
		setEditMode('VIEW')
		setOpenModal(false)
	}

	const handleEdit = (index: any) => {
		setServer(servers[index])
		setEditMode('EDIT')
		setOpenModal(true)
	}

	const getServersByClient = async (authorize: any) => {
		const result = await getServers(authorize);
		if (!!result) {
			setServers(result);
		}
	}

	const handleDelete = async (index: any) => {
		if (window.confirm("Do you want to delete this server?")) {
			setLoading(true)
			await destroyServer(servers[index])
			getServersByClient(global.authorize)
			setLoading(false)
		}
	}

	// tablist change
	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setCurrentTab(newValue)
	}

	// get collection_icon data
	const handleImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			setImageSrc(URL.createObjectURL(event.target.files[0]))
		}
		setImageFile(event.target.files[0])
	}

	useEffect(() => {
		getServersByClient(global.authorize)
	}, [])

	return (
		<div className={styles.services_page}>
			<Modal open={loading} >
				<Box sx={style}>
					<CircularProgress sx={{ color: '#FFFFFF' }}></CircularProgress>
				</Box>
			</Modal>
			<HeaderPart></HeaderPart>
			<div className={styles.services_page_area}>
				<Box sx={{ width: '100%' }}>
					<TabContext value={currentTab}>
						<Box>
							<TabList onChange={handleTabChange}>
								<Tab label='Role Verification' className={`${styles.tab_individual} ${classes.root}`} value='1' />
								<Tab label='Sales Bot' className={styles.tab_individual} value='2' />
							</TabList>
						</Box>
						<TabPanel sx={{ backgroundColor: '#1B2332' }} value='1'>
							<div className={styles.tab_container}>
								<div className={styles.bot_invitation_area}>
									<div className={styles.invitation_para}>
										<p>To start using Limitless as your role verification tool on Discord, please invite the Limitless Bot to your server by clicking on the link below. Make sure that the discord account linked has Administrator permissions. Put the Limitless Bot above roles that you would like to add.
										</p>
									</div>
									<div className={styles.bot_invite_button}>
										<button><p>INVITE LIMITLESS BOT</p></button>
									</div>
								</div>

								<div className={styles.add_server_area}>
									<div className={styles.area_header}>
										<p>Discord Servers</p>
										<button onClick={() => handleAddRequest('NEW')}><p>ADD REQUEST</p></button>
									</div>
								</div>

							</div>

							<TableContainer className={styles.table_container} component={Paper}>
								<Table className={styles.table_content} aria-label='simple table'>
									<TableHead>
										<TableRow>
											<TableCell>Server Name</TableCell>
											<TableCell>Server ID</TableCell>
											<TableCell>Verify Channel</TableCell>
											<TableCell>Status</TableCell>
											<TableCell>Action</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											servers.map((server: any, index: any) =>
												<TableRow key={index}>
													<TableCell component='th' scope='row'><div className={styles.id_content}><img className={styles.server_avatar} src={(server.serverAvatar === '' ? '/discord.png' : BACKEND_URL + server.serverAvatar)} /> {server.serverName} </div></TableCell>
													<TableCell>{server.serverID}</TableCell>
													<TableCell>{server.channelName}</TableCell>
													{server.state === 0 ?
														<TableCell><div className={styles.server_pending}><AccessTimeIcon /><div style={{ marginLeft: '10px' }}>Pending</div></div></TableCell>
														:
														server.state === 1 ?
															<TableCell><div className={styles.server_approved}><DoneIcon /><div>Approved</div></div></TableCell>
															:
															<TableCell><div className={styles.server_rejected}><ClearIcon /><div>Rejected</div></div></TableCell>
													}
													<TableCell>
														<div className={styles.button_group} style={{ display: 'flex' }}>
															<div className={styles.edit_button} onClick={() => handleEdit(index)} ><EditIcon /></div>
															<div className={styles.delete_button} onClick={() => handleDelete(index)} ><DeleteIcon /></div>
														</div>
													</TableCell>
												</TableRow>
											)
										}

									</TableBody>
								</Table>
							</TableContainer>
						</TabPanel>

						<TabPanel value='2'></TabPanel>

					</TabContext>
				</Box>
			</div>

			{/*add-server modal part*/}
			<Modal
				open={openModal}
				onClose={handleCancel}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className={modals.modal_container}>
					<div className={modals.modal_content_area}>
						<div className={modals.modal_header}>
							ADD SERVER
						</div>
						<div className={modals.upper_content}>
							<div className={modals.server_info_part}>
								<div className={modals.server_info_input}>
									<div className={modals.info_header}>Discord Server Name</div>
									<TextField name='serverName' value={server.serverName} onChange={handleServerChange} placeholder='Furrsol Community' className={modals.text_field} />
								</div>
								<div className={modals.server_info_input}>
									<div className={modals.info_header}>Discord Server ID</div>
									<TextField name='serverID' value={server.serverID} onChange={handleServerChange} placeholder='924496790626131988' className={modals.text_field} />
								</div>
								<div className={modals.server_info_input}>
									<div className={modals.info_header}>Verify Channel Name</div>
									<TextField name='channelName' value={server.channelName} onChange={handleServerChange} placeholder='Verify NFT' className={modals.text_field} />
								</div>
								<div className={modals.server_info_input}>
									<div className={modals.info_header}>Staking Api Url</div>
									<TextField name='stakingApi' value={server.stakingApi} onChange={handleServerChange} placeholder='http://' className={modals.text_field} />
								</div>
								<div className={modals.server_info_input}>
									<div className={modals.info_header}>First Creator Address</div>
									{
										server.creators.map((creator, index) => {
											return (
												<div style={{ display: 'flex' }}>
													<TextField value={creator} onChange={(event) => handleCreatorChange(event, index)} name='creator' placeholder='' className={modals.text_field} />
													<div className={modals.plus_button}>
														<div onClick={(event) => handleDeleteCreator(event, index)}>
															<IndeterminateCheckBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
														</div>
													</div>
												</div>
											)
										})
									}
									<div style={{ display: 'flex' }}>
										<TextField value={newCreator} onChange={handleNewCreatorChange} name='creator' placeholder='' className={modals.text_field} />
										<div className={modals.plus_button}>
											<div onClick={handleAddCreator}>
												<AddBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={modals.collection_icon}>
								<div className={modals.icon_header}>Collection Icon</div>

								<div className={modals.icon_content}>
									<img src={imgSrc} />
									<input type='file' onChange={handleImageChange} />
								</div>

							</div>
						</div>
						<div className={modals.lower_content}>
							<div className={modals.role_header}>
								ROLES
							</div>

							<div className={modals.modal_header} style={{ marginBottom: '0px' }}>
								- NFT Count
							</div>
						</div>
						{
							server.amounts.map((amount, index) =>
								<div className={modals.role_count_part}>
									<div className={modals.count_part}>
										<div className={modals.count_number}>
											<TextField name='count' value={amount.count} onChange={(event) => handleAmountChange(event, index)} placeholder='Count' className={modals.count_text_field} type='number' inputProps={{ min, max }} />

										</div>
									</div>
									<div className={modals.role_assign_part}>
										<div className={modals.role_select}>
											<FormControl sx={{ width: isResponsive ? '100%' : '260px' }}>
												<TextField name='role' placeholder='Role' value={amount.role} onChange={(event) => handleAmountChange(event, index)} />
											</FormControl>
											<div className={modals.plus_button}>
												<div onClick={(event) => handleDeleteAmount(event, index)}>
													<IndeterminateCheckBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						}

						<div className={modals.role_count_part}>
							<div className={modals.count_part}>
								<div className={modals.count_number}>
									<TextField name='count' placeholder='Count' value={newAmount.count} onChange={handleNewAmountChange} type='number' inputProps={{ min, max }} className={modals.count_text_field} />
								</div>
							</div>
							<div className={modals.role_assign_part}>
								<div className={modals.role_select}>
									<FormControl sx={{ width: isResponsive ? '100%' : '260px' }}>
										<TextField name='role' placeholder='Role' value={newAmount.role} onChange={handleNewAmountChange} />
									</FormControl>
									<div className={modals.plus_button}>
										<div onClick={handleAddAmount}>
											<AddBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={modals.modal_header} style={{ marginBottom: '0px', marginTop: '15px' }}>
							- Attributes
						</div>

						{
							server.attributes.map((attribute, index) =>
								<div className={modals.attr_count_part}>
									<div className={modals.role_assign_part}>
										<div className={modals.role_select}>
											<FormControl sx={{ width: isResponsive ? '100%' : '222px', marginRight: isResponsive ? '0px' : '20px' }}>
												<TextField name='trait_type' placeholder='Trait Type' value={attribute.trait_type} onChange={(event) => handleAttributeChange(event, index)} />
											</FormControl>
										</div>
									</div>
									<div className={modals.role_assign_part}>
										<div className={modals.role_select}>
											<FormControl sx={{ width: isResponsive ? '100%' : '230px', marginRight: isResponsive ? '0px' : '20px' }}>
												<TextField name='value' placeholder='Trait Value' value={attribute.value} onChange={(event) => handleAttributeChange(event, index)} />
											</FormControl>
										</div>
									</div>
									<div className={modals.role_assign_part}>
										<div className={modals.role_select}>
											<FormControl sx={{ width: '260px' }}>
												<TextField name='role' placeholder='Role' value={attribute.role} onChange={(event) => handleAttributeChange(event, index)} />
											</FormControl>
											<div className={modals.plus_button}>
												<div onClick={(event) => handleDeleteAttribute(event, index)}>
													<IndeterminateCheckBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						}
						<div className={modals.attr_count_part}>
							<div className={modals.role_assign_part}>
								<div className={modals.role_select}>
									<FormControl sx={{ width: isResponsive ? '100%' : '222px', marginRight: isResponsive ? '0px' : '20px' }}>
										<TextField name='trait_type' placeholder='Trait Type' value={newAttribute.trait_type} onChange={handleNewAttributeChange} />
									</FormControl>

								</div>
							</div>
							<div className={modals.role_assign_part}>
								<div className={modals.role_select}>
									<FormControl sx={{ width: isResponsive ? '100%' : '230px', marginRight: isResponsive ? '0px' : '20px' }}>
										<TextField name='value' placeholder='Trait Value' value={newAttribute.value} onChange={handleNewAttributeChange} />
									</FormControl>
								</div>
							</div>
							<div className={modals.role_assign_part}>
								<div className={modals.role_select}>
									<FormControl sx={{ width: '260px' }}>
										<TextField name='role' placeholder='Role' value={newAttribute.role} onChange={handleNewAttributeChange} />
									</FormControl>
									<div className={modals.plus_button}>
										<div onClick={handleAddAttribute}>
											<AddBoxIcon sx={{ fontSize: '40px', color: 'lightslategray' }} />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={modals.button_area}>
							<div className={modals.modal_btn} onClick={handleCancel}>CANCEL</div>
							<div className={modals.modal_btn} onClick={handleSubmit}>SUBMIT</div>
						</div>

					</div>
				</Box >
			</Modal >
		</div>
	)
}

export default Services