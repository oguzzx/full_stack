import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Search from "../components/Modals/Search/Search";
import Dialog from "../components/Modals/Dialog/Dialog";

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);

  return (
    <div className="main-layout">
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;