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
 * Function covidRecords calls covidRecords API with provided countryName and status
 *               -> //https://api.covid19api.com/dayone/country/india/status/recovered
 * @param {string} country 
 * @param {string} status     (confirmed || deaths || recovered)
 * @returns msg with the count of cases for provided status
 */
async function covidRecords(country, status) {
  try {

    if (await verifyCountry(country)) {
      const response = await axios.get('https://api.covid19api.com/dayone/country/' + country + '/status/' + status);

      var resStr = await JSON.stringify(response.data);
      var resJSON = await JSON.parse(resStr);
      let countCases = 0;

      for (let i = resJSON.length - 1; i >= 0; i--) {
        if (resJSON[i].Cases != 0) {
          countCases = resJSON[i].Cases;
          break;
        }
      }

      return "Total number of COVID-19 " + status + " cases for " + country + " are " + countCases;
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 *  /casebystatus [country][status]  -> command takes 2 required parameter & 
 *                                        returns covid cases for that country for provided status
 *                                        (Shoes error msg in case of invalid status provided)
 *                                    -> //https://api.covid19api.com/dayone/country/india/status/recovered
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('casebystatus')
    .setDescription('Total number of covid cases for country')
    .addStringOption(option => option.setName('country')
      .setDescription('Country name to get all covid cases')
      .setRequired(true))
    .addStringOption(option => option.setName('status')
      .setDescription('Status - confirmed / deaths / recovered')
      .setRequired(true)),

  async execute(interaction) {
    const country = interaction.options.getString('country');
    var status = interaction.options.getString('status');
    status = status.toLowerCase();
    console.log("status:" + status + " country:" + country);

    if (status != 'confirmed' && status != 'deaths' && status != 'recovered') {
      return interaction.reply("Oops! " + status + " is not a valid status! ");
    }
    else if (country) {
      return interaction.reply(await covidRecords(country, status));
    }
    return interaction.reply('No option was provided!');
  }

}