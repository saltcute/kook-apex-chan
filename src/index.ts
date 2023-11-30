import { client } from "init/client";
import * as fs from 'fs';
import upath from 'upath';
import EssentialMenu from "@saltcute/kasumi-essential";

client.plugin.load(new EssentialMenu("apexadmin"));

(async () => {
    await client.connect();
    const basicPath = upath.join(__dirname, 'menu');
    const menus = fs.readdirSync(basicPath);
    for (const menu of menus) {
        try {
            require(upath.join(basicPath, menu, "index"));
        } catch (e) {
            client.logger.error('Error loading menu');
            client.logger.error(e);
        }
    }
})()