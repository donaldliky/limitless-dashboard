import axios from 'axios'
import { BACKEND_API } from '../../../config';
import { toast } from 'react-toastify'

export const getServers = async (authorize: any) => {
    const result = await axios.post(`${BACKEND_API}/server/get`, {
        authorize
    }).then(response => {
        if (response.data.success === true) {
            return response.data.data
        } else {
            console.log('log', response)
            toast.error("Backend Server Failed!", { theme: 'dark' })
            return null
        }
    }).catch(err => {
        console.log('err', err)
        toast.error("Backend Server Failed!", { theme: 'dark' })
        return null;
    })

    return result
}

export const createServer = async (formData: any) => {
    const result = await axios({
        method: "post",
        url: `${BACKEND_API}/server/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
        if (response.data.success === true) {
            toast.success("Server is successfully created!", { theme: 'dark' })
            return response.data.data
        } else {
            console.log('log', response)
            toast.error("Backend Server Failed!", { theme: 'dark' })
            return null
        }
    }).catch(err => {
        console.log('err', err)
        toast.error("Backend Server Failed!", { theme: 'dark' })
        return null;
    })
    return result
}

export const updateServer = async (formData: any) => {
    const result = await axios({
        method: "post",
        url: `${BACKEND_API}/server/update`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
        if (response.data.success === true) {
            toast.success("Server is successfully updated!", { theme: 'dark' })
            return response.data.data
        } else {
            toast.error("Backend Server Failed!", { theme: 'dark' })
            return null
        }
    }).catch(err => {
        console.log(err)
        toast.error("Backend Server Failed!", { theme: 'dark' })
        return null;
    })
    return result
}

export const destroyServer = async (data: any) => {
    const result = await axios.post(`${BACKEND_API}/server/destroy`, {
        params: data

    }).then(response => {
        if (response.data.success === true) {
            toast.success("Server is successfully deleted!", { theme: 'dark' })
            return response.data.data
        } else {
            toast.error("Backend Server Failed!", { theme: 'dark' })
            return null
        }
    }).catch(err => {
        console.log(err)
        toast.error("Backend Server Failed!", { theme: 'dark' })
        return null;
    })
    return result
}