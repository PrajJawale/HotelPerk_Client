import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import Parallax from '../common/Parallax'
import HotelService from '../common/HotelService'
import RoomInRow from '../common/RoomInRow'

function Home() {
    return (
        <section className='my-10 justify-center '>

            <div className='my-10 '>
                <Parallax/>    
            </div>

            <div className='container  justify-center px-10'>
              <HotelService/>
              

            </div>

            <div className='container my-5 justify-center flex px-5'>
               <RoomInRow/>
            </div>



        </section>
    )
}

export default Home
