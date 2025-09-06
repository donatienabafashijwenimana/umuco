import { create } from "zustand";


export const swichpage = create((set)=>({
    page:'ahabanza',
    setpage:(p)=>{
       set({page:p})
    }
}))