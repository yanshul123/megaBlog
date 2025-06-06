import React from 'react'
import {Container, Logo, LogoutBtn,} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header(){
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name:'Home',
            slug: '/',
            active:true
        },
        {
            name:'Login',
            slug: '/Login',
            active: !authStatus,
        },
        {
            name:'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name:'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name:"Add posts",
            slug: "/add-posts",
            active: authStatus
        }

    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to ='/'>
                        <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                        item.active ? (
                            <li key = {item.name}>
                              <button
                              onClick={() => navigat(item.slug)}
                              className=''
                              >{item.name}</button>  
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header