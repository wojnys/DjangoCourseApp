import {Fragment, useContext} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import AuthContext from "../Context/AuthProvider";
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";


// Admin navigation
const navigation = [
    {
        name: "Course",
        links: [{name: "Main Page", href: "/admin/course"}, {
            name: "Create",
            href: "/admin/course/create"
        }, {name: "View all courses", href: "/admin/course/all"}]
    },
    {
        name: "Users",
        links: [{name: "Main Page", href: "/admin/user"}, {name: "View all users", href: "/admin/user/all"}]
    },
    {
        name: "Topics",
        links: [{name: "Main Page", href: "/admin/topic"}, {
            name: "Create",
            href: "/admin/topic/create"
        }, {name: "View all topics", href: "/admin/topic/all"}]
    },
    {
        name: "Pricing",
        links: [{name: "Main Page", href: "/admin/pricing"}, {
            name: "Create",
            href: "/admin/pricing/create"
        }, {name: "View all prices", href: "/admin/pricing/all"}]
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar() {

    let {user, logoutUser} = useContext(AuthContext)
    console.log(user)
    const currentUrl = String(window.location.href);
    console.log(currentUrl)

    return (
        <Disclosure as="nav" className="bg-gray-800">

            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <Disclosure.Button
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5"/>
                                <span className="sr-only">Open main menu</span>
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                /* LOGO IMAGE */
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item, index) => (
                                        <Menu as="div" className="relative ml-10" key={index}>

                                            <Menu.Button className={"text-amber-50"}>
                                                {item.name}
                                            </Menu.Button>

                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {
                                                    item.links.map((link, index) => (
                                                        <Menu.Item key={index}>
                                                            <a
                                                                href={link.href}
                                                                className={classNames('block px-4 py-2 text-sm text-gray-700')}>
                                                                {link.name}
                                                            </a>
                                                        </Menu.Item>
                                                    ))
                                                }
                                            </Menu.Items>
                                        </Menu>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            {/* Profile dropdown */}
                            {
                                user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div className={"flex items-center w-full flex-col"}>
                                            <Menu.Button
                                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="https://www.iconpacks.net/icons/5/free-no-profile-picture-icon-15257-thumb.png"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                            <div className={"text-white text-center text-xs"}>
                                                {user.username}
                                            </div>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {
                                                    <div className={"flex flex-col"}>
                                                        <Menu.Item>
                                                            <a
                                                                href={"/user/profile"}
                                                                className={classNames('block px-4 py-2 text-sm text-gray-700')}>
                                                                Profile
                                                            </a>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <a
                                                                href={"/user/profile/orders"}
                                                                className={classNames('block px-4 py-2 text-sm text-gray-700')}>
                                                                Display all orders
                                                            </a>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Button onClick={logoutUser} sx={{padding: 0.5}}>
                                                                Logout
                                                            </Button>
                                                        </Menu.Item>
                                                    </div>
                                                }
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <>
                                        <div className="">
                                            <a className={`px-4 py-3 rounded-l-xl m-0 hover:bg-amber-500 transition ${currentUrl.includes("login") ? 'bg-amber-50 text-black' : 'bg-black text-white'}`}
                                               href={"/login"}>Login
                                            </a>
                                            <a className={`px-4 py-3 rounded-r-xl e m-0 hover:bg-amber-500 transition ${currentUrl.includes("register") ? 'bg-amber-50 text-black' : 'bg-black text-white'}`}
                                               href={"/register"}>Register
                                            </a>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>

        </Disclosure>
    )
}
