import Shape from './shape';

/*   *   *   *   *   *   *   *   *   *   */

class SpikeLeft extends Shape {

    constructor( x, y, r, color ) {
        super( x, y, r, color );

        this.passed = false;
    };

    /*   *   *   *   *   *   *   *   */

    draw = ( ctx ) => {

        const { x, y, r } = this;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo( x - r, y - r );

        ctx.lineTo( x + r, y );
        ctx.lineTo( x - r, y + r );
        ctx.lineTo( x - r, y - r );

        ctx.closePath();
        ctx.fill();
    };
};

class SpikeRight extends Shape {

    constructor( x, y, r, color ) {
        super( x, y, r, color );

        this.passed = false;
    };

    /*   *   *   *   *   *   *   *   */

    draw = ( ctx ) => {

        const { x, y, r } = this;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo( x + r, y - r );

        ctx.lineTo( x - r, y );
        ctx.lineTo( x + r, y + r );
        ctx.lineTo( x + r, y - r );

        ctx.closePath();
        ctx.fill();
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export { SpikeLeft, SpikeRight };