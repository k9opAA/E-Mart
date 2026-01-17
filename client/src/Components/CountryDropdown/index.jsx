import { useState } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { IoMdClose } from "react-icons/io";


const CountryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('Dhaka');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (location) => {
        setSelectedLocation(location);
        setOpen(false);
    };

    return (
        <>
            <button className='countryDrop' onClick={handleClickOpen}>
                <div className='info d-flex flex-column'>
                    <span className='lable'>Your Location</span>
                    <span className='name'>{selectedLocation}</span>
                </div>
                <span className='ml-auto'><FaAngleDown /></span>
            </button>
            
            <Dialog onClose={handleClose} open={open} className='locationModal'>
                <button className='closeBtn' onClick={handleClose}><IoMdClose /></button>
                
                <h4 className='mb-0'>Choose your Delivery Location</h4>
                <p>Enter your address and we will specify the offer for your area.</p>

                <div className='headerSearch w-100'>
                    <input type="text" placeholder='Search your area...'/>
                    <button><IoSearchOutline/></button>
                </div>

                <ul className='countryList mt-3'>
                    <li><button>Bagerhat</button></li>
                    <li><button>Bandarban</button></li>
                    <li><button>Barguna</button></li>
                    <li><button>Barishal</button></li>
                    <li><button>Bhola</button></li>
                    <li><button>Bogra</button></li>
                    <li><button>Brahmanbaria</button></li>
                    <li><button>Chandpur</button></li>
                    <li><button>Chapai Nawabganj</button></li>
                    <li><button>Chattogram</button></li>
                    <li><button>Chuadanga</button></li>
                    <li><button>Comilla</button></li>
                    <li><button>Cox’s Bazar</button></li>
                    <li><button>Dhaka</button></li>
                    <li><button>Dinajpur</button></li>
                    <li><button>Faridpur</button></li>
                    <li><button>Feni</button></li>
                    <li><button>Gaibandha</button></li>
                    <li><button>Gazipur</button></li>
                    <li><button>Gopalganj</button></li>
                    <li><button>Habiganj</button></li>
                    <li><button>Jamalpur</button></li>
                    <li><button>Jashore</button></li>
                    <li><button>Jhalokathi</button></li>
                    <li><button>Jhenaidah</button></li>
                    <li><button>Joypurhat</button></li>
                    <li><button>Khagrachari</button></li>
                    <li><button>Khulna</button></li>
                    <li><button>Kishoreganj</button></li>
                    <li><button>Kurigram</button></li>
                    <li><button>Kushtia</button></li>
                    <li><button>Lakshmipur</button></li>
                    <li><button>Lalmonirhat</button></li>
                    <li><button>Madaripur</button></li>
                    <li><button>Magura</button></li>
                    <li><button>Manikganj</button></li>
                    <li><button>Meherpur</button></li>
                    <li><button>Moulvibazar</button></li>
                    <li><button>Munshiganj</button></li>
                    <li><button>Mymensingh</button></li>
                    <li><button>Naogaon</button></li>
                    <li><button>Narail</button></li>
                    <li><button>Narayanganj</button></li>
                    <li><button>Narsingdi</button></li>
                    <li><button>Natore</button></li>
                    <li><button>Netrokona</button></li>
                    <li><button>Nilphamari</button></li>
                    <li><button>Noakhali</button></li>
                    <li><button>Pabna</button></li>
                    <li><button>Panchagarh</button></li>
                    <li><button>Patuakhali</button></li>
                    <li><button>Pirojpur</button></li>
                    <li><button>Rajbari</button></li>
                    <li><button>Rajshahi</button></li>
                    <li><button>Rangamati</button></li>
                    <li><button>Rangpur</button></li>
                    <li><button>Satkhira</button></li>
                    <li><button>Shariatpur</button></li>
                    <li><button>Sherpur</button></li>
                    <li><button>Sirajganj</button></li>
                    <li><button>Sunamganj</button></li>
                    <li><button>Sylhet</button></li>
                    <li><button>Tangail</button></li>
                    <li><button>Thakurgaon</button></li>


                </ul>
            </Dialog>
            
        </>
    )
}

export default CountryDropdown;