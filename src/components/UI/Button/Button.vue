<template>
    <button
        :class="['button', styled, size, { loading, disabled }]"
        :disabled="disabled"
        :type="type"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'md',
            validator: val => ['sm', 'md', 'lg'].includes(val),
        },
        styled: {
            type: String,
            default: 'primary',
            validator: val => ['primary'].includes(val),
        },
        type: {
            type: String,
            default: 'button',
            validator: val => ['submit', 'reset', 'button'].includes(val),
        }
    },
}
</script>

<style scoped>
.button {
    background-color: var(--white);
    border-radius: 5px;
    outline: none;
    color: var(--white);
    border: 2px solid transparent;
    width: fit-content;
    padding: 10px;
    user-select: none;
    cursor: pointer;
    transition: all .1s;
    display: flex;
    align-items: center;
}

.sm {
    height: 18px;
}

.md {
    height: 30px;
}

.lg {
    height: 40px;
}

.primary {
    background: var(--blue);
}

.primary:hover {
    background: var(--hover-blue);
}

.primary:active {
    background: var(--active-blue);
}

.disabled {
    background: var(--beige);
    cursor: not-allowed;
    color: var(--grey);
}

.disabled:hover {
    background: var(--beige);
}

</style>