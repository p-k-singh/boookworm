import React, { useState } from 'react'
import { GoogleComponent } from 'react-google-location';
import {TextField} from '@material-ui/core'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  
const Location = (props) => {
    const [address,setAddress] = useState('');
    const [coordinates,setCoordinates] = useState({
        lat:null,
        lng:null
    })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll= await getLatLng(results[0])
        console.log(ll);
        setAddress(value)
        setCoordinates(ll)
        props.setCoordinates(ll);
    }
    return (
        <div className="Location">

                <p>lat:{coordinates.lat}</p>
                <p>lng:{coordinates.lng}</p>
                <p>address:{address}</p>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div 
            
          >
            <TextField 
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              variant='outlined'

            />
          
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
            </div>
    )
}

export default Location
