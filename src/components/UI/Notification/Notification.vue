<template>
    <transition name="notification" @after-leave="onDelete">
        <div v-show="isOpen" ref="notification" :class="['container', ...positions]">
            <div :class="type" />
            <div class="text">{{ message }}</div>
            <div v-if="!duration" class="close" @click="onClose"/>
        </div>
    </transition>
</template>

<script>
import { useNotification } from './useNotification';
export default {
    name: 'Notification',
    props: {
        message: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'success',
            validator: val => ['success', 'warning', 'info', 'error'].includes(val),
        },
        duration: {
            type: Number,
            default: 0,
        },
        position: {
            type: String,
            default: 'top-right',
            validator: val => ['top-right', 'top-left', 'bottom-left', 'bottom-right'].includes(val),
        },
    },

    setup(props) {
       return useNotification(props)
    }
}
</script>

<style scoped>
.container {
    align-items: center;
    background: var(--white);
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25), 0 -3px 10px rgba(52, 52, 52, 0.25);
    box-sizing: border-box;
    display: flex;
    gap: 13px;
    margin: 20px 0;
    max-height: fit-content;
    padding: 15px;
    position: fixed;
    right: -100%;
    top: 20%;
    /*transition: right .3s ease-in-out, left .3s ease-in-out, top .25s ease-in-out, bottom .25s ease-in-out;*/
    transition: all .3s ease-in-out;
}

.left {
    left: -100%;
    right: auto;
}

.bottom {
    bottom: 20%;
    top: auto;
}

.text {
    color: var(--dark);
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    max-width: 424px;
}

.close {
    cursor: pointer;
    height: 22px;
    position: relative;
    width: 22px;
}

.close:after {
    background-color: var(--grey);
    border-radius: 5px;
    content: '';
    height: 22px;
    left: 10px;
    position: absolute;
    transform: rotate(45deg);
    width: 2px;
}

.close:before {
    background-color: var(--grey);
    border-radius: 5px;
    content: '';
    height: 22px;
    left: 10px;
    position: absolute;
    transform: rotate(-45deg);
    width: 2px;
}

.success {
    background-color: var(--green);
    height: 30px;
    -webkit-mask-image: url('../../../assests/img/checked.svg');
    mask-image: url('../../../assests/img/checked.svg');
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    width: 20px;
}

.warning {
    background-color: var(--warning);
    height: 24px;
    -webkit-mask-image: url('../../../assests/img/warning.svg');
    mask-image: url('../../../assests/img/warning.svg');
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    width: 33px;
}

.info {
    background-color: var(--grey);
    height: 20px;
    -webkit-mask-image: url('../../../assests/img/info.svg');
    mask-image: url('../../../assests/img/info.svg');
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    width: 20px;
}

.error {
    background-color: var(--gules);
    height: 24px;
    -webkit-mask-image: url('../../../assests/img/error.svg');
    mask-image: url('../../../assests/img/error.svg');
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    width: 24px;
}


.notification-enter-active,
.notification-leave-active {
    transition: all .2s;
}

.notification-leave-to {
    opacity: 0;
}
</style>