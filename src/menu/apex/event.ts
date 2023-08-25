import { client } from "init/client";
import apexConnect from "./command/connect";
import apexSearch from "./command/search";

client.on('message.text', (event) => {
    switch (true) {
        case /^绑定(origin|pc|xbl|xbox|psn|ps)? ?(.+)$/.test(event.content): {
            const [platform, username] = getMatches(event.content, /^绑定(origin|pc|xbl|xbox|psn|ps)? ?(.+)$/);
            apexConnect.exec([username, platform], event, client);
            break;
        };
        case /^查[询找](origin|pc|xbl|xbox|psn|ps)? ?(.+)?$/.test(event.content): {
            const [platform, username] = getMatches(event.content, /^查[询找](origin|pc|xbl|xbox|psn|ps)? ?(.+)?$/);
            apexSearch.exec([username, platform], event, client);
            break;
        }
    }
});


function getMatches(string: string, regex: RegExp): string[] {
    let matches = regex.exec(string);
    let res = [];
    if (matches) {
        for (let i = 1; i < matches.length; ++i) {
            res.push(matches[i]);
        }
    }
    return res;
}