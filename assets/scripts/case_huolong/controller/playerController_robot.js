import IPlayerController from './iPlayerController'
import CONSTANTS from '../../config/constants'
import globalConfig from '../../config/globalConfig'
import Table from '../../utils/table'
import Scheduler from '../../utils/scheduler'
import mathUtils from '../../utils/mathUtils'
import calc_huolong from '../data/calc_huolong'
import Card from '../../data/card'
import arrayUtils from '../../utils/arrayUtils'

let self = CONSTANTS.PLAYERSEAT.SELF
let next = CONSTANTS.PLAYERSEAT.NEXT
let friend = CONSTANTS.PLAYERSEAT.FRIEND
let back = CONSTANTS.PLAYERSEAT.BACK

let used = Symbol('used')
let has = Symbol('has')

let main = CONSTANTS.CARDCOLOR.MAIN
let bigJoker = Symbol('bigJoker')
let smallJoker = Symbol('smallJoker')
let mainCurr = Symbol('mainCurr')
let spades = CONSTANTS.CARDCOLOR.SPADES
let heart = CONSTANTS.CARDCOLOR.HEART
let cube = CONSTANTS.CARDCOLOR.CUBE
let diamond = CONSTANTS.CARDCOLOR.DIAMOND

export default class PlayerController_Robot extends IPlayerController {
    constructor(controller) {
        super(controller)
    }

    getType() {
        return CONSTANTS.PLAYERTYPE.AI
    }

    resetAIDataBeforeRound(isFirstRound) {
        cc.log("robot resetAIDataBeforeRound, seat: ", this.seat)
        this.roundData = {
            usedScore: 0,
            playerData: new Table([self, next, friend, back], [used, has],
                [main, bigJoker, smallJoker, mainCurr, spades, heart, cube, diamond])
        }
        this.resetAroundData()
    }

    resetAroundData() {
        /** @type {Object<Array<Card>>} */
        this.aroundCards = {}
    }

    /**
     * 获取每个玩家已打出的主牌数量, 视为AI的记牌器
     */
    getMinUsedMain() {
        let used = {
            [self]: this.roundData.playerData.getData(self, used, main),
            [next]: this.roundData.playerData.getData(next, used, main),
            [friend]: this.roundData.playerData.getData(friend, used, main),
            [back]: this.roundData.playerData.getData(back, used, main)
        }
        used[this.seat] = null
        cc.log("robot getMinUsedMain, seat: ", this.seat, ", usedList: self: ", used[self], ", next: ", used[next], ", friend: ", used[friend], ", back: ", used[back])
        return mathUtils.min(used[self], used[next], used[friend], used[back])
    }

    getMaxCurrentAround() {
        let current = this.controller.modal.roundData.currentFirstThrowPlayer
        if (current == this.seat)
            return this.seat
        let nextOfFirst = this.controller.modal.getNextOfSeat(current)
        if (nextOfFirst == this.seat)
            return current
        let larger = nextOfFirst
        if (this.controller.modal.checkCards(this.aroundCards[current], this.aroundCards[nextOfFirst])) {
            larger = current
        }
        let friendOfFirst = this.controller.modal.getNextOfSeat(nextOfFirst)
        if (friendOfFirst == this.seat)
            return larger
        if (this.controller.modal.checkCards(this.aroundCards[larger], this.aroundCards[friendOfFirst])) {
            return friendOfFirst
        }
        return larger
    }

    getCurrentAroundScore() {
        let total = 0
        for (let k in CONSTANTS.PLAYERSEAT) {
            if (!this.aroundCards[CONSTANTS.PLAYERSEAT[k]])
                continue
            for (let i = 0; i < this.aroundCards[CONSTANTS.PLAYERSEAT[k]].length; ++i) {
                switch (this.aroundCards[CONSTANTS.PLAYERSEAT[k]][i].getValue()) {
                    case 5:
                        total += 5
                        break
                    case 10:
                        total += 10
                        break
                    case 13:
                        total += 10
                        break
                }
            }
        }
        return total
    }

    onGameStart() {
        cc.log("robot onGameStart, seat: ", this.seat)
        this.resetAIDataBeforeRound(true)
        super.onGameStart()
    }

