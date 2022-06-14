const fs = require("fs");
const Contract = require("web3-eth-contract");
const { config } = require("./config");
const abi = require("./abi.json");

const pause = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, 1000);
    });
};

(async () => {
    Contract.setProvider(config.mainnetAlchemyURL);
    const contract = new Contract(
        abi,
        "0xd4e753dc8130d820f2a18364b07271994ef6dfbd"
    );

    const arr = [];

    for (let i = 0; i < 333; i++) {
        const res = await contract.methods.ownerOf(i).call();
        arr.push(res);
        console.log({ [i]: res });
        await pause();
    }

    fs.writeFileSync("./output.txt", JSON.stringify(arr), "utf-8");
})();
