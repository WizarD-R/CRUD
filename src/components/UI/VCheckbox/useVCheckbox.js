import { MODEL_VALUE } from '../../../utils/events'

const useActive = emit => {
    const onChange = event => {
        emit(MODEL_VALUE, event.target.checked)
    }

    return {
        onChange,
    }
}

export const useVCheckbox = (props, emit) => {
    const { onChange } = useActive(emit)

    return {
        onChange,
    }
}
