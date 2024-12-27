import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const typeOptions = [
  { value: '', label: 'Any' },
  { value: 'house', label: 'House' },
  { value: 'flat', label: 'Flat' }
];

export default function SearchForm({ onSearch }) {
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [dateAfter, setDateAfter] = useState(null);
  const [dateBefore, setDateBefore] = useState(null);
  const [postcode, setPostcode] = useState('');

  const handleSearch = () => {
    onSearch({
      type,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      dateAfter,
      dateBefore,
      postcode
    });
  };

  return (
    <div>
      <label>Property Type:</label>
      <Select
        options={typeOptions}
        onChange={(opt) => setType(opt.value)}
        placeholder="Choose type..."
      />
      
      <label>Min Price:</label>
      <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />

      <label>Max Price:</label>
      <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />

      <label>Min Bedrooms:</label>
      <input type="number" value={minBeds} onChange={e => setMinBeds(e.target.value)} />

      <label>Max Bedrooms:</label>
      <input type="number" value={maxBeds} onChange={e => setMaxBeds(e.target.value)} />

      <label>Date After:</label>
      <DatePicker selected={dateAfter} onChange={(date) => setDateAfter(date)} dateFormat="yyyy-MM-dd" />

      <label>Date Before:</label>
      <DatePicker selected={dateBefore} onChange={(date) => setDateBefore(date)} dateFormat="yyyy-MM-dd" />

      <label>Postcode area:</label>
      <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="e.g. BR1" />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
