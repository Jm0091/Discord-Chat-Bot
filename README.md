# Discord Chat Bot  

A **Discord Bot** built with **Node.js** to provide real-time COVID-19 statistics using **slash commands**.  

This bot fetches **COVID-19** data such as case counts by country, status, and date range. It also includes a fun feature to search for GIFs.  

## APIs Used  
- **COVID-19 Data:** [Coronavirus COVID-19 API](https://documenter.getpostman.com/view/10808728/SzS8rjbc#intro)  
- **GIFs:** [Giphy API](https://developers.giphy.com/docs/api/)  

---

## Features  

### Command 1: `/countrycases [country]`  
Provides the total COVID-19 cases for the specified country.  

**Parameters:**  
- `[country]` - The name of the country to get case statistics for.  

**Example:**  
`/countrycases canada`  

**API Endpoint:**  
`https://api.covid19api.com/total/country/south-africa`  

---

### Command 2: `/casebystatus [country] [status]`  
Fetches COVID-19 cases for a specific country and case type.  

**Parameters:**  
- `[country]` - The name of the country.  
- `[status]` - Case type (`confirmed`, `deaths`, or `recovered`).  

**Example:**  
`/casebystatus india recovered`  

**API Endpoint:**  
`https://api.covid19api.com/dayone/country/india/status/recovered`  

---

### Command 3: `/casesbetweendates [country] [1_dd] [1_mm] [1_yyyy] [2_dd] [2_mm] [2_yyyy]`  
Retrieves COVID-19 cases for a specific country between two dates.  

**Parameters:**  
- `[country]` - The name of the country.  
- `[1_dd] [1_mm] [1_yyyy]` - Start date (day-month-year).  
- `[2_dd] [2_mm] [2_yyyy]` - End date (day-month-year).  

**Example:**  
`/casesbetweendates india 1 3 2020 7 3 2020`  

**API Endpoint:**  
`https://api.covid19api.com/total/country/india/status/confirmed?from=2020-03-01&to=2020-03-05`  

---

### Command 4: `/worldcases [1_dd] [1_mm] [1_yyyy] [2_dd] [2_mm] [2_yyyy]`  
Provides global COVID-19 cases between two dates.  

**Parameters:**  
- `[1_dd] [1_mm] [1_yyyy]` - Start date (day-month-year).  
- `[2_dd] [2_mm] [2_yyyy]` - End date (day-month-year).  

**Example:**  
`/worldcases 1 3 2020 7 3 2020`  

**API Endpoint:**  
`https://api.covid19api.com/world?from=2021-03-01&to=2021-07-01`  

---

### Command 5: `/searchgif [search-term]`  
Returns a GIF based on the provided search term.  

**Parameters:**  
- `[search-term]` - The keyword to search for a GIF.  

**Example:**  
`/searchgif lol`  

**API Endpoint:**  
`https://api.giphy.com/v1/gifs/search?api_key=whXXxnDsqwG32LF0tmfqgpN7tWYIoFmC&q=lol&limit=1`  

---

Feel free to clone this repository, experiment with the code, and customize the bot to your needs! 🚀
