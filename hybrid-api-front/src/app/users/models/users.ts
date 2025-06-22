 export interface User {
   firstname : string,
   lastname : string,
   uerfullname: string,
   email : string,
   imageUrl: string,
   isAuthenticated: boolean,
   userRole: string,
   type: string,
   authorities:string[]

 }

 export type FormLogin ={
   // firstname: string,
   // lastname ? : string,
   email : string,
   password:string,
 }
 export type RegistrationResponse = {
     success: boolean,
     message:string,
    fullName:string,
 }



 export type FormRegister ={
   firstname: string,
   lastname  : string,
   email : string,
   password:string,
   role: string
 }
