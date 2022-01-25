import { getCurrentInstance, ref } from 'vue'
import { MODEL_VALUE_CHECKED_ID } from '../../utils/events'

const useState = () => {
    const searchInput = ref('')

    return {
        searchInput,
    }
}

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
    const { searchInput } = useState()
    const { onChange } = useActions()

    return {
        onChange,
        searchInput,
    }
}