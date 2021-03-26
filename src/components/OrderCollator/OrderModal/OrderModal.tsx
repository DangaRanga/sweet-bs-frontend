import React from 'react';

interface OrderModalProps {
    isOpen: boolean;
    onClose: any;
    orderDetails: object;
}

function OrderModal({
    isOpen: isOpen,
    onClose: onClose,
    orderDetails: orderDetails,
}: OrderModalProps) {
    return <div>{isOpen ? <div> Open </div> : <div>Closed</div>}</div>;
}

export default OrderModal;
