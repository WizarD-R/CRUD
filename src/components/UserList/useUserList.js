import { getCurrentInstance } from 'vue'
import { MODEL_VALUE_CHECKED_ID } from '../../utils/events'

const useActions = () => {
    const { emit } = getCurrentInstance()
    const onChange = id => {
        emit(MODEL_VALUE_CHECKED_ID, id)
    }

    return {
        onChange,
    }
}

export const useUserList = () => {
    const { onChange } = useActions()

    return {
        onChange,
    }
}