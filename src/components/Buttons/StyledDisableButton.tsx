import {
	styled,
	Button,
} from '@mui/material'

const StyledDisableButton = styled(Button)(() => ({
	fontSize: '16px',
	fontWeight: 'Bold',
	fontFamily: 'Arial',
	backgroundColor: '#888888',
	borderRadius: '5px',
	padding: '15px 20px',
	color: '#AAAAAA',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '#888888'
	},
}))

export default StyledDisableButton