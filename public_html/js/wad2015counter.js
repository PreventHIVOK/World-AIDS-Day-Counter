/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/** JSON array of HIV infections for a given year. @type {Object} */
var hivInfectionsPerYear = [],
/** JSON array of AIDS-related deaths for a given year. @type {Object} */
    hivDeathsPerYear = [],
/** JSON array of AIDS-related deaths/second/year. @type {Object} */
    hivInfectionsPerSecond = [],
/** JSON array of AIDS-related deaths/second/year. @type {Object} */
    hivDeathsPerSecond = [],
/** JSON array of seconds between HIV infections. @type {Object} */
    secondsPerHivInfection = [],
/** JSON array of seconds between AIDS-related deaths. @type {Object} */
    secondsPerHivDeath = [],
/** JSON array of HIV-related resource spent. @type {Object} */
    hivResourcesSpent = [];

/**
 * Returns the number of days in a given year, accounting for leap years.
 * 
 * @author Curtis Blumer
 * @version 1.1
 * 
 * @param {integer} year The year for which you want to know the number of days.
 * 
 * @return {integer} days The number of days in the given year.
 * 
 * @example secondsPerYear( 2014 );
 * @example seconcsPerYear( moment().year() );
 */
function daysInYear( year ) {
    /** Is the given year a leap year? @type {boolean} */
    var _isLeapYear = moment().isLeapYear( [ year ] );
    
    return ( _isLeapYear !== true ) ? 365 : 366;
}

/**
 * Returns the number of seconds in a day.
 * 
 * @author Curtis Blumer
 * @version 1.1
 * 
 * @returns {integer} The number of seconds per day.
 */
function secondsPerDay () {
    /** The number of hours in a day. @type {integer} @constant */
    var _hoursPerDay = 24,
    /** The number of minutes in an hour. @type {integer} @constant */
        _minutesPerHour = 60,
    /** The number of seconds in a minute. @type {integer} @constant */
        _secondsPerMinute = 60;
    
    return _hoursPerDay * _minutesPerHour * _secondsPerMinute;
}

/**
 * Returns the number of seconds in a given year, accounting for leap year.
 * 
 * @author Curtis Blumer
 * @version 1.5
 * 
 * @param {integer} year 4-digit year for which the number of seconds is needed.
 * 
 * @returns {integer} The number of seconds per year, accounting for leap years.
 * 
 * @example secondsPerYear( 2014 );
 * @example seconcsPerYear( moment().year() );
 */
function secondsPerYear ( year ) {
    return daysInYear( year ) * secondsPerDay();
}

/**
 * Calculates the number of occurances per second in a given year.
 * 
 * @author Curtis Blumer
 * @version 1.0
 * 
 * @param {integer} year The year for which you wish to calculate the rate.
 * @param {number} count The number of times it occurs for a given {year}.
 * 
 * @return {number} The number of occurances per second.
 * 
 * @example occurancesPerSecond( 2015, 630084 );
 */
function occurancesPerSecond( year, count ) {
    /** The number of occurances per second for a given year @type {Number} */
    var occurancesPerSecond = count / secondsPerYear( year );
        
    return occurancesPerSecond;
}

/**
 * Calculate the difference between two moment.js objects. Returns the absolute
 * value of the number of seconds between to moment.js objects.
 * 
 * @author Curtis Blumer
 * @version 1.2
 * 
 * @param {Object} fromMoment A moment.js object
 * @param {Object} toMoment A moment.js object
 * 
 * @return {integer} The number of seconds between to date times. This will
 * always be a positive integer.
 * 
 * @example calcDiffBetweenTwoMoments( moment( "2015-01-01" ), moment() );
 */
function calcDiffBetweenTwoMoments( fromMoment, toMoment ) {
    return Math.abs( fromMoment.diff( toMoment, "seconds" ) );
}
/**
 * Seconds since midnight of the current day.
 * 
 * @author Curtis Blumer
 * @version 1.1
 * 
 * @returns {integer} The number of seconds since today at midnight.
 */
