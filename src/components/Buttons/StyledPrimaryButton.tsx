import {
	styled,
	Button,
} from '@mui/material'

const StyledPrimaryButton = styled(Button)(() => ({
	fontSize: '16px',
	// fontWeight: 'Bold',
	fontFamily: 'Arial',
	// backgroundColor: '#0487FF',
	// borderRadius: '5px',
	// padding: '15px 20px',
	border: `1px solid #00FFFC`,
	borderRadius: `0px`,
	height: '40px',
	color: '#FFFFFF',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '#0487FF'
	},
}))

export default StyledPrimaryButton