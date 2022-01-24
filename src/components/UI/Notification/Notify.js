import { h, render } from 'vue'
import NotificationItem from './Notification'

const createContainer = () => {
    const container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
    return container;
};

export default (options = {}) => {
    let container = document.getElementById('notification-container')
    if (!container) container = createContainer()

    const wrapper = document.createElement('div')
    wrapper.dataset.notification = options.position ?? 'top-right'

    const notification = h(NotificationItem, options)
    render(notification, wrapper)
    container.appendChild(wrapper)
}
