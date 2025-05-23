import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Placelist from '../components/Placelist';
import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;  

 useEffect(() => {
  const fetchPlaces = async () => {
    if (!userId) return;
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
      );
      setLoadedPlaces(responseData.places);
    } catch (err) {}
  };
  fetchPlaces();
}, [sendRequest, userId]);


  const placeDeleteHandler=deletedPlaceId=>{
    setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place.id !==deletedPlaceId));
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <Placelist items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
    </React.Fragment>
  );
};

export default UserPlaces;
