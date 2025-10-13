import { createContext } from "react";

export const ApiContext = createContext();

export default function AuthProvider (props)  {


  const currency ='$'
  const calculateAge = (dob) => {
    const today =  new Date()
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const slotDateFormate = (slotDate) => {
      if (!slotDate) return "N/A";
      const dateArray = slotDate.split('_');
      const day = dateArray[0];
      const month = months[Number(dateArray[1]) - 1];
      const year = dateArray[2];
      return `${day} ${month} ${year}`;
    }
    const value ={
        calculateAge,
        slotDateFormate,
        currency
    }
  return (
    <ApiContext.Provider value={value}>
        {props.children}
    </ApiContext.Provider>
  )
}