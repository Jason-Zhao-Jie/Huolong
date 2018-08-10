import CONSTANTS from '../../config/constants'
import ArrayUtils from '../../utils/arrayUtils'
import ModalBase from '../modalBase'

export default class Modal_Huolong extends ModalBase{
    constructor(){
        super()
    }

    resetGameData(idMine, idNext, idFriend, idBack, groupNum){
        this.gamedata = {
            players : {
                mine : idMine,
                next : idNext,
                friend : idFriend,
                back: idBack,
            },
            groupMine : {
                tarValue : 3,
                lastZhuang : 0,
            },
            groupTheir : {
                tarValue : 3,
                lastZhuang : 0,
            },
            mainColor : CONSTANTS.CARDCOLOR.JOKER,
            curZhuang : null,
            curRound : 1,
        }
        super.resetGameData(idMine, idNext, idFriend, idBack, groupNum)
    }

    resetRoundData(){
        this.roundData = {
            throwHistory : [],
            lastCardsData : {},
            lastGetCards : {},
            currentThrews : {},
            getScores : {},
            threwCardsCount: 0,
            currentFirstThrowPlayer : 0,
            currentNeedThrowPlayer : 0,
            currentShowedCardColor : 0,
            currentShowedCardNum : 0,
        }
        this.roundData.getScores[CONSTANTS.PLAYERSEAT.SELF] = 0
        this.roundData.getScores[CONSTANTS.PLAYERSEAT.NEXT] = 0
        this.roundData.getScores[CONSTANTS.PLAYERSEAT.FRIEND] = 0
        this.roundData.getScores[CONSTANTS.PLAYERSEAT.BACK] = 0
        super.resetRoundData()
    }

    getShowCardNum(state){
        if(this.gamedata.curRound > 1)
            return 0
        if(state == CONSTANTS.GAMESTATE.GIVINGCARDS || state == CONSTANTS.GAMESTATE.GIVINGCARDSOVER)
            return this.roundData.currentShowedCardNum + 1
        return 0
    }

    getMainColor(){
        return this.gamedata.mainColor
    }
    setMainColor(value){
        this.gamedata.mainColor = value
    }
    setMainColorByShowedJoker(seat, num){
        if(num < this.roundData.currentShowedCardNum)
            return false
        this.roundData.currentShowedCardNum = num
        this.gamedata.curZhuang = seat
        if(seat == CONSTANTS.PLAYERSEAT.SELF || seat == CONSTANTS.PLAYERSEAT.FRIEND){
            this.gamedata.groupMine.lastZhuang = seat
            this.gamedata.groupTheir.lastZhuang = CONSTANTS.PLAYERSEAT.NEXT
        }else{
            this.gamedata.groupTheir.lastZhuang = seat
            this.gamedata.groupMine.lastZhuang = CONSTANTS.PLAYERSEAT.SELF
        }
        return true
    }

    getZhuangSeat(){
        return this.gamedata.curZhuang
    }

    checkIsMain(card){
        if(card.getColor() == CONSTANTS.CARDCOLOR.JOKER)
            return true
        else if (card.getColor() == this.getMainColor())
            return true
        else if (card.getValue() == 2 || card.getValue() == this.getCurValue())
            return true
        return false
    }

    getAreWeLoserNow(){
        return this.gamedata.curZhuang == CONSTANTS.PLAYERSEAT.BACK || this.gamedata.curZhuang == CONSTANTS.PLAYERSEAT.NEXT
    }

    getCurValue(){
        if(this.getAreWeLoserNow())
            return this.gamedata.groupTheir.tarValue
        else
            return this.gamedata.groupMine.tarValue
    }

    getLoserValue(){
        if(this.getAreWeLoserNow())
            return this.gamedata.groupMine.tarValue
        else
            return this.gamedata.groupTheir.tarValue
    }

    getLoserScore(){
        if(this.getAreWeLoserNow())
            return this.roundData.getScores[CONSTANTS.PLAYERSEAT.SELF] + this.roundData.getScores[CONSTANTS.PLAYERSEAT.FRIEND]
        else
            return this.roundData.getScores[CONSTANTS.PLAYERSEAT.BACK] + this.roundData.getScores[CONSTANTS.PLAYERSEAT.NEXT]
    }

