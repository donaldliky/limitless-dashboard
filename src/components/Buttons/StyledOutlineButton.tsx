import {
	styled,
	Button,
} from '@mui/material'

const StyledOutlineButton = styled(Button)(() => ({
	fontSize: '16px',
	fontWeight: 'Bold',
	fontFamily: 'Arial',
	border: '1px solid #2D528A',
	backgroundColor: '#1B222D',
	borderRadius: '5px',
	padding: '15px 20px',
	color: '#FFFFFF',
	cursor: 'pointer',
	height: '60px',
	'&:hover': {
		border: '1px solid #2D528A',
		backgroundColor: '#1B2233'
	},
}))
export default StyledOutlineButton