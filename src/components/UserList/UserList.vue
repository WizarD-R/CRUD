<template>
    <component-input v-model="searchInput" class="input" placeholder="Поиск" />
    <transition-group name="list">
        <div v-if="!data.length" class="no-item" key="no-item">Список пуст</div>
            <template v-for="{ id, name } in data" :key="id">
                <div v-if="name.includes(searchInput)" class="item">
                    <component-checkbox :modelValue="checkedElementId === id" @change="onChange(id)">
                        <div class="label">
                            {{ id }} ---- {{ name }}
                        </div>
                    </component-checkbox>
                </div>
            </template>
    </transition-group>
</template>

<script>
import ComponentCheckbox from '../UI/VCheckbox/VCheckbox'
import ComponentInput from '../UI/VInput/VInput';
import { MODEL_VALUE_CHECKED_ID } from '../../utils/events'
import { useUserList } from './useUserList'

export default {
    name: 'UserList',
    components: {
        ComponentCheckbox,
        ComponentInput,
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
        checkedElementId: {
            type: Number,
            default: null,
        },
    },
    emits: [MODEL_VALUE_CHECKED_ID],
    setup() {
        return useUserList()
    }
}
</script>

<style scoped>
.item {
    display: flex;
    padding-top: 20px;
    cursor: pointer;
}

.label {
    font-family: Roboto, sans-serif;
    font-size: 20px;
    color: var(--white);
    cursor: pointer;
}

.no-item {
    color: var(--white);
    font-size: 20px ;
}

.input {
    color: var(--white) !important;
}


.list-enter-active,
.list-leave-active {
    transition: all .5s;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(100px);
}
</style>
