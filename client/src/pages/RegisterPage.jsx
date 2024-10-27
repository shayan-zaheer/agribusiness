import SellerRegistration from "../components/SellerRegistration";
import BuyerRegistration from "../components/BuyerRegistration";
import HeaderHuz from "../components/HeaderHuz";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import {useState} from "react";

function RegisterPage() {
    const urlParams = new URLSearchParams(window.location.search);
	const user = urlParams.get("user");

    const [selectedCity, setSelectedCity] = useState('');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const citiesOfPakistan = [
        "Abbottabad",
        "Ahmedpur East",
        "Ajk",
        "Alipur",
        "Arifwala",
        "Attock",
        "Bahawalnagar",
        "Bahawalpur",
        "Bannu",
        "Batagram",
        "Burewala",
        "Chakwal",
        "Chaman",
        "Chiniot",
        "Dera Ghazi Khan",
        "Dera Ismail Khan",
        "Faisalabad",
        "Gujranwala",
        "Gujrat",
        "Hyderabad",
        "Islamabad",
        "Jhang",
        "Jhelum",
        "Karachi",
        "Kasur",
        "Khairpur",
        "Lahore",
        "Larkana",
        "Mardan",
        "Matiari",
        "Mingora",
        "Mirpur",
        "Multan",
        "Nawabshah",
        "Nowshera",
        "Okara",
        "Peshawar",
        "Quetta",
        "Rahim Yar Khan",
        "Rawalpindi",
        "Sahiwal",
        "Sargodha",
        "Sialkot",
        "Skardu",
        "Sukkur",
        "Tando Allahyar",
        "Tando Adam",
        "Taxila",
        "Wah Cantt",
        "Wazirabad",
        "Zhob"
    ];  

	return (
        <>
            <HeaderHuz />
            <ToastContainer />
            {user === "seller" && <SellerRegistration cities={citiesOfPakistan} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />}
            {user === "buyer" && <BuyerRegistration cities={citiesOfPakistan} selectedCity={selectedCity}  setSelectedCity={setSelectedCity} />}
            <Footer />
        </>
    )
}

export default RegisterPage;
