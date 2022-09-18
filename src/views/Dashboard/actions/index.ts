import axios from 'axios'
import { BACKEND_API } from '../../../config'
import { toast } from 'react-toastify'

export const getWalletInfo = async (params: any, dispatch: any) => {

    const response = await axios.post(`${BACKEND_API}/client/getWallets`, {
        params
    }).then((res: any) => {
        const result = res.data
        if (result) {
            dispatch({
                type: 'SET_WALLET_INFO',
                nfts: result.data.nfts,
                wallets: result.data.wallets
            })
        }
    }).catch((err: any) => {
        console.log("err is : ", err.message)
    })
    return response
}

export const verifyMessage = async (params: any) => {
    const response = await axios.post(`${BACKEND_API}/client/verifyMessage`, {
        params
    }).then((res: any) => {
        const result = res.data
        if (result.success) {
            toast.success("Sign Message Success", { theme: 'dark' })
            return result.data
        } else {
            toast.error("Sign Message Failed!", { theme: 'dark' })
        }
    }).catch((err: any) => {
        toast.error("Sign Message Failed!", { theme: 'dark' })
    })

    return response
}

export const walletRemove = async (data: any) => {
    const response = await axios.post(`${BACKEND_API}/client/walletRemove`, {
        params: data
    }).then((res: any) => {
        const result = res.data
        if (result.success) {
            toast.success("Successfully Removed!", { theme: 'dark' })
            return result.data
        } else {
            toast.error("Backend Server Failed!", { theme: 'dark' })
        }
    }).catch((err: any) => {
        toast.error("Backend Server Failed!", { theme: 'dark' })
    })

    return response
}

export const getDiscordAccountInfo = async (token_type: any, access_token: any) => {
    const result = await axios.get("https://discord.com/api/users/@me", {
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    })
    return result
}
