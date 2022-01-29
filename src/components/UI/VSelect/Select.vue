<template>
    <div ref="select" :class="[{ 'active': openSelect }, 'select']">
        <div class="checked-element" @click="onSelect" >
            <div class="text">{{ currentSelect }}</div>
            <div :class="[{'arrow-on': openSelect }, 'arrow']" />
        </div>
        <transition name="select">
            <div v-if="openSelect" class="options">
                <template v-for="value in options" :key="value.id">
                    <div class="option" @click="selectMap(value)">
                        {{ value.name }}
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
    import { useSelect } from './useSelect';

    export default {
        name: 'Select',
        props: {
            options: {
                type: Array,
                required: true,
            },
            modelValue: {
                type: String || Number,
                default: false,
            },
        },
        setup(props) {
            return useSelect(props);
        },
    };
</script>

<style scoped>
.select {
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 0 4px 0 rgb(52 52 52 / 25%);
    color: var(--dark-blue);
    display: flex;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    justify-content: center;
    line-height: 16px;
    pointer-events: visible;
    width: 152px;
    cursor: pointer;
}

.checked-element {
    align-items: center;
    display: flex;
    height: 48px;
    justify-content: space-between;
    width: 100%;
}

.active {
    background: var(--dark-white);
    color: rgba(127, 140, 141, 1);
    transition: all .2s;
}

.options {
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 32%);
    color: var(--dark-blue);
    position: absolute;
    transform: translateY(40px);
    width: 150px;
    z-index: 10000;
}

.option {
    align-items: center;
    display: flex;
    min-height: 40px;
    padding-left: 15px;
}

.option:hover {
    background: var(--platinum);
    border-radius: 5px;
    transition: .1s;
}

.text {
    margin-left: 16px;
}

.arrow {
    background-color: var(--grey);
    height: 8px;
    margin-right: 20px;
    -webkit-mask-image: url('../../../assests/img/arrow.svg');
    mask-image: url('../../../assests/img/arrow.svg');
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    transition: .4s;
    width: 11px;
}

.arrow-on {
    transform: rotate(180deg);
}


.select-enter-active,
.select-leave-active {
    transition: all .2s ease;
}

.select-enter-from,
.select-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>
