import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IoLogOut } from 'react-icons/io5'


function Logout(){
    const { logout } = useAuth0()
    return(
        <div  className='mt-2'>
            <button onClick={()=> logout()}><IoLogOut className='w-9 h-9 hover:text-red-400 pl-1'/></button>
        </div>
    )
}

export default Logout