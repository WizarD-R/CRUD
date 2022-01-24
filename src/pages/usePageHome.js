import { ref, provide } from 'vue'
import Notify from '../components/UI/Notification/Notify'

const useState = () => {
    const users = ref(JSON.parse(localStorage.getItem('userStore')) ?? [])
    const checkedElementId = ref(users.value[0]?.id)

    return {
        users,
        checkedElementId,
    }
}

const useActions = (users, checkedElementId) => {
    const saveUsersData = () => {
        localStorage.setItem('userStore', JSON.stringify(users.value))
        Notify({ message: 'Значения обновлены', duration: 3000 })
    }

    const addUsersData = name => {
        const lastElement = users.value[users.value.length - 1]
        const id = (lastElement?.id ?? 0) + 1
        users.value.push({ id, name })
        checkedElementId.value = id

        saveUsersData()
    }

    const updateUsersData = (name, id) => {
        users.value = users.value.map(el => el.id === id ? { id, name } : el)
        saveUsersData()
    }

    const deleteUsersData = id => {
        users.value = users.value.filter(el => el.id !== id)
        saveUsersData()
    }


    return {
        addUsersData,
        updateUsersData,
        deleteUsersData,
    }
}


export const usePageHome = () => {
    const { users, checkedElementId } = useState()
    const { addUsersData,updateUsersData, deleteUsersData } = useActions(users, checkedElementId)
    provide('addUsersData', addUsersData)
    provide('updateUsersData', updateUsersData)
    provide('deleteUsersData', deleteUsersData)

    return {
        users,
        checkedElementId,
    }
}
