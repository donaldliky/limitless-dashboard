import axios from 'axios'
import { BACKEND_API } from '../../config';

export const getDiscordAccountInfo = async (params: any, dispatch: any) => {
    const response = await axios.get("https://discord.com/api/users/@me", {
        headers: {
            'Authorization': `${params.token_type} ${params.access_token}`
        }
    }).then((res: any) => {
        const result = res.data;
        if (result) {
            dispatch({
                type: 'SET_DISCORD',
                discord: result
            })
        }
    }).catch((err: any) => {
        console.log("err is : ", err.message);
    })

    return response
}

export const setAuthorizeInfo = async (params: any, dispatch: any) => {
    dispatch({
        type: 'SET_AUTHORIZE',
        authorize: params
    })
}

export const setDiscordAccountInfo = async (params: any, dispatch: any) => {
    dispatch({
        type: 'SET_DISCORD',
        discord: params
    })
}






