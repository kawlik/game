class GameInterface {

    constructor( selector, startCallback ) {

        this.selector = selector;
        this.startCallback = startCallback;

        this.elem = null;

        this.btnConfig = null;
        this.btnStart = null;
    };

    /*   *   *   *   *   *   *   *   */

    init = () => {

        this.elem = document.querySelector( this.selector );

        if( this.elem ) {

            // creates interface buttons
            this.btnConfig = document.createElement( 'button' );
            this.btnStart = document.createElement( 'button' );

            // sets ups buttons
            this.btnConfig.classList.add( 'material-icons', 'config' );
            this.btnStart.classList.add( 'material-icons', 'start' );

            this.btnConfig.innerHTML = 'settings';
            this.btnStart.innerHTML = 'play_circle';

            // starts listening
            this.btnStart.addEventListener( 'click', this.handleStart );

            // buttons append
            this.elem.append( this.btnConfig );
            this.elem.append( this.btnStart );
        }
    };

    /*   *   *   *   *   *   *   *   */

    handleStart = () => {

        this.elem.classList.add( 'hidden' );

        this.btnConfig.disabled = true;
        this.btnStart.disabled = true;

        this.startCallback();
    }

    restore = () => {
        
        this.elem.classList.remove( 'hidden' );
        
        this.btnConfig.disabled = false;
        this.btnStart.disabled = false;
    }
};

/*   *   *   *   *   *   *   *   *   *   */

export default GameInterface;