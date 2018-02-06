"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: @types
// @ts-ignore
const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig('markuplint');
async function searchAndLoad(fileOrDir) {
    let data;
    // load as file
    try {
        data = await explorer.load(null, fileOrDir);
        // console.log({data, fileOrDir});
    }
    catch (err) {
        if (err.code !== 'EISDIR') {
            throw err;
        }
    }
    // load as dir
    if (!data) {
        data = await explorer.load(fileOrDir);
    }
    // console.log(`search rc file on "${configDir}"`);
    if (!data || !data.config) {
        throw new Error('markuplint rc file not found');
    }
    const filePath = data.filepath;
    const config = data.config;
    // console.log(`RC file Loaded: "${filePath}"`);
    return {
        filePath,
        config,
    };
}
exports.searchAndLoad = searchAndLoad;