import { MODEL_VALUE } from '../../../utils/events';
import { ref, onMounted } from 'vue';

const useState = () => ({
    className: ref('vinput__placeholder'),
});

const useAction = (emit, className) => ({
    onInput(event) {
        emit(MODEL_VALUE, event.target.value);
    },
    onFocus() {
        className.value = 'vinput__placeholder vinput__placeholder__focus';
    },
    onBlur(event) {
        if (!event.target.value) {
            className.value = 'vinput__placeholder';
        }
    },
});


export const useVInput = (props, emit) => {
    const { className } = useState();
    const { onInput, onFocus, onBlur } = useAction(emit, className);

    onMounted(() => {
        if (props.modelValue) {
            onFocus();
        }
    });

    return {
        className,
        onInput,
        onFocus,
        onBlur,
    };
};
