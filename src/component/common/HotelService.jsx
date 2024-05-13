import React from 'react';
import Header from './Header';
import CardForRow from './CardForRow';

function HotelService() {
    return (
        <>
            
            <div className='container mx-auto px-4 py-6'>
                <div className='flex flex-row gap-x-4'>
                    <span>Services at HotelPerk 24-Hour Front Desk</span>
                </div>
            </div>
            <hr />
            <section>
                <div className='container mx-auto px-4 py-6'>
                    <div className="container mx-auto p-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 py-2">
                                <CardForRow title="Wi-Fi" content="This is the content of card 1." />
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 py-2">
                                <CardForRow title="Mini Bar" content="This is the content of card 2." />
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-2 py-2">
                                <CardForRow title="Parking" content="This is the content of card 3." />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HotelService;
