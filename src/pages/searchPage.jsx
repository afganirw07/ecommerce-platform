import Navbar from "../components/homeUser/navbar";
import Footer from "../components/landingPage/footer";
import SearchResult from "../components/homeUser/SearchResult ";
import NavbarNonLogin from "../components/landingPage/navbar";

const SearchPage = () => {
    const isLoggedIn = localStorage.getItem("token") !== null;

    return (
        <>
            {isLoggedIn ? <Navbar /> : <NavbarNonLogin />}
            <SearchResult />
            <Footer />
        </>
    );
};

export default SearchPage;