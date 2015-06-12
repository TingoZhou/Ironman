var USK = UMStorageKey = {
    /**
     *    游戏信息
     *  {
	 *		soundVolume: // 音效大小
	 *  	musicVolume: // 音乐大小
	 *	}
     */
    GameInfo: {
        name: "GameInfo",
        type: "json"
    },
    /**
     *    玩家总分数
     *    {
	 *  	Score: "Score",
	 *  	Electric: "Electric",  // 激光
	 *      Rocket: "Rocket",// 导弹
	 *		Rifle: "Rifle",          // 子弹数
	 *		BombNum: "BombNum", // 大招数量
	 *		FreezeNum: "FreezeNum", // 冰冻数量
	 *		ShieldNum: "ShieldNum", // 护盾数
	 *  }
     */
    PlayInfo: {
        name: "PlayInfo",
        type: "json"
    }
}