import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const FONT_WEIGHTS = {
    subtitle : { min: 100, max: 500, default: 100},
    title: { min: 350, max: 900, default: 350 }
}
const randerText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setupTextHover = (container, text) => {
    if (!container) return () => {};

    const letters = container.querySelectorAll("span")
    const {min, max, default: base} = FONT_WEIGHTS[text]
    const animateLetter = (letter, weight, duration= 0.20) => {
        return gsap.to(letter,{
            duration,
            ease: "power2.inOut",
            fontVariationSettings: `'wght' ${weight}`
        });
    };

    const handleMouesMove = (e) => {
        const {left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter, i) => {
            const {left:l , width: w} = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l- left + w/2));
            const intensity = Math.exp( -(distance **2)/ 20000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };
    const handleMouseLeave = () => {
        letters.forEach((letter, i) => {
            animateLetter(letter, base, 0.3);
        });
    };
    
    container.addEventListener("mousemove", handleMouesMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouesMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
} 

const Welcome = () => {

    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
       const titleCleanup = setupTextHover(titleRef.current, 'title');
       const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

       return () => {
        titleCleanup();
        subtitleCleanup();
       }
    }, [])
    return (
        <section id='welcome'>
            <p ref={subtitleRef} className='cursor-pointer'>
                {randerText("Hey, I'am Aman! Welcome to my", 'text-3xl font-georama', 100)}
            </p>
            <h1 ref={titleRef} className='mt-7 cursor-grab'>
                {randerText("Portfolio", 'text-9xl italic font-georama',400)}
            </h1>

            <div className='small-screen'>
                <p>This Portfolio is Designed for Desktop/Tablet Screen Only.</p>
            </div>

        </section>
    )
}

export default Welcome