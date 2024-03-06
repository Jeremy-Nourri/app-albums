import { PropTypes } from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, signIn,  } from './authSlice';


function ModalFormAuth() {

    const isOpen = useSelector(state => state.auth.modalIsOpen);
    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();

    const inputEmail = useRef();
    const inputPassword = useRef();

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const email = inputEmail.current.value.trim();
        const password = inputPassword.current.value;

        dispatch(signIn({ email, password }));

        inputEmail.current.value = "";
        inputPassword.current.value = "";
    }
    
    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen bg-slate-400 bg-opacity-75">
                <div className="bg-white px-8 rounded-lg text-left overflow-hidden shadow-xl max-w-md sm:w-full">
                    <div className="py-6 max-w-md">
                        <h3 className="mb-6 text-lg leading-6 font-medium text-gray-900 sm:text-md md:text-xl" id="modal-title">
                            Connexion
                        </h3>
                        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
                            <label className="input input-bordered flex items-center gap-2">
                                Email:
                                <input 
                                    type="email"
                                    ref={inputEmail}
                                    className="grow" 
                                    placeholder="example@site.com" 
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                Mot de passe:
                                <input 
                                    type="password"
                                    ref={inputPassword}
                                    className="grow" 
                                />
                            </label>

                            <button type='submit' className="btn btn-primary w-full">
                                Se connecter
                            </button>
                            
                        </form>
                        
                    </div>
                    <div className="px-4 py-3 flex justify-end">
                        <button 
                            type="button" 
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2
                            py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-blue-600 text-base font-medium text-white
                          hover:bg-blue-700 sm:text-xs md:text-sm lg:text-base transition-colors duration-300" 
                            onClick={() => dispatch(closeModal())}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    , document.body);
}

ModalFormAuth.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node
};

export default ModalFormAuth;