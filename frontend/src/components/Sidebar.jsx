import { Menu, MessageSquare, CircleQuestionMark, History, Settings, SquarePen, UserRound, Search, Images } from 'lucide-react'
import React, { useState } from 'react'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    return (
        <div className=' inline-flex flex-col justify-between min-h-[100vh] bg-[#f0f4f9] px-3 py-4'>
            <div className=' flex flex-col'>
                <div className='inline-flex items-center justify-center w-fit p-3 rounded-full cursor-pointer hover:bg-[#e2e6eb]'>
                    <Menu
                        size={18}
                        onClick={() => setExtended(prev => !prev)}
                    />
                </div>

                <div className=' mt-[50px] inline-flex items-center gap-2 p-3 bg-[#e6eaf1] rounded-full text-sm text-gray-500 cursor-pointer hover:bg-[#e2e6eb] mb-1'>
                    <SquarePen size={18} />
                    {extended ? <p>New Chat</p> : null}
                </div>
                <div className=' inline-flex items-center gap-2 p-3 rounded-full text-sm cursor-pointer hover:bg-[#e2e6eb]'>
                    <Search size={18} />
                    {extended ? <p>Search Chats</p> : null}
                </div>
                <div className=' inline-flex items-center gap-2 p-3 rounded-full text-sm cursor-pointer hover:bg-[#e2e6eb]'>
                    <Images size={18} />
                    {extended ? <p>Library</p> : null}
                </div>
                {extended
                    ?
                    <div className=' flex flex-col mt-6'>
                        <p className=' mt-8 mb-2 text-gray-500'>Recent Chats</p>
                        <div className=' flex items-start gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                            <MessageSquare size={18} />
                            <p>What is React ...</p>
                        </div>
                    </div>
                    : null
                }
            </div>
            <div className=' flex flex-col'>
                <div className='flex items-start gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <UserRound size={18} />
                    {extended ? <p></p> : null}
                </div>


                {/* <div className='flex items-start gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <CircleQuestionMark size={18} />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className='flex items-start gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <History size={18} />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className='flex items-start gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <Settings size={18} />
                    {extended ? <p>Settings</p> : null}
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar