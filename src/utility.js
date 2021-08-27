const randBool = () => {

    return Boolean(( Math.floor( Math.random() * 2 )));
};


const randIntRange = ( min, max ) => {

    if( min > max ) { [ min, max ] = [ max, min ]; }

    return ( Math.floor( Math.random() * ( max - min + 1 ))) + min;
};


const randFloatRange = ( min, max ) => {

    if( min > max ) { [ min, max ] = [ max, min ]; }

    return ( Math.random() * ( max - min + 1 )) + min;
};

/*   *   *   *   *   *   *   *   *   *   */

export { randBool, randIntRange, randFloatRange };