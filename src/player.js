import Shape from './shape.js';

/*   *   *   *   *   *   *   *   *   *   */

class Player extends Shape {

    constructor( x, y, r, color ) {
        super( x, y, r, color );
    }

    draw = ( ctx ) => {

        const { x, y, r } = this;
        const o = r / 2;

        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo( x - r, y - o );

        ctx.arcTo( x - r, y - r, x + r, y - r, o );
        ctx.arcTo( x + r, y - r, x + r, y + r, o );
        ctx.arcTo( x + r, y + r, x - r, y + r, o );
        ctx.arcTo( x - r, y + r, x - r, y - r, o );
        
        ctx.closePath();
        ctx.fill();
    }

    changeSide = ( side, min_x, max_x ) => {

        // redundancy prevent
        if( !side && this.x === min_x ) { return; } // max snap left
        if( side && this.x === max_x ) { return; }  // max snap right

        // snap to left
        if( !side ) {  this.x -= 2 * this.r; }

        // snap to right
        if( side ) { this.x += 2 * this.r; }

        // position correction
        if( this.x < min_x ) { this.x = min_x; }
        if( this.x > max_x ) { this.x = max_x; }
    }
}

/*   *   *   *   *   *   *   *   *   *   */

export default Player;