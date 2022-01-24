import { getCurrentInstance, ref, inject, watch } from 'vue'
import { EVENT_CLOSE } from '../../../../utils/events'
import Notify from '../../../UI/Notification/Notify'

const useState = () => {
    const inputValue = ref('')
    const placeholder = ref('')
    const updateUsersData = inject('updateUsersData', null)

    return {
        inputValue,
        placeholder,
        updateUsersData,
    }
}

const useActions = (inputValue, placeholder, props, updateUsersData) => {
    const { emit } = getCurrentInstance()

    const onClose = () => {
        inputValue.value = ''
        emit(EVENT_CLOSE, false)
    }

    const onUpdate = () => {
        if (!inputValue.value) return Notify({ message: 'Поле не может быть пустым', type: 'error', duration: 3000 })
        updateUsersData(inputValue.value, props.checkedElementId)
        onClose()
    }

    watch(() => props.isOpen, () => {
        const checkedElement = props.data.filter(el => el.id === props.checkedElementId)[0]
        placeholder.value = 'Имя: ' + checkedElement?.name
        inputValue.value = checkedElement?.name
    })

    return {
        onUpdate,
        onClose,
    }
}
export const useCrudUpdate = (props) => {
    const { inputValue, placeholder, updateUsersData } = useState()
    const { onUpdate, onClose } = useActions(inputValue, placeholder, props, updateUsersData)

    return {
        inputValue,
        placeholder,
        onUpdate,
        onClose,
    }
}