    giveARoundCard(seat){
        if(this.getStackCardsCount() == this.groupNum * 2)
            return null
        else if(this.getStackCardsCount() < this.groupNum * 2)
            throw "error card number"
        return this.gainCardsFromStack(seat, 1)
    }

    giveLastCardsToZhuangPlayer(){
        this.roundData.lastGetCards = this.gainCardsFromStack(this.gamedata.curZhuang)
        return this.roundData.lastGetCards
    }

    throwLastCards(seat, cards){
        if(cards == null)
            this.roundData.lastCardsData[seat] = {pain:[], gain:[]}
        else
            this.roundData.lastCardsData[seat] = {pain:cards, gain:[]}
    }

    resolveLastCards(){
        // 计算非庄家的摘星
        let zhuangSeat = this.getZhuangSeat()
        let jokers = ArrayUtils.mix(this.roundData.lastCardsData[this.getBackOfSeat(zhuangSeat)].pain,
                                this.roundData.lastCardsData[this.getNextOfSeat(zhuangSeat)].pain,
                                this.roundData.lastCardsData[this.getFriendOfSeat(zhuangSeat)].pain)
        // 计算摘星数值
        let starsNum = 0
        let hasBigJoker = false
        for(let i=0; i<jokers.length; ++i){
            if(jokers[i].getValue()==1){
                hasBigJoker = true
                starsNum += 3
            }
            else
                starsNum += 2
        }
        // 计算庄家摘星及真实底牌
        let zhuangCards = []
        for(let i=0;i<this.groupNum * 2;++i){
            zhuangCards.push(this.roundData.lastCardsData[zhuangSeat].pain[i])
        }
        zhuangCards.sort((a,b)=>{
            return this.checkIsLarger(a,b,false) ? -1:1
        })
        while(jokers.length < this.groupNum * 2){
            let card = zhuangCards[0]
            jokers.push(card)
            zhuangCards.splice(0,1)
            if(card.getColor() == CONSTANTS.CARDCOLOR.JOKER){
                if(card.getValue()==1){
                    hasBigJoker = true
                    starsNum += 3
                }
                else
                    starsNum += 2
            }
        }
        if(!hasBigJoker)
            starsNum = 0
        this.roundData.lastCardsData.starsNum = starsNum
        this.roundData.lastCardsData.final = jokers
        // 计算闲家补牌, 目前是自动补
        // TODO : 需要完成手动选择补牌的功能, 且需要检查流星回避和分数回避规则
        let backdata = this.roundData.lastCardsData[this.getBackOfSeat(zhuangSeat)]
        for(let i=0; i<backdata.pain.length; ++i){
            let card = zhuangCards[0]
            backdata.gain.push(card)
            zhuangCards.splice(0,1)
        }
        let nextdata = this.roundData.lastCardsData[this.getNextOfSeat(zhuangSeat)]
        for(let i=0; i<nextdata.pain.length; ++i){
            let card = zhuangCards[0]
            nextdata.gain.push(card)
            zhuangCards.splice(0,1)
        }
        let frienddata = this.roundData.lastCardsData[this.getFriendOfSeat(zhuangSeat)]
        for(let i=0; i<frienddata.pain.length; ++i){
            let card = zhuangCards[0]
            frienddata.gain.push(card)
            zhuangCards.splice(0,1)
        }
        // 执行补牌(数据)
        this.painGainCards(CONSTANTS.PLAYERSEAT.SELF, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.SELF].pain, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.SELF].gain)
        this.painGainCards(CONSTANTS.PLAYERSEAT.NEXT, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.NEXT].pain, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.NEXT].gain)
        this.painGainCards(CONSTANTS.PLAYERSEAT.FRIEND, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.FRIEND].pain, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.FRIEND].gain)
        this.painGainCards(CONSTANTS.PLAYERSEAT.BACK, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.BACK].pain, this.roundData.lastCardsData[CONSTANTS.PLAYERSEAT.BACK].gain)

        return this.roundData.lastCardsData
    }

    setAroundStart(seat){
        this.roundData.currentFirstThrowPlayer = seat
        this.roundData.currentNeedThrowPlayer = seat
        this.roundData.currentThrews = {}
    }

    setFirstColorNum(cards){
        if(this.checkIsMain(cards[0])){
            this.roundData.currentShowedCardColor = CONSTANTS.CARDCOLOR.MAIN
        }else{
            this.roundData.currentShowedCardColor = cards[0].getColor()
        }
        this.roundData.currentShowedCardNum = cards.length
        return this.roundData.currentShowedCardColor
    }

    setAroundStepOn(cards){
        this.roundData.currentThrews[this.roundData.currentNeedThrowPlayer] = cards
        this.getPlayerCardData(this.roundData.currentNeedThrowPlayer).painGainCards(cards)
        this.roundData.currentNeedThrowPlayer = this.getNextOfSeat(this.roundData.currentNeedThrowPlayer)
        if(this.roundData.currentNeedThrowPlayer == this.roundData.currentFirstThrowPlayer){
            this.roundData.currentNeedThrowPlayer = null
        }
        return this.roundData.currentNeedThrowPlayer
    }

    setAroundOver(){
        this.roundData.throwHistory.push(this.roundData.currentThrews)
        let seat = this.roundData.currentFirstThrowPlayer
        if(!this.checkCards(this.roundData.currentThrews[seat], this.roundData.currentThrews[this.getNextOfSeat(this.roundData.currentFirstThrowPlayer)], this.roundData.currentShowedCardColor)){
            seat = this.getNextOfSeat(this.roundData.currentFirstThrowPlayer)
        }
        if(!this.checkCards(this.roundData.currentThrews[seat], this.roundData.currentThrews[this.getFriendOfSeat(this.roundData.currentFirstThrowPlayer)], this.roundData.currentShowedCardColor)){
            seat = this.getFriendOfSeat(this.roundData.currentFirstThrowPlayer)
        }
        if(!this.checkCards(this.roundData.currentThrews[seat], this.roundData.currentThrews[this.getBackOfSeat(this.roundData.currentFirstThrowPlayer)], this.roundData.currentShowedCardColor)){
            seat = this.getBackOfSeat(this.roundData.currentFirstThrowPlayer)
        }
        let allCards = ArrayUtils.mix(this.roundData.currentThrews[CONSTANTS.PLAYERSEAT.SELF],
            this.roundData.currentThrews[CONSTANTS.PLAYERSEAT.BACK],
            this.roundData.currentThrews[CONSTANTS.PLAYERSEAT.NEXT],
            this.roundData.currentThrews[CONSTANTS.PLAYERSEAT.FRIEND])
        this.roundData.getScores[seat] += this.cardManager.calculateScoreInCards(allCards)
        
        this.roundData.threwCardsCount += this.roundData.currentShowedCardNum
        this.roundData.currentShowedCardNum = 0
        return [seat, this.roundData.currentThrews[seat]]
    }

    getRoundIndex(){
        return this.roundData.throwHistory.length
    }

    getIsRoundOver(){
        return this.roundData.threwCardsCount == this.groupNum * 13
    }

    calculateRoundReport(lastWinner, lastWinCards){
        // 先计算底牌归属, 分数
        this.roundData.getScores[lastWinner] += this.cardManager.calculateScoreInCards(this.roundData.lastCardsData.final)

        // 将打值A更改为14 方便计算
        if(this.gamedata.groupTheir.tarValue == 1)
            this.gamedata.groupTheir.tarValue = 14
        if(this.gamedata.groupMine.tarValue == 1)
            this.gamedata.groupMine.tarValue = 14

        // 返回值信息结构体
        let retVal = {
            lastWinner: lastWinner,     // 最后一手胜者, 也就是抠底者
            lastWinCards: lastWinCards, // 最后一手胜者的牌, 可检验是否让庄家掉级
            isLoserScoreOK: this.getLoserScore() >= this.groupNum * 40, // 闲家是否分数已满, 已满则为胜利
            loserScore: this.getLoserScore(), // 闲家分数
            isLoserGetLastCards : false,    // 闲家是否抠底, 胜利者扣底即可升级或是让对方掉级
            oldZhuang: this.gamedata.curZhuang,     // 本局庄家
            newZhuang: null,    // 下局庄家
            upgradingLevel: 0,  // 本局胜利方升级数
            starsNum: this.roundData.lastCardsData.starsNum,    // 摘星数
            lastCards: this.roundData.lastCardsData.final,  // 底牌
            ourOldLevel: this.gamedata.groupMine.tarValue,  // 我方原等级
            theirOldLevel: this.gamedata.groupTheir.tarValue, // 下局我方等级
            ourNewLevel: this.gamedata.groupMine.tarValue,  // 对方原等级
            theirNewLevel: this.gamedata.groupTheir.tarValue, // 对方下局等级
            areWeOldZhuang: !this.getAreWeLoserNow(),
            areWeNewZhuang: false,
            jSuccess: false,    // 是否打J将庄家掉级
            aSuccess: false,    // 是否打A将庄家掉级
            gameover: false,    // 是否庄家获得胜利
        }

        // 计算胜败
        // 最后一手胜者为扣底者
        retVal.isLoserGetLastCards = (lastWinner == this.getBackOfSeat(this.gamedata.curZhuang) || lastWinner == this.getNextOfSeat(this.gamedata.curZhuang))
        // 扣底者为总胜者, 则总胜者可以升级 (或让对方掉级)
        if(retVal.isLoserScoreOK == retVal.isLoserGetLastCards){
            retVal.upgradingLevel = this.roundData.lastCardsData.starsNum
            if(retVal.upgradingLevel < 1)
                retVal.upgradingLevel = 1
        }
        if(retVal.isLoserScoreOK){  // 闲家分满
            // 让对方掉级, 需满足的条件是: 
            // 1. 对方为庄家, 我方为闲家
            // 2. 正打的等级为掉级关口 (J 或 A)
            // 3. 我方连抠带跨
            // 4. 我方最后一手以主打牌获胜抠底
            if(this.getCurValue() == 11 && retVal.isLoserGetLastCards && lastWinCards[0].getValue() == 11){
                // 庄家被J勾下去
                retVal.jSuccess = true
                this.gamedata.curZhuang = this.getFriendOfSeat(this.gamedata.curZhuang)
                if(this.getAreWeLoserNow()){
                    this.gamedata.groupTheir.lastZhuang = this.gamedata.curZhuang
                    this.gamedata.groupTheir.tarValue = 3
                }else{
                    this.gamedata.groupMine.lastZhuang = this.gamedata.curZhuang
                    this.gamedata.groupMine.tarValue = 3
                }
            }else if(this.getCurValue() == 14 && retVal.isLoserGetLastCards && lastWinCards[0].getValue() == 1){
                // 庄家被A下到J
                retVal.aSuccess = true
                this.gamedata.curZhuang = this.getFriendOfSeat(this.gamedata.curZhuang)
                if(this.getAreWeLoserNow()){
                    this.gamedata.groupTheir.lastZhuang = this.gamedata.curZhuang
                    this.gamedata.groupTheir.tarValue = 11
                }else{
                    this.gamedata.groupMine.lastZhuang = this.gamedata.curZhuang
                    this.gamedata.groupMine.tarValue = 11
                }
            }else{  // 原庄家不掉级, 则庄闲转换
                // 计算新庄家等级
                if(this.getLoserValue() <= 11 && this.getLoserValue() + retVal.upgradingLevel > 11){
                    // 闲家不跨J
                    if(this.getAreWeLoserNow()){
                        this.gamedata.groupMine.tarValue = 11
                    }else{
                        this.gamedata.groupTheir.tarValue = 11
                    }
                }else if(this.getLoserValue() <= 14 && this.getLoserValue() + retVal.upgradingLevel > 14){
                    // 闲家不跨A
                    if(this.getAreWeLoserNow()){
                        this.gamedata.groupMine.tarValue = 14
                    }else{
                        this.gamedata.groupTheir.tarValue = 14
                    }
                }else{                    
                    if(this.getAreWeLoserNow()){
                        this.gamedata.groupMine.tarValue = this.getLoserValue() + retVal.upgradingLevel
                    }else{
                        this.gamedata.groupTheir.tarValue = this.getLoserValue() + retVal.upgradingLevel
                    }
                }
                // 转换庄闲
                if(this.getAreWeLoserNow()){
                    this.gamedata.curZhuang = this.getFriendOfSeat(this.gamedata.groupMine.lastZhuang)
                    this.gamedata.groupMine.lastZhuang = this.gamedata.curZhuang
                }else{
                    this.gamedata.curZhuang = this.getFriendOfSeat(this.gamedata.groupTheir.lastZhuang)
                    this.gamedata.groupTheir.lastZhuang = this.gamedata.curZhuang
                }
            }
        }else{  // 闲家分未满, 庄闲方不变
            this.gamedata.curZhuang = this.getFriendOfSeat(this.gamedata.curZhuang)
            if(this.getAreWeLoserNow()){
                this.gamedata.groupTheir.lastZhuang = this.gamedata.curZhuang
            }else{
                this.gamedata.groupMine.lastZhuang = this.gamedata.curZhuang
            }
            if(this.getCurValue() < 11 && this.getCurValue() + retVal.upgradingLevel > 11){
                // 庄家摘星不跨J
                if(this.getAreWeLoserNow()){
                    this.gamedata.groupTheir.tarValue = 11
                }else{
                    this.gamedata.groupMine.tarValue = 11
                }
            }else if(this.getCurValue() < 14 && this.getCurValue() + retVal.upgradingLevel > 14){
                // 庄家摘星不跨A
                if(this.getAreWeLoserNow()){
                    this.gamedata.groupTheir.tarValue = 14
                }else{
                    this.gamedata.groupMine.tarValue = 14
                }
            }else{                    
                if(this.getCurValue() == 14 && this.getCurValue() + retVal.upgradingLevel > 14){
                    // 庄家获胜, 游戏结束
                    retVal.gameover = true
                }
                if(this.getAreWeLoserNow()){
                    this.gamedata.groupTheir.tarValue = this.getCurValue() + retVal.upgradingLevel
                }else{
                    this.gamedata.groupMine.tarValue = this.getCurValue() + retVal.upgradingLevel
                }
            }
        }

        retVal.areWeNewZhuang = !this.getAreWeLoserNow()
        retVal.newZhuang = this.gamedata.curZhuang
        retVal.ourNewLevel = this.gamedata.groupMine.tarValue
        retVal.theirNewLevel = this.gamedata.groupTheir.tarValue
        
        if(this.gamedata.groupTheir.tarValue > 13)
            this.gamedata.groupTheir.tarValue -= 13
        if(this.gamedata.groupMine.tarValue >13)
            this.gamedata.groupMine.tarValue -= 13
        if(retVal.ourOldLevel > 13)
            retVal.ourOldLevel -= 13
        if(retVal.ourNewLevel > 13)
            retVal.ourNewLevel -= 13
        if(retVal.theirOldLevel > 13)
            retVal.theirOldLevel -= 13
        if(retVal.theirNewLevel > 13)
            retVal.theirNewLevel -= 13

        return retVal
    }

    toNextRound(){
        this.gamedata.curRound += 1
        this.resetRoundData()
    }

    calculateGameReport(){
        // 没什么要计算的, 只是输出有用的结算信息
        // 返回值结构体
        let retVal = {
            areWeWin: !this.getAreWeLoserNow(),
            loserLevel: this.getLoserValue(),
            roundsCount: this.gamedata.curRound,
            mainColor: this.gamedata.mainColor,
        }
        return retVal
    }

    // 比较两张牌的牌值大小, 若cardA大, 则返回true
    // 当不按颜色比较 (比牌实际大小) 时, 王牌 > 打主色 > 打非主色 > 2主色 > 2 > 主花色 > 非主色
    //    若两张一样大, 返回null
    // 当按颜色比较时(整理排序), 颜色顺序为: 
    //    王牌 > 打主色 > 打黑桃 > 打红桃 > 打草花 > 打方片 > 2主色 > 
    //    2黑桃 > 2红桃 > 2草花 > 2方片 > 主花色 > 黑桃 > 红桃 > 方块 > 梅花
    //    若两张一样大, 当cardA的group值更小时返回true
    checkIsLarger(cardA, cardB, withColor){
        let isAMain = this.checkIsMain(cardA)
        let isBMain = this.checkIsMain(cardB)
        let curValue = this.getCurValue()
        // 主牌总是大于非主牌
        if(isAMain && !isBMain)
            return true
        if(!isAMain && isBMain)
            return false
        if(isAMain && isBMain){
            if(cardA.getColor() == cardB.getColor()){
                // 两者同样大
                if(cardA.getValue() == cardB.getValue())
                    return withColor ? (cardA.group < cardB.group) : null
                // 王牌最大, 大王大于小王
                if(cardA.getColor() == CONSTANTS.CARDCOLOR.JOKER)
                    return cardA.getValue() == 1
                // 非主色打常主大于2
                if(cardA.getColor() != this.gamedata.mainColor)
                    return cardA.getValue() == curValue
                // 主色打常主大于2和其他, 2大于其他, 其他之中大小关系同非主牌 (A最大, 其余按value)
                if(cardA.getValue() == curValue)
                    return true
                if(cardB.getValue() == curValue || cardB.getValue() == 2)
                    return false
                return cardA.getValue() == 2 || cardA.getValue() == 1 || (cardB.getValue() != 1 && cardA.getValue() > cardB.getValue())
            }
            // 王牌最大
            if(cardA.getColor() == CONSTANTS.CARDCOLOR.JOKER)
                return true
            if(cardB.getColor() == CONSTANTS.CARDCOLOR.JOKER)
                return false
            // 主打牌主打色大于除王牌外一切, 主打牌非主打色大于除王牌和主打牌主打色外的一切
            // 主打色2大于非主打色2, 非主打色2大于普通主
            if(cardA.getColor() == this.gamedata.mainColor)
                return cardA.getValue() == curValue || cardA.getValue() == cardB.getValue()
            if(cardB.getColor() == this.gamedata.mainColor)
                return cardB.getValue() != curValue && cardA.getValue() != cardB.getValue()
            // 都为非主打色, 则主打牌大于2, 牌值相同的, 按照非主花色排序方式
            if(cardA.getValue() != cardB.getValue())
                return cardB.getValue() == 2
            if(!withColor)
                return null
            if(cardA.getColor() == CONSTANTS.CARDCOLOR.SPADES)
                return true
            if(cardA.getColor() == CONSTANTS.CARDCOLOR.HEART && cardB.getColor() != CONSTANTS.CARDCOLOR.SPADES)
                return true
            if(cardA.getColor() == CONSTANTS.CARDCOLOR.CUBE && cardB.getColor() == CONSTANTS.CARDCOLOR.DIAMOND)
                return true
            return false            
        }
        if(!isAMain && !isBMain){
            // 非主牌花色顺序是: 黑桃, 红桃, 梅花, 方片
            if(cardA.getColor() != cardB.getColor()){
                if(!withColor)
                    return (cardA.getValue() == cardB.getValue()) ? null : (cardA.getValue() > cardB.getValue())
                if(cardA.getColor() == CONSTANTS.CARDCOLOR.SPADES)
                    return true
                if(cardA.getColor() == CONSTANTS.CARDCOLOR.HEART && cardB.getColor() != CONSTANTS.CARDCOLOR.SPADES)
                    return true
                if(cardA.getColor() == CONSTANTS.CARDCOLOR.CUBE && cardB.getColor() == CONSTANTS.CARDCOLOR.DIAMOND)
                    return true
                return false
            }
            // 两者同样大
            if(cardA.getValue() == cardB.getValue())
                return withColor ? (cardA.group < cardB.group) : null
            // A为最大
            if(cardA.getValue() == 1)
                return true
            // 其余大小以牌的value值为准
            return cardB.getValue() != 1 && cardA.getValue() > cardB.getValue()
        }
    }

    // 比较两组牌(牌数一样, 可为1张或多张)的大小. 
    // 组牌内牌不是完全一样, 则为最小; 不为主牌且不同于要求的颜色, 也为最小
    // 有一个最小, 则最小者败; 同不为最小, 则按单张比较结果计算
    // 同为最小, 则A胜; 同不为最小但值相等, 也是A胜
    checkCards(cardsA, cardsB, color){
        let aMin = false
        let bMin = false
        for(let i=1; i<cardsA.length; ++i){
            if(cardsA[i].getColor()!=cardsA[i-1].getColor() || cardsA[i].getValue()!=cardsA[i-1].getValue())
                aMin = true
            if(cardsB[i].getColor()!=cardsB[i-1].getColor() || cardsB[i].getValue()!=cardsB[i-1].getValue())
                bMin = true
        }
        if(color==CONSTANTS.CARDCOLOR.MAIN){
            aMin = aMin || !this.checkIsMain(cardsA[0])
            bMin = bMin || !this.checkIsMain(cardsB[0])
        }else{
            aMin = aMin || (!this.checkIsMain(cardsA[0]) && cardsA[i].getColor() != color)
            bMin = bMin || (!this.checkIsMain(cardsB[0]) && cardsB[i].getColor() != color)
        }
        if(bMin)
            return true
        if(aMin)
            return false
        let ret = this.checkIsLarger(cardsA[0], cardsB[0], false)
        if(ret == null)
            return true
        return ret
    }
}