import React from 'react';
import /*Loader,*/ { InfinitySpin } from 'react-loader-spinner';


export const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            {/* <Loader type='Puff' color='00BFFF' height={ 55 } width={ 80 }/> */}
            <InfinitySpin color="grey" />
        </div>
    )
}
