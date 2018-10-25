const CONSTANTS = Object.freeze({
  
  LABEL_COLOR:{
    GREEN: new cc.Color(18, 200, 10),
    RED: new cc.Color(240, 8, 8),
  },
  /** @enum {Symbol} */
  DEBUGLEVEL:{
    NOTE:Symbol('note'),
    DEBUG:Symbol('debug'),
    WARN:Symbol('warn'),
    ERROR:Symbol('error'),
    FATAL:Symbol('fatal'),
  },
  /** @enum {Symbol} */
  GAMETYPE:{
    HUOLONG:Symbol('huolong'),  // 攉龙
    CHUDADI:Symbol('chudaD'),   // 锄大地 (后续推出)
    DOUDIZHU:Symbol('doudizhu'),   // 锄大地 (后续推出)
    ZHUOHONGSAN:Symbol('zhuored3'),   // 锄大地 (后续推出)
  },
  /** @enum {Symbol} */
  GAMESTATE:{
    START:Symbol("start"),
    GIVINGCARDS:Symbol("givingCards"),
    GIVINGCARDSOVER:Symbol("givingCardsOver"),
    GIVINGLASTCARDS:Symbol("givingLastCards"),
    INGAME:Symbol("inGame"),
    REPORT:Symbol("report"),
    OVERIDLE:Symbol("overIdle"),
  },
  /** @enum {Symbol} */
  CARDCOLOR:{
    SPADES:Symbol("spades"), // 黑桃
    HEART:Symbol("heart"), // 红桃
    CUBE:Symbol("cube"), // 草花
    DIAMOND:Symbol("diamond"), // 方片
    JOKER:Symbol("joker"), // 王牌
    MAIN:Symbol("main"),  // 主花色, 包含常主, 王牌, 本级
    UNMAIN:Symbol("unmain"),  // 非主花色的牌
    ANY:Symbol("any")
  },
  /** @enum {Symbol} */
  CARDRANDOMWAY:{
    ALLRANDOM:Symbol("allRandom"),  // 全部随机, 用于正常逻辑
    NORANDOM:Symbol("noRandom"),  // 不随机, 用初始化的卡牌排列, 用于debug
    SOMERANDOM:Symbol("someRandom"),  // 前面一部分指定, 未指定部分随机, 用于特定功能debug
  },
  /** @enum {Symbol} */
  PLAYERSEAT:{
    SELF:Symbol("self"),  // 本家
    NEXT:Symbol("next"),  // 下家, 右边
    FRIEND:Symbol("friend"), // 对家, 友方
    BACK:Symbol("back"), // 上家, 左边
  },
  /** @enum {Symbol} */
  PLAYERTYPE:{
    DEFALUT:Symbol('default'), // 默认托管player, 仅出符合规则的随机牌, 摸到底牌会原样扣回去, 争主王牌必亮, 非庄不摘星
    LOCAL:Symbol('local'),  // 本机玩家
    NETWORK:Symbol('network'), // 网络数据
    AI:Symbol('AI'),  // AI玩家
  },
  /** @enum {Symbol} */
  PLAYEREVENT:{
    STARTGAME:Symbol('startGame'),  // 游戏开始, 玩家需要返回 ROUNDREADY
    STARTROUND:Symbol('startRound'),  // 本局开始
    GIVEACARD:Symbol('giveACard'),  // 发一张牌, 此后可发送 SHOWSTAR
    OVERGIVENCARDS:Symbol('overGivenCards'), // 通报发牌完毕, 要求所有玩家返回 CARDSGET, 返回前可发送 SHOWSTAR
    PLAYERSHOWEDSTAR:Symbol('playerShowedStar'),  // 有玩家 (包括自己) 亮了王牌
    GETLASTCARDS:Symbol('getLastCards'),  // 收底牌, 需返回 THROWLASTCARDS
    PLAYERTHREWLASTCARDS:Symbol('playerThrewLastCards'), // 扣底牌及摘星信息
    ASKFORTHROW:Symbol('askForThrow'), // 请该玩家出牌, 需要返回 THROWCARD
    PLAYERTHREWCARD:Symbol('playerThrewCard'), // 有玩家 (包括自己) 打了牌
    ROUNDREPORT:Symbol('roundReport'), // 一局结束, 通报结果, 需返回 ROUNDREADY 以开始下一局
    GAMEREPORT:Symbol('gameReport'), // 游戏结束, 通报结算数据
  },
  /** @enum {Symbol} */
  PLAYERWORK:{
    ROUNDREADY:Symbol('roundReady'), // 发送就绪确认
    SHOWSTAR:Symbol('showStar'), // 发送亮王牌
    CARDSGET:Symbol('cardsGet'), // 发送摸牌完毕确认 (确认后不能再发送 SHOWSTAR)
    THROWLASTCARDS:Symbol('throwLastCards'), // 发送扣底牌 (包括摘星)
    THROWCARD:Symbol('throwCard'), // 出牌
  },
  /** @enum {Symbol} */
  AIGETCARDSWAY:{
    MINWITHOUTSCORE:Symbol('minWithoutScore'),  // 溜牌, 排除分数, 除非只剩分数
    MINORSCOREKILL:Symbol('minOrScoreKill'),  // 尽量无分溜, 如只剩分,尝试大. 如无此花色只剩主或分,则分杀
    SCOREFIRSTMINTHEN:Symbol('scoreFirstMinThen'),  // 优先加分, 无分溜小牌, 不破流星
    MINKILL:Symbol('minKill'),            // 仅使用最小杀, 不用王牌
    SCOREKILL:Symbol('scoreKill'),        // 优先使用分杀, 不用王牌
    CAUTIOUSKILL:Symbol('cautiousKill'),  // 谨慎杀, 最小使用A或更大, 可用王牌
  }
})

export default CONSTANTS
