import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';



 const PrivateRoutes = ({children}) => {
        const {user,loading}=useContext(AuthContext)
        if(loading){
             return   <span className="loading loading-dots loading-lg text-center"></span>
        }
        else if(user){
                return children;
        }
        console.log("navigate")
        return (
        <Navigate to="/login"></Navigate>
        );
};
PrivateRoutes.propTypes={
        children:PropTypes.node,
}
export default PrivateRoutes