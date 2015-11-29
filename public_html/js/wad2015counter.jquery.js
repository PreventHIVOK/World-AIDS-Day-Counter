jQuery( document ).ready( function( $ ) {                
    function updateInfectionCounters() {
        $( "#HIV-incidence-today-Oklahoma span" ).html( incidenceWithCommas( "Oklahoma", "infections", "today" ) );
        $( "#HIV-incidence-today-US span" ).html( incidenceWithCommas( "US", "infections", "today" ) );
        $( "#HIV-incidence-today-Worldwide span" ).html( incidenceWithCommas( "Worldwide", "infections", "today" ) );

        $( "#HIV-incidence-this-year-Oklahoma span" ).html( incidenceWithCommas( "Oklahoma", "infections", "this year" ) );
        $( "#HIV-incidence-this-year-US span" ).html( incidenceWithCommas( "US", "infections", "this year" ) );
        $( "#HIV-incidence-this-year-Worldwide span" ).html( incidenceWithCommas( "Worldwide", "infections", "this year" ) );
    };

    function updateDeathCounters() {
        $( "#HIV-deaths-today-Oklahoma span" ).html( incidenceWithCommas( "Oklahoma", "deaths", "today" ) );
        $( "#HIV-deaths-today-US span" ).html( incidenceWithCommas( "US", "deaths", "today" ) );
        $( "#HIV-deaths-today-Worldwide span" ).html( incidenceWithCommas( "Worldwide", "deaths", "today" ) );

        $( "#HIV-deaths-this-year-Oklahoma span" ).html( incidenceWithCommas( "Oklahoma", "deaths", "this year" ) );
        $( "#HIV-deaths-this-year-US span" ).html( incidenceWithCommas( "US", "deaths", "this year" ) );
        $( "#HIV-deaths-this-year-Worldwide span" ).html( incidenceWithCommas( "Worldwide", "deaths", "this year" ) );
    };

    function updateResourceCounters() {
        $( "#HIV-resources-today-US span" ).html( "$" + incidenceWithCommas( "US", "resources", "today" ) );
        $( "#HIV-resources-this-year-US span" ).html( "$" + incidenceWithCommas( "US", "resources", "this year" ) );
    }

    function updateAllCounters() {
        updateInfectionCounters();
        updateDeathCounters();
        updateResourceCounters();
    }

    updateAllCounters();
    setInterval( updateAllCounters, 1000 );
});