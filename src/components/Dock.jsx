import React, { useRef } from 'react'
import { dockApps } from '../constants'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Dock = () => {
    const dockRef = useRef(null)

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock)
            return;

        const icons = dock.querySelectorAll('.dock-icon');
        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2.4) / 12000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -25 * intensity,
                    duration: 0.2,
                    ease: "power2.out",
                    
                });
            })
        }

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        }

        const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out",
        }))

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcons);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);
        }
    }, [])


    const toggleApp = (app) => { }
    return (
        <section id='dock'>
            <div ref={dockRef} className="dock-container">
                {dockApps.map((items) => {
                    return (
                        <div key={items.id} className='relative flex justify-center'>
                            <button className='dock-icon' type='button' aria-label={items.name}
                                data-tooltip-id='dock-tooltip'
                                data-tooltip-content={items.name}
                                data-tooltip-delay-show={150}
                                disabled={!items.canOpen}
                                onClick={() => toggleApp(items.id, items.canOpen)}
                            >
                                <img src={`images/${items.icon}`}
                                    alt={items.name}
                                    loading='lazy'
                                    className={items.canOpen ? '' : 'opacity-60'} />

                            </button>

                        </div>
                    )
                })}
                <Tooltip id='dock-tooltip' place='top' className='tooltip' />
            </div>
        </section>
    )
}

export default Dock