import ReactLoading from 'react-loading';
import style from "./LoadingIndicator.module.css";


const LoadingIndicator = (props) => {
    return (
        <ReactLoading className={style.loading} type={"bars"} color={"#ffffff"} height={'10%'} width={'10%'} />
    );
};

export default LoadingIndicator