    /**
     * 
     * @param {Array<Card>} card 
     */
    onGetACard(card) {
        cc.log("robot onGetACard, seat: ", this.seat, ", card: ", card[0].toString())
        let shows = this.checkCanShow()
        if (shows > 0) {
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.SHOWSTAR, shows)
        }
    }

    onOverGetCards(canShow) {
        cc.log("robot onOverGetCards, seat: ", this.seat, ", main number: ", this.getCardLayoutData().getMainCount(), ", all cards: ", Card.arrayToCCLogString(this.getCardLayoutData().cards))
        super.onOverGetCards(canShow)

    }

    onGetLastCards(cards) {
        cc.log("robot onGetLastCards, seat: ", this.seat)
        if (this.controller.getZhuangSeat() == this.seat)
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWLASTCARDS, cards)
        else
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWLASTCARDS, null)
    }

    onShowThrewLastCards(lastCards, pain, gain, allData) {
        cc.log("robot onShowThrewLastCards, seat: ", this.seat, ", lastCards: ", lastCards, ", pain: ", pain, ", gain: ", gain, ", allData: ", allData)

    }

    onAskForThrow(color, num) {
        cc.log("robot onAskForThrow prepare, seat: ", this.seat, ", color: ", color, ", num: ", num);
        let cardLayout = this.getCardLayoutData()
        let threwCards = []
        if (num == 0) {   // 先手AI逻辑
            let mainCount = cardLayout.getMainCount()
            let othersMinUsed = this.getMinUsedMain()
            let mainSingleCards = cardLayout.getSingles(CONSTANTS.CARDCOLOR.MAIN)
            if (mainCount > 0 && mainCount / 1.4 > calc_huolong.totalMains(this.controller.modal.getCurValue(), this.controller.getGroupNum()) / 4 + othersMinUsed) {
                // TODO : 后续优化电脑与电脑的交互时, 应该令调主电脑通知对家电脑配合, 或者由电脑判断对家是否在调主
                // 主多出平均主数量40%以上(3副牌为22张起), 大调主
                // 先发四条流星
                let findRes = []
                for (let i = this.controller.getGroupNum(); findRes.length <= 0 && i > 2; --i) {
                    findRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.MAIN, i)
                }
                // 无流星发王和主打
                if (findRes.length <= 0)
                    findRes = cardLayout.getMax(CONSTANTS.CARDCOLOR.MAIN)
                // 仍无 发大对
                if (findRes.length <= 0)
                    findRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.MAIN, 2)
                // 无对子, 走最大单牌
                if (findRes.length <= 0) {
                    let [cards, otherCards] = cardLayout.getCardsOfColor(CONSTANTS.CARDCOLOR.MAIN)
                    threwCards = [cards[cards.length - 1]]
                } else
                    threwCards = findRes[findRes.length - 1]
            } else if (mainCount > 0 && mainCount / 1.2 > calc_huolong.totalMains(this.controller.modal.getCurValue(), this.controller.getGroupNum()) / 4 + othersMinUsed) {
                // 主多出平均主数量20%以上(3副牌为19张起), 小调主
                if (mainSingleCards.length > 0)
                    threwCards[0] = mainSingleCards[0]
                else {
                    let findRes = []
                    for (let i = 2; findRes.length <= 0 && i <= this.controller.getGroupNum(); --i) {
                        findRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.MAIN, i)
                    }
                    if (findRes.length > 0) {
                        threwCards = findRes[0]
                    } else {
                        cc.error("计算发生错误")
                    }
                }
            } else {
                // 非主动调主逻辑
                // 先发四条流星
                let findRes = []
                for (let i = this.controller.getGroupNum(); findRes.length <= 0 && i > 2; --i) {
                    findRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.UNMAIN, i)
                }
                // 无流星发A(打A时发K)
                if (findRes.length <= 0)
                    findRes = cardLayout.getMax(CONSTANTS.CARDCOLOR.UNMAIN)
                // 无A 发大对
                if (findRes.length <= 0)
                    findRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.UNMAIN, 2)
                // 无对子, 走最大单牌  TODO : 副牌此处会走有问题的走法, 建议后续优化优先处理这里, 对局势进行更详细判断
                if (findRes.length <= 0) {
                    let [cards, otherCards] = cardLayout.getCardsOfColor(CONSTANTS.CARDCOLOR.UNMAIN)
                    if (cards.length > 0)
                        threwCards = [cards[cards.length - 1]]
                    else
                        threwCards = [otherCards[0]]
                } else
                    threwCards = findRes[findRes.length - 1]
            }
        } else {  // 后手AI逻辑
            // TODO : 需要特殊处理打5打10打K时的加分逻辑
            let currMax = this.getMaxCurrentAround()
            let currScore = this.getCurrentAroundScore()
            let way = CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE
            let way2 = CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE
            if (currMax == this.controller.modal.getFriendOfSeat(this.seat)) {
                // 当对家领先时
                // TODO : 目前直接加分, 后续优化需要对局势进行更详细判断
                way = CONSTANTS.AIGETCARDSWAY.SCOREFIRSTMINTHEN
            } else if (currMax == this.controller.modal.getNextOfSeat(this.seat)) {
                // 当下家领先时, 此时我方是最后手
                // TODO : 目前有分直接大或杀, 无分直接溜, 后续优化需要对局势进行更详细判断
                if (currScore > 0) {
                    way = CONSTANTS.AIGETCARDSWAY.SCOREKILL
                    way2 = CONSTANTS.AIGETCARDSWAY.CAUTIOUSKILL
                } else {
                    way = CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE
                }
            } else {
                // 当上家领先时
                // TODO : 目前直接大或杀, 后续优化需要对局势进行更详细判断
                way = CONSTANTS.AIGETCARDSWAY.CAUTIOUSKILL
            }
            threwCards = this.throwByWay(way, color, num)
            if (threwCards.length <= num) {
                if (threwCards.length == 0)
                    threwCards = this.throwByWay(way2, color, num)
                else
                    threwCards = arrayUtils.mix(threwCards, this.throwByWay(CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE, color, num - threwCards.length))
                if (threwCards.length <= 0) {
                    threwCards = arrayUtils.mix(threwCards, this.throwByWay(CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE, color, num - threwCards.length))
                }
            }
        }
        cc.log("robot onAskForThrow ok, seat: ", this.seat, ", threw: ", Card.arrayToCCLogString(threwCards));
        Scheduler.callAfterDelay(() => {
            this.controller.pushEvent(this.seat, CONSTANTS.PLAYERWORK.THROWCARD, threwCards)
        }, globalConfig.gameSettings.huolong.aroundAIDelay)
    }

    throwByWay(way, color, num) {
        let cardLayout = this.getCardLayoutData()
        let threwCards = []
        let [cards, otherCards] = cardLayout.getCardsOfColor(color)
        let singleRes = cardLayout.getSingles(color, true)
        let singleAll = cardLayout.getSingles(color, false)
        let doubleRes = cardLayout.getSameCards(color, 2)
        let multiRes = cardLayout.getSameCards(color)
        let findRes = []
        if (num > 1)
            findRes = cardLayout.getSameCards(color, num)
        else
            for (let i = 0; i < cards.length; ++i) {
                findRes[i] = [cards[i]]
            }
        let [mainCards, unmainCards] = cardLayout.getCardsOfColor(CONSTANTS.CARDCOLOR.MAIN)
        let singleMain = cardLayout.getSingles(CONSTANTS.CARDCOLOR.MAIN, true)
        let doubleMain = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.MAIN, 2)
        let singleUnmain = cardLayout.getSingles(CONSTANTS.CARDCOLOR.UNMAIN, true)
        let doubleUnmain = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.UNMAIN, 2)
        let mainRes = []
        if (num > 1)
            mainRes = cardLayout.getSameCards(CONSTANTS.CARDCOLOR.MAIN, num)
        else
            for (let i = 0; i < mainCards.length; ++i) {
                mainRes[i] = [mainCards[i]]
            }
        let currMax = this.getMaxCurrentAround()
        /** @type {Array<Card>} */
        let currMaxCards = this.aroundCards[currMax]
        switch (way) {
            case CONSTANTS.AIGETCARDSWAY.MINORSCOREKILL:
                // 先大, 大不住就非分, 无牌分杀
                // 1. 尝试大
                for (let i = 0; i < findRes.length && threwCards.length < num; ++i) {
                    if (findRes[i].getValue() > currMaxCards[0].getValue()) {
                        for(let n=0; n<num; ++n){
                            threwCards.push(findRes[i+n])
                        }
                    }
                }
                // 2. 溜单非分
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() != 5 && singleRes[i].getValue() != 10 && singleRes[i].getValue() != 13) {
                        threwCards.push(singleRes[i])
                    }
                }
                // 3. 溜对非分
                for (let i = 0; i < doubleRes.length && threwCards.length < num; ++i) {
                    if (doubleRes[i][0].getValue() != 5 && doubleRes[i][0].getValue() != 10 && doubleRes[i][0].getValue() != 13) {
                        threwCards.push(doubleRes[i][0])
                        if (threwCards.length < num) {
                            threwCards.push(doubleRes[i][1])
                        }
                    }
                }
                // 4. 溜单5分
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() == 5) {
                        threwCards.push(singleRes[i])
                    }
                }
                // 5. 溜多5分
                for (let i = 0; i < multiRes.length && threwCards.length < num; ++i) {
                    if (multiRes[i][0].getValue() == 5) {
                        for (let n = 0; n<multiRes[i].length && threwCards.length < num; ++n) {
                            threwCards.push(multiRes[i][n])
                        }
                    }
                }
                // 6. 陪非分流星
                // 7. 陪单10分
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() == 10 || singleRes[i].getValue() == 13) {
                        threwCards.push(singleRes[i])
                    }
                }
                // 8. 陪多10分
                for (let i = 0; i < multiRes.length && threwCards.length < num; ++i) {
                    if (multiRes[i][0].getValue() == 10 || multiRes[i][0].getValue() == 13) {
                        for (let n = 0; n<multiRes[i].length && threwCards.length < num; ++n) {
                            threwCards.push(multiRes[i][n])
                        }
                    }
                }
                if (threwCards.length < num) {
                    threwCards = []
                }
                if (threwCards.length <= 0) {
                    for (let i = findRes.length - 1; i >= 0; --i) {
                        if (!this.controller.modal.checkCards(currMaxCards, findRes[i])) {
                            threwCards = findRes[i]
                            break
                        }
                    }
                }
                if (threwCards.length <= 0 && cards.length <= 0) {
                    threwCards = this.throwByWay(CONSTANTS.AIGETCARDSWAY.SCOREKILL, color, num)
                }
                break
            case CONSTANTS.AIGETCARDSWAY.SCOREFIRSTMINTHEN:
                // 率先加分, 流星以上除外, 没有的话走最小牌, 流星以上除外, 还没有的话(只剩流星)则尝试走分流星, 
                // 无牌走非主分, 流星除外, 没有的话走非主小牌, 还没有的话走主分, 还没有则返回失败(空值)
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() == 10 || singleRes[i].getValue() == 13) {
                        threwCards.push(singleRes[i])
                    }
                }
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() == 5) {
                        threwCards.push(singleRes[i])
                    }
                }
                for (let i = 0; i < doubleRes.length && threwCards.length < num; ++i) {
                    if (doubleRes[i][0].getValue() == 5 || doubleRes[i][0].getValue() == 10 || doubleRes[i][0].getValue() == 13) {
                        threwCards.push(doubleRes[i][0])
                        if (threwCards.length < num) {
                            threwCards.push(doubleRes[i][1])
                        }
                    }
                }
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    threwCards.push(singleRes[i])
                }
                for (let i = 0; i < doubleRes.length && threwCards.length < num; ++i) {
                    threwCards.push(doubleRes[i][0])
                    if (threwCards.length < num) {
                        threwCards.push(doubleRes[i][1])
                    }
                }
                for (let i = 0; i < cards.length && threwCards.length < num; ++i) {
                    if (cards[i].getValue() == 5 || cards[i].getValue() == 10 || cards[i].getValue() == 13) {
                        threwCards.push(cards[i])
                    }
                }
                for (let i = 0; i < cards.length && threwCards.length < num; ++i) {
                    threwCards.push(cards[i])
                }
                if (threwCards.length <= 0 && cards.length <= 0) {
                    for (let i = 0; i < singleUnmain.length && threwCards.length < num; ++i) {
                        if (singleUnmain[i].getValue() == 10 || singleUnmain[i].getValue() == 13) {
                            threwCards.push(singleUnmain[i])
                        }
                    }
                    for (let i = 0; i < singleUnmain.length && threwCards.length < num; ++i) {
                        if (singleUnmain[i].getValue() == 5) {
                            threwCards.push(singleUnmain[i])
                        }
                    }
                    for (let i = 0; i < doubleUnmain.length && threwCards.length < num; ++i) {
                        if (doubleUnmain[i][0].getValue() == 5 || doubleUnmain[i][0].getValue() == 10 || doubleUnmain[i][0].getValue() == 13) {
                            threwCards.push(doubleUnmain[i][0])
                            if (threwCards.length < num) {
                                threwCards.push(doubleUnmain[i][1])
                            }
                        }
                    }
                    for (let i = 0; i < singleUnmain.length && threwCards.length < num; ++i) {
                        threwCards.push(singleUnmain[i])
                    }
                    for (let i = 0; i < doubleUnmain.length && threwCards.length < num; ++i) {
                        threwCards.push(doubleUnmain[i][0])
                        if (threwCards.length < num) {
                            threwCards.push(doubleUnmain[i][1])
                        }
                    }
                    for (let i = 0; i < singleMain.length && threwCards.length < num; ++i) {
                        if (singleMain[i].getValue() == 10 || singleMain[i].getValue() == 13 || singleMain[i].getValue() == 5) {
                            threwCards.push(singleMain[i])
                        }
                    }
                    for (let i = 0; i < doubleMain.length && threwCards.length < num; ++i) {
                        if (doubleMain[i][0].getValue() == 5 || doubleMain[i][0].getValue() == 10 || doubleMain[i][0].getValue() == 13) {
                            threwCards.push(doubleMain[i][0])
                            if (threwCards.length < num) {
                                threwCards.push(doubleMain[i][1])
                            }
                        }
                    }
                }
                break
            case CONSTANTS.AIGETCARDSWAY.MINKILL:
                if (cards.length > 0) {
                    for (let i = 0; i < findRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, findRes[i])) {
                            threwCards = findRes[i]
                            break
                        }
                    }
                } else {
                    for (let i = 0; i < mainRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, mainRes[i])) {
                            threwCards = mainRes[i]
                            break
                        }
                    }
                }
                break
            case CONSTANTS.AIGETCARDSWAY.SCOREKILL:
                if (cards.length > 0) {
                    for (let i = 0; i < findRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, findRes[i]) &&
                            (findRes[i][0].getValue() == 5 ||
                                findRes[i][0].getValue() == 10 ||
                                findRes[i][0].getValue() == 13
                            )
                        ) {
                            threwCards = findRes[i]
                            break
                        }
                    }
                    for (let i = 0; i < findRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, findRes[i])) {
                            threwCards = findRes[i]
                            break
                        }
                    }
                } else {
                    for (let i = 0; i < mainRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, mainRes[i]) &&
                            (mainRes[i][0].getValue() == 5 ||
                                mainRes[i][0].getValue() == 10 ||
                                mainRes[i][0].getValue() == 13
                            )
                        ) {
                            threwCards = mainRes[i]
                            break
                        }
                    }
                    for (let i = 0; i < mainRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, mainRes[i])) {
                            threwCards = mainRes[i]
                            break
                        }
                    }
                }
                break
            case CONSTANTS.AIGETCARDSWAY.CAUTIOUSKILL:
                // 有牌时, 走最大的; 无牌时走A以上最大主
                if (cards.length > 0) {
                    if (findRes.length > 0 && !this.controller.modal.checkCards(currMaxCards, findRes[findRes.length - 1])) {
                        threwCards = findRes[findRes.length - 1]
                        break
                    }
                } else {
                    for (let i = 0; i < mainRes.length; ++i) {
                        if (!this.controller.modal.checkCards(currMaxCards, mainRes[i]) && this.controller.modal.checkCards([mainRes[i][0]], [new Card(2, mainRes[i][0].getColor(), 1)])) {
                            threwCards = mainRes[i]
                            break
                        }
                    }
                }
                break
            case CONSTANTS.AIGETCARDSWAY.MINWITHOUTSCORE:
            default:
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    if (singleRes[i].getValue() != 5 && singleRes[i].getValue() != 10 && singleRes[i].getValue() != 13) {
                        threwCards.push(singleRes[i])
                    }
                }
                for (let i = 0; i < doubleRes.length && threwCards.length < num; ++i) {
                    if (doubleRes[i][0].getValue() != 5 && doubleRes[i][0].getValue() != 10 && doubleRes[i][0].getValue() != 13) {
                        threwCards.push(doubleRes[i][0])
                        if (threwCards.length < num) {
                            threwCards.push(doubleRes[i][1])
                        }
                    }
                }
                for (let i = 0; i < singleRes.length && threwCards.length < num; ++i) {
                    threwCards.push(singleRes[i])
                }
                for (let i = 0; i < doubleRes.length && threwCards.length < num; ++i) {
                    threwCards.push(doubleRes[i][0])
                    if (threwCards.length < num) {
                        threwCards.push(doubleRes[i][1])
                    }
                }
                for (let i = 0; i < cards.length && threwCards.length < num; ++i) {
                    if (cards[i].getValue() != 5 && cards[i].getValue() != 10 && cards[i].getValue() != 13) {
                        threwCards.push(cards[i])
                    }
                }
                for (let i = 0; i < cards.length && threwCards.length < num; ++i) {
                    threwCards.push(cards[i])
                }
                for (let i = 0; i < otherCards.length && threwCards.length < num; ++i) {
                    if (otherCards[i].getValue() != 5 && otherCards[i].getValue() != 10 && otherCards[i].getValue() != 13) {
                        threwCards.push(otherCards[i])
                    }
                }
                for (let i = 0; i < otherCards.length && threwCards.length < num; ++i) {
                    threwCards.push(otherCards[i])
                }
        }
        return threwCards
    }

    onPlayerThrewCard(seat, cards) {
        this.aroundCards[seat] = cards
        for (let i = 0; i < cards.length; ++i) {
            switch (cards[i].getColor()) {
                case spades:
                    this.roundData.playerData.setData(1, seat, used, spades)
                    break
                case heart:
                    this.roundData.playerData.setData(1, seat, used, heart)
                    break
                case cube:
                    this.roundData.playerData.setData(1, seat, used, cube)
                    break
                case diamond:
                    this.roundData.playerData.setData(1, seat, used, diamond)
                    break
                case CONSTANTS.CARDCOLOR.JOKER:
                    if (cards[i].getValue() == 1) {
                        this.roundData.playerData.setData(1, seat, used, bigJoker)
                    } else {
                        this.roundData.playerData.setData(1, seat, used, smallJoker)
                    }
            }
            if (this.controller.modal.checkIsMain(cards[i])) {
                this.roundData.playerData.setData(1, seat, used, main)
                if (this.controller.modal.getCurValue() == cards[i].getValue()) {
                    this.roundData.playerData.setData(1, seat, used, mainCurr)
                }
            }
            if (cards[i].getColor() != CONSTANTS.CARDCOLOR.JOKER) {
                switch (cards[i].getValue()) {
                    case 5:
                        this.roundData.usedScore += 5
                        break
                    case 10:
                        this.roundData.usedScore += 10
                        break
                    case 13:
                        this.roundData.usedScore += 10
                        break
                }
            }
        }
        if (this.aroundCards[this.controller.modal.getNextOfSeat(seat)])
            this.resetAroundData()
    }

    onRoundOver(reportData) {
        cc.log("robot onRoundOver, seat: ", this.seat);
        this.resetAIDataBeforeRound(false)
        super.onRoundOver(reportData)
    }
}