function secondsSinceMidnightToday() {
    return calcDiffBetweenTwoMoments( moment(), moment().format( "YYYY-MM-DD" ) );
}

/**
 * Seconds since midnight of the current year.
 * 
 * @author Curtis Blumer
 * @version 1.0
 * 
 * @returns {integer} The number of seconds since January 1st of the current
 * year at midnight.
 */
function secondsSinceMidnightThisYear() {
    /** A moment.js object indicating the exact date/time. @type {Object} */
    var _now = moment(),
    /** A moment.js object indicating the begining of the year. @type {Object}*/
        _starOfYear = _now.format( "YYYY" ) + "-01-01";
    
    return calcDiffBetweenTwoMoments( moment(), moment().format( "YYYY" ) + "-01-01" );
}


/**
 * Setup the various statistical arrays.
 */

// Set the number of HIV infection per year
hivInfectionsPerYear = {
    "Oklahoma": { "year": 2014, "count": 311, "reference": "http://example.com" },
    "US": { "year": 2013, "count": 47352 * 1.128, "reference": "http://example.com" },
    "Worldwide": { "year": 2014, "count": 2000000, "reference": "http://example.com" }
};

// Set the number of HIV infection per second per year
hivInfectionsPerSecond = {
    "Oklahoma": occurancesPerSecond( hivInfectionsPerYear.Oklahoma.year, hivInfectionsPerYear.Oklahoma.count ),
    "US": occurancesPerSecond( hivInfectionsPerYear.US.year, hivInfectionsPerYear.US.count ),
    "Worldwide": occurancesPerSecond( hivInfectionsPerYear.Worldwide.year, hivInfectionsPerYear.Worldwide.count )
};

// Set the number of second between HIV infections
secondsPerHivInfection = {
    "Oklahoma": secondsPerYear( hivInfectionsPerYear.Oklahoma.year) / hivInfectionsPerYear.Oklahoma.count,
    "US": secondsPerYear( hivInfectionsPerYear.US.year) / hivInfectionsPerYear.US.count,
    "Worldwide": secondsPerYear( hivInfectionsPerYear.Worldwide.year) / hivInfectionsPerYear.Worldwide.count
};

// Set the number of AIDS-related deaths per year
hivDeathsPerYear = {
    "Oklahoma": { "year": 2013, "count": 94 },
    "US": { "year": 2012, "count": 13712 },
    "Worldwide": { "year": 2014, "count": 1200000 }
};

// Set the number of AIDS-related deaths per second per year
hivDeathsPerSecond = {
    "Oklahoma": occurancesPerSecond( hivDeathsPerYear.Oklahoma.year, hivDeathsPerYear.Oklahoma.count ),
    "US": occurancesPerSecond( hivDeathsPerYear.US.year, hivDeathsPerYear.US.count ),
    "Worldwide": occurancesPerSecond( hivDeathsPerYear.Worldwide.year, hivDeathsPerYear.Worldwide.count )
};

// Set the number of second between AIDS-related deaths
secondsPerHivDeath = {
    "Oklahoma": secondsPerYear( hivDeathsPerYear.Oklahoma.year) / hivDeathsPerYear.Oklahoma.count,
    "US": secondsPerYear( hivDeathsPerYear.US.year) / hivDeathsPerYear.US.count,
    "Worldwide": secondsPerYear( hivDeathsPerYear.Worldwide.year) / hivDeathsPerYear.Worldwide.count
};

// Set the number of second between AIDS-related deaths
secondsPerHivDeath = {
    "Oklahoma": secondsPerYear( hivDeathsPerYear.Oklahoma.year) / hivDeathsPerYear.Oklahoma.count,
    "US": secondsPerYear( hivDeathsPerYear.US.year) / hivDeathsPerYear.US.count,
    "Worldwide": secondsPerYear( hivDeathsPerYear.Worldwide.year) / hivDeathsPerYear.Worldwide.count
};

hivResourcesSpent = {
    "US": { "year": 2015, "count": 30700000000 }
};

var secondsPerDollarSpent = {
    "US": secondsPerYear( hivResourcesSpent.US.year) / hivResourcesSpent.US.count
};