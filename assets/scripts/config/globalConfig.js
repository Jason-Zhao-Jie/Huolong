import CONSTANTS from './constants'

export default {
    debugLevel:CONSTANTS.DEBUGLEVEL.DEBUG,
    serverSettings:{
        websocketServerURI:"ws://127.0.0.1:8080/",
        httpServerURI:"http://127.0.0.1:80/"
    },
    gameSettings:{
        musicVolumn:50,
        huolong:{
            groupNum : 3,
            firstRoundGiveCardsDelay : 0.2,
            giveCardsDelay : 0.02,
            aroundOverDelay : 1.5,
            aroundAIDelay : 0.5,
        }
    },
    runningObjects:{
        bgmId:0,
    },
}