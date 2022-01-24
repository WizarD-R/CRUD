import { ref, getCurrentInstance, inject } from 'vue'
import { EVENT_CLOSE } from '../../../../utils/events'
import Notify from '../../../UI/Notification/Notify'

const useState = () => {
    const inputValue = ref('')
    const addUsersData = inject('addUsersData', null)

    return {
        inputValue,
        addUsersData,
    }
}

const useActions = (inputValue, addUsersData) => {
    const { emit } = getCurrentInstance()

    const onClose = () => {
        inputValue.value = ''
        emit(EVENT_CLOSE, false)
    }

    const onCreate = () => {
        if (!inputValue.value) return Notify({ message: 'Поле не может быть пустым', type: 'error', duration: 3000 })
        addUsersData(inputValue.value)
        onClose()
    }

    return {
        onCreate,
        onClose,
    }
}

export const useCrudAdd = () => {
    const { inputValue, addUsersData } = useState()
    const { onCreate, onClose } = useActions(inputValue, addUsersData)

    return {
        inputValue,
        onCreate,
        onClose,
    }
}
