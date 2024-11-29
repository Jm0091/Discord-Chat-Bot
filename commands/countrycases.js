const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

/**
 * Function calls the API endpoint to validate the country name with their database list of countries
 * 
 * @param {string} countryName name of country provided by user in discord
 * @returns true if the cuontry is in the database
 */
async function verifyCountry(countryName) {
  try {
    const response = await axios.get('https://api.covid19api.com/countries');
    var resStr = await JSON.stringify(response.data);
    var resJSON = await JSON.parse(resStr);
    let countryValid = false;

    let lowerCountry;
    for (let i = 0; i < resJSON.length; i++) {
      lowerCountry = resJSON[i].Country.toLowerCase();
      if (lowerCountry == countryName) {
        countryValid = true;
      }
    }

    return countryValid;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function covidRecords calls covidRecords API with provided countryName and return covid cases for that country
 *      ->  //https://api.covid19api.com/total/country/south-africa 
 * @param {string} country 
 * @returns msg with the count of cases
 */
async function covidRecords(country) {
  try {

    if (await verifyCountry(country)) {

      const response = await axios.get('https://api.covid19api.com/total/country/' + country);
      var resStr = await JSON.stringify(response.data);
      var resJSON = await JSON.parse(resStr);

      let countCases = resJSON[resJSON.length-1].Confirmed;
      return "Total number of COVID-19 cases for " + country + " are " + countCases;
    } else {
      return "Oops! Sorry not able to find any record for " + country;
    }
  } catch (error) {
    console.error(error);
  }

}

/**
 *  /countrycases [country]  -> command takes one required parameter and returns covid cases for that country.
 *                           ->  //https://api.covid19api.com/total/country/south-africa 
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('countrycases')
    .setDescription('Total number of covid cases for country')
    .addStringOption(option => option.setName('country')              //string input - search term for gif
      .setDescription('Country name to get all covid cases')
      .setRequired(true)),

  async execute(interaction) {
    const country = interaction.options.getString('country');
    if (country) return interaction.reply(await covidRecords(country));
    return interaction.reply('No option was provided!');
  }

}