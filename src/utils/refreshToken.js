export const refreshToken = (res) =>
{
   let refreshTiming = (res.tokenObj.expires_in || 3600-5*60)*1000;
   const refToken = async () =>{
       const newAuthRes = await res.reloadAuthResponse();
       refreshTiming = (newAuthRes.expires_in || 3600-5*60)*1000;
       console.log('new auth res',newAuthRes);
       console.log('new auth token',newAuthRes.id_token);
       //setting up other timer
       setTimeout(refToken,refreshTiming);
   }
   //setting up first timer
   setTimeout(refToken,refreshTiming);
}