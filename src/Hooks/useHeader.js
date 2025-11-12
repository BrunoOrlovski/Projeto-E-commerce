import { useState, useEffect, useRef, useCallback } from 'react';

export const useHeader = () => {

  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const desktopIconsRef = useRef(null);

  const updateCartCount = useCallback(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalCount = storedCart.reduce((acc, item) => acc + item.quantity, 0);
      setItemCount(totalCount);
    } catch (error) {
      console.error("Erro ao ler o carrinho do localStorage:", error);
      setItemCount(0); 
    }
  }, []); 

  const toggleMenu = useCallback((menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  }, []);

  const toggleSearchInput = useCallback(() => {
    setShowSearchInput(prev => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setActiveMenu(null); 
  }, []);

  const handleLinkClick = useCallback(() => {
    setActiveMenu(null);
    setIsMenuOpen(false); 
  }, []);


  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, [updateCartCount]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        desktopIconsRef.current && !desktopIconsRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
      
      if (
        isMenuOpen && 
        menuRef.current && !menuRef.current.contains(event.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(event.target) &&
        !event.target.closest('.dropdown-parent') 
      ) {
        setIsMenuOpen(false);
      }
    
      if (
        mobileSearchRef.current && !mobileSearchRef.current.contains(event.target) &&
        desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, activeMenu]); 

  return {
    activeMenu,
    showSearchInput,
    isMenuOpen,
    itemCount,
    menuRef,
    hamburgerRef,
    mobileSearchRef,
    desktopSearchRef,
    desktopIconsRef,
    toggleMenu,
    toggleSearchInput,
    toggleMobileMenu,
    handleLinkClick
  };
};