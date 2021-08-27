import Config from './config';
import * as Utility from './utility';

import Player from './player';
import * as Spike from './spike';
import * as Particles from './particles';

/*   *   *   *   *   *   *   *   *   *   */

class Board {

    constructor( selector, difficulty = Config.difficulty.medium ) {

        this.selector = selector;
        this.difficulty = difficulty;

        this.cvs = null;    // cnvas elem
        this.ctx = null;    // context reference

        this.x = null;  // board width
        this.y = null;  // board height

        this.player = null; // player object
        this.spikes = null; // spikes array

        this.particles = null;  // particles array

        this.playerSide = null; // player side variable
        this.spikeSpeed = null; // spike speed variable
        this.spikeCount = null; // spike count variable

        this.activeGame = null; // game active / idle state
        this.gameScore = null;  // game score variable
    };

    /*   *   *   *   *   *   *   *   */

    init = () =>{

        this.cvs = document.querySelector( this.selector );

        if( this.cvs ) {

            // board width & height setup
            this.cvs.width = this.x = Config.board.x;
            this.cvs.height = this.y = Config.board.y;

            // creating context reference
            this.ctx = this.cvs.getContext( '2d' );

            // creating on boar click event
            this.cvs.addEventListener( 'click', this.changePlayerSide );

            // setsUp initial state
            this.setUp();
        }
    };

    setUp = () => {

        const { player, particles, color, initial } = Config;

        // player setup
        this.player = new Player( initial.player.x, initial.player.y, player.r, color.player );
        this.playerSide = Utility.randBool();   // random player side drag

        // spikes setup
        this.spikes = new Array();
        this.spikeSpeed = 1;
        this.spikeCount = 0;

        // particles setup
        this.particles = new Array();
        this.particles.push( new Particles.Wind( this.x, this.y, particles.wind.r, particles.wind.color, particles.wind.count, this.spikeSpeed ));
        this.particles.push( new Particles.Trace( this.x + 2 * player.r, this.y, particles.trace.r, particles.trace.color, particles.trace.count ));
        
        this.spikeCount = 0;    // initial spike count value
        this.spikeSpeed = 1;    // initial spike speed value
        this.gameScore = 0;     // initial game score

        this.activeGame = false;    // initial game idle state
    };

    /*   *   *   *   *   *   *   *   */

    update = () => {

        // player update
        this.player.changeSide( this.playerSide, this.player.r, this.x - this.player.r );

        // test place for new spike
        const newSpikeOffset = this.spikes[0].y - this.difficulty;
        if( newSpikeOffset > 0 ) { this.addNewSpike( newSpikeOffset ); }

        // spikes update
        this.spikes.splice( 10 );
        this.spikes.forEach( spike => {
            spike.y += this.spikeSpeed;
        });

        // particles update
        this.particles.forEach( particle => {
            particle.update( this.player.x, this.player.y, this.spikeSpeed );
        });

        // score counting function
        this.calcScore();
    };

    draw = () => {

        // boar draw
        this.drawBoard( this.ctx );

        // draws particles
        this.particles.forEach( particle => {
            particle.draw( this.ctx );
        });
        
        // draws player
        this.player.draw( this.ctx );
        
        // draws spikes
        this.spikes.forEach( spike => {
            spike.draw( this.ctx );
        });
    };

    changePlayerSide = () => {
        this.playerSide = !this.playerSide;
    };

    getScore = () => {
        return this.gameScore;
    }

    isCollision = () => {

        // collison change
        let collision = false;
        
        this.spikes.forEach( spike => {
        
            const R = this.player.r + spike.r;
        
            const D = Math.sqrt( ( this.player.x - spike.x )**2 + ( this.player.y - spike.y )**2 );
        
            // collision detected with small offset
            if( D < R - Math.log( R ) ) { collision = true; }
        });
        
        // collision ststus
        return collision;
    };

    /*   *   *   *   *   *   *   *   */

    start = () => {

        // game initial state setup
        this.setUp();

        // first spike
        this.addNewSpike();

        // game state change
        this.activeGame = true;
    };

    stop = () => {

        // game state change
        this.activeGame = false;
    };

    /*   *   *   *   *   *   *   *   */
    
    addNewSpike = ( offset = 0 ) => {

        // setings destruct
        const { initial, spike, color } = Config;

        // random side select
        const side = Utility.randBool();
        
        if( !side ) { this.spikes.unshift( new Spike.SpikeLeft( initial.spikeLeft.x, initial.spikeLeft.y + offset, spike.r, color.spike )); }
        if( side ) { this.spikes.unshift( new Spike.SpikeRight( initial.spikeRight.x, initial.spikeRight.y + offset, spike.r, color.spike )); }
        
        // spike count and speed update
        this.spikeCount++;
        this.spikeSpeed = 2 + ( 50 / Math.PI ) * Math.atan( this.spikeCount / 100 );
    };

    drawBoard = ( ctx ) => {
        
        // initial cleanup
        ctx.clearRect( 0, 0, this.x, this.y );

        // board background
        ctx.fillStyle = Config.color.background;
        ctx.fillRect( 0, 0, this.x, this.y );
    };

    calcScore = () => {

        // calc spikes y
        this.spikes.forEach( spike => {
            
            // new unpassed spike detected
            if( !spike.passed && spike.y > this.player.y + this.player.r ) {

                spike.passed = true;
                this.gameScore++;
            }
        });
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default Board;