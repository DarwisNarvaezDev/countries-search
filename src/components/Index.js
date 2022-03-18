import React, { useRef, useState } from "react";

const Index = () => {
  const [countries, setCountries] = useState([]);

  const inputRef = useRef("");

  const getCountriesFromApi = async (key) => {
    const response = await fetch(
      `https://restcountries.com/v2/name/${key}?fields=name`
    );
    if (!response.ok) {
      const err = new Error("Nothing retrieved from API");
      err.response = response;
      setCountries([{ name: "No matches found" }]);
      throw err;
    }
    const data = await response.json();

    setCountries(data);
  };

  return (
    <div className="main">
      <div className="container">
        <h1>All the countries in the world!</h1>
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a Country"
            onChange={() => {
              if (inputRef !== "") {
                setCountries([]);
              }
            }}
            onKeyUp={(e) => {
              const countryName = inputRef.current.value;
              if (countryName !== "") {
                getCountriesFromApi(countryName);
              }
            }}
          ></input>
          <div className="countries-list">
            <ul>
              {countries.length > 0 &&
                countries.map((country) => {
                  return <li key={country.name}>{country.name}</li>;
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
