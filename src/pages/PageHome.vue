<template>
    <div class="container">
        <component-crud :data="users" v-model:checkedElementId="checkedElementId" />
        <component-select v-model="currentTypeSave" :options="selectTypeSave" />
        <user-list :data="users" v-model:checkedElementId="checkedElementId" />
    </div>
</template>

<script>
import { usePageHome } from './usePageHome'
import ComponentCrud from '../components/CRUD/ComponentCrud'
import UserList from '../components/UserList/UserList'
import ComponentSelect from '../components/UI/VSelect/Select'

export default {
    name: 'PageHome',
    components: {
        UserList,
        ComponentCrud,
        ComponentSelect,
    },
    setup() {
        return usePageHome()
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 50px;
}
</style>