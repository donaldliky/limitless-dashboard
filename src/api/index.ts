import axios from 'axios'
import { BACKEND_API } from '../config';

const getDiscordAccountInfo = async (token_type: any, access_token: any) => {
    const result = await axios.get("https://discord.com/api/users/@me", {
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    });
    return result;
}

const verifyMessage = async (data: any) => {
    const result = await axios.post(`${BACKEND_API}/client/verifyMessage`, {
        params: data
    })
    return result;
}

const walletRemove = async (data) => {
    const result = await axios.post(`${BACKEND_API}/client/walletRemove`, {
        params: data
    })
    return result.data;
}

export {
    getDiscordAccountInfo,
    verifyMessage,
    walletRemove,
}