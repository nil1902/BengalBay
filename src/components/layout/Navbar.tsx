import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Theme toggle removed
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const Navbar = ({ cartItemCount = 0 }: NavbarProps) => {
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"}`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/images/logo/nils-kitchen-logo.svg"
            alt="Nil's Kitchen Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`px-4 py-2 transition-colors ${location.pathname === "/menu" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
                  asChild
                >
                  <Link to="/menu">Menu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`px-4 py-2 transition-colors ${location.pathname === "/gallery" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
                  asChild
                >
                  <Link to="/gallery">Gallery</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`px-4 py-2 transition-colors ${location.pathname === "/reservations" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
                  asChild
                >
                  <Link to="/reservations">Reservations</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`px-4 py-2 transition-colors ${location.pathname === "/about" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
                  asChild
                >
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`px-4 py-2 transition-colors ${location.pathname === "/contact" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
                  asChild
                >
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth & Cart Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme toggle removed */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-amber-100 hover:text-amber-600"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=orders" className="cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=bookings" className="cursor-pointer">
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile?tab=payment" className="cursor-pointer">
                    Payment Methods
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                className="hover:text-amber-600 hover:bg-amber-50"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="default"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                asChild
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}

          <CartDrawer />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="hover:bg-amber-100 hover:text-amber-600"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/menu"
              className={`py-2 border-b border-gray-100 ${location.pathname === "/menu" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
              onClick={toggleMobileMenu}
            >
              Menu
            </Link>
            <Link
              to="/gallery"
              className={`py-2 border-b border-gray-100 ${location.pathname === "/gallery" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
              onClick={toggleMobileMenu}
            >
              Gallery
            </Link>
            <Link
              to="/reservations"
              className={`py-2 border-b border-gray-100 ${location.pathname === "/reservations" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
              onClick={toggleMobileMenu}
            >
              Reservations
            </Link>
            <Link
              to="/about"
              className={`py-2 border-b border-gray-100 ${location.pathname === "/about" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`py-2 border-b border-gray-100 ${location.pathname === "/contact" ? "text-amber-600 font-medium" : "text-gray-700 hover:text-amber-600"}`}
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-700 hover:text-amber-600"
                    onClick={toggleMobileMenu}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/profile?tab=orders"
                    className="block py-2 text-gray-700 hover:text-amber-600"
                    onClick={toggleMobileMenu}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile?tab=bookings"
                    className="block py-2 text-gray-700 hover:text-amber-600"
                    onClick={toggleMobileMenu}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/profile?tab=payment"
                    className="block py-2 text-gray-700 hover:text-amber-600"
                    onClick={toggleMobileMenu}
                  >
                    Payment Methods
                  </Link>
                  <button
                    className="block w-full text-left py-2 text-gray-700 hover:text-amber-600"
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className="justify-center hover:text-amber-600 hover:bg-amber-50"
                    asChild
                  >
                    <Link to="/login" onClick={toggleMobileMenu}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    className="justify-center bg-amber-600 hover:bg-amber-700 text-white"
                    asChild
                  >
                    <Link to="/register" onClick={toggleMobileMenu}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}

              <button
                className="flex items-center justify-between py-3 mt-4 border-t border-gray-100 text-gray-700 hover:text-amber-600 w-full"
                onClick={() => {
                  toggleMobileMenu();
                  document.querySelector('[aria-label="Open cart"]')?.click();
                }}
              >
                <span className="flex items-center">
                  <CartDrawer>
                    <span className="flex items-center">Cart</span>
                  </CartDrawer>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
