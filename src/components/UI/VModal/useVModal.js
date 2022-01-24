import { MODEL_VALUE } from '../../../utils/events';
import { EVENT_CLOSE } from '../../../utils/events';

const useActive = (props, emit) => ({
    clickOutside() {
        if (!props.clickOutSide){
            emit(MODEL_VALUE, !props.modelValue);
            emit(EVENT_CLOSE);
        }
    },
});

export const useVModal = (props, emit) => {
    const { clickOutside } = useActive(props, emit);

    return {
        clickOutside,
    };
};
