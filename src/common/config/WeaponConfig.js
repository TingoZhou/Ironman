var WeaponConfig = {
    Rifle: {
        shootStep: 10,
        bullets: {
            presetAmount: 10,
            res: "#bulletRifle.png",
            speed: 15
        }
    },
    Rocket: {
        shootStep: 30,
        res: "#Rocket.png",
        bullets: {
            presetAmount: 10,
            res: "#RocketBullet.png",
            speed: 8,
            explode: {
                frames: [
                    "rocketEffect00.png",
                    "rocketEffect01.png",
                    "rocketEffect02.png",
                    "rocketEffect03.png",
                    "rocketEffect04.png",
                    "rocketEffect05.png",
                    "rocketEffect06.png"
                ],
                speed: 2.5
            }
        }
    },
    Electric: {
        shootStep: 15,
        bullets: {
            presetAmount: 10,
            frames: [
                "00000.png",
                "00001.png",
                "00002.png",
                "00003.png",
                "00004.png",
                "00005.png",
                "00006.png"],
            speed: 8
        }
    },
    MonsterRifle: {
        shootStep: 60,
        bullets: {
            dps: 1,
            scale: 0.4,
            presetAmount: 10,
            res: "#bulletRifle.png",
            speed: 5
        }
    }

}