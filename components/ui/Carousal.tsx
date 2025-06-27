"use client"

import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, useRef, useState } from "react";

interface ICarousel {
    children?: ReactNode[];
    showIndicators?: boolean;
    spacing?: 'sm' | 'md' | 'lg';
    showArrows?: boolean;
    className?: string;
}

export default function Carousel({
    children,
    showIndicators = false,
    spacing = 'md',
    showArrows = true,
    className = ""
}: ICarousel) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const spacingClasses = {
        sm: 'space-x-4',
        md: 'space-x-6',
        lg: 'space-x-8'
    };

    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`relative ${className} `}>
            {/* Left Arrow */}
            {showArrows && canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-secondary-3/50 hover:bg-secondary-3 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                    aria-label="Scroll left"
                >
                    <ArrowLeft />
                </button>
            )}

            {/* Right Arrow */}
            {showArrows && canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-secondary-3/50 hover:bg-secondary-3 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
                    aria-label="Scroll right"
                >
                    <ArrowRight />
                </button>
            )}

            {/* Carousel Container */}
            { children ? (
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto pb-4 no-scrollbar"
                onScroll={checkScrollability}
                style={{ scrollSnapType: 'x mandatory' }}
            >
                <div className={`flex ${spacingClasses[spacing]} min-w-max px-4`}>
                    {children.map((child, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            ) :
            (
                <div>no items found</div>
            )
            }
        </div>
    );
}