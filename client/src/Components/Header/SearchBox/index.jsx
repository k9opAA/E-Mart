import Button from '@mui/material/Button';
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
    return (
        <div className='headerSearch'>
            <input type="text" placeholder='Search for products...'/>
            <button><IoSearchOutline/></button>
        </div>
    )
}

    export default SearchBox;