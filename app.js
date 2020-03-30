new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    watch: {
        playerHealth(value) {
            if (value <= 0) {this.playerHealth = 0; this.checkWin();}
        },
        monsterHealth(value) {
            if (value <= 0) {this.monsterHealth = 0; this.checkWin();}
        } 
    },
    methods: {
        gameStart() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() { 
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
        
            this.monsterAttack();
        },
        specialAttack() {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits hard Monster for ' + damage
            });
           
            this.monsterAttack();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
            this.turns = [];
        },
        monsterAttack() {
            let damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage(min, max) {
           return Math.floor(Math.random() * max) + min;
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.gameStart();
                } else {
                    this.gameIsRunning = false;
                }
                return true;  
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.gameStart();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});