const Config = {

    // game board propeties
    board: {

        x: 450, // board width
        y: 800, // board height

    },

    // in game player propeties
    player: {

        r: 20,  // player radius
        o: 10,  // player edges curve
    },

    // in game spikes propeties
    spike: {

        r: 15,  // spike radius
    },

    // initial values
    initial: {

        // player position
        player: { x: 225, y: 550, },

        // spikes position
        spikeLeft: { x: 15, y: 0, },
        spikeRight: { x: 435, y: 0, },
    },

    // particles propeties
    particles: {

        // in game wind effect
        wind: {

            color: 'rgba( 0, 0, 0, 0.1 )',
            count: 20,
            r: 300,
        },

        // in game trace effect
        trace: {

            color: 0,
            count: 50,
            r: 5,
        },
    },

    // game color scheme
    color: {

        background: '#fefefe',
        player: '#ff5544',
        spike: '#bbbbbb', 
    },

    // difficulty levels
    difficulty: {

        easy: 400,
        medium: 300,
        hard: 200,
    },

    // state values
    state: {

        // game setings
        difficulty: null,
        playerColor: null,

        // optimization settings
        drawParticles: true,
        useSmothRender: true,
    },
};

/*   *   *   *   *   *   *   *   *   *   */

export default Config;