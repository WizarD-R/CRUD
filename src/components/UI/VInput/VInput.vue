<template>
    <div class="vinput__wrapper">
        <label :class="className">{{ placeholder }}</label>
        <input
            type="text"
            class="vinput__input"
            :value="modelValue"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        />
    </div>
</template>

<script>
import { useVInput } from './useVInput';
import { MODEL_VALUE } from '../../../utils/events';

export default {
    name: 'VInput',
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: [MODEL_VALUE],
    setup(props, { emit }) {
        return useVInput(props, emit);
    },
}
</script>

<style scoped>
.vinput__wrapper {
    position: relative;
    padding-top: 20px;
}

.vinput__input {
    outline: none;
    border: none;
    border-bottom: 2px solid var(--grey);
    min-width: 100px;
    width: calc(100% - 10px);
    min-height: 30px;
    /*border-radius: 4px;*/
    background: transparent;

    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 19px;
    line-height: 16px;
    transition: all .3s;
}

.vinput__input:focus {
    caret-color: var(--purple);
    border-bottom: 2px solid var(--purple);
}

.vinput__placeholder {
    position: absolute;
    top: 23px;
    left: 3px;
    color: var(--grey);
    pointer-events: none;
    transition: all .3s;
}

.vinput__placeholder__focus {
    top: -4px;
    color: var(--purple);
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
}
</style>