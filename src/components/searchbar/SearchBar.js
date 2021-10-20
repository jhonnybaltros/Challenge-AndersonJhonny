import React from 'react'

function SearchBar({onChange}) {
  const onHandler = (event) => {
    const cityName = event.target.value;
    onChange(cityName);
  };

  return (
  <div className='searchwrapper'>
    <input 
      onBlur={onHandler} 
      className='searchbar' 
      placeholder='Search with tab key'/>
  </div>
  )
}

export default SearchBar
