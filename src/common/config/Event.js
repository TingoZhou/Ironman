var SC = SH.CUSTOMEVENTS = {
	CHARACTER_DIE: "CHARACTER_DIE",
	CHARACTER_UPDATE_BULLET: "CHARACTER_UPDATE_BULLET",
	CHARACTER_EXCUTE_SKILL: "CHARACTER_EXCUTE_SKILL",
	CHARACTER_RESURRECTION: "CHARACTER_RESURRECTION",
    CHARACTER_GIVEUP_RESURRECTION: "CHARACTER_GIVEUP_RESURRECTION",

    MONSTER_DIE: "MONSTER_DIE",
    MONSTER_HIT: "MONSTER_HIT",
    MONSTER_HIT_CHARACTER: "MONSTER_HIT_CHARACTER",

    BATTLE_START: "BATTLE_START",
    BATTLE_PAUSE: "BATTLE_PAUSE",
    BATTLE_RESUME: "BATTLE_RESUME",
	BATTLE_STOP: "BATTLE_STOP",
	BATTLE_ROUND_UPDATE: "BATTLE_ROUND_UPDATE",
	BATTLE_SHAKE: "BATTLE_SHAKE",
    BATTLE_END: "BATTLE_END",

    DROPITEM_GET: "DROPITEM_GET",
    DROP_COIN: "DROP_COIN",
    DROP_MONEY: "DROP_MONEY",

    SYSTEM_TABS_UPDATE: "SYSTEM_TABS_UPDATE",
    TRIGGER_SKILL: "TRIGGER_SKILL"
};

var SG = SH.GLOBALEVENTS = {
	PLAYER_UPDATE_COIN: "PLAYER_UPDATE_COIN",
    PAY_CALLBACK: "PAY_CALLBACK"
};