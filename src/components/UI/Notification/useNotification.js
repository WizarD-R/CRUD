import { nextTick, ref } from 'vue'

const useState = props => {
    const isOpen = ref(true)
    const notification = ref(null)
    const height = ref()
    const positions = props.position.split('-')
    const container = document.getElementById('notification-container')

    return {
        isOpen,
        notification,
        height,
        positions,
        container,
    }
}

const useInit = (notification, props, isOpen, height, positions, container) => {
    nextTick(() => {
        height.value = notification.value.offsetHeight + 20
        const countElements = Array.from(container.childNodes).filter(el => el.dataset?.notification === props.position).length

        notification.value.style.setProperty(positions[0], `${(countElements - 1) * (height.value)}px`)
        notification.value.style.setProperty(positions[1], `20px`)
    })

    if (props.duration) setTimeout(() => { isOpen.value = false }, props.duration)
}

const useActions = (notification, height, positions, props, isOpen, container) => {
    const onDelete = () => {
        let queue = false
        container.childNodes.forEach(el => {
            if (el === notification.value.parentElement) queue = true
            if (el.dataset?.notification === props.position && queue) {
                el.firstElementChild.style[positions[0]] = `${el.firstElementChild.style[positions[0]].slice(0, -2) - height.value}px`
            }
        })
        notification.value.parentElement.remove()
        if (!container.childElementCount) container.remove();
    }

    const onClose = () => {
        isOpen.value = false
    }

    return {
        onDelete,
        onClose,
    }
}

export const useNotification = (props) => {
    const { notification, isOpen, height, positions, container } = useState(props)
    const { onDelete, onClose } = useActions(notification, height, positions, props, isOpen, container)
    useInit(notification, props, isOpen, height, positions, container)


    return {
        notification,
        isOpen,
        onDelete,
        positions,
        onClose,
    }
}
