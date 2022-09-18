import React, { useState, useEffect } from 'react'
import {
	CircularProgress,
	Box,
	Modal
} from '@mui/material'


const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	border: 'none',
	outline: 'none'
};

const LoadingModal: React.FC = () => {

    const [loading, setLoading] = useState(false);

	return (
        <Modal open={loading} >
            <Box sx={style}>
                <CircularProgress sx={{color:"#FFFFFF"}}></CircularProgress>
            </Box>
        </Modal>
	)
}

export default LoadingModal
