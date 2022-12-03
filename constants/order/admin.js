export const STATUS = {
    DELIVERED: 'delivered',
    DENIED: 'denied',
    DELIVERY: 'delivery',
    CANCELLED: 'cancelled',
    WATTING: 'watting',
};

export const STATUS_OPTIONS = [{
    label: 'Đã giao hàng',
    color: 'green',
    value: STATUS.DELIVERED,
}, {
    label: 'Đã từ chối',
    color: 'purple',
    value: STATUS.DENIED,
}, {
    label: 'Đang giao hàng',
    color: 'orange',
    value: STATUS.DELIVERY,
}, {
    label: 'Đã hủy đơn',
    color: 'red',
    value: STATUS.CANCELLED,
}, {
    label: 'Chờ duyệt',
    color: 'blue',
    value: STATUS.WATTING,
}];
