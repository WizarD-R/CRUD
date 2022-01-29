import { ref, getCurrentInstance, onUnmounted } from 'vue';
import { MODEL_VALUE } from '../../../utils/events';

const useState = props => {
    const openSelect = ref(false);
    const currentSelect = ref(props.options[0].name);
    const select = ref(null);

    return {
        openSelect,
        currentSelect,
        select,
    };
};

const useAction = (openSelect, currentSelect, select) => {
    const { emit } = getCurrentInstance();
    const clickOutside = event => {
        // console.log(1, event.target)
        if(!openSelect.value) return;
        openSelect.value = !select.value ? false : select.value.contains(event.target);
    };

    const selectMap = element => {
        currentSelect.value = element.name;
        emit(MODEL_VALUE, element.id);
        openSelect.value = false;
    };

    const onSelect = () => {
        openSelect.value = !openSelect.value;
    };

    window.addEventListener('click', event => clickOutside(event));
    onUnmounted(() => window.removeEventListener('click', event => clickOutside(event)));

    return {
        selectMap,
        clickOutside,
        onSelect,
    };
};

export const useSelect = props => {
    const { openSelect, currentSelect, select } = useState(props);
    const { selectMap, clickOutside, onSelect } = useAction(openSelect, currentSelect, select);

    return {
        openSelect,
        currentSelect,
        selectMap,
        clickOutside,
        select,
        onSelect,
    };
};
