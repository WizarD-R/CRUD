<template>
    <div class="wrapper">
        <component-button @click="isAdd = true"> ДОБАВИТЬ </component-button>

        <component-button @click="onDelete"> УДАЛИТЬ </component-button>

        <component-button :disabled="!data.length" @click="isUpdate = true"> ИЗМЕНИТЬ </component-button>

        <crud-add
            :is-open="isAdd"
            @close="isAdd = false"
        />

        <crud-update
            :is-open="isUpdate"
            :checked-element-id="checkedElementId"
            :data="data"
            @close="isUpdate = false"
        />
    </div>
</template>

<script>
import { useComponentCrud } from './useComponentCrud'
import ComponentButton from "../UI/Button/Button"
import CrudAdd from './components/CrudAdd/CrudAdd'
import CrudUpdate from './components/CrudUpdate/CrudUpdate'
import { MODEL_VALUE_CHECKED_ID } from '../../utils/events'


export default {
    name: 'ComponentCrud',
    components: {
        ComponentButton,
        CrudAdd,
        CrudUpdate,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        checkedElementId: {
            type: Number,
            default: null,
        },
    },
    emits: [MODEL_VALUE_CHECKED_ID],
    setup(props) {
        return useComponentCrud(props)
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    gap: 15px;
}
</style>