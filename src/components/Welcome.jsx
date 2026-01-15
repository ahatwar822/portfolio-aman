import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 650, default: 100 },
    title: { min: 350, max: 800, default: 350 }
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

const handleMouseMove = (e) => {
        const containerRect = container.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;

        letters.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            const letterCenter =
                rect.left - containerRect.left + rect.width / 2;

            const distance = Math.abs(mouseX - letterCenter);

            // smooth + controlled falloff
            const intensity = Math.exp(-(distance ** 2) / 12000);

            gsap.to(letter, {
                duration: 0.25,
                ease: "power2.out",
                fontVariationSettings: `'wght' ${
                    min + (max - min) * intensity
                }`,
                y: -2 * intensity,
                textShadow: `0px ${1 * intensity}px ${3 * intensity}px rgba(0,0,0,0.25)`
            });
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            gsap.to(letter, {
                duration: 0.35,
                ease: "power2.out",
                fontVariationSettings: `'wght' ${base}`,
                y: 0,
                textShadow: "0px 0px 0px rgba(0,0,0,0)"
            });
        });
    };
    
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
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
            <p ref={subtitleRef} className='cursor-pointer text-gray-300 tracking-wide'>
                {randerText("Hey, I'am Aman! Welcome to my", "text-3xl font-georama italic inline-block", 300)}
            </p>
            <h1 ref={titleRef} className='mt-7 cursor-pointer'>
                {randerText("Portfolio", 'text-9xl italic font-georama',400)}
            </h1>

            <div className='small-screen'>
                <p>This Portfolio is Designed for Desktop/Tablet Screen Only.</p>
            </div>

        </section>
    )
}

export default Welcome