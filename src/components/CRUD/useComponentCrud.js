import { ref, inject, getCurrentInstance, nextTick } from 'vue'
import { MODEL_VALUE_CHECKED_ID } from '../../utils/events'
import Notify from '../UI/Notification/Notify';

const useState = () => {
    const isAdd = ref(false)
    const isUpdate = ref(false)
    const deleteUsersData = inject('deleteUsersData', null)

    return {
        isAdd,
        isUpdate,
        deleteUsersData,
    }
}

const useActions = (props, deleteUsersData) => {
    const { emit } = getCurrentInstance()

    const onDelete = () => {
        if (!props.data.length) return Notify({ message: 'Элементов нет', duration: 3000, type: 'error' })
        deleteUsersData(props.checkedElementId)
        nextTick(() => { emit(MODEL_VALUE_CHECKED_ID, props.data[0]?.id) })
    }

    return {
        onDelete,
    }
}

export const useComponentCrud = props => {
    const { isAdd, isUpdate, deleteUsersData } = useState()
    const { onDelete } = useActions(props, deleteUsersData)

    return {
        isAdd,
        isUpdate,
        onDelete,
    }
}
