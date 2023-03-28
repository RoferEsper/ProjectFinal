import React from 'react';
import {useState} from 'react';


export const useCart =()=>{
    const [CartOpen,setCartOpen] = useState(false)
 
 
 return {CartOpen, setCartOpen}
 
 }