import Board from './board';
import Score from './score';
import GameInterface from './gameInterface';

/*   *   *   *   *   *   *   *   *   *   */

class App {

    constructor() {

        // animation id request
        this.requestID = null;

        // game board
        this.board = new Board( '#board' );

        // game score
        this.score = new Score( '#score' );

        // game interface & animation link
        this.interface = new GameInterface( '#interface', this.startAnimate );
    };

    /*   *   *   *   *   *   *   *   */

    init = ()  => {

        // game board init
        this.board.init()

        // score mechanism init
        this.score.init();

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

            // new animation request
            this.requestID = requestAnimationFrame( animationLoop );
            // this.requestID = setTimeout( animationLoop, 1000 / 60 );

            // proper animation draw
            this.board.update();
            this.board.draw();

            // score mechanism update
            this.score.update( this.board.getScore() );

            // on collision stop
            if( this.board.isCollision() ) { this.stopAnimate(); }
        }

        this.requestID = requestAnimationFrame( animationLoop );
        // this.requestID = setTimeout( animationLoop, 1000 / 60 );
        // this.requestID = setInterval( animationLoop, 1000 / 60 );
    };

    stopAnimate = () => {

        // stops board
        this.board.stop();

        // score sumarize
        this.score.setUp();

        // restores interface
        this.interface.restore();

        // cancels next animation frame
        cancelAnimationFrame( this.requestID );
        // clearTimeout( this.requestID );
        // clearInterval( this.requestID );
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default App;