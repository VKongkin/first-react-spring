/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAccessToken } from "../services/apiService";


const TestImage = () => {
    const [accessToken, setAccessToken] = useState(null);


    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {

    //    token();
      
          fetchImage();
    }, []);

    const token = async () => {
        getAccessToken().then((token) => (async () => {
            console.log("Token ", token);
            const accessToken = await token.access_token;
            setAccessToken("Bearer "+ accessToken);
            return accessToken;
        })());
    }

    const fetchImage = async () => {
        token();
        console.log(accessToken)
        const filename = '20240816234401_b8b14b402a85516c4fc4cefc611edd3ff220c479d499ebce75a617db10fb1fc6.png';
        const SITE_ID = import.meta.env.VITE_SITE_ID;
        const DRIVE_ID = import.meta.env.VITE_DRIVE_ID;
  
        const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/root:/Shared%20Documents/images/${filename}:/content`, {
          method: 'GET',
          headers: {
            Authorization: `${accessToken}`,
          },
        });
  
        if (response.ok) {
          const blob = await response.blob();
          console.log(blob);    
          const imageUrl = URL.createObjectURL(blob);
          setImgSrc(imageUrl);
          console.log(imageUrl);
        } else {
          console.error('Failed to fetch image:', response.statusText);
        }
      };


    return (
        <div>
            <button onClick={fetchImage}>Fetch Image</button>
            <img src={imgSrc} alt={imgSrc} />
            <p>{imgSrc}</p>
        </div>
    );
}
export default TestImage;