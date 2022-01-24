<template>
    <component-modal v-model="isOpen" @close="onClose">
        <div class="group">
            <component-input v-model="inputValue" placeholder="Имя"/>
            <component-button @click="onCreate">Создать</component-button>
        </div>
    </component-modal>
</template>

<script>
import ComponentButton from "../../../UI/Button/Button"
import ComponentModal from '../../../UI/VModal/VModal'
import ComponentInput from '../../../UI/VInput/VInput'
import { useCrudAdd } from './useCrudAdd'
import { EVENT_CLOSE } from '../../../../utils/events'

export default {
    name: 'CrudAdd',
    components: {
        ComponentModal,
        ComponentButton,
        ComponentInput,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        }
    },
    emits: [EVENT_CLOSE],
    setup() {
        return useCrudAdd()
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