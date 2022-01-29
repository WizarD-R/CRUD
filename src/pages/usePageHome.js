import { ref, provide, watch } from 'vue'
import Notify from '../components/UI/Notification/Notify'

const useState = () => {
    const users = ref(JSON.parse(localStorage.getItem('userStore')) ?? [])
    const checkedElementId = ref(users.value[0]?.id)
    const currentTypeSave = ref('local')
    const selectTypeSave = [
        { id: 'local', name: 'Locale Storage'},
        { id: 'session', name: 'Session Storage'},
        { id: 'cookie', name: 'Cookie'},
    ]

    return {
        users,
        checkedElementId,
        currentTypeSave,
        selectTypeSave,
    }
}

const useActions = (users, checkedElementId, currentTypeSave) => {
    const getCookie = cookies => cookies.split(';').filter(el => el.includes('useStore='))[0].split('=')[1]

    const saveUsersData = {
        local() {
            localStorage.setItem('userStore', JSON.stringify(users.value))
            Notify({ message: 'Значения обновлены Local Storage', duration: 3000 })
        },

        session() {
            sessionStorage.setItem('userStore', JSON.stringify(users.value))
            Notify({ message: 'Значения обновлены Session Storage', duration: 3000 })
        },

        cookie() {
            document.cookie = `useStore=${JSON.stringify(users.value)};`
            Notify({ message: 'Значения обновлены cookies', duration: 3000 })
        },
    }

    const addUsersData = name => {
        const lastElement = users.value[users.value.length - 1]
        const id = (lastElement?.id ?? 0) + 1
        users.value.push({ id, name })
        checkedElementId.value = id

        saveUsersData[currentTypeSave.value]()
    }

    const updateUsersData = (name, id) => {
        users.value = users.value.map(el => el.id === id ? { id, name } : el)
        saveUsersData[currentTypeSave.value]()
    }

    const deleteUsersData = id => {
        users.value = users.value.filter(el => el.id !== id)
        saveUsersData[currentTypeSave.value]()
    }

    watch(() => currentTypeSave.value, () => {
        switch (currentTypeSave.value) {
            case 'local':
                users.value = JSON.parse(localStorage.getItem('userStore')) ?? []
                break
            case 'session':
                users.value = JSON.parse(sessionStorage.getItem('userStore')) ?? []
                break
            case 'cookie':
                users.value = JSON.parse(getCookie(document.cookie) ?? '[]')
                break
            default: break
        }
    })


    return {
        addUsersData,
        updateUsersData,
        deleteUsersData,
    }
}


export const usePageHome = () => {
    const { users, checkedElementId, currentTypeSave, selectTypeSave } = useState()
    const { addUsersData,updateUsersData, deleteUsersData } = useActions(users, checkedElementId, currentTypeSave)
    provide('addUsersData', addUsersData)
    provide('updateUsersData', updateUsersData)
    provide('deleteUsersData', deleteUsersData)

    return {
        users,
        checkedElementId,
        currentTypeSave,
        selectTypeSave,
    }
}
