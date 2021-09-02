import Config from './config';

/*   *   *   *   *   *   *   *   *   *   */

class State {

    constructor( selector, boardSetUpCallback ) {

        this.selector = selector;
        this.boardSetUpCallback = boardSetUpCallback;

        this.elem = null;

        this.btnClose = null;
        this.btnReset = null;

        this.difficultyRef = null;
        this.playerColorRef = null;
        this.drawParticlesRef = null;
        this.useSmothRenderRef = null;

        this.difficultyVal = null;
        this.playerColorVal = null;
        this.drawParticlesVal = null;
        this.useSmothRenderVal = null;
    };

    /*   *   *   *   *   *   *   *   */
    
    init = () => {

        this.elem = document.querySelector( this.selector );

        if( this.elem ) {

            // close button setup
            this.btnClose = document.createElement( 'button' );
            this.btnClose.addEventListener( 'click', this.setHidden );
            this.btnClose.classList.add( 'material-icons', 'btnClose' );
            this.btnClose.innerHTML = 'cancel';

            // close button setup
            this.btnReset = document.createElement( 'button' );
            this.btnReset.addEventListener( 'click', this.setReset );
            this.btnReset.classList.add( 'material-icons', 'btnReset' );
            this.btnReset.innerHTML = 'replay';

            // creates refrence parrent elems
            const difficulty = document.createElement( 'label' );
            const playerColor = document.createElement( 'label' );
            const drawParticles = document.createElement( 'label' );
            const useSmothRender = document.createElement( 'label' );

            // seting up
            difficulty.classList.add( 'preRef', 'difficulty' );
            playerColor.classList.add( 'preRef', 'playerColor' );
            drawParticles.classList.add( 'preRef', 'drawParticles' );
            useSmothRender.classList.add( 'preRef', 'useSmothRender' );

            difficulty.innerHTML = 'difficulty';
            playerColor.innerHTML = 'player color';
            drawParticles.innerHTML = 'draw particles';
            useSmothRender.innerHTML = 'use smoth render';

            // creates refrence elems
            this.playerColorRef = document.createElement( 'input' );
            this.drawParticlesRef = document.createElement( 'input' );
            this.useSmothRenderRef = document.createElement( 'input' );

            this.difficultyRef = document.createElement( 'select' );

            // difficulty refrence seting up
            const optionEasy = document.createElement( 'option' );
            optionEasy.value = Config.difficulty.easy;
            optionEasy.innerHTML = 'easy';

            const optionMedium = document.createElement( 'option' );
            optionMedium.value = Config.difficulty.medium;
            optionMedium.innerHTML = 'medium';

            const optionHard = document.createElement( 'option' );
            optionHard.value = Config.difficulty.hard;
            optionHard.innerHTML = 'hard';
                
            this.difficultyRef.append( optionEasy );
            this.difficultyRef.append( optionMedium );
            this.difficultyRef.append( optionHard );
            
            // seting up
            this.playerColorRef.type = 'color';
            this.drawParticlesRef.type = 'checkbox';
            this.useSmothRenderRef.type = 'checkbox';

            this.difficultyRef.classList.add( 'ref' );
            this.playerColorRef.classList.add( 'ref' );
            this.drawParticlesRef.classList.add( 'ref' );
            this.useSmothRenderRef.classList.add( 'ref' );

            // proper append
            difficulty.append( this.difficultyRef );
            playerColor.append( this.playerColorRef );
            drawParticles.append( this.drawParticlesRef );
            useSmothRender.append( this.useSmothRenderRef );
        
            
            this.elem.append( difficulty );
            this.elem.append( playerColor );
            this.elem.append( drawParticles );
            this.elem.append( useSmothRender );
            
            this.elem.append( this.btnClose );
            this.elem.append( this.btnReset );
            
            // initial setup
            this.setUp();
            this.update();
        }
    };

    /*   *   *   *   *   *   *   *   */

    setUp = () => {

        this.difficultyRef.addEventListener( 'change', this.handleChangeDifficulty );
        this.playerColorRef.addEventListener( 'change', this.handleChangePlayerColor );
        this.drawParticlesRef.addEventListener( 'change', this.handleChangeDrawParticlesVal );
        this.useSmothRenderRef.addEventListener( 'change', this.handleChangeUseSmothRenderVal );

        // reads saved state
        this.readState();

        // sets proper values
        this.setProperValue();
    };

    update = () => {

        Config.state.difficulty = this.difficultyVal;
        Config.state.playerColor = this.playerColorVal;
        Config.state.drawParticles = this.drawParticlesVal;
        Config.state.useSmothRender = this.useSmothRenderVal;

        // saves state
        this.saveState();

        // draw callback
        this.boardSetUpCallback();
    };

    setVisible = () => {
        this.elem.classList.remove( 'hidden' );
    };

    setHidden = () => {
        this.elem.classList.add( 'hidden' );
    };

    setReset = () => {

        this.difficultyVal = Config.difficulty.medium;
        this.playerColorVal = Config.color.player;
        this.drawParticlesVal = Config.state.drawParticles;
        this.useSmothRenderVal = Config.state.useSmothRender;

        this.update();
    }

    /*   *   *   *   *   *   *   *   */

    handleChangeDifficulty = ( event ) => {

        this.difficultyVal = parseInt( event.target.value );
        this.update();
    };

    handleChangePlayerColor = ( event ) => {

        this.playerColorVal = event.target.value;
        this.update();
    };

    handleChangeDrawParticlesVal = ( event ) => {

        this.drawParticlesVal = Boolean( event.target.checked );
        this.update();
    };

    handleChangeUseSmothRenderVal = ( event ) => {

        this.useSmothRenderVal = Boolean( event.target.checked );
        this.update();
    };

    /*   *   *   *   *   *   *   *   */

    setProperValue = () => {

        [...this.difficultyRef.options].forEach( elem => {
            elem.selected = +elem.value === this.difficultyVal;
        });

        this.playerColorRef.value = this.playerColorVal;

        this.drawParticlesRef.checked = this.drawParticlesVal;
        this.useSmothRenderRef.checked = this.useSmothRenderVal;
    };

    readState = () => {

        const difficultyVal = localStorage.difficulty === undefined ? Config.difficulty.medium : parseInt( localStorage.difficulty );
        const playerColorVal = localStorage.playerColor === undefined ? Config.color.player : localStorage.playerColor;
        const drawParticlesVal = localStorage.drawParticles === undefined ? Config.state.drawParticles : Boolean( localStorage.drawParticles );
        const useSmothRenderVal = localStorage.useSmothRender === undefined ? Config.state.useSmothRender : Boolean( localStorage.useSmothRender );

        this.difficultyVal = difficultyVal;
        this.playerColorVal = playerColorVal;
        this.drawParticlesVal = drawParticlesVal;
        this.useSmothRenderVal = useSmothRenderVal;
    };

    saveState = () => {

        localStorage.difficulty = this.difficultyVal;
        localStorage.playerColor = this.playerColorVal;
        localStorage.drawParticles = this.drawParticlesVal;
        localStorage.useSmothRender = this.useSmothRenderVal;
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default State;