<template>
    <component-modal v-model="isOpen" @close="onClose">
        <div class="group">
            <component-input v-model="inputValue" :placeholder="placeholder"/>
            <component-button @click="onUpdate">Обновить</component-button>
        </div>
    </component-modal>
</template>

<script>
import ComponentButton from "../../../UI/Button/Button"
import ComponentModal from '../../../UI/VModal/VModal'
import ComponentInput from '../../../UI/VInput/VInput'
import { EVENT_CLOSE } from '../../../../utils/events'
import { useCrudUpdate } from './useCrudUpdate'

export default {
    name: 'CrudUpdate',
    components: {
        ComponentButton,
        ComponentModal,
        ComponentInput,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        checkedElementId: {
            type: Number,
            default: null,
        },
        data: {
            type: Array,
            default: () => [],
        },
    },
    emits: [EVENT_CLOSE],
    setup(props) {
        return useCrudUpdate(props)
    }
}
</script>

<style scoped>
.group {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>