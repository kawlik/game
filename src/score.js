class Score {

    constructor( selector ) {

        this.selector = selector;

        this.elem = null;

        this.currScoreRef = null;
        this.highScoreRef = null;

        this.currScoreVal = null;
        this.highScoreVal = null;
    };

    /*   *   *   *   *   *   *   *   */

    init = () => {

        this.elem = document.querySelector( this.selector );

        if( this.elem ) {

            // creates refrence parrent elems
            const currScore = document.createElement( 'div' );
            const highScore = document.createElement( 'div' );

            // seting up
            currScore.classList.add( 'preRef', 'currScore' );
            highScore.classList.add( 'preRef', 'highScore' );

            currScore.innerHTML = 'now';
            highScore.innerHTML = 'high';

            // creates refrence elems
            this.currScoreRef = document.createElement( 'span' );
            this.highScoreRef = document.createElement( 'span' );

            // seting up
            this.currScoreRef.classList.add( 'ref' );
            this.highScoreRef.classList.add( 'ref' );

            // proper append
            currScore.append( this.currScoreRef );
            highScore.append( this.highScoreRef );

            this.elem.append( currScore );
            this.elem.append( highScore );

            // initial setup & update
            this.setUp();
            this.update();
        }
    };

    /*   *   *   *   *   *   *   *   */

    setUp = () => {

        this.currScoreVal = 0;
        this.highScoreVal = this.readHighScore();
    };

    update = ( score = 0 ) => {

        this.currScoreVal = score;

        this.currScoreRef.textContent = this.currScoreVal;
        this.highScoreRef.textContent = this.highScoreVal;

        if( this.currScoreVal > this.readHighScore() ) {
            this.highScoreVal = this.currScoreVal;
            this.saveHighScore();
        }
    };

    /*   *   *   *   *   *   *   *   */

    readHighScore = () => {
        
        const savedScore = parseInt( localStorage.spikeHighScore, 10 );

        const score = Number.isInteger( savedScore ) ? savedScore : 0;

        return score;
    };

    saveHighScore = () => {

        localStorage.spikeHighScore = this.highScoreVal;
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default Score;