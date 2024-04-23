import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon} from '@heroicons/react/24/outline'


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
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button
                                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </Menu.Button>
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
                                            <Menu.Item>
                                                <a
                                                    href="#"
                                                    className={classNames('block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </a>
                                            </Menu.Item>
                                        }
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                {/*<Disclosure.Panel className="sm:hidden">*/}
                {/*    <div className="space-y-1 px-2 pb-3 pt-2">*/}
                {/*        {navigation.map((item) => (*/}
                {/*            <Link*/}
                {/*                key={item.name}*/}
                {/*                to={item.href}*/}
                {/*                className={classNames(*/}
                {/*                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
                {/*                    'block rounded-md px-3 py-2 text-base font-medium'*/}
                {/*                )}*/}
                {/*                aria-current={item.current ? 'page' : undefined}*/}
                {/*            >*/}
                {/*                {item.name}*/}
                {/*            </Link>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</Disclosure.Panel>*/}
            </>

        </Disclosure>
    )
}
