import React from 'react';
import { Modal } from '../../components/index';

const ModalHeader = () => (
    <div>
        我是modal的header部分
    </div>
);

const ModalDemo = ( props ) => (
    <div>
        <Modal size="large" header={ ModalHeader() } hasEnsure={ true } hasCancel={ true } >
            <div>
                我是modal的body部分
            </div>
        </Modal>
    </div>
);

export default ModalDemo;

