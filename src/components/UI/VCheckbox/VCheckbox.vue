<link rel="stylesheet" href="../../../styles/color.css">
<template>
    <div>
        <label class="checkbox__component">
            <input type="checkbox" class="checkbox__input" :checked="modelValue" @change="onChange"/>
            <div class="checkbox__box" />
                <slot />
        </label>
    </div>
</template>

<script>
import { useVCheckbox } from './useVCheckbox';
import { MODEL_VALUE } from '../../../utils/events';

export default {
    name: 'VCheckbox',
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        }
    },
    emits: [MODEL_VALUE],
    setup(props, { emit }) {
        return useVCheckbox(props, emit);
    },
};
</script>

<style scoped>
.checkbox__component {
    user-select: none;
    display: flex;
    gap: 5px;
}

.checkbox__box {
    /*border: 2px solid var(--grey);*/
    border-radius: 2px;
    box-sizing: border-box;
    height: 16px;
    position: relative;
    width: 16px;
    top: 3px;
    left: 1px;
}

.checkbox__box:before {
    content: '';
    background: url('../../../assests/img/checked.svg') no-repeat;
    width: 16px;
    height: 16px;
    position: absolute;
    opacity: 0;
    left: -1px;
    transform: rotate(45deg);
}

.checkbox__input:checked ~ .checkbox__box:before {
    opacity: 1;
    transform: rotate(0);
    transition: transform .1s;
}

.checkbox__input {
    position: absolute;
    opacity: 0;
    z-index: -1;
}
</style>