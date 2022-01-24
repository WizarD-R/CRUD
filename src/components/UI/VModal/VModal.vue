<template>
    <teleport to="body">
        <transition name="modal__animation">
            <div v-if="modelValue" class="modal__overlay" @click="clickOutside">
                <div class="modal__wrapper" @click.stop>
                    <slot />
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { useVModal } from './useVModal';
import { MODEL_VALUE, EVENT_CLOSE } from '../../../utils/events';


export default {
    name: 'VModal',
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
         clickOutSide: {
            type: Boolean,
             default: false,
         }
    },
    emits: [MODEL_VALUE, EVENT_CLOSE],
    setup(props, { emit }) {
        return useVModal(props, emit)
    },
}
</script>

<style scoped>
.modal__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal__wrapper {
    min-width: 10px;
    min-height: 10px;
    padding: 20px;
    background: var(--white);
    border-radius: 20px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.4);
    max-height: 650px;
    max-width: 650px;
    overflow: auto;
    /*pointer-events: none;*/
}

.modal__animation-enter-active,
.modal__animation-leave-active {
    transition: opacity .1s;
}

.modal__animation-enter-from,
.modal__animation-leave-to {
    opacity: 0;
}

.modal__wrapper::-webkit-scrollbar {
    height: 17px;
}

.modal__wrapper::-webkit-scrollbar-thumb {
    background: var(--beige);
    border: 6px solid var(--white);
    border-radius: 27px;
}

.modal__wrapper::-webkit-scrollbar-track {
    background: var(--white);
}

.modal__wrapper:hover::-webkit-scrollbar-thumb {
    background: var(--scroll-grey);
}
</style>