import CONSTANTS from '../config/constants'
import createModal from '../data/createModal'
import PlayerController_Local from '../case_huolong/controller/playerController_local'
import PlayerController_Robot from '../case_huolong/controller/playerController_robot'
import PlayerController_Network from '../case_huolong/controller/playerController_network'
import Scheduler from '../utils/scheduler'
import globalConfig from '../config/globalConfig'
import ServiceBus from './serviceBus'

export default class ProcessController {
    /**
     * @param {cc.Canvas} mainscene 
     * @param {CONSTANTS.GAMETYPE} gameType 
     * @param {CONSTANTS.PLAYERTYPE} hostType 
     */
    constructor(mainscene, gameType, hostType){
        this.view = mainscene
        this.modal = createModal(gameType)
        this.state = CONSTANTS.GAMESTATE.START
        this.serviceBus = new ServiceBus(this)
        
        this.messageQueue = []
        this.roundReadyList = {}
        this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK] = false

        this.giveCardDelay = 0
        this.currentCardSeat=CONSTANTS.PLAYERSEAT.SELF
    }

    connectServer(){
        return this.serviceBus.connect()
    }

    enterTable(hostType){
        this.localPlayer = new PlayerController_Local(this)
        this.localPlayer.setSeat(CONSTANTS.PLAYERSEAT.SELF)
        switch(hostType){
            case CONSTANTS.PLAYERTYPE.NETWORK :
                this.nextPlayer = new PlayerController_Network(this)
                this.nextPlayer.setSeat(CONSTANTS.PLAYERSEAT.NEXT)
                this.friendPlayer = new PlayerController_Network(this)
                this.friendPlayer.setSeat(CONSTANTS.PLAYERSEAT.FRIEND)
                this.backPlayer = new PlayerController_Network(this)
                this.backPlayer.setSeat(CONSTANTS.PLAYERSEAT.BACK)
                break
            case CONSTANTS.PLAYERTYPE.AI :
                this.nextPlayer = new PlayerController_Robot(this)
                this.nextPlayer.setSeat(CONSTANTS.PLAYERSEAT.NEXT)
                this.friendPlayer = new PlayerController_Robot(this)
                this.friendPlayer.setSeat(CONSTANTS.PLAYERSEAT.FRIEND)
                this.backPlayer = new PlayerController_Robot(this)
                this.backPlayer.setSeat(CONSTANTS.PLAYERSEAT.BACK)
                break
            default:
                this.nextPlayer = new PlayerController_Robot(this)
                this.nextPlayer.setSeat(CONSTANTS.PLAYERSEAT.NEXT)
                this.friendPlayer = new PlayerController_Robot(this)
                this.friendPlayer.setSeat(CONSTANTS.PLAYERSEAT.FRIEND)
                this.backPlayer = new PlayerController_Robot(this)
                this.backPlayer.setSeat(CONSTANTS.PLAYERSEAT.BACK)
        }

        
        this.scheduler = new Scheduler()
        this.scheduler.run(this.update.bind(this))
    }

    getState(){
        return this.state
    }

    getPlayerBySeat(seat){
        switch(seat){
            case CONSTANTS.PLAYERSEAT.SELF:
                return this.localPlayer
            case CONSTANTS.PLAYERSEAT.NEXT:
                return this.nextPlayer
            case CONSTANTS.PLAYERSEAT.FRIEND:
                return this.friendPlayer
            case CONSTANTS.PLAYERSEAT.BACK:
                return this.backPlayer           
        }
        return null
    }

    getLocalPlayer(){
        return this.localPlayer
    }

    getZhuangSeat(){
        return this.modal.getZhuangSeat()
    }

    getGroupNum(){
        return this.modal.getGroupNum()
    }

    resetGame(){
        this.modal.resetGameData()
        // 通知所有玩家准备开始
        this.noticePlayersToReset()
    }

    noticePlayersToReset(){
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTGAME, null)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTGAME, null)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTGAME, null)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTGAME, null)
    }

    toNextRound(){
        if(this.state == CONSTANTS.GAMESTATE.START){
            this.startGiveCards()
        }else if(this.state == CONSTANTS.GAMESTATE.REPORT){
            this.cleanBeforeAnotherRound()
        }else if(this.state == CONSTANTS.GAMESTATE.OVERIDLE){
            this.onGameOver()
        }
    }

    startGiveCards(){
        this.state = CONSTANTS.GAMESTATE.GIVINGCARDS
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTROUND, null)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTROUND, null)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTROUND, null)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.STARTROUND, null)
        this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND] = false
        this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK] = false
        // 通知UI开始发牌
        this.view.startGiveCards()
    }

    cleanBeforeAnotherRound(){
        this.view.cleanBeforeAnotherRound()
        this.startGiveCards()
    }

    onGameOver(){
        this.state = CONSTANTS.GAMESTATE.START
    }

    giveACard(){
        let cards = this.modal.giveARoundCard(this.currentCardSeat)
        if (cards != null){
            this.givingCards(cards)
        }else{
            this.overGiveCards()
        }
    }

    givingCards(cards){
        this.getPlayerBySeat(this.currentCardSeat).pushEvent(CONSTANTS.PLAYEREVENT.GIVEACARD, cards)
        this.currentCardSeat = this.modal.getNextOfSeat(this.currentCardSeat)
    }
    
    overGiveCards(){
        this.state = CONSTANTS.GAMESTATE.GIVINGCARDSOVER
        this.nextPlayer.pushEvent(CONSTANTS.PLAYEREVENT.OVERGIVENCARDS, null)
        this.friendPlayer.pushEvent(CONSTANTS.PLAYEREVENT.OVERGIVENCARDS, null)
        this.backPlayer.pushEvent(CONSTANTS.PLAYEREVENT.OVERGIVENCARDS, null)
        this.localPlayer.pushEvent(CONSTANTS.PLAYEREVENT.OVERGIVENCARDS, null)
    }

    noticeViewGiveCard(cards, shows){
        this.view.onPainGainCards([], cards, false, null, shows)
    }

    overGetCards(){

    }

    startRunRound(){
        this.state = CONSTANTS.GAMESTATE.INGAME
    }

    noticeViewToThrowCards(color, num){
        this.view.pleaseThrow(color, num)
    }

    pushEvent(playerSeat, event, data = null){
        this.messageQueue.push({playerSeat:playerSeat, event:event, data:data})
        cc.log("controller收到事件: "+event.toString()+"座位:"+playerSeat.toString())
        if(event == CONSTANTS.PLAYERWORK.THROWCARD){
            for(let i=0; i<data.length; ++i){
                if(!data[i])
                    cc.error("出牌数据错误: 第"+i+"张牌是空牌")
            }
        }
    }

    update(dt){
        let msg = null
        if(this.messageQueue.length > 0){
            msg = this.messageQueue[0]
            this.messageQueue.splice(0,1)
            switch(msg.event){
                case CONSTANTS.PLAYERWORK.ROUNDREADY:
                    this.onPlayerReady(msg.playerSeat)
                    break
                case CONSTANTS.PLAYERWORK.CARDSGET:
                    this.onGetCardsOK(msg.playerSeat)
                    break
                case CONSTANTS.PLAYERWORK.THROWCARD:
                    this.onThrowCards(msg.playerSeat, msg.data)
            }
        }
        if(this.state == CONSTANTS.GAMESTATE.GIVINGCARDS){
            let giveCardsDelay = globalConfig.gameSettings.huolong.giveCardsDelay
            if(this.modal.gamedata.curRound == 1)
                giveCardsDelay = globalConfig.gameSettings.huolong.firstRoundGiveCardsDelay
            this.giveCardDelay += dt
            if(this.giveCardDelay >= giveCardsDelay){
                this.giveACard()
                this.giveCardDelay -= giveCardsDelay
            }
        }
        return msg
    }

    onPlayerReady(playerSeat){
        this.roundReadyList[playerSeat] = true
        // 所有玩家已就绪
        if(this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK])
            this.toNextRound()
    }    

    onGetCardsOK(playerSeat){
        this.roundReadyList[playerSeat] = true
        // 所有玩家已就绪
        if(this.roundReadyList[CONSTANTS.PLAYERSEAT.SELF]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.NEXT]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.FRIEND]&&
            this.roundReadyList[CONSTANTS.PLAYERSEAT.BACK])
            this.overGetCards()
    }

    onThrowCards(playerSeat, cards){

    }
}