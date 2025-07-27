import React from 'react';
import '../css/Cards.css';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';
import img12 from '../assets/img12.jpg';
import img13 from '../assets/img13.jpg';
import CardItem from '../components/CardItem';


function Cards() {
  return (
    
    <div className='cards' >
      <div className='cards__container'>
        <div className='cards__wrapper'> 
        
          <ul className='cards__items'>
            <CardItem
              src={img10}
              text='Party Registration'
              label='IDs'
              path='/Client'
            />
            &emsp;&emsp;&emsp;&emsp;
            <CardItem
              src={img4}
              text='Tax Invoice Bill Registration'
              label='Business'
              path='/TaxInvoiceBill'
            />

          </ul>
        </div>
      </div>
    </div>
  
  );
}

export default Cards;
