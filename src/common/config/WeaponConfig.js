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
		bullets: {
			presetAmount: 10,
			res: "#bulletRifle.png",
			speed: 5
		}
	},
	Electric: {
		shootStep: 1,
		bullets: {
			presetAmount: 10,
			frames: ["weaponD1.png", "weaponD2.png", "weaponD3.png", "weaponD4.png"],
			speed: 5
		}
	}
}