import PropTypes from 'prop-types';
const Modal = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 '>
            <div
                className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="rounded-lg shadow-lg max-w-sm mx-auto p-6 bg-zinc-800">
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal