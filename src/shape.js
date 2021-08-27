class Shape {

    constructor( x, y, r, color ) {

        this.x = x;
        this.y = y;
        this.r = r;

        this.color = color;
    };

    /*   *   *   *   *   *   *   *   */

    draw = ( ctx ) => {

        throw new Error( 'Draw function not implemented!' );
    };

    update = ( x, y, r ) => {

        this.x = x;
        this.y = y;
        this.r = r;
    };
};

/*   *   *   *   *   *   *   *   *   *   */

export default Shape;