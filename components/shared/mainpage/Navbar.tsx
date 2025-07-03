"use client"

import Link from "next/link"
import Button from "../../ui/Button"
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'search', href: '/search' },
    { name: 'manage', href: '/manage' },
    { name: 'profile', href: '/profile' },
  ]; 

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="p-1 bg-secondary-1/50 hidden md:flex items-center bg-dark-1/70 text-light-1 justify-between px-8 mx-4 my-2 rounded-full shadow-2xl backdrop-blur-md relative overflow-hidden w-[70vw]">            
        <h1 className="font-extrabold text-2xl">EventNITT</h1>
        
        <div className="flex gap-4 relative z-10">
          {navItems.map((item) => (
            <Link
            href={item.href}
            key={item.name}
            className="px-4 py-2 rounded-full bg-transparent hover:bg-white/10 transition-all duration-300 hover:shadow-lg capitalize"
          >
            <p className="text-sm font-bold">{item.name}</p>
          </Link>
          ))}
        </div>        
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="text-light-1 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-dark-1/70 shadow-xl rounded-b-lg">
          <div className="flex items-center justify-between px-3 ">
            <h1 className="font-extrabold text-2xl">EventNITT</h1>
            <button
              onClick={handleToggle}
              className="p-2 z-50 relative"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Full Screen Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-3xl z-40 flex flex-col justify-center items-center"
          >
            <div className="space-y-12 text-center">
              {navItems.map((item, i) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={handleToggle}
                  className="block text-4xl font-bold capitalize text-light hover:text-secondary-3 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
