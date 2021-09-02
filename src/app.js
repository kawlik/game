import Board from './board';
import Score from './score';
import State from './state';
import GameInterface from './gameInterface';

import Config from './config';

/*   *   *   *   *   *   *   *   *   *   */

class App {

    constructor() {

        // animation id request
        this.requestID = null;

        // game board
        this.board = new Board( '#board' );

        // game score
        this.score = new Score( '#score' );

        // game state
        this.state = new State( '#state', this.board.setUp );

        // game interface & animation link
        this.interface = new GameInterface( '#interface', this.state, this.startAnimate );
    };

    /*   *   *   *   *   *   *   *   */

    init = ()  => {

        // game board init
        this.board.init()

        // score mechanism init
        this.score.init();

        // state mechanism init
        this.state.init();

        // interfae init
        this.interface.init();

        // initial board draw
        this.board.draw();
    };

    /*   *   *   *   *   *   *   *   */

    startAnimate = () => {

        // initializes board
        this.board.start();

        const animationLoop = () => {

            // smoth render 
            if( Config.state.useSmothRender ) {

                // new animation request
                this.requestID = requestAnimationFrame( animationLoop );
            }

            // proper animation draw
            this.board.update();
            this.board.draw();

            // score mechanism update
            this.score.update( this.board.getScore() );

            // on collision stop
            if( this.board.isCollision() ) { this.stopAnimate(); }
        }

        // render method select
        if( Config.state.useSmothRender ) {

            // smoth render RAF
            this.requestID = requestAnimationFrame( animationLoop );

        } else {

            // stable render Interval
            this.requestID = setInterval( animationLoop, 1000 / 60 );
        }
    };

    stopAnimate = () => {

        // stops board
        this.board.stop();

        // score sumarize
        this.score.setUp();

        // restores interface
        this.interface.restore();

        // cancels next animation frame
        if( Config.state.useSmothRender ) {

            // smoth render RAF
            cancelAnimationFrame( this.requestID );

        } else {

            // stable render Interval
            clearInterval( this.requestID );
        }
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default App;