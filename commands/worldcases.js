const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

/**
 * Function covidRecordsOnDate calls covidRecords API with provided value and return msg with list of world's covid info
 *                      ->//https://api.covid19api.com/world?from=2021-03-01&to=2021-07-01
 * @param {*} dd1, mm1, yyy1  - Date from
 * @param {*} dd2, mm2, yyy2  - Date until 
 * @returns list of covid info of world
 */
async function covidRecordsOnDate(dd1, mm1, yy1, dd2, mm2, yy2) {
    try {
        //reformating dates if they are not two digited
        if (dd1 < 10) {
            dd1 = "0" + dd1;
        }
        if (dd2 < 10) {
            dd2 = "0" + dd2;
        }
        if (mm1 < 10) {
            mm1 = "0" + mm1;
        }
        if (mm2 < 10) {
            mm2 = "0" + mm2;
        }
        let fromDate = yy1 + "-" + mm1 + "-" + dd1;
        let untilDate = yy2 + "-" + mm2 + "-" + dd2;

        const response = await axios.get('https://api.covid19api.com/world?from=' + fromDate + '&to=' + untilDate);

        if(response.data == null || response.data == ""){
            return "Oops! Not able to find records between those dates.";
        }
        var resStr = await JSON.stringify(response.data);
        var resJSON = await JSON.parse(resStr);

        //main msg
        let msg = "Total confirmed cases in the world from: " + fromDate + " to:" + untilDate + " were ";

        //msg with details on each date (list)
        let detailedMsg = "";

        //storing converted DateTime into readable format by using slicing 
        let shortDate;

        //covid case count
        let countCases = 0;

        //discord msg: Must be 2000 or fewer in length. 
        //   -> If user provides two dates with big difference, triming returning records.let reducedLength = resJSON.length;
        let reducedLength = resJSON.length;
        if (reducedLength > 10) {
            reducedLength = 10;
            detailedMsg = "\nPlease use nearer dates. Can not show more than 10 results."
        }

        for (let i = 0; i < reducedLength; i++) {
            countCases += resJSON[i].TotalConfirmed;
            shortDate = resJSON[i].Date.slice(0, resJSON[i].Date.length - 14);
            detailedMsg += "\nOn " + shortDate + " got new " + resJSON[i].NewConfirmed + " confirmed and " + resJSON[i].NewRecovered + " recovered cases.";
        }

        msg += countCases + ".";
        msg = msg + detailedMsg;
        
        return msg;
    } catch (error) {
        console.error(error);
    }

}

/**
 *  /worldcases  [1_dd][1_mm][1_yyyy] [2_dd][2_mm][2_yyyy]
 *                  -> command returns covid cases for world in-between provided dates
 *                  -> unable to find other best way to get validated dates as user-input
 *                  -> //https://api.covid19api.com/world?from=2021-03-01&to=2021-07-01
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('worldcases')
        .setDescription('Total number of covid cases in the world between provided dates')
        .addNumberOption(option => option.setName('1_dd')
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
            .setDescription('From Day'))
        .addNumberOption(option => option.setName('1_mm')
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true)
            .setDescription('From Month'))
        .addNumberOption(option => option.setName('1_yyyy')
            .setMinValue(2020)
            .setMaxValue(2022)
            .setRequired(true)
            .setDescription('From year'))
        .addNumberOption(option => option.setName('2_dd')
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
            .setDescription('Until Day'))
        .addNumberOption(option => option.setName('2_mm')
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true)
            .setDescription('Until Month'))
        .addNumberOption(option => option.setName('2_yyyy')
            .setMinValue(2020)
            .setMaxValue(2022)
            .setRequired(true)
            .setDescription('Until year'))

    ,

    async execute(interaction) {
        const dd1 = interaction.options.getNumber("1_dd");
        const mm1 = interaction.options.getNumber("1_mm");
        const yyyy1 = interaction.options.getNumber("1_yyyy");
        const dd2 = interaction.options.getNumber("2_dd");
        const mm2 = interaction.options.getNumber("2_mm");
        const yyyy2 = interaction.options.getNumber("2_yyyy");

        return interaction.reply(await covidRecordsOnDate(dd1, mm1, yyyy1, dd2, mm2, yyyy2));
    }

}