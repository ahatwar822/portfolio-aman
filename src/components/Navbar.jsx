import React from 'react'
import { navIcons, navLinks } from '../constants'
import dayjs from 'dayjs'

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className='font-bold'> Aman's Portfolio</p>

            <ul>
                {navLinks.map((items) => {
                    return (
                        <li key={items.id}>
                            <a href="#">{items.name}</a>
                        </li>
                    )
                })}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map((items) => {
                    return (
                        <li key={items.id}>
                            <img src={items.img} alt={`${items.id}`} className='icon-hover' />
                        </li>
                    )
                })}
            </ul>

            <time datetime="">{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
)
}

export default Navbar