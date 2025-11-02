import bus from "../services/bus";

export const useFlashMessages = () => {
    const setFlashMessages = (msg, type) => {
        bus.emit('flash', {
            message: msg,
            type
        })
    }
    return {setFlashMessages}
}
