const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

/**
 * Function giphy calls giphy API with provided value and return gif-url 
 *        ->'https://api.giphy.com/v1/gifs/search?api_key=<CONTACT_ME>=lol&limit=1');

 * @param {search-term} value 
 * @returns gif url
 */
async function giphy(value) {
  try {
    const response2 = await axios.get('https://api.giphy.com/v1/gifs/search?api_key=<CONTACT_ME>=' + value + '&limit=1');

    var resStr = await JSON.stringify(response2.data);
    resJSON = await JSON.parse(resStr);

    //narrowing down to url from respose JSON opbject
    var url = resJSON.data[0].images.original.url;

    //if API can't return gif-url for provided search-term, sending 'Not-Found' gif
    if(url == "" || url == null){     
      url = "http://hangover.cartoonhangover.com/post/91064117450/monday-morning-got-me-feeling-like-kiki";
    }
    return url;
  } catch (error) {
    console.error(error);
  }
}

/**
 *  /searchgif  [search-term]   -> command returns best gif related to provided search-term 
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('searchgif')
    .setDescription('Returns Gif related to search-term')
    .addStringOption(option => option.setName('search-term')              //string input - search term for gif
                                      .setDescription('The input to echo back')
                                      .setRequired(true)),
	
    async execute(interaction) {
		const value = interaction.options.getString('search-term');
		if (value) return interaction.reply(await giphy(value));
		return interaction.reply('No option was provided!');
  